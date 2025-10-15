import fs from "fs/promises";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { ExtractedData } from "../types.js";
import { extractDataFromText } from "./textExtractor.js";

/**
 * Extrahiert Text aus einer PDF-Datei und gibt strukturierte Daten zurück
 */
export async function extractFromPDF(filePath: string): Promise<ExtractedData> {
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

    return extractDataFromText(fullText);
}
