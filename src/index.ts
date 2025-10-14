// MCP Server für Onboarding-Text-Generator
// Install: npm install @modelcontextprotocol/sdk zod pdfjs-dist

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "fs/promises";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

// Typen für extrahierte Daten
interface ExtractedData {
    name: string;
    position?: string;
    previousCompany?: string;
    skills: string[];
    experience?: string;
    education?: string;
    achievements: string[];
    interests: string[];
}

// MCP Server erstellen
const server = new McpServer({
    name: "onboarding-text-generator",
    version: "1.0.0",
});

// Tool 1: PDF-Lebenslauf extrahieren
server.registerTool(
    "extract_from_pdf",
    {
        title: "PDF Lebenslauf extrahieren",
        description: "Extrahiert strukturierte Daten aus einem PDF-Lebenslauf",
        inputSchema: {
            filePath: z.string().describe("Pfad zur PDF-Datei"),
        },
    },
    async ({ filePath }) => {
        try {
            const dataBuffer = await fs.readFile(filePath);
            const data = new Uint8Array(dataBuffer);

            const loadingTask = pdfjsLib.getDocument({ data });
            const pdfDoc = await loadingTask.promise;

            let fullText = "";
            for (let i = 1; i <= pdfDoc.numPages; i++) {
                const page = await pdfDoc.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items
                    .map((item: any) => item.str)
                    .join(" ");
                fullText += pageText + "\n";
            }

            const extracted = extractDataFromText(fullText);

            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(extracted, null, 2),
                    },
                ],
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Fehler beim Lesen der PDF: ${error instanceof Error ? error.message : "Unbekannter Fehler"}`,
                    },
                ],
                isError: true,
            };
        }
    }
);

// Tool 2: Daten aus manuellem Text extrahieren
server.registerTool(
    "extract_from_text",
    {
        title: "Text analysieren",
        description: "Extrahiert strukturierte Daten aus freigegebenem Text",
        inputSchema: {
            text: z.string().describe("Freitext mit Informationen über den Mitarbeiter"),
        },
    },
    async ({ text }) => {
        const extracted = extractDataFromText(text);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(extracted, null, 2),
                },
            ],
        };
    }
);

// Tool 3: Onboarding-Text generieren
server.registerTool(
    "generate_onboarding_text",
    {
        title: "Willkommenstext generieren",
        description: "Generiert einen professionellen Willkommenstext für neue Mitarbeiter",
        inputSchema: {
            data: z.object({
                name: z.string(),
                position: z.string().optional(),
                previousCompany: z.string().optional(),
                skills: z.array(z.string()),
                experience: z.string().optional(),
                education: z.string().optional(),
                achievements: z.array(z.string()),
                interests: z.array(z.string()),
            }),
            focusAreas: z.object({
                skills: z.boolean().default(true),
                experience: z.boolean().default(true),
                education: z.boolean().default(false),
                personality: z.boolean().default(false),
                achievements: z.boolean().default(false),
            }),
            tone: z.enum(["professional", "casual", "warm"]).default("professional"),
        },
    },
    async ({ data, focusAreas, tone }) => {
        const text = generateWelcomeText(data, focusAreas, tone);
        return {
            content: [
                {
                    type: "text",
                    text: text,
                },
            ],
        };
    }
);

// Tool 4: LinkedIn-Profil simulieren (Placeholder für echte API)
server.registerTool(
    "fetch_linkedin_profile",
    {
        title: "LinkedIn-Profil abrufen",
        description: "Ruft Profildaten von LinkedIn ab (benötigt LinkedIn API)",
        inputSchema: {
            profileUrl: z.string().url().describe("LinkedIn Profil-URL"),
        },
    },
    async ({ profileUrl }) => {
        // HINWEIS: Echte LinkedIn-API-Integration erforderlich
        return {
            content: [
                {
                    type: "text",
                    text: "LinkedIn-API-Integration noch nicht implementiert. Bitte verwenden Sie manuelle Eingabe oder PDF-Upload.",
                },
            ],
            isError: true,
        };
    }
);

// Hilfsfunktion: Datenextraktion aus Text
function extractDataFromText(text: string): ExtractedData {
    const lines = text.split("\n");
    const data: ExtractedData = {
        name: "",
        skills: [],
        achievements: [],
        interests: [],
    };

    // Einfache Keyword-basierte Extraktion
    const nameMatch = text.match(/Name[:\s]+([A-ZÄÖÜ][a-zäöüß]+\s+[A-ZÄÖÜ][a-zäöüß]+)/i);
    if (nameMatch) data.name = nameMatch[1];

    const skillsSection = text.match(/(?:Skills?|Fähigkeiten|Kenntnisse)[:\s]+([^\n]+)/i);
    if (skillsSection) {
        data.skills = skillsSection[1]
            .split(/[,;]/)
            .map((s) => s.trim())
            .filter((s) => s.length > 0);
    }

    const expMatch = text.match(/(?:Berufserfahrung|Experience)[:\s]+([0-9]+\s*Jahre?)/i);
    if (expMatch) data.experience = expMatch[1];

    const posMatch = text.match(/(?:Position|Rolle|Job Title)[:\s]+([^\n]+)/i);
    if (posMatch) data.position = posMatch[1].trim();

    const companyMatch = text.match(/(?:Unternehmen|Company)[:\s]+([^\n]+)/i);
    if (companyMatch) data.previousCompany = companyMatch[1].trim();

    return data;
}

// Hilfsfunktion: Willkommenstext generieren
function generateWelcomeText(
    data: ExtractedData,
    focusAreas: Record<string, boolean>,
    tone: string
): string {
    const { name, position, previousCompany, skills, experience, achievements, interests } = data;

    let text = "";

    if (tone === "professional") {
        text = `Wir freuen uns sehr, ${name}${position ? ` als neuen ${position}` : ""} in unserem Team begrüßen zu dürfen!\n\n`;

        if (focusAreas.experience && experience) {
            text += `${name} bringt ${experience} Berufserfahrung mit`;
            if (previousCompany) text += ` und war zuletzt bei ${previousCompany} tätig`;
            text += ". ";
        }

        if (focusAreas.skills && skills.length > 0) {
            text += `Mit fundierten Kenntnissen in ${skills.slice(0, 3).join(", ")} wird ${name.split(" ")[0]} unser Team optimal verstärken. `;
        }

        if (focusAreas.achievements && achievements.length > 0) {
            text += `\n\nBesonders beeindruckend: ${achievements[0]}. `;
        }

        if (focusAreas.personality && interests.length > 0) {
            text += `\n\nPrivat interessiert sich ${name.split(" ")[0]} für ${interests.join(", ")}. `;
        }

        text += `\n\nWir sind überzeugt, dass ${name.split(" ")[0]} eine wertvolle Bereicherung für unser Unternehmen sein wird!`;
    } else if (tone === "casual") {
        text = `Hey Team! 🎉\n\nSuper News: ${name}${position ? ` kommt als ${position}` : ""} zu uns!\n\n`;

        if (focusAreas.experience && experience) {
            text += `${name.split(" ")[0]} bringt ${experience} auf dem Buckel`;
            if (previousCompany) text += ` und kommt von ${previousCompany}`;
            text += ". ";
        }

        if (focusAreas.skills && skills.length > 0) {
            text += `Die Skills passen perfekt: ${skills.slice(0, 3).join(", ")}! `;
        }

        if (focusAreas.personality && interests.length > 0) {
            text += `\n\nPrivat? ${interests.join(", ")} – klingt spannend! `;
        }

        text += `\n\nFreuen uns mega auf die Zusammenarbeit! 🚀`;
    } else {
        // warm
        text = `Herzlich willkommen ${name}!\n\n`;

        if (focusAreas.experience && experience) {
            text += `Mit ${experience} Berufserfahrung`;
            if (previousCompany) text += ` und der Zeit bei ${previousCompany}`;
            text += ` beginnt nun ein neues Kapitel bei uns. `;
        }

        if (focusAreas.skills && skills.length > 0) {
            text += `Deine Stärken in ${skills.slice(0, 3).join(", ")} werden uns sehr weiterhelfen. `;
        }

        text += `\n\nWir freuen uns auf die gemeinsame Reise!`;
    }

    return text;
}

// Server starten
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Onboarding Text Generator MCP Server läuft...");
}

main().catch((error) => {
    console.error("Server-Fehler:", error);
    process.exit(1);
});