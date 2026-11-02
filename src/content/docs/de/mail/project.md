---
title: "EpoCanvas Mail: Projektübersicht"
description: "Vollständige Einführung in das Projekt EpoCanvas Mail: Positionierung, Kernfunktionen, technische Architektur, Sicherheitsdesign, Entwicklungsgeschichte und die vollständige Commit-Kette."
---

**Erster Commit: 21. Juli 2026 | Aktuelle Version: v1.1.0 | Lizenz: MIT**

**Aktualisiert: 2. November 2026 | Version: 5.25**

EpoCanvas Mail ist ein Open-Source-E-Mail-Dienst, der auf dem Edge-Netzwerk von Cloudflare läuft. Mit nur einer Domain und einem Cloudflare-Konto richten Sie ein eigenes Postfach ein, das Senden und Empfangen, Anhänge und den Zugriff von mehreren Geräten unterstützt. Das Projekt wird über die gehostete Instanz [mail.epocanvas.com](https://mail.epocanvas.com) betrieben, gibt den gesamten Quellcode für die Selbstbereitstellung frei und bietet eine begleitende Android-App (epomail). Diese Seite beschreibt die Positionierung, die Funktionen, die technische Architektur, das Sicherheitsdesign und die Entwicklungsgeschichte des Projekts; die rechtlichen Regelungen zu Dienst und Datenschutz stehen in der [Datenschutz- und Nutzungsbedingungen-Übersicht](/de/mail/overview/).

Die Rechtsdokumente dieser Website in traditionellem Chinesisch (Taiwan) sind die maßgeblichen Versionen; Übersetzungen in andere Sprachen dienen nur zum Vergleich, und im Zweifelsfall gilt die maßgebliche Version. Die Rechts- und technischen Dokumente dieser Website folgen der Open-Source-Implementierung des Dienstes und sollen transparente und strenge, nichtkommerzielle Kommunikationsnormen für die Community etablieren.

![EpoCanvas-Mail-Systemarchitektur: Die Clientschicht (Web-App, Android-App, OAuth-Drittanbieter-Apps) bindet über den Cloudflare-Edge an; Workers tragen die API, das Parsen eingehender E-Mails und die KI-Funktionen, der ausgehende Versand läuft über Resend und Telegram; die Daten liegen in zwei D1-Datenbanken, in KV und im Objektspeicher](/images/mail/de/project-architecture.svg)

*Abb.: Systemarchitektur. Die Clients binden über den Edge an, eingehende E-Mails werden von Email Routing geparst, ausgehende über die konfigurierten Kanäle zugestellt; Daten können außerdem an externe Speicher, Identitäts-, Benachrichtigungs- oder KI-Dienste übermittelt werden, siehe die [Liste der externen Verarbeiter](/de/mail/sub-processors/).*

## 1. Positionierung des Projekts

Ein selbst betriebenes Mailsystem erfordert dauerhaft gewartete Server, feste IP-Adressen und Anti-Spam-Management; kommerzielle Postfachdienste konzentrieren die Daten dagegen beim Anbieter, und Nutzer können deren Verarbeitung kaum überprüfen. EpoCanvas Mail geht einen dritten Weg: Der gesamte Dienst passt in die nutzungsbasierten Kontingente von Cloudflare (Workers-Rechenleistung, D1-Datenbanken, KV-Cache, R2-Objektspeicher) und wird serverlos ausgeliefert; die festen Serverkosten betragen null, und der Quellcode ist vollständig offen.

- Kein Wartungsaufwand: Nach Abschluss der Bereitstellung sind weder Betriebssystem noch Zertifikate zu pflegen; Skalierung und weltweite Beschleunigung übernimmt Cloudflare;
- Datenhoheit: Wer bereitstellt, wählt die Ressourcen der Instanz und die externen Dienste; der Code verarbeitet Anmelde-Sicherheitssignale und speichert Aufzeichnungen. Ein eigener Kanal, der Nutzungs-Telemetrie an den Upstream-Autor zurückmeldet, wurde nicht gefunden; das bedeutet nicht, dass es keine Protokolle oder Anfragen an Dritte gibt; siehe die [Datenschutzerklärung](/de/mail/privacy-policy/);
- Zwei Wege: direkte Registrierung auf der gehosteten Instanz oder der Quellcode zur Bereitstellung auf der eigenen Domain. Die Abgrenzung des Verantwortlichen in beiden Formen steht in Abschnitt 2 der [Übersicht](/de/mail/overview/).

## 2. Überblick über die Kernfunktionen

Die Funktionen des Projekts umfassen Senden und Empfangen, Organisation, Suche, Automatisierung und eine offene Plattform; Erläuterungen zu jeder Funktion mit Screenshots der realen Oberfläche stehen im [Funktionsleitfaden](/de/mail/features/). Kernpunkte: eingehende E-Mails über Cloudflare Email Routing und ausgehende über mehrere Kanäle; ein Posteingang mit acht Ansichten, Konversationsthreads und dreispaltiger Anzeige; erweiterte Suchsyntax und eine Regel-Engine für die Klassifizierung; Verifizierungscode-Extraktion mit Workers AI und Volltextübersetzung mit erhaltenem Layout; ein OAuth 2.0/OIDC-Authentifizierungszentrum und persönliche API-Token; Datenexport (JSON und .eml).

Die Oberflächenstruktur des Projekts und alle Routen werden im [Oberflächen- und Routenüberblick](/de/mail/interface/) einzeln vorgestellt; die vollständige Referenz zu Suchoperatoren und der Regel-Engine für die Klassifizierung steht in der [Such- und Regelreferenz](/de/mail/search/).

Die Dokumentationswebsite bietet sieben Sprachen; die Produktoberfläche unterstützt derzeit sechs, jedoch kein Deutsch. Deutsche Dokumente verwenden deshalb für lokalisierte Anleitungen Screenshots der englischen Oberfläche aus `/images/mail/en/ui/`. Vorhandene sprachübergreifend genutzte Screenshots unter `/images/mail/ui/` behalten ihre ursprüngliche Oberflächensprache, die in der Bildunterschrift oder im Alternativtext angegeben ist. Fließtext, Bildunterschriften und Diagramme bleiben deutsch. Diese dokumentierten Ausnahmen für Screenshots bedeuten nicht, dass eine deutsche Produktoberfläche verfügbar ist.

Die chinesische Zeichenfolge `重要` ist ein wörtliches Produktlabel (Literal) mit der Bedeutung „wichtig“, kein unübersetzter Fließtext. Auch die Suchaliase `$发件人`, `$用户`, `$收件人` und `$主题` müssen unverändert bleiben; sie entsprechen in dieser Reihenfolge `$sender`, `$user`, `$to` und `$subject`. Die Sprachnamen der Oberfläche `简体中文` (vereinfachtes Chinesisch) und `繁體中文` (traditionelles Chinesisch) behalten ihre ursprüngliche Schreibweise. Konfigurationsschlüssel, Routen, Dateinamen und andere technische Konstanten ändern sich nicht mit der Dokumentationssprache.

## 3. Überblick über die technische Architektur

Der Server läuft auf Cloudflare Workers (zustandslosen V8-Isolate-Sandboxen); die Daten liegen in zwei physisch getrennten D1-Datenbanken (Nutzerdatenbank und E-Mail-Datenbank, mit 100 % Abwärtskompatibilität der Ein-Datenbank-Bereitstellung), in KV und im Objektspeicher (vierstufige Kette: eigener S3, konfigurierter S3, R2, KV); eingehende E-Mails laufen über Email Routing, ausgehende über Resend/Mailjet und ähnliche Kanäle, KI-Funktionen werden von Workers AI getragen. Die vollständige Topologie, das Verschlüsselungsschema, die Rollenkontingente und der E-Mail-Lebenszyklus sind unter [Technische Architektur](/de/mail/architecture/) beschrieben.

## 4. Geeignet für wen – und für wen nicht

In folgenden Fällen eignet sich dieses Projekt:

- Sie besitzen bereits eine Domain und ein Cloudflare-Konto und möchten ein Postfach für Einzelpersonen oder kleine Teams ohne feste Serverkosten betreiben;
- Sie möchten prüfbaren Quellcode nutzen und Speicherressourcen sowie Drittanbieter-Dienste selbst auswählen (Selbst-Hosting);
- Sie sind Einzelnutzer und benötigen die Isolation mehrerer Postfächer, automatische Klassifizierung und sofortige Verifizierungscode-Extraktion für Registrierungsmails.

In folgenden Fällen sollten Sie Alternativen prüfen:

- Unternehmensszenarien, die zugesicherte Verfügbarkeit, formellen Support oder langfristige Archivierung verlangen: Für diesen Dienst wird keine Service-Level-Vereinbarung zugesichert; der Papierkorb wird nach einer Erstellungszeit der E-Mail von mehr als 7 Tagen geleert, ohne dass garantiert wird, dass Nachrichten nach dem Verschieben noch 7 Tage aufbewahrt werden; siehe die [Datenschutzerklärung](/de/mail/privacy-policy/);
- Wer überwiegend ausgehendes Massenmarketing betreibt: Die Richtlinie zur akzeptablen Nutzung untersagt unaufgeforderte kommerzielle Massenmails (siehe Abschnitt 3 der [Richtlinie zur akzeptablen Nutzung](/de/mail/acceptable-use/));
- Wer Ende-zu-Ende-Verschlüsselung benötigt: Die Verschlüsselung dieses Dienstes ist eine serverseitige Speicherverschlüsselung und umfasst keine Anhänge (siehe Abschnitt 1 von [Datenverarbeitung und Sicherheitsmaßnahmen](/de/mail/data-security/));
- Wer Cloudflare-Ressourcen sowie die Konfiguration von Domain und Schlüsseln nicht pflegen möchte: Die Selbstbereitstellung erfordert weiterhin das Einspielen der Schlüssel und die Initialisierung (siehe Abschnitt 8).

## 5. Überblick über das Sicherheitsdesign

Neue Passwörter verwenden standardmäßig gesalzenes PBKDF2-HMAC-SHA256 (210.000 Iterationen, konfigurierbar); ältere Hashes werden bei der Anmeldung angehoben; aktivierte TOTP-Geheimnisse werden mit AES-256-GCM verschlüsselt. Weitere Entwurfsmerkmale sind signierte E-Mail-Links, XSS-Filterung, die Prüfung ausgehender Adressen und Snapshots offizieller E-Mails. Die 43 Assertionen vom 22. September 2026 sind historische Verifizierungsnachweise, keine Sicherheitszertifizierung der aktuellen Version oder der Produktionsinstanz; der Umfang der Implementierung steht in der [Technischen Architektur](/de/mail/architecture/), Grenzen für Zugangsdaten und Aufbewahrung in [Datenverarbeitung und Sicherheitsmaßnahmen](/de/mail/data-security/).

## 6. Entwicklungsgeschichte und Commit-Kette

Das Projekt wird seit dem ersten Commit (`2bbb582`) am 21. Juli 2026 fortlaufend entwickelt. Zum Stand vom 5. Oktober 2026 umfasst das Hauptrepository mehr als 660 Commits; diese Website (EpomailDocs, ein eigenes git-Repository) kommt mit mehr als 50 Commits hinzu (die folgenden Ketten sind auf Meilensteingranularität; dazwischen und danach liegende Commits finden sich auf GitHub). Die Tabelle listet Meilensteine und Anker-Commits (kurze Hashes) nach Phase auf:

| Phase | Zeitraum | Geliefert | Anker-Commits |
| --- | --- | --- | --- |
| 1. Projektgrundlage | 2026-07-21 → 07-23 | Initialisierung des Repositorys; Vue-3-Oberfläche, erste Phase (globale Farbpalette, Schriften, helle/dunkle Seitenleiste); Leseansicht im Outlook-Stil mit drei Spalten | `2bbb582` `29f9896` `a531341` |
| 2. Marke und Anmeldeoberfläche | 2026-08-05 → 08-09 | einheitliches transparentes Logo und Favicon; Standard-Dunkelthema und Marken-Ladeanimation; React-Anmeldeoberfläche mit Warp-Animation | `6572695` `e3e57c6` |
| 3. Prototyp und Regel-Engine | 2026-08-12 → 08-17 | Prototyp auf die gesamte App angewendet; Labelsystem mit dem Backend synchronisiert; Später/Spam/Papierkorb; Regel-Engine für die Klassifizierung (Standardvorlagen, Heuristiken, harte Blockierung über Sperrlisten); erweiterte Suchsyntax; Analyse-Dashboard zur Klassifizierung; Sperrung bei Brute-Force | `8664f84` `803b0e0` `0b7e37d` `643edea` `79f200f` |
| 4. Editor und Willkommensmail | 2026-08-28 → 08-30 | website-weites Willkommensmail-Modal für alle Konten; TinyMCE-Alloy-Symbolleiste mit 17 Markdown-Werkzeugen neu aufgebaut | `9f6ece8` `59bfe60` |
| 5. Offene Plattform und Speicherverwaltung | 2026-09-03 → 09-06 | OAuth 2.0/OIDC-Autorisierungszentrum; physische Trennung von zwei D1-Datenbanken; eigener B2/S3-Speicher mit Kontingentmessung; Verwaltungszentrum für Speicher und Kerndatenbanken; sechs Kern-Administratorengruppen mit Rechten und Besucher-Sandbox | `9fd02b7` `2cc2801` `b1a6a0e` `6c5bda2` `f09c963` |
| 6. KI-Funktionssystem | 2026-09-06 → 09-13 | Posteingangsarchitektur nach dem Vorbild von Gmail und KI-Volltextübersetzung; mehr als 300 Offline-Vektor-Icons; KI-Hub mit Multi-Modell-Pool und 0-Token-Geschwindigkeitstest; gleichzeitige Übersetzung mehrerer Abschnitte und Bild-OCR-Untertitel | `deceaaa` `5676837` `d103cd4` `8a0dc3e` |
| 7. Rechteverschärfung und Sicherheitskorrekturen | 2026-09-09 → 09-11 | GitHub-Release v1.1.0; Behebung einer domänenübergreifenden Zero-Day-Privilegienerweiterung; Admin-Anmeldung über mehrere Domains; Panels für Drittanbieter-Apps und Datenfreigabe | `7558fc8` `5855db1` `3234d69` |
| 8. Sechssprachige Internationalisierung | 2026-09-14 → 09-17 | sechs Sprachen im gesamten Projekt mit leak-freiem Wörterbuch; Zustellung der Mailvorlagen in der Sprache der Empfänger; vollständiger Push auf GitHub; Produktivbetrieb auf Cloudflare aufgenommen | `aa1955e` `42c33f1` `25985b1` |
| 9. Zwei-Faktor-Verifizierung und Härtung | 2026-09-18 → 09-22 | TOTP/Passkey-Anmeldung; neue Bootstrapping-Kette für die Bereitstellung und Schlüsselisolation; Batches von UI-Audit-Korrekturen; umfassende Sicherheitshärtung | `b025153` `5cfdaf9` `7ee3a66` |
| 10. Erlebnis auf Gmail-Niveau | 2026-09-25 → 09-27 | mehrstufiges Layout der Mail-Detailansicht; Inline-Antwort und Emoji-Reaktionen; Verfeinerung der Konversationsthreads; Gmail-artiges Routing und Deep Links; Schutz gegen unzulässiges Routing über kryptografische Hashes | `a8d841a` `4af2985` `4b371a8` |
| 11. Rechtsdokumenten-Website | 2026-09-27 → 09-29 | sechssprachiger Rechtssatz dieser Website mit sieben Dokumenten; Ergänzungen nach dem Google-Richtlinienmuster; Website auf Basis von Astro 5 + Starlight; eigenes git-Repository | `2bed02b` `617cccf` |
| 12. Finalisierung und Launch-Audit | 2026-09-29 → 09-30 | Integration der Projektübersichtsseite und der offiziellen Datenschutzerklärung; vollständige Neufassung v5.0 ohne Gesetzartikel-Zitate; Kalibrierung technischer Fakten und Ergänzungen zur Verarbeiterliste vor dem Launch | `7ad5ebc` `05c222c` `5197f50` |
| 13. Fortgeführter Dokumentbetrieb | 2026-10-01 → 10-04 | lokale Demo-Instanz und Seeding-Werkzeug; v5.8 visuelle und Einstiegsverfeinerung; v5.9 Erweiterung Funktionsleitfaden/technische Architektur (×6 Sprachen) mit echten Produkt-Screenshots; v5.9 unabhängiges Audit mit vollständiger Prüfung aller Aussagen gegen den Quellcode | `26f6c3b` `8a60539` |
| 14. Audit-Governance und Erweiterung der Übersicht | 2026-10-04 → 10-05 | v5.10 unabhängige Audit-Governance (vollständige quellennahe Korrekturen, en in die Prüfungen der Struktursymmetrie aufgenommen); v5.11 neue Seiten Betriebsmodi/Einstellungsleitfaden (×6 Sprachen, echte Produkt-Screenshots); Neubau der Audit-Konsole (RBAC und D1-Persistenz) und OAuth-Feature-Flag | `08448fb` `ff4e93f` `596e7c1` |

Es folgt die vollständige Meilenstein-Ankerkette des Hauptrepositorys mit 40-stelligen, auf GitHub überprüfbaren Hashes. In beiden Ketten werden chinesische Commit-Betreffzeilen auf Deutsch zusammengefasst; ursprünglich englische Betreffzeilen bleiben erhalten. Es handelt sich um historische Zusammenfassungen, nicht um Beschreibungen der aktuellen Version. Die Hashes führen zu den ursprünglichen Commits und ihrem genauen Wortlaut.

```text
2bbb582e19b8a1aca410767a5b5c52ae5d7f4423  2026-07-21  init: initial commit before UI/UX updates
29f98962399ec85c894fbc02ff6ef69d7d496222  2026-07-23  feat(ui): implement 3-column split view layout for mail reading
65726950939d72d82dbaccd974ff1a75ffe1b226  2026-08-06  feat: default dark theme & apply brand loading animation
e3e57c69a6154bc13218be27a6537711e0a21527  2026-08-09  Enhance: Upgrade collision warning to a high-tech sci-fi HUD
8664f84cce7d2fdb038322f8bf66c5189f93f33d  2026-08-12  Phase 1: Refactor UI/UX colors and layout to match prototype style
803b0e05d2d55bbcbb3b0f4d4279524c31524c21  2026-08-13  feat: implement advanced search syntax and highlighting
0b7e37d953e2a25ff74dcf313272632fb60ba9c8  2026-08-13  fix(labels): ensureDefaultRules injection + system rule lock UI + real heuristic engine
643edea268fb8dc4f67b4bfe17db49025f6c7662  2026-08-15  feat(ui): phase 3 - classification management analytics dashboard
79f200fcb1a401e08c4d89ff94b8c3a65b51aef0  2026-08-16  feat: enhance login UX with toast and 12h anti-brute force lockout
9fd02b75dcaa31e1c12c2424b3b9c52b19eab203  2026-09-03  feat(oauth): OAuth-Plattform nur für Administratoren und getrennte App-Verwaltung einführen; diese Funktionen aus persönlichen Profilen entfernen
2cc2801ccec3d9ee07d5b1688f2af652d7dc25a2  2026-09-03  feat(db): introduce dual-db physical isolation architecture with 100% single-db backward compatibility
b1a6a0ebe02a5bb196bf5da601a182f022ab1664  2026-09-03  feat(storage): implement Backblaze B2 and S3 object storage with pure WebCrypto SigV4 presigner
6c5bda2b794fef6f9467a5d880ae2fede77824cd  2026-09-04  feat(db): Verwaltungszentrum für Speicher und Kerndatenbanken in den Systemeinstellungen einführen und die Konfiguration externer Datenbanken neu aufbauen
f09c963752e731d3e308893fa6ed09d1212713e8  2026-09-06  feat(role): Berechtigungen der sechs Kernverwaltungsgruppen präzisieren; Besucher-Sandbox, Blog-Level-Verknüpfung und UI-Architekturübersicht ergänzen
deceaaa5b3e7589c63c2240df97b020bab5c2c14  2026-09-06  feat(content): Posteingang nach Gmail-Vorbild umsetzen; to-me-Detailkarte, obere Aktionsleiste, KI-Volltextübersetzung und API-Schlüsselintegration im Admin-Panel verbessern
56768378f4d83b9eb70e65376930cfa16db16209  2026-09-07  feat(icons): systemweit über 300 Icons durch Offline-Vektoren ersetzen; ohne Netzwerkanfragen laden und alle Icon-Zustände abdecken
d103cd4edd4fbedbeaec669fc068bed2c5648dfa  2026-09-08  feat(ai-hub): automated dropdown model detection, multi-model pool role hierarchy, and real prompt live test response
aa1955eeb1b564f11a370892c48ea94f7c21015f  2026-09-14  feat: traditionelles Chinesisch, Französisch, Spanisch und Niederländisch projektweit ergänzen; mehrsprachige Willkommensmails und Ankündigungsmails für alle Nutzer hinzufügen
25985b1d0ca1c71e59222a3ecb3a9c53532834ef  2026-09-17  fix(prod): Produktivbetrieb auf Cloudflare starten; visuelle Abläufe mit Playwright auf echten Geräten prüfen; Vue-i18n-Escaping und Seitenpanel-Fehler beheben
b0251537e0a56b7d3b80f794ce79ff839871f945  2026-09-18  feat(auth): Anmeldung mit Zwei-Faktor-Verifizierung (TOTP/Passkey), fließenden Animationen und verbesserten Interaktionen neu aufbauen
5cfdaf910bd628d183f0b6d102134d1042f2e7df  2026-09-19  fix(core): drei Verifizierungsfehler beheben, die Startkette neuer Bereitstellungen überarbeiten und die Geheimnisverwaltung isolieren
7ee3a66d5fb17c44983ff2b7f35534d82c815524  2026-09-22  fix(security): Sicherheit härten und Schwachstellen schließen: P0/P1/P2-Schutz, SSRF-Blockierung, dreifacher XSS-Schutz, Maskierung von Sitzungsdaten und abgestimmte Berechtigungen
a8d841a13c3a0aa31b72c1d82580f2e9c7a1e561  2026-09-25  feat(ui): gestufte Mail-Detailansicht und schwebende Schnellantwort an Gmail angleichen
4b371a834458cb2be6ab5766ec15e99a91bc2022  2026-09-27  feat(routing): Mehrkonten-Isolation an Gmail angleichen und kryptografisches Hash-Routing gegen unbefugte Zugriffe einsetzen
617cccf855a0bd9a0a46d37deaceacc4a8b0ddde  2026-09-29  docs(repo): EpomailDocs als eigenes git-Repository abtrennen und die Nachverfolgung im übergeordneten Repository beenden
4cf8014279669dbc67ff54ceb47239044c943ac8  2026-10-03  docs(checklist): visuelle und Einstiegsverbesserungen von EpomailDocs v5.8 archivieren (EpomailDocs a1c1e89: Icons auf Navigationskarten, zentrierte Tabellen und Accept-Language-Aushandlung)
8a60539d318eef618b84aa0db4e8a88672c4940d  2026-10-04  docs(checklist): Dokumenterweiterung EpomailDocs v5.9 archivieren (EpomailDocs beb956a: Funktions- und Architekturleitfäden in sechs Sprachen, echte Screenshots, korrigierte Inhaltszentrierung und lokale Demo-Instanz)
26f6c3b9750b2bad1c60f35a9a08b4db11dc1a6b  2026-10-04  feat(demo): lokale Demo mit dem Mailgenerator seed-demo.py befüllen und die lokale Konfiguration wrangler-demo.toml ignorieren
33a5b0ba6abb2af208b713a81d057d9e36e17893  2026-10-04  docs(audit): EpomailDocs v5.9 unabhängig prüfen; sämtliche Einführungs- und Rechtstexte mit dem Quellcode abgleichen und auf Vollständigkeit prüfen
21af692803770c94ac2cfbdec5c32624e45754ce  2026-10-03  feat(sys-setting): Feature-Flag ENABLE_OAUTH_INTEGRATION einführen, standardmäßig deaktiviert, um Einstellungen für externe Authentifizierung auszublenden
73a2561d3e91867a2b9e442bebe8366a639b5914  2026-10-04  feat(audit): refactor audit console to user-list standards with RBAC and D1 persistence
596e7c1f4e4d022f3573917cfd56f72b65ae0136  2026-10-05  docs(checklist): Erweiterung EpomailDocs v5.11 archivieren (EpomailDocs ff4e93f+c597fca: Betriebsmodi- und Einstellungsleitfäden in sechs Sprachen, neun echte Screenshots, Version 5.11 auf der gesamten Website und bestandene lokale Sichtprüfungen)
```

Die Commit-Kette dieser Website (eigenes EpomailDocs-Repository):

```text
fd57a71ab71d99ff61b83a9a7c4f4b191dd96b99  2026-09-28  feat: initial commit for epomail-docs with open-source and legal compliance documentation
5208abc054626e305a5caac3e7320219706e3785  2026-09-29  docs(legal): Rechtsdokumenten-Website v4.1 für Taiwan fertigstellen (sechs Sprachen, sieben Dokumente, 42 Seiten)
5fb18df6a9c317bf064b477d143a53eb0d54bf07  2026-09-29  docs(visual)+chore: Layout von aup-ladder.svg ohne Überlappungen neu aufbauen; visuelle Abnahme dokumentieren und Arbeiten archivieren
270cfd12c365b406661b5f40219740547d2b7d99  2026-09-29  fix(site): Weiterleitungsseite am Wurzelpfad ergänzen; 404 auf / durch Übersichtseinstiege in sechs Sprachen ersetzen
7ad5ebc1bc3b2846d0932c872ef7666b0d07d6bb  2026-09-29  docs(project): Projektübersicht in sechs Sprachen mit Positionierung, Funktionen, Architektur, Sicherheit und vollständiger Commit-Kette ergänzen
5cc2b2f12d00f195d0e84cea34911f1b3390ce6b  2026-09-28  feat(legal): integrate official privacy policy and technical baseline spec
d7beca35a2db489e75ff865435f95f20e68fd27f  2026-09-28  docs(audit): enrich architecture & legal compliance per subagent audits
d3d1d309888f92e7c30c217c13a4f5b02781202b  2026-09-29  docs(repo): alten entfernten Dokumentationszweig als Vorfahren beibehalten und die lokale sechssprachige Rechtswebsite als maßgeblichen Dateibaum verwenden
05c222c4ff2531dc17b29994c0806ade1ed99ed0  2026-09-29  docs(legal): v5.0 entfernt Artikelnummern aus Verweisen und synchronisiert sieben Dokumente samt SVG-Abbildungen in sechs Sprachen
52412e393613a8b2763d133a95f6a3205e8cb6ce  2026-09-30  docs(legal): unabhängige Auditkorrekturen v5.1; Blog-Level-Verknüpfung in der Verarbeiterliste offenlegen, zeitbezogene Angaben korrigieren und Werkzeuglücken schließen
5197f5092861b7db24f1d428991c7db057612ae3  2026-09-30  docs(legal): Auditkorrekturen vor dem Start; Fakten zur unveränderlichen Zustellung von Systemmails berichtigen sowie voreingestellte KI-Übersetzungsvorlagen und robots.txt dokumentieren
79094ac9d2686c1014c25824b25318c6206c9270  2026-09-30  docs(legal): v5.2 ergänzt die Klausel zur maßgeblichen Sprachfassung websiteweit und erweitert die Projektübersicht um Nutzungsgrenzen und häufige Fragen
90c06edcdd29a90a991bd56ba480c031cf85a9cf  2026-09-30  docs(legal): v5.3 behebt Befunde der unabhängigen Nachprüfung und legt den Veröffentlichungsweg docs.epocanvas.com/epomail fest
6da475e6a7bd1f892e00165031ad94d5bacdb872  2026-10-01  docs(legal): v5.4 ergänzt fehlende Abbildungen, Begriffsdefinitionen und Aufbewahrungsfristen und präzisiert Verweise
3223e7d6181a6b82192f225eaded3ed8ddab0a56  2026-10-01  feat(legal): integrate official mail specifications and complete anti-tampering verification engine
e6eb758709b6702b3b51fddb1057bee94380a3e7  2026-10-03  docs(legal): v5.7 entfernt unbelegte Aussagen und harmonisiert sechs Sprachen; Fakten am Quellcode prüfen, neun en-Dokumente strukturgleich neu übersetzen und flache Diagramme neu zeichnen
c5de61f5e1330726fe31257588ee21fdec178d8e  2026-10-03  feat(figures): zwölf Diagramme vollständig in sechs Sprachen lokalisieren, sodass jedes Dokument Abbildungen in seiner Sprache verwendet
fcc1d10f9616b905e1c6b89ccb4e6f8ac953c476  2026-10-03  docs(legal): v5.8 behebt alle P1/P2-Befunde, ergänzt acht Abschnitte, vereinheitlicht eine h1 je Seite und veröffentlicht die Website erstmals öffentlich
a1c1e89c4e8b85579346304df3d5b37d197b68db  2026-10-03  feat(ui)+feat(infra): v5.8 verbessert Gestaltung und Einstiege mit Dokument-Icons auf Navigationskarten, zentrierten Tabellen und Accept-Language-Aushandlung
beb956a1b50b5c4b94d3bbc9b9feba8ef774417a  2026-10-03  feat(docs): v5.9 trennt und erweitert Funktions- und Architekturleitfäden in sechs Sprachen, mit echten Produkt-Screenshots und zentrierter Inhaltsspalte
e34ce0270c42dc7b50f0add6f0a47310046cf37e  2026-10-04  chore: sync manifest commit hash for beb956a
68a014ce25cca575ec348f68db746419fd19e2ce  2026-10-04  chore: sync manifest commit hash for 08448fb
08448fb63b011699b129e69266e7150a2174a49e  2026-10-04  feat(docs): v5.10 behebt drei P1-Befunde anhand des Quellcodes sowie alle P2-Befunde des unabhängigen Audits; die englische Fassung (en) in die Struktursymmetrieprüfung aufnehmen
ff4e93f7bb9da6ee1a4729cb2d826b1993fe5167  2026-10-05  feat(docs): v5.11 erweitert die Projekteinführung um Betriebsmodi- und Einstellungsleitfäden in sechs Sprachen und nimmt alle echten Screenshots ins Repository auf
c597fca8b14005a6fc7a3482d683b9a2937c55d8  2026-10-05  chore: sync manifest commit hash for ff4e93f
```

Die obige Tabelle und die Ankerketten sind auf Meilensteingranularität; alle routinemäßigen Korrekturen, Tests und Dokumentations-Commits zwischen den Phasen liegen im git-Verlauf und lassen sich über den [GitHub-Commit-Verlauf](https://github.com/shijianus/epomail/commits) einzeln nachverfolgen. Das Hauptrepository führt außerdem `CHECKLIST.log` (Protokoll der Aufgabenausführung) und `REPORTS.md` (spezielle Auditberichte), die den Commits eins zu eins entsprechen.

## 7. Qualitätssicherung

- Das Verzeichnis `tests/` enthält über hundert automatisierte Test-, Audit- und Inspektionsskripte, die Playwright-Browserregressionen über den vollen Stack, End-to-End-Assertionen gegen das öffentliche Produktivnetz und repositoryweite statische Scans abdecken;
- Historische quantifizierte Verifizierungsnachweise: Sicherheitshärtung 43/43 Assertionen, öffentliches Routing 32/32, sechssprachige Anmeldung 62/62, sensorische Inspektion 33/33, 369 Vergleiche zur Produktionsintegrität; die Ergebnisse beziehen sich auf die damals geprüften Versionen und Umgebungen und belegen keine gleichwertige Verifizierung der aktuellen Version oder der Produktionsinstanz;
- Das dreiteilige mehrsprachige statische Audit-Paket: `i18n-symmetry` (absolut symmetrische Schlüsselmengen in sechs Sprachen), `i18n-audit` (keine fehlenden Literalverweise), `i18n-hardcoded` (kein unverpackter hart codierter nutzersichtbarer Text);
- Die Testregeln verlangen, dass Testfälle Testdaten über `finally` bereinigen; tatsächliche Rückstände müssen anhand der Ausführungsprotokolle geprüft werden. Die Regel belegt nicht, dass Datenbank und KV stets frei von Testdaten sind;
- Die Entwicklung folgt einer fünfstufigen SOP (Umfangsklärung, spezifikationsgerechte Implementierung, Vollstack-Tests, disziplinierter Commit, Bericht am Threadanfang); die Ergebnisse werden auf `CHECKLIST.log` und `REPORTS.md` verteilt.

## 8. Bezug und Bereitstellung

| Weg | Beschreibung |
| --- | --- |
| Gehostete Instanz | Registrierung und Nutzung unter [mail.epocanvas.com](https://mail.epocanvas.com) |
| Selbstbereitstellung | Bereitstellung auf der eigenen Domain und dem eigenen Cloudflare-Konto mit den drei Schritten unten |
| Quellcode | [github.com/shijianus/epomail](https://github.com/shijianus/epomail) (MIT-Lizenz) |
| Mobile App | die Android-App epomail |

Minimale Schritte für die Selbstbereitstellung:

```bash
git clone https://github.com/shijianus/epomail.git
cd epomail/mail-vue && pnpm install && npm run build
cd ../mail-worker && npx wrangler deploy
```

Rufen Sie nach der ersten Bereitstellung `/api/init/<jwt_secret>` auf, um die Datenbank zu initialisieren und die sechs Standardrollen einzuspielen; Produktionsgeheimnisse werden stets über `npx wrangler secret put` eingespielt, für die lokale Entwicklung dient `.dev.vars` (nicht ins Repository aufgenommen).

Vollständige Voraussetzungen, die Bootstrapping-Kette zur Initialisierung und das Einspielen der Schlüssel für die Selbstbereitstellung stehen im [Bereitstellungsleitfaden](/de/mail/deployment/); Beteiligung, Audit und Entwicklung folgen dem [Entwicklungsleitfaden](/de/mail/development/).
## 9. Häufige Fragen

**Kostet die Nutzung dieses Dienstes etwas?**
Die Software ist unter der MIT-Lizenz frei verfügbar; die Kosten der Selbstbereitstellung entsprechen dem eigenen Cloudflare-Verbrauch des Bereitstellenden. Die gehostete Instanz bietet derzeit keine kostenpflichtigen Funktionen; Postfachanzahl, Sendevolumen und Speicherkontingente richten sich nach der Kontorolle.

**Kann die Administration meine E-Mails sehen?**
Der sichtbare Umfang der Admin-Oberfläche hängt vom E-Mail-Modus ab: Der Modus „Alle" erlaubt das Ansehen aller E-Mails, der Modus „Datenschutz" beschränkt ihn auf Spam-, gelöschte und herrenlose E-Mails, und der Modus „Verschlüsselt" verhindert, dass diese Oberfläche Nutzer-E-Mails liest. Der Server behält weiterhin die Entschlüsselungsfähigkeit; es handelt sich nicht um Ende-zu-Ende-Verschlüsselung; siehe die [Datenschutzerklärung](/de/mail/privacy-policy/) und [Datenverarbeitung und Sicherheitsmaßnahmen](/de/mail/data-security/).

**Können gelöschte E-Mails wiederhergestellt werden?**
Der Papierkorb-Job räumt E-Mails mit einer Erstellungszeit von über 7 Tagen weg; der Zeitpunkt des Verschiebens setzt die Frist nicht zurück. Der Export enthält nur die ausgewählten Daten und Felder ungelöschter E-Mails, keine Anhangsdateien oder das vollständige ursprüngliche MIME; speichern Sie benötigte Anhänge vor dem Löschen separat und prüfen Sie den Exportinhalt; siehe die [Datenschutzerklärung](/de/mail/privacy-policy/).

**Was erfordert die Selbstbereitstellung?**
Erforderlich sind eine Domain, ein Cloudflare-Konto und die Konfiguration der entsprechenden Dienste; die Bereitstellungsschritte stehen in Abschnitt 8. Externe Pfade für Zustellung, Speicherung, Identität, Benachrichtigung und KI können Daten verarbeiten; es ist nicht gewährleistet, dass alle Daten bei Cloudflare verbleiben; siehe die [Liste der externen Verarbeiter](/de/mail/sub-processors/).

## 10. Verwandte Dokumente

| Ressource | Link |
| --- | --- |
| Kürzeste Einstiegssequenzen und Sende-/Empfangsprüfung für beide Wege | [Schnellstart](/de/mail/quickstart/) |
| Route und Elemente jeder Oberfläche | [Oberflächen- und Routenübersicht](/de/mail/interface/) |
| Suchoperatoren und Bedingungen der Klassifizierungsregeln | [Such- und Regelreferenz](/de/mail/search/) |
| Vollständige Schritte für die Selbstbereitstellung | [Bereitstellungsleitfaden](/de/mail/deployment/) |
| Entwicklungsumgebung und Engineering-Ablauf | [Entwicklungsleitfaden](/de/mail/development/) |
| Leistungen der gehosteten Instanz und ihre Supportkanäle | [Leistungsumfang und Support](/de/mail/service-scope/) |
| Open-Source-Lizenz und rechtliche Stellung der Selbstbereitstellung | [Open Source und Rechtliches zur Selbstbereitstellung](/de/mail/open-source/) |
| Betriebsmodi: Bereitstellungsformen, E-Mail-Modi und Anmeldung | [Betriebsmodi](/de/mail/modes/) |
| Einstellungsleitfaden: persönliche Einstellungen und Admin-Konsole | [Einstellungsleitfaden](/de/mail/settings/) |
| Datenschutz- und Nutzungsbedingungen-Übersicht | [Übersicht](/de/mail/overview/) |
| Datenschutzerklärung | [Datenschutzerklärung](/de/mail/privacy-policy/) |
| Nutzungsbedingungen | [Nutzungsbedingungen](/de/mail/terms-of-service/) |
| Richtlinie zur akzeptablen Nutzung | [Richtlinie zur akzeptablen Nutzung](/de/mail/acceptable-use/) |
| Datenverarbeitung und Sicherheitsmaßnahmen | [Datenverarbeitung und Sicherheitsmaßnahmen](/de/mail/data-security/) |
| Liste der externen Verarbeiter | [Liste der externen Verarbeiter](/de/mail/sub-processors/) |
| Begriffsdefinitionen | [Begriffsdefinitionen](/de/mail/key-terms/) |
