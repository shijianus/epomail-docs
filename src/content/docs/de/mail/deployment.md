---
title: Bereitstellungsanleitung
description: "Die Bereitstellungsanleitung für EpoCanvas Mail: Voraussetzungen, die Bereitstellung in drei Schritten, Initialisierung und Bootstrapping-Kette, Einspielen der Schlüssel, Konfiguration des E-Mail-Ein- und -Ausgangs, Speicherwahl, Demo-Instanz sowie Upgrades und Rollback, vollständig erläutert."
---

**Aktualisiert: 2. November 2026 | Version: 5.25**

Diese Seite richtet sich an Benutzer und Administratoren, die EpoCanvas Mail selbst bereitstellen möchten, und beschreibt den vollständigen Weg von null bis zur einsatzfähigen Instanz. Nach Abschluss der Bereitstellung liegen sämtliche Daten der Instanz in den eigenen Cloudflare-Ressourcen des Bereitstellers; der Bereitsteller wird damit zum Datenverantwortlichen für seine Benutzer — die rechtliche Stellung ist in [Open Source und Self-Hosting: Rechtliches](/de/mail/open-source/) dargelegt. Für die Registrierung und Nutzung der gehosteten Instanz ([mail.epocanvas.com](https://mail.epocanvas.com)) sind die Schritte dieser Seite nicht erforderlich.

![EpoCanvas Mail Systemarchitektur: Clients laufen über den Cloudflare-Edge ein, Workers tragen API und E-Mail-Verarbeitung, die Daten landen in doppeltem D1, KV und Objektspeicher](/images/mail/de/project-architecture.svg)

*Abb.: Die Betriebstopologie nach Abschluss der Bereitstellung. Kein Server als Single Point of Failure; alle Komponenten laufen innerhalb der nutzungsabhängigen Kontingente von Cloudflare.*

## 1. Voraussetzungen

| Kategorie | Anforderung |
| --- | --- |
| Erforderlich | eine Domain; ein Cloudflare-Konto; Node.js und pnpm als Laufzeitumgebung |
| Ausgehende E-Mails | ein Konto bei einem Zustellungskanal wie Resend oder Mailjet (für Sendungen außerhalb der Instanz erforderlich) |
| Eingehende E-Mails | Cloudflare Email Routing (es genügt, das E-Mail-Routing der Domain zu aktivieren) |
| Optional | eigener Speicher über Backblaze B2 oder S3, eine externe Datenbank bei Turso, ein Telegram-Bot, Turnstile-Bot-Verifizierung, AI-Provider-Schlüssel |

## 2. Bereitstellung in drei Schritten

```bash
git clone https://github.com/shijianus/epomail.git
cd epomail/mail-vue && pnpm install && npm run build
cd ../mail-worker && npx wrangler deploy
```

Der Frontend-Build nimmt die Anmeldemaske in die statischen Assets des Workers auf, sodass eine einzige Bereitstellung die vollständige Website liefert; das Bereitstellungsziel und eigene Domänen werden in `wrangler.toml` konfiguriert.

## 3. Initialisierung und Bootstrapping-Kette

Rufen Sie nach der ersten Bereitstellung `/api/init/<jwt_secret>` auf (ersetzen Sie den Pfadparameter durch den vom Bereitsteller festgelegten Wert des Schlüssels). Dieser Einstiegspunkt erstellt alle Datentabellen, spielt die sechs Standard-Identitätsgruppen (Besucher, Normaler Benutzer, Normaler Benutzer LV.0, Normaler Benutzer LV.1, Moderator, Master) ein und initialisiert das primäre Eigentümerkonto.

- Die Bootstrapping-Kette ist idempotent entworfen: Die Upgrade-Funktionen prüfen die Spalten mit `PRAGMA table_info`, bevor sie `ALTER TABLE` ausführen; wiederholte Aufrufe haben keine Nebenwirkungen;
- nach dem Leeren des lokalen `.wrangler/state` für einen Kaltstart genügt dieser einzige Einstiegspunkt, um das gesamte Einspielen Ende zu Ende abzuschließen; SQL muss niemals von Hand ausgeführt werden.

## 4. Schlüsselsystem

| Schlüssel | Einspielen in der Produktion | Lokale Entwicklung |
| --- | --- | --- |
| `jwt_secret` (Sitzungssignatur) | `npx wrangler secret put jwt_secret` | Datei `.dev.vars` |
| `totp_enc_key` (Verschlüsselung der Zwei-Faktor-Schlüssel) | `npx wrangler secret put totp_enc_key` | Datei `.dev.vars` |

- `.dev.vars` ist über `.gitignore` ausgeschlossen und gelangt nicht ins Repository; die eingecheckte Vorlage wird als `.dev.vars.example` gepflegt;
- schreiben Sie niemals einen Produktionsschlüssel im Klartext in `wrangler.toml` oder eine andere Datei der Versionskontrolle;
- der `jwt_secret` im Initialisierungspfad ist zugleich der Sitzungssignaturschlüssel; beide Werte müssen übereinstimmen.

## 5. E-Mail-Ein- und -Ausgang sowie System-E-Mails

- Eingehend: Aktivieren Sie im Cloudflare-Dashboard das Email Routing der Domain und leiten Sie die Zieladressen an den Worker weiter; eingehende E-Mails werden unmittelbar nach Empfang geparst;
- ausgehend: Nachdem in den Systemeinstellungen ein Zustellungskanal (etwa Resend) konfiguriert wurde, werden E-Mails außerhalb der Instanz über diesen Kanal gesendet; ohne eine solche Konfiguration ist nur die Direktzustellung innerhalb der Instanz möglich;
- System-E-Mails (Willkommens-E-Mails, Sicherheitsbenachrichtigungen, Ankündigungs-E-Mails) werden aus eingebauten Vorlagen in der Sprache des Empfängers gerendert: Schaltflächen in der Willkommens-E-Mail wie „Posteingang öffnen" verwenden relative Pfade innerhalb der Website; ihr Ziel im E-Mail-Client hängt davon ab, wie der Client relative Links behandelt. Sicherheitsbenachrichtigungen verwenden absolute Links der Instanzdomäne. Self-Hoster können Text und Absenderkennung über Vorlagenkonstanten anpassen; die Zustellungssemantik offizieller E-Mails ist unter [Manipulationsschutz und offizielle Spezifikationen](/de/mail/tamper-proof/) beschrieben.

## 6. Speicher- und Datenbankwahl

| Komponente | Standard | Alternative |
| --- | --- | --- |
| Benutzer- und Maildatenbank | Cloudflare D1 mit physischer Isolation durch zwei Datenbanken (Einzeldatenbank-Betrieb zu 100 % abwärtskompatibel) | externe Datenbank wie Turso (in den Systemeinstellungen konfiguriert) |
| Anhänge und Objekte | Cloudflare R2 | eigener Speicherbucket über Backblaze B2 oder S3 |
| Cache | Workers KV | — |

Die technischen Details der Speicherhierarchie und der Kontingentsmessung sind in [Technische Architektur](/de/mail/architecture/) beschrieben; Einzelpersonen können zusätzlich einen eigenen Speicher anbinden, sodass Anhänge direkt in ihrer persönlichen Cloud landen, siehe Abschnitt 5 des [Einstellungsleitfadens](/de/mail/settings/).

## 7. Demo-Instanz

Für lokale Probeläufe lässt sich ein Demonstrationsstack betreiben, der nicht nach außen geöffnet ist: Nach dem Start von `mail-worker` mit `wrangler dev` schreiben ein Seeding-Skript des Repositories Demo-E-Mails und Mehrfachkonten-Zustände. Die Demodaten liegen ausschließlich im lokalen `.wrangler/state` (über `.gitignore` ausgeschlossen) und gelangen weder ins Repository noch in die Produktion; die Produkt-Screenshots dieser Website stammen aus dem realen Betrieb dieser Demo-Instanz.

## 8. Upgrades und Rollback

- Upgrade: mit `git pull` den aktuellen Code abrufen → Frontend neu bauen → `wrangler deploy`; die Datenmigrationen laufen idempotent mit der Bootstrapping-Kette ab und können gefahrlos wiederholt werden;
- Versionsprüfung: Die Konfigurationskarte „Über" in den Systemeinstellungen zeigt die Instanzversion und bietet eine Update-Prüfung;
- Rollback: unmittelbarer Rückschritt über die Bereitstellungshistorie von Cloudflare Workers oder erneute Bereitstellung eines älteren Commits.

## 9. Verwandte Dokumente

| Ressource | Link |
| --- | --- |
| Betriebsformen und Rollenkontingente nach der Initialisierung | [Betriebsmodi](/de/mail/modes/) |
| Entwicklungsumgebung, Testsuiten und Engineering-Standards | [Entwicklungsanleitung](/de/mail/development/) |
| Aufschlüsselung der Konfiguration auf Instanzebene | [Einstellungsleitfaden](/de/mail/settings/) |
| Rechtliche Stellung des Bereitstellers und Lizenzbestimmungen | [Open Source und Self-Hosting: Rechtliches](/de/mail/open-source/) |
| Technische Topologie und Verschlüsselungsarchitektur | [Technische Architektur](/de/mail/architecture/) |
