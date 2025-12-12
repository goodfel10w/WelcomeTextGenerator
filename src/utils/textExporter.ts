// Export-Utilities für verschiedene Formate
import { ExtractedData } from "../types.js";

export type ExportFormat = "html" | "markdown" | "email" | "slack" | "plain";

export interface ExportOptions {
    format: ExportFormat;
    includeMetadata?: boolean;
    companyName?: string;
    senderName?: string;
    senderEmail?: string;
}

/**
 * Exportiert einen Willkommenstext in verschiedene Formate
 */
export function exportWelcomeText(
    text: string,
    data: ExtractedData,
    options: ExportOptions
): string {
    switch (options.format) {
        case "html":
            return exportToHTML(text, data, options);
        case "markdown":
            return exportToMarkdown(text, data, options);
        case "email":
            return exportToEmail(text, data, options);
        case "slack":
            return exportToSlack(text, data, options);
        case "plain":
            return text;
        default:
            return text;
    }
}

/**
 * HTML-Export mit professionellem Styling
 */
function exportToHTML(
    text: string,
    data: ExtractedData,
    options: ExportOptions
): string {
    const paragraphs = text.split("\n\n").filter((p) => p.trim());
    const companyName = options.companyName || "Unser Unternehmen";

    return `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Willkommen ${data.name}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            background-color: #f5f5f5;
        }
        .container {
            background-color: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            border-bottom: 3px solid #0066cc;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        h1 {
            color: #0066cc;
            margin: 0 0 10px 0;
            font-size: 28px;
        }
        .subtitle {
            color: #666;
            font-size: 16px;
            margin: 0;
        }
        .content p {
            margin: 20px 0;
            font-size: 16px;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
            font-size: 14px;
        }
        .highlight {
            background-color: #e6f2ff;
            padding: 20px;
            border-left: 4px solid #0066cc;
            margin: 20px 0;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Willkommen bei ${companyName}!</h1>
            <p class="subtitle">${data.name} ${data.position ? `- ${data.position}` : ""}</p>
        </div>
        <div class="content">
${paragraphs.map((p) => `            <p>${escapeHtml(p)}</p>`).join("\n")}
        </div>
        ${options.includeMetadata ? generateHTMLMetadata(data) : ""}
        <div class="footer">
            <p>Herzliche Grüße<br>${companyName} Team</p>
        </div>
    </div>
</body>
</html>`;
}

/**
 * Markdown-Export
 */
function exportToMarkdown(
    text: string,
    data: ExtractedData,
    options: ExportOptions
): string {
    const companyName = options.companyName || "Unser Unternehmen";
    const paragraphs = text.split("\n\n").filter((p) => p.trim());

    let markdown = `# Willkommen bei ${companyName}!\n\n`;
    markdown += `## ${data.name}${data.position ? ` - ${data.position}` : ""}\n\n`;
    markdown += `---\n\n`;

    paragraphs.forEach((p) => {
        markdown += `${p}\n\n`;
    });

    if (options.includeMetadata) {
        markdown += `---\n\n`;
        markdown += generateMarkdownMetadata(data);
    }

    markdown += `\n---\n\n`;
    markdown += `*Herzliche Grüße*  \n`;
    markdown += `*${companyName} Team*\n`;

    return markdown;
}

/**
 * Email-Template-Export mit Betreffzeile
 */
