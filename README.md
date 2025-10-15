# Welcome Text Generator MCP Server

Ein Model Context Protocol (MCP) Server zur automatischen Generierung professioneller Willkommenstexte für neue Mitarbeiter. Extrahiert strukturierte Daten aus Lebensläufen (PDF oder Text) und erstellt modulare, anpassbare Onboarding-Texte.

## Features

✨ **PDF-Extraktion**: Liest automatisch Lebensläufe aus PDF-Dateien
📝 **Text-Analyse**: Verarbeitet Freitext-Informationen über Mitarbeiter
🎯 **Modulares Template-System**: 5 flexible Module mit verschiedenen Varianten
💾 **Datenspeicherung**: Speichert extrahierte Daten zur späteren Verwendung
🔄 **Übersichtsverwaltung**: Listet alle gespeicherten Mitarbeiterdaten auf

## Installation

### Voraussetzungen
- Node.js (v18 oder höher)
- Claude Desktop App

### Schritt 1: Installation via NPM

```bash
npm install -g welcome-text-generator-mcp
```

Oder für lokale Entwicklung:

```bash
git clone https://github.com/goodfel10w/WelcomeTextGenerator.git
cd WelcomeTextGenerator
npm install
npm run build
```

### Schritt 2: Claude Desktop Konfiguration

Öffne die Claude Desktop Konfigurationsdatei:

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Linux**: `~/.config/Claude/claude_desktop_config.json`

Füge den MCP Server hinzu:

```json
{
  "mcpServers": {
    "welcome-text-generator": {
      "command": "node",
      "args": [
        "C:\\Pfad\\zum\\Projekt\\dist\\index.js"
      ],
      "env": {}
    }
  }
}
```

**Bei globaler Installation via NPM:**

```json
{
  "mcpServers": {
    "welcome-text-generator": {
      "command": "npx",
      "args": ["welcome-text-generator-mcp"],
      "env": {}
    }
  }
}
```

### Schritt 3: Claude Desktop neu starten

Starte die Claude Desktop App neu, damit der MCP Server geladen wird.

## Verfügbare Tools

### 1. `extract_from_pdf`
Extrahiert strukturierte Daten aus einem PDF-Lebenslauf.

**Parameter:**
- `filePath` (string): Absoluter Pfad zur PDF-Datei

**Beispiel:**
```json
{
  "filePath": "C:\\Users\\name\\Documents\\lebenslauf.pdf"
}
```

### 2. `extract_from_text`
Extrahiert strukturierte Daten aus Freitext.

**Parameter:**
- `text` (string): Freitext mit Informationen über den Mitarbeiter

**Beispiel:**
```json
{
  "text": "Max Mustermann - Senior Developer mit 5 Jahren Erfahrung. Skills: JavaScript, TypeScript, React..."
}
```

### 3. `generate_modular_welcome_text`
Generiert einen modularen Willkommenstext nach dem Template-System.

**Parameter:**
- `data` (object): Extrahierte Mitarbeiterdaten
  - `name` (string, required)
  - `position` (string, optional)
  - `previousCompany` (string, optional)
  - `skills` (array, required)
  - `experience` (string, optional)
  - `achievements` (array, required)
  - `interests` (array, required)

- `moduleOptions` (object, optional):
  - `includeCompetencies` (boolean, default: true): Modul 2 einbinden
  - `includeFunFact` (boolean, default: false): Modul 3 einbinden
  - `includeExperience` (boolean, default: true): Modul 4 einbinden
  - `introductionVariant` (string, default: "variant1"): "variant1", "variant2" oder "variant3"
  - `closingVariant` (string, default: "variant1"): "variant1", "variant2" oder "variant3"

### 4. `list_extracted_data`
Listet alle gespeicherten Mitarbeiterdaten auf.

**Keine Parameter erforderlich**

## Modul-System

Der generierte Text besteht aus 5 Modulen:

### Modul 1: Begrüßung & Einleitung (Pflicht)
**3 Varianten verfügbar:**
- **Variant 1**: "Welcome to [NAME]! Mit einem frischen Blick..."
- **Variant 2**: "Wir freuen uns riesig, [NAME] bei uns begrüßen zu dürfen!..."
- **Variant 3**: "Ein herzliches Willkommen an [NAME]!..."

### Modul 2: Kompetenzen & Stärken (Optional)
Beschreibt die Fachkenntnisse und Leidenschaft des Mitarbeiters.

