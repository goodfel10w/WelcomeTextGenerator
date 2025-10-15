import { loadAllData } from "../storage/dataStorage.js";

export const listDataTool = {
    name: "list_extracted_data",
    config: {
        title: "Gespeicherte Daten auflisten",
        description: "Listet alle bisher extrahierten und gespeicherten Mitarbeiterdaten auf",
        inputSchema: {},
    },
    handler: async () => {
        try {
            const entries = await loadAllData();

            if (entries.length === 0) {
                return {
                    content: [
                        {
                            type: "text" as const,
                            text: "Keine gespeicherten Daten gefunden.",
                        },
                    ],
                };
            }

            const formattedList = entries.map(entry => ({
                id: entry.id,
                timestamp: entry.timestamp,
                source: entry.source,
                name: entry.data.name,
                position: entry.data.position || "Nicht angegeben",
                skills: entry.data.skills.join(", ") || "Keine",
            }));

            return {
                content: [
                    {
                        type: "text" as const,
                        text: JSON.stringify(formattedList, null, 2),
                    },
                ],
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: "text" as const,
                        text: `Fehler beim Laden der Daten: ${error instanceof Error ? error.message : "Unbekannter Fehler"}`,
                    },
                ],
                isError: true,
            };
        }
    },
};
