---
title: Einführung in die EpoCanvas Mail Dokumentationswebsite
description: "Einführung in die EpoCanvas Mail Dokumentationswebsite: Positionierung der Site, Dokumentationsarchitektur, Lesefahrten, mehrsprachige Struktur und vollständige Navigation."
---

**Website-Start: 28. September 2026 | Aktuelle Version: v5.25 | Website-Adresse: docs.epocanvas.com/epomail**

**Aktualisiert: 2. November 2026 | Version: 5.25**

Die EpoCanvas Mail Dokumentationswebsite (im Folgenden „diese Website“) ist das offizielle Dokumentationszentrum des Open-Source-E-Mail-Dienstes EpoCanvas Mail; sie umfasst rechtliche Bedingungen, technische Spezifikationen, Anleitungen und Entwicklerdokumentation. Die Website basiert auf Astro 5 + Starlight und ist in sechs Sprachen vollständig symmetrisch aufgebaut (vereinfachtes Chinesisch, traditionelles Chinesisch, English, Français, Español, Nederlands); sämtliche Dokumente wurden wörtlich gegen die Code-Implementierung geprüft und bieten Nutzern gehosteter Instanzen, Selbsthostenden und Audit-Beteiligten eine einzige verlässliche Dokumentationsquelle. Diese Seite erläutert die Positionierung der Website, ihre Dokumentationsarchitektur, die Lesefahrten und die Navigationseinstiege.

Die Rechtsdokumente dieser Website sind in der traditionellen chinesischen (Taiwan) Fassung die maßgebliche Version; die übrigen Sprachfassungen sind Vergleichsübersetzungen. Im Zweifelsfall ist die maßgebliche Version ausschlaggebend.

![EpoCanvas Mail Dokumentationsarchitektur: Die Rechtsebene (Datenschutzrichtlinie, Nutzungsbedingungen, Richtlinie zur akzeptablen Nutzung und Dokumente zur Datenverwaltung) und die technische Ebene (Projektübersicht, Funktionsanleitung, technische Architektur, Betriebsmodi und Anleitungen) bilden gemeinsam ein vollständiges Dokumentationssystem, das insgesamt auf Open-Source-Code und transparenten Spezifikationen fußt](/images/mail/de/legal-architecture.svg)

*Abb.: Dokumentationsarchitektur. Die Rechtsebene definiert Datenverarbeitung und Dienstgrenzen; die technische Ebene erläutert Funktionen, Architektur und Nutzung; beide Ebenen folgen der Open-Source-Code-Implementierung.*

## 1. Positionierung der Website

Diese Website ist die einzige offizielle Dokumentation des Open-Source-Projekts EpoCanvas Mail und erfüllt drei Funktionen:

- **Rechtliche Hinweise**: Datenschutzrichtlinie, Nutzungsbedingungen, Richtlinie zur akzeptablen Nutzung und Spezifikationen zur Datenverarbeitung erfüllen die gesetzlichen Hinweispflichten gegenüber Nutzern gehosteter Instanzen; Selbsthostende können die Dokumente dieser Website als Ausgangsvorlage für ihre eigenen Hinweise und Bedingungen verwenden;
- **Technische Spezifikation**: technische Architektur, Sicherheitsdesign, Entwicklungsgeschichte und vollständige Commit-Historie ermöglichen Audit-Beteiligten, die Übereinstimmung von Code-Implementierung und dokumentierten Zusagen zu prüfen;
- **Anleitungen**: Funktionsbeschreibungen, Oberflächenführung, Suchsyntax, Bereitstellungsschritte und Entwicklungsworkflow helfen Nutzern, Betreibern und Entwicklern, den Dienst zu verstehen und zu nutzen.

Die Dokumente dieser Website folgen der tatsächlichen Implementierung des Open-Source-Codes; Erfindungen sind unzulässig. Gesetzeszitate richten sich nach der Prüfwitelist in `doc/legal-reference.md`; technische Fakten (Verschlüsselungssemantik, Aufbewahrungsfristen, Liste der Drittanbieter) werden laufend durch automatisierte Tests und Audit-Skripte verifiziert.

## 2. Dokumentationsarchitektur

Diese Website gliedert ihre Dokumente thematisch in drei Gruppen, die sich gegenseitig referenzieren und gemeinsam ein vollständiges Regelwerk bilden:

### 2.1 Produkt und Übersicht

