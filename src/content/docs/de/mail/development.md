---
title: Entwicklungsanleitung
description: "Die Entwicklungsanleitung für EpoCanvas Mail: Repository-Struktur, lokale Entwicklungsumgebung, Test- und Inspektionssuiten, die Sechs-Sprachen-Disziplin, die Migrationsdisziplin der Datenbanken, der Fünf-Schritte-Workflow und die Beteiligung am Projekt, vollständig erläutert."
---

**Aktualisiert: 2. November 2026 | Version: 5.25**

Diese Seite richtet sich an Administratoren und Entwickler, die EpoCanvas Mail weiterentwickeln, auditieren oder darauf aufbauen, und beschreibt Repository-Struktur, lokale Umgebung, Qualitätssicherungssystem und Engineering-Workflow. Die Schritte zum Betrieb einer Bereitstellung finden Sie in der [Bereitstellungsanleitung](/de/mail/deployment/); sie werden hier nicht wiederholt.

## 1. Repository-Struktur

```text
epomail/
├── mail-vue/        Frontend: Vue 3 + Vite + Element Plus (Oberfläche, i18n-Wörterbücher, PWA)
├── mail-worker/     Backend: Cloudflare Worker (API, Analyse eingehender E-Mails, AI-Fähigkeiten, D1/KV/R2)
├── temp_login_ui/   Anmeldemaske: React-Anwendung (wird beim Build in mail-worker/dist/login eingefügt)
├── tests/           Automatisierte Tests, öffentliche End-to-End-Assertionen und Inspektionsskripte
├── scripts/         Werkzeugsammlung (i18n-Audit-Trio, Seeding, Build-Hilfsmittel)
├── doc/             Archiv der langen, themenspezifischen Analyseberichte
├── EpomailDocs/     Diese Dokumentationswebsite (eigenes Git-Repository)
└── CHECKLIST.log / REPORTS.md   Aufgabenprotokoll und Audit-Archiv
```

## 2. Lokale Entwicklungsumgebung

```bash
pnpm install                      # Abhängigkeiten im Repository-Stamm installieren
cd mail-vue && npm run dev        # Frontend-Entwicklungsserver
cd mail-vue && npm run build      # Frontend-Build (Übergabekriterium: null Warnungen, null Fehler)
cd mail-worker && npx wrangler dev  # lokaler vollständig echter Stack (127.0.0.1:8787)
```

Lokale Schlüssel werden über `mail-worker/.dev.vars` geführt (nicht im Repository, Vorlage in `.dev.vars.example`); nach dem Leeren von `.wrangler/state` lässt sich über `/api/init/<jwt_secret>` ein vollständiger Demodatenbestand von null aus einspielen, siehe Abschnitt 3 der [Bereitstellungsanleitung](/de/mail/deployment/).

## 3. Tests und Inspektionen

- Das Verzeichnis `tests/` enthält über hundert automatisierte Skripte: Playwright-Browserregressionen auf dem vollständig echten Stack, öffentliche End-to-End-Assertionen gegen die Produktionsumgebung, repositoryweite statische Scans und bytegenaue Integritätsvergleiche;
- repräsentative quantitative Nachweise: Sicherheitshärtung 43/43 Assertionen, öffentliches Routing End-to-End 32/32, Anmeldemaske in sechs Sprachen 62/62, Produktionsintegrität 369 bytegenaue Vergleiche;
- Änderungen an Oberfläche oder API müssen zuerst bauen (`vite build` plus Testkompilierung des Workers) und anschließend auf dem lokalen vollständig echten Stack real getestet werden; Testdaten werden ausnahmslos in `finally`-Blöcken physisch bereinigt, sodass null Falschdaten in Datenbank und KV zurückbleiben.

## 4. Die Sechs-Sprachen-Disziplin

Die Oberflächen- und Backend-Wörterbücher unterstützen die sechs Sprachen zh, zh-Hant, en, es, fr und nl mit absolut symmetrischen Schlüsselmengen. Nach dem Hinzufügen oder Ändern von Einträgen muss das statische Audit-Trio bestanden werden:

```bash
node scripts/i18n-symmetry.mjs      # absolut symmetrische Schlüsselmengen der sechs Sprachen
node scripts/i18n-audit.mjs         # null fehlende Verweise auf Literale im Code
node scripts/i18n-hardcoded.mjs     # null unumhüllte hartkodierte, benutzersichtbare Texte
```