function exportToEmail(
    text: string,
    data: ExtractedData,
    options: ExportOptions
): string {
    const companyName = options.companyName || "Unser Unternehmen";
    const senderName = options.senderName || "HR Team";
    const senderEmail = options.senderEmail || "hr@company.com";
    const firstName = data.name.split(" ")[0];

    let email = `BETREFF: Willkommen im Team, ${firstName}! 🎉\n\n`;
    email += `VON: ${senderName} <${senderEmail}>\n`;
    email += `AN: ${data.name}\n`;
    email += `\n${"=".repeat(60)}\n\n`;

    email += `Hallo ${firstName},\n\n`;

    const paragraphs = text.split("\n\n").filter((p) => p.trim());
    paragraphs.forEach((p) => {
        email += `${p}\n\n`;
    });

    email += `\n`;
    email += `Bei Fragen stehen wir dir jederzeit zur Verfügung!\n\n`;
    email += `Herzliche Grüße\n`;
    email += `${senderName}\n`;
    email += `${companyName}\n\n`;

    if (options.includeMetadata) {
        email += `\n${"=".repeat(60)}\n`;
        email += `MITARBEITER-PROFIL:\n`;
        email += generatePlainMetadata(data);
    }

    return email;
}

/**
 * Slack/Social-Media-Format-Export
 */
function exportToSlack(
    text: string,
    data: ExtractedData,
    options: ExportOptions
): string {
    const firstName = data.name.split(" ")[0];

    let slack = `🎉 *Willkommen im Team!* 🎉\n\n`;

    const paragraphs = text.split("\n\n").filter((p) => p.trim());

    // Erste Zeile als Highlight
    slack += `> ${paragraphs[0]}\n\n`;

    // Rest des Textes
    for (let i = 1; i < paragraphs.length; i++) {
        slack += `${paragraphs[i]}\n\n`;
    }

    // Skills als Tags
    if (data.skills.length > 0) {
        slack += `\n*Skills:* `;
        slack += data.skills.map((s) => `\`${s}\``).join(" • ");
        slack += `\n\n`;
    }

    // Interessen
    if (data.interests.length > 0) {
        slack += `*Interessen:* ${data.interests.slice(0, 3).join(", ")}\n\n`;
    }

    slack += `Sagt ${firstName} Hallo! 👋\n`;

    return slack;
}

/**
 * HTML-Metadaten generieren
 */
function generateHTMLMetadata(data: ExtractedData): string {
    let html = `        <div class="highlight">
            <h3>Profil</h3>
            <ul>
`;

    if (data.position) {
        html += `                <li><strong>Position:</strong> ${escapeHtml(data.position)}</li>\n`;
    }
    if (data.skills.length > 0) {
        html += `                <li><strong>Skills:</strong> ${escapeHtml(data.skills.join(", "))}</li>\n`;
    }
    if (data.interests.length > 0) {
        html += `                <li><strong>Interessen:</strong> ${escapeHtml(data.interests.join(", "))}</li>\n`;
    }
    if (data.previousCompany) {
        html += `                <li><strong>Vorheriges Unternehmen:</strong> ${escapeHtml(data.previousCompany)}</li>\n`;
    }

    html += `            </ul>
        </div>`;

    return html;
}

/**
 * Markdown-Metadaten generieren
 */
function generateMarkdownMetadata(data: ExtractedData): string {
    let md = `### 📋 Profil\n\n`;

    if (data.position) {
        md += `- **Position:** ${data.position}\n`;
    }
    if (data.skills.length > 0) {
        md += `- **Skills:** ${data.skills.join(", ")}\n`;
    }
    if (data.interests.length > 0) {
        md += `- **Interessen:** ${data.interests.join(", ")}\n`;
    }
    if (data.previousCompany) {
        md += `- **Vorheriges Unternehmen:** ${data.previousCompany}\n`;
    }

    return md;
}

/**
 * Plain-Text-Metadaten generieren
 */
function generatePlainMetadata(data: ExtractedData): string {
    let text = "";

    if (data.position) {
        text += `Position: ${data.position}\n`;
    }
    if (data.skills.length > 0) {
        text += `Skills: ${data.skills.join(", ")}\n`;
    }
    if (data.interests.length > 0) {
        text += `Interessen: ${data.interests.join(", ")}\n`;
    }
    if (data.previousCompany) {
        text += `Vorheriges Unternehmen: ${data.previousCompany}\n`;
    }

    return text;
}

/**
 * HTML-Escape-Funktion
 */
function escapeHtml(text: string): string {
    const map: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}