| Dokument | Inhalt |
| --- | --- |
| [Projektübersicht](/de/mail/project/) | Positionierung, Kernfunktionen, Überblick über die technische Architektur, Entwicklungsgeschichte und vollständige Commit-Historie |
| [Schnellstart](/de/mail/quickstart/) | Kürzeste Handlungsfolgen für den gehosteten und den selbst gehosteten Weg inklusive Sende- und Empfangsprüfung |
| [Leistungsumfang und Support](/de/mail/service-scope/) | Dienstgrenzen, Haftungsausschluss und Kontaktwege der gehosteten Instanz |
| [Oberflächen- und Routenübersicht](/de/mail/interface/) | Vollständige Oberflächenführung und Routenzuordnung für Posteingang, Verfassen, Einstellungen und Verwaltungskonsole |

### 2.2 Anleitungen

| Dokument | Inhalt |
| --- | --- |
| [Funktionsanleitung](/de/mail/features/) | Posteingang-Organisation, Verfassen und Senden, Suchsyntax, Label-Regeln, Verifizierungscode-Extraktion, Weiterleitung/Push und KI-Funktionen |
| [Betriebsmodi](/de/mail/modes/) | Bereitstellungsformen, drei Datenschutzstufen des E-Mail-Modus, Identitätsgruppen und Kontingente, Anmeldung und Zwei-Schritte-Verifizierung |
| [Einstellungsanleitung](/de/mail/settings/) | Fünf Bereiche der persönlichen Einstellungen (Profildaten, Allgemein, Sicherheit, Daten, Labels) und neun Bereiche der Verwaltungskonsole |
| [Such- und Regelreferenz](/de/mail/search/) | Vollständige Referenz für Suchoperatoren, administrative Suche und Bedingungen der Kategorienregeln |
| [Postfach-Oberfläche und Nachrichtendetails](/de/mail/mailbox/) | Posteingangsansichten, Dreispalten-Layout, Konversationsthreads und die Detailseite jeder E-Mail im Einzelnen |
| [Labels und Kategorienverwaltung](/de/mail/labels/) | Labels-System, Kategorien-Regel-Engine, Schwarz-/Weißlisten und globale Governance-Werkzeuge |
| [Personenbezogene Daten und allgemeine Einstellungen](/de/mail/preferences/) | Profilkarte, Adresskarte, Oberflächensprache, Design-Hintergrundbild und Lesepräferenzen |
| [Datenexport und Speicher](/de/mail/data/) | JSON-Vollkopie-Export, .eml-Einzeldownload und Verwaltung des Speicherverbrauchs |
| [Anleitung zur Kontosicherheit](/de/mail/security/) | Benutzername und Passwort, Zwei-Schritte-Verifizierungszentrum (TOTP, Wiederherstellungscodes, Passkeys) und vertrauenswürdige Geräte |
| [Anleitung zu Benachrichtigungen und Weiterleitung](/de/mail/notify/) | Konfiguration und Verhalten von persönlicher Weiterleitung, Telegram-Push und globalen Weiterleitungsregeln |
| [Analyseseite](/de/mail/analysis/) | Dashboards zur Datenvisualisierung, Nutzerwachstum und Statistiken zur E-Mail-Kategorisierung |
| [Nutzerliste](/de/mail/users/) | Kontoverwaltung, Rollengruppen, Sendekontingente sowie Sperr- und Wiederherstellungsoperationen |
| [E-Mail-Überprüfung über den Gesamtbestand](/de/mail/review/) | Administrative E-Mail-Recherche, Spam-Governance und durch den E-Mail-Modus begrenzter Sichtbarkeitsbereich |
| [Berechtigungssteuerung](/de/mail/roles/) | Sechs Identitätsgruppen, Speicherkontingente, Sendelimits und KI-Freigabemodell |
| [Registrierungsschlüssel](/de/mail/regkeys/) | Erzeugung von Einladungscodes, Nutzungsanzahl-Limits und Ablaufverwaltung |
| [Erläuterung der Systemeinstellungskarten](/de/mail/system/) | Einzelerläuterung der neun Konfigurationskarten: Website-Einstellungen, Personalisierung, Speicher, Push und offene Plattform |
| [Offene Plattform und API-Zugang](/de/mail/api/) | OAuth 2.0 / OIDC-Authentifizierungszentrum, App-Registrierung, Endpunktzugang und persönliche API-Token |
| [Kategorienverwaltung](/de/mail/category/) | Globale Kategorienregeln, Absender-Sperrliste und Betreff-Schlüsselwort-Sperrliste |
| [Betriebsberichte](/de/mail/audit/) | Audit-Warntickets, Risikobeurteilung, Einsprüche gegen Sperrungen und an den E-Mail-Modus gekoppelte Entfernung von Zeitstempeln |

### 2.3 Technik und Vertrauen