System- und Willkommens-E-Mails werden in der Sprache des Empfängers zugestellt; neuer benutzersichtbarer Text wird ausnahmslos über Wörterbuchschlüssel referenziert und niemals hartkodiert.

## 5. Migrationsdisziplin der Datenbanken

- Die Tabellendefinitionen werden an einer einzigen Stelle gepflegt: in den nativen `CREATE TABLE`-Definitionen des Backend-Initialisierungsmoduls;
- jede Spaltenänderung erhält begleitend eine Upgrade-Funktion (`vN_NDB`), die mit `PRAGMA table_info` bedingt prüft und erst dann `ALTER TABLE ADD COLUMN` ausführt, um Idempotenz zu sichern;
- ein vollständig neuer Kaltstart schließt sämtliche Tabellenerstellung und das Einspielen der sechs Standardrollen allein über `/api/init/<jwt_secret>` ab; Migrationen dürfen niemals von manuell ausgeführtem SQL abhängen.

## 6. Engineering-Workflow

Die Entwicklung folgt einem Fünf-Schritte-SOP:

1. Umfang klären: die Wirkungsgrenze über Schnittstellen, Datentabellen, Komponenten, Wörterbücher und Stile festlegen;
2. normgerecht umsetzen: der bestehenden Architektur folgen und dabei Dunkelmodus und mobile Darstellung, schrittweise Degradierung sowie standardmäßige Verteidigungsmaßnahmen berücksichtigen;
3. Test auf dem vollständig echten Stack: Build-Prüfung, Regressionssuite, Realtest im Browser und Bereinigung der Falschdaten;
4. normgerecht committen: strukturierte Commit-Meldungen; Ausführungsprotokolle werden nach Zuordnung in `CHECKLIST.log` (Routineablauf) oder `REPORTS.md` (gesonderte Audits) geschrieben; die Governance-Dokumente selbst führen kein Protokoll;
5. Berichte mit Hash an der Spitze: jede nach außen gerichtete Ausgabe führt den vollständigen Commit-Hash an, damit die Version nachvollziehbar bleibt.

## 7. Entwicklung der Dokumentationswebsite

Diese Dokumentationswebsite (EpomailDocs) ist ein eigenes Git-Repository auf Basis von Astro 5 und Starlight; ihre Struktur ist in sechs Sprachen pro Dokument symmetrisch (mit Traditionellem Chinesisch als verbindlicher Basis):

```bash
pnpm build                          # Build (regeneriert das Manifest des Manipulationsschutzes)
node scripts/validate-anchors.cjs   # null gebrochene Anker website-weit
python scripts/check-structure.py   # strukturelle Symmetrie der sechs Sprachen
python scripts/verify-laws.py       # Gesetzeszitate deckungsgleich mit dem geprüften Register
```

Jeder Build regeneriert das `tamper-proof.json`-Manifest des Manipulationsschutzes; der Commit einer Dokumentänderung und die Fixierung seines Hashs erfolgen in zwei getrennten Commits.

## 8. Beteiligung und Beiträge

- Fehlerberichte und Funktionsvorschläge reichen Sie über die Issues des GitHub-Repositorys ein, Code über Pull Requests (`github.com/shijianus/epomail`);
- Codebeiträge folgen den bestehenden Konventionen für Commit-Meldungen sowie dem Workflow und den Testkriterien dieser Seite;
- Sicherheitslücken bitte nicht öffentlich offenlegen; melden Sie sie privat über die Kontaktwege in Abschnitt 5 der [Übersicht](/de/mail/overview/);
- Lizenzierung von Beiträgen und Lizenzbestimmungen des Projekts siehe [Open Source und Self-Hosting: Rechtliches](/de/mail/open-source/).

## 9. Verwandte Dokumente

| Ressource | Link |
| --- | --- |
| Schritte zum Betrieb einer Bereitstellung | [Bereitstellungsanleitung](/de/mail/deployment/) |
| Technische Topologie und Sicherheitsdesign | [Technische Architektur](/de/mail/architecture/) |
| Leistungsumfang und Supportkanäle | [Leistungsumfang und Support](/de/mail/service-scope/) |
| Projektprofil und Commit-Kette | [Projektübersicht](/de/mail/project/) |