### Modul 3: Fun Fact (Optional)
Persönliche, interessante Information über den Mitarbeiter.

### Modul 4: Beruflicher Werdegang (Optional)
Informationen zur bisherigen Karriere und Erfolgen.

### Modul 5: Abschluss & Willkommensgruß (Pflicht)
**3 Varianten verfügbar:**
- **Variant 1**: "Herzlich willkommen im Team, [NAME]!..."
- **Variant 2**: "Wir freuen uns sehr, dich an Bord zu haben, [NAME]!..."
- **Variant 3**: "Schön, dass du jetzt Teil unseres Teams bist, [NAME]!..."

## Verwendungsbeispiel

Im Claude Chat:

```
Ich: Hier ist der Lebenslauf von unserem neuen Mitarbeiter.
[PDF hochladen]

Claude: Ich extrahiere die Daten aus der PDF...
[verwendet extract_from_pdf Tool]

Ich: Erstelle einen Willkommenstext mit Variante 2 für die Begrüßung
und füge einen Fun Fact hinzu.

Claude: [verwendet generate_modular_welcome_text mit entsprechenden Optionen]

Ausgabe:
Wir freuen uns riesig, Max Mustermann bei uns begrüßen zu dürfen!
Ab sofort verstärkt er unser Team im Bereich Development als Senior
Developer und bringt dabei wertvolle Erfahrung und neue Impulse mit.

Max bringt nicht nur umfangreiche Kenntnisse in JavaScript und
TypeScript mit, sondern auch jede Menge Energie und Leidenschaft
für moderne Webentwicklung.

Fun Fact über Max: Wusstest du, dass er ein begeisterter
Marathonläufer ist? Vielleicht erleben wir das bald gemeinsam im Team!

Herzlich willkommen im Team, Max Mustermann! Lass uns gemeinsam
großartige Dinge erreichen. Schön, dass du da bist!
```

## Datenspeicherung

Alle extrahierten Daten werden automatisch gespeichert in:
```
<Projektverzeichnis>/data/extracted_data.json
```

Jeder Eintrag enthält:
- `id`: Eindeutige ID (Timestamp)
- `timestamp`: ISO 8601 Zeitstempel
- `source`: Quelle der Daten (PDF-Pfad oder "Manuelle Texteingabe")
- `data`: Die extrahierten Mitarbeiterdaten

## Entwicklung

### Projekt lokal starten

```bash
npm run dev
```

### Build erstellen

```bash
npm run build
```

### Tests ausführen

```bash
npm test
```

## Technologie-Stack

- **TypeScript**: Typsicherer Code
- **MCP SDK**: Model Context Protocol Integration
- **pdfjs-dist**: PDF-Verarbeitung
- **Zod**: Schema-Validierung

## Projektstruktur

```
welcome-text-generator-mcp/
├── src/
│   ├── index.ts                 # Server-Einstiegspunkt
│   ├── types.ts                 # TypeScript-Typen
│   ├── tools/                   # MCP Tools
│   │   ├── extractFromPdfTool.ts
│   │   ├── extractFromTextTool.ts
│   │   ├── generateModularTextTool.ts
│   │   └── listDataTool.ts
│   ├── utils/                   # Hilfsfunktionen
│   │   ├── pdfExtractor.ts
│   │   ├── textExtractor.ts
│   │   └── moduleTextGenerator.ts
│   ├── templates/               # Text-Templates
│   │   └── moduleTemplates.ts
│   └── storage/                 # Datenspeicherung
│       └── dataStorage.ts
├── dist/                        # Kompilierte Dateien
├── data/                        # Gespeicherte Daten
├── package.json
├── tsconfig.json
└── README.md
```

## Lizenz

MIT License - siehe [LICENSE](LICENSE) Datei

## Beiträge

Contributions sind willkommen! Bitte erstelle einen Pull Request oder öffne ein Issue.

## Support

Bei Fragen oder Problemen:
- GitHub Issues: https://github.com/goodfel10w/WelcomeTextGenerator/issues
- MCP Dokumentation: https://modelcontextprotocol.io

## Changelog

### Version 1.0.0
- Initial Release
- PDF-Extraktion
- Text-Extraktion
- Modulares Template-System mit 5 Modulen
- Datenspeicherung und -verwaltung
- 3 Varianten für Einleitung und Abschluss