| Dokument | Inhalt |
| --- | --- |
| [Technische Architektur](/de/mail/architecture/) | Cloudflare-Edge-Bereitstellungstopologie, Isolation zweier Datenbanken, Verschlüsselungssystem der drei Betriebsmodi, Anhang-Speicherkette und Sicherheitsdesign der Anwendung |
| [Manipulationsschutz und offizielle Spezifikationen](/de/mail/tamper-proof/) | Spezifikation und Erkennung offizieller E-Mails, offizielles Authentifizierungsmerkmal, unveränderliche Zustellung und Dokumenten-Integritätsprüfung |

### 2.4 Selbst-Hosting und Entwicklung

| Dokument | Inhalt |
| --- | --- |
| [Bereitstellungsanleitung](/de/mail/deployment/) | Vollständige Schritte zum Selbst-Hosting, Voraussetzungen, Initialisierungskette und Injektion der Schlüssel |
| [Entwicklungsanleitung](/de/mail/development/) | Entwicklungsumgebung, Engineering-Prozess, Test- und Audit-Skripte, Commit-Konventionen und Mitwirkung |

### 2.5 Datenschutz und Datenverwaltung

| Dokument | Inhalt |
| --- | --- |
| [Übersicht](/de/mail/overview/) | Plattformidentität, Abgrenzung der Datenverarbeitungsrollen, Dokumentationsarchitektur, Rangfolge der Dokumente und Kontaktstellen |
| [Datenschutzrichtlinie](/de/mail/privacy-policy/) | Erhebung, Verarbeitung und Nutzung personenbezogener Daten, Art der Verarbeitung, Rechte der betroffenen Personen und internationale Übermittlungen |
| [Datenverarbeitung und Sicherheitsmaßnahmen](/de/mail/data-security/) | Datenlebenszyklus, Verarbeitungsmatrix, Sicherheitsmaßnahmen, Vorfallreaktion und Mitwirkung bei Prüfungen |
| [Liste der Drittanbieter](/de/mail/sub-processors/) | Auftragsverarbeiter, Empfänger von Datenweitergaben, betroffene Daten und Sicherungsmechanismen für internationale Übermittlungen |

### 2.6 Bedingungen und Compliance

| Dokument | Inhalt |
| --- | --- |
| [Nutzungsbedingungen](/de/mail/terms-of-service/) | Vertragliche Nutzungsbedingungen, Rechte und Pflichten, Haftungsbeschränkung, anwendbares Recht und Gerichtsstand |
| [Richtlinie zur akzeptablen Nutzung](/de/mail/acceptable-use/) | Grenzen des Nutzungsverhaltens, Liste verbotener Handlungen sowie Maßnahmen und Vollstreckungsverfahren des Betreibers |
| [Open Source und rechtliche Aspekte des Selbst-Hostings](/de/mail/open-source/) | Anwendung der MIT-Lizenz, Verantwortung der selbst Hostenden als Datenverantwortliche und Haftungsausschluss |
| [Begriffsdefinitionen](/de/mail/key-terms/) | Definitionen der technischen und rechtlichen Begriffe in den Rechtsdokumenten dieser Website |

## 3. Lesefahrten

Die Website ist entlang zweier sich ergänzender Routen aufgebaut:

**Route 1: Das Projekt verstehen, die Bereitstellung vorbereiten oder die Nutzung lernen**

[Projektübersicht](/de/mail/project/) → [Schnellstart](/de/mail/quickstart/) → [Funktionsanleitung](/de/mail/features/) → [Betriebsmodi](/de/mail/modes/) → [Oberflächen- und Routenübersicht](/de/mail/interface/) → [Such- und Regelreferenz](/de/mail/search/) → [Einstellungsanleitung](/de/mail/settings/) → [Bereitstellungsanleitung](/de/mail/deployment/) → [Entwicklungsanleitung](/de/mail/development/)

**Route 2: Die datenschutzrechtlichen Vereinbarungen und Dienstgrenzen verstehen**

[Übersicht](/de/mail/overview/) → [Datenschutzrichtlinie](/de/mail/privacy-policy/) → [Nutzungsbedingungen](/de/mail/terms-of-service/) → [Richtlinie zur akzeptablen Nutzung](/de/mail/acceptable-use/) → [Datenverarbeitung und Sicherheitsmaßnahmen](/de/mail/data-security/) → [Liste der Drittanbieter](/de/mail/sub-processors/)

Beide Routen treffen sich bei [Funktionsanleitung](/de/mail/features/) und [Betriebsmodi](/de/mail/modes/).

## 4. Mehrsprachige Struktur

Die Website bietet sechs Sprachen mit 1:1-symmetrischer Struktur:

