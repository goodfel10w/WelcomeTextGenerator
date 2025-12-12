import { ExtractedData } from "../types.js";
import fs from "fs/promises";
import path from "path";

const STORAGE_DIR = path.join(process.cwd(), "data");
const STORAGE_FILE = path.join(STORAGE_DIR, "extracted_data.json");

interface StoredEntry {
    id: string;
    timestamp: string;
    data: ExtractedData;
    source: string;
}

/**
 * Stellt sicher, dass das Speicherverzeichnis existiert
 */
async function ensureStorageDir(): Promise<void> {
    try {
        await fs.mkdir(STORAGE_DIR, { recursive: true });
    } catch (error) {
        // Verzeichnis existiert bereits
    }
}

/**
 * Lädt alle gespeicherten Daten
 */
export async function loadAllData(): Promise<StoredEntry[]> {
    try {
        await ensureStorageDir();
        const content = await fs.readFile(STORAGE_FILE, "utf-8");
        return JSON.parse(content);
    } catch (error) {
        return [];
    }
}

/**
 * Speichert neue extrahierte Daten
 */
export async function saveData(data: ExtractedData, source: string): Promise<string> {
    await ensureStorageDir();
    const entries = await loadAllData();

    const newEntry: StoredEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        data,
        source,
    };

    entries.push(newEntry);
    await fs.writeFile(STORAGE_FILE, JSON.stringify(entries, null, 2));

    return newEntry.id;
}
