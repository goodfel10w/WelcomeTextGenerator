import fs from "fs/promises";
import path from "path";
const STORAGE_DIR = path.join(process.cwd(), "data");
const STORAGE_FILE = path.join(STORAGE_DIR, "extracted_data.json");
/**
 * Stellt sicher, dass das Speicherverzeichnis existiert
 */
async function ensureStorageDir() {
    try {
        await fs.mkdir(STORAGE_DIR, { recursive: true });
    }
    catch (error) {
        // Verzeichnis existiert bereits
    }
}
/**
 * Lädt alle gespeicherten Daten
 */
export async function loadAllData() {
    try {
        await ensureStorageDir();
        const content = await fs.readFile(STORAGE_FILE, "utf-8");
        return JSON.parse(content);
    }
    catch (error) {
        return [];
    }
}
/**
 * Speichert neue extrahierte Daten
 */
export async function saveData(data, source) {
    await ensureStorageDir();
    const entries = await loadAllData();
    const newEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        data,
        source,
    };
    entries.push(newEntry);
    await fs.writeFile(STORAGE_FILE, JSON.stringify(entries, null, 2));
    return newEntry.id;
}
