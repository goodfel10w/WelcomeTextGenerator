// MCP Server für Onboarding-Text-Generator
// Install: npm install @modelcontextprotocol/sdk zod
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { extractFromTextTool } from "./tools/extractFromTextTool.js";
import { listDataTool } from "./tools/listDataTool.js";
import { generateModularTextTool } from "./tools/generateModularTextTool.js";
// MCP Server erstellen
const server = new McpServer({
    name: "onboarding-text-generator",
    version: "1.0.0",
});
// Tools registrieren
server.registerTool(extractFromTextTool.name, extractFromTextTool.config, extractFromTextTool.handler);
server.registerTool(listDataTool.name, listDataTool.config, listDataTool.handler);
server.registerTool(generateModularTextTool.name, generateModularTextTool.config, generateModularTextTool.handler);
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
