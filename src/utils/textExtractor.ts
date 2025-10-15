import { ExtractedData } from "../types.js";

/**
 * Extrahiert strukturierte Daten aus Freitext
 */
export function extractDataFromText(text: string): ExtractedData {
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
