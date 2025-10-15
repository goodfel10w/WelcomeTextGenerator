import { extractFromPDF } from "../utils/pdfExtractor.js";
import { saveData } from "../storage/dataStorage.js";
/**
 * Verarbeitet PDF-Ressourcen die über Claude Chat hochgeladen wurden
 */
export async function processPdfResource(uri) {
    // URI Format: file:///path/to/file.pdf
    const filePath = uri.replace('file:///', '').replace(/\//g, '\\');
    const extracted = await extractFromPDF(filePath);
    const id = await saveData(extracted, `PDF Upload: ${filePath}`);
    return JSON.stringify({ id, ...extracted }, null, 2);
}
