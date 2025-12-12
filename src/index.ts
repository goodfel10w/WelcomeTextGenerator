#!/usr/bin/env node
// MCP Server für Onboarding-Text-Generator
// Install: npm install @modelcontextprotocol/sdk zod

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { extractFromTextTool } from "./tools/extractFromTextTool.js";
import { listDataTool } from "./tools/listDataTool.js";
import { generateModularTextTool } from "./tools/generateModularTextTool.js";

const server = new McpServer({
    name: "io.github.goodfel10w/welcome-text-generator-mcp",
    title: "Welcome Text Generator",
    description: "Generiert Willkommenstexte für neue Mitarbeiter",
    version: "1.0.2",
    packages: [
        {
            registryType: "npm",
            registryBaseUrl: "https://registry.npmjs.org ",
            identifier: "welcome-text-generator-mcp",
            version: "1.0.2",
            transport: { type: "stdio" }
        }
    ]
});

// Tools registrieren
server.registerTool(
    extractFromTextTool.name,
    extractFromTextTool.config,
    extractFromTextTool.handler
);

server.registerTool(
    listDataTool.name,
    listDataTool.config,
    listDataTool.handler
);

server.registerTool(
    generateModularTextTool.name,
    generateModularTextTool.config,
    generateModularTextTool.handler
);

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
