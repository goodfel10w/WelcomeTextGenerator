import { z } from "zod";
import { extractDataFromText } from "../utils/textExtractor.js";
import { saveData } from "../storage/dataStorage.js";
export const extractFromTextTool = {
    name: "extract_from_text",
    config: {
        title: "Text analysieren",
        description: "Extrahiert strukturierte Daten aus freigegebenem Text",
        inputSchema: {
            text: z.string().describe("Freitext mit Informationen über den Mitarbeiter"),
        },
    },
    handler: async ({ text }) => {
        const extracted = extractDataFromText(text);
        const id = await saveData(extracted, "Manuelle Texteingabe");
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({ id, ...extracted }, null, 2),
                },
            ],
        };
    },
};
