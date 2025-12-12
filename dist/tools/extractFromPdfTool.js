import { z } from "zod";
import { extractFromPDF } from "../utils/pdfExtractor.js";
import { saveData } from "../storage/dataStorage.js";
export const extractFromPdfTool = {
    name: "extract_from_pdf",
    config: {
        title: "PDF Lebenslauf extrahieren",
        description: "Extrahiert strukturierte Daten aus einem PDF-Lebenslauf",
        inputSchema: {
            filePath: z.string().describe("Pfad zur PDF-Datei"),
        },
    },
    handler: async ({ filePath }) => {
        try {
            const extracted = await extractFromPDF(filePath);
            const id = await saveData(extracted, `PDF: ${filePath}`);
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify({ id, ...extracted }, null, 2),
                    },
                ],
            };
        }
        catch (error) {
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
    },
};