| Sprache | Kennzeichnung | Beschreibung |
| --- | --- | --- |
| Vereinfachtes Chinesisch | `zh` | Standardsprache der Website, belegt den URL-Wurzelpfad (`/epomail/mail/...`) |
| Traditionelles Chinesisch (Taiwan) | `zh-tw` | Maßgebliche Version der Rechtsdokumente; die übrigen Sprachen sind Vergleichsübersetzungen (`/epomail/zh-tw/mail/...`) |
| English | `en` | Vergleichsübersetzung (`/epomail/en/mail/...`) |
| Français | `fr` | Vergleichsübersetzung (`/epomail/fr/mail/...`) |
| Español | `es` | Vergleichsübersetzung (`/epomail/es/mail/...`) |
| Nederlands | `nl` | Vergleichsübersetzung (`/epomail/nl/mail/...`) |

Die Startseite der Website (`/` und `/epomail/`) verhandelt die Sprache über Cloudflare Pages Functions anhand des `Accept-Language`-Headers des Browsers und leitet automatisch auf die [Übersicht](/de/mail/overview/)-Seite der jeweiligen Sprache weiter. Der alte Wurzelpfad `/mail/...` leitet auf den kanonischen Pfad mit Sprachverhandlung weiter.

Dokumentanzahl, Überschriftenhierarchie, Tabellenzeilen und -spalten sowie Bild- und Hinweisboxanzahl müssen in jeder Sprache streng übereinstimmen; dies prüft `scripts/check-structure.py` automatisch. Versionsnummern und Gültigkeitsdaten sind sitewide einheitlich.

## 5. Qualitätssicherung der Dokumentation

Die Qualität und Konsistenz der Dokumente dieser Website wird durch folgende Mechanismen gesichert:

- **Prüfung anhand der Code-Implementierung**: Technische Fakten (Verschlüsselungssemantik, Aufbewahrungsfristen, Liste der Drittanbieter, Rollenkontingente) folgen dem Quellcode des epomail-Repositorys; Erfindungen sind unzulässig;
- **Whitelist für Gesetzeszitate**: `doc/legal-reference.md` ist die einzige sitewide Grundlage für Gesetzeszitate; nur die darin verifizierten Normnummern dürfen zitiert werden;
- **Prüfung der strukturellen Symmetrie**: `scripts/check-structure.py` verifiziert, dass Überschriften, Tabellen, Bilder und Hinweisboxen in den sechs Sprachen streng übereinstimmen;
- **Ankerintegrität**: `scripts/validate-anchors.cjs` durchsucht sitewide Anker und Bildreferenzen und stellt null tote Links sicher;
- **Fehlerfreier Build**: `pnpm build` muss ohne Fehler durchlaufen; jede Warnung oder jeder Fehler blockiert die Veröffentlichung;
- **Manipulationsschutz-Prüfung**: Offizielle Dokumente werden mit HMAC-SHA256 signiert und über unveränderliche Snapshots ausgeliefert, siehe [Manipulationsschutz und offizielle Spezifikationen](/de/mail/tamper-proof/).

## 6. Technischer Stack der Website

| Komponente | Umsetzung |
| --- | --- |
| Statische Generierung | Astro 5.0 + Starlight 0.32 |
| Routing-Verhandlung | Cloudflare Pages Functions (geteilte Sprachverhandlungslogik in `functions/_lib.js`) |
| Bereitstellung | Cloudflare Pages (`npx wrangler pages deploy dist --project-name epomail-docs`) |
| Build-Artefakte | Zweigleisige Veröffentlichung: `dist/*`-Wurzelpfad und `dist/epomail/*`-Spiegelpfad (`scripts/post-build.mjs` führt aus) |
| Stilsystem | Benutzerdefiniertes CSS (`src/styles/custom.css`, 627 Zeilen), abgestimmt auf die Indigo-Tech-Farbgebung von EpoCanvasDocs |
| Icons und Assets | 300+ Offline-Vektoricons, helles und dunkles Theme, lokalisierte Illustrationen in sechs Sprachen (`/images/mail/{zh-tw,en,es,fr,nl}/*.svg`) |

## 7. Weiterführende Ressourcen

| Ressource | Link |
| --- | --- |
| Gehostete Instanz | [mail.epocanvas.com](https://mail.epocanvas.com) |
| Quellcode | [github.com/shijianus/epomail](https://github.com/shijianus/epomail) |
| Quellcode der Dokumentationswebsite | Eigenständiges Git-Repository EpomailDocs (Build-Artefakt dieser Website) |
| Datenschutz-Kontakt | privacy@epocanvas.com |
| Kontakt im Produkt | In-App-Nachricht oder admin@epocanvas.com |
| Issues des Open-Source-Projekts | GitHub-Repository Issues |
