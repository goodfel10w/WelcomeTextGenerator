# Publishing Guide für Welcome Text Generator MCP

## Schnellstart - Veröffentlichung auf NPM

### 1. NPM Account vorbereiten

```bash
# Bei NPM anmelden (falls noch nicht geschehen)
npm login
```

### 2. Projekt vorbereiten

```bash
# Build erstellen
npm run build

# Testen was veröffentlicht wird
npm pack --dry-run
```

### 3. Veröffentlichen

```bash
# Erste Veröffentlichung
npm publish

# Bei weiteren Updates:
npm version patch  # 1.0.0 -> 1.0.1
npm run build
npm publish
```

## GitHub Release erstellen

1. **Änderungen pushen:**
   ```bash
   git add .
   git commit -m "Release v1.0.0"
   git push github main
   ```

2. **GitHub Release:**
   - Gehe zu: https://github.com/goodfel10w/WelcomeTextGenerator/releases
   - Klicke "Create a new release"
   - Tag: `v1.0.0`
   - Title: `Version 1.0.0`
   - Beschreibe die Features

## Installations-Check

Nach der Veröffentlichung können Nutzer das Package installieren mit:

```bash
npm install -g welcome-text-generator-mcp
```

Claude Desktop Config:
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

## Update-Workflow

```bash
# 1. Änderungen machen und testen
npm run build

# 2. Version erhöhen
npm version patch   # Bug-Fixes
npm version minor   # Neue Features
npm version major   # Breaking Changes

# 3. Veröffentlichen
npm publish

# 4. Git pushen
git push github main
git push github --tags
```

## Checkliste vor dem Release

- [ ] Alle Features funktionieren
- [ ] Build läuft ohne Fehler: `npm run build`
- [ ] README ist vollständig
- [ ] package.json ist korrekt ausgefüllt
- [ ] LICENSE ist vorhanden
- [ ] Test mit Claude Desktop durchgeführt

## Wichtige Links

- NPM Package: https://www.npmjs.com/package/welcome-text-generator-mcp
- GitHub Repo: https://github.com/goodfel10w/WelcomeTextGenerator
- MCP Dokumentation: https://modelcontextprotocol.io

## Troubleshooting

**Package-Name bereits vergeben:**
```bash
# Ändere "name" in package.json zu einem einzigartigen Namen
```

**Nicht angemeldet:**
```bash
npm login
npm whoami  # Prüfen ob angemeldet
```

**Build-Fehler:**
```bash
npm run build  # Fehler beheben vor dem Publish
```
