---
title: Offizielle E-Mail-Spezifikation und Manipulationsschutz-Verifizierung
description: Spezifikation und Erkennung der offiziellen System-E-Mails von EpoCanvas Mail, das offizielle Authentifizierungsmerkmal, unveränderliche Zustellung, isoliertes Rendern im Client sowie der Verifizierungsmechanismus des Manipulationsschutzes der Dokumente.
---

**Aktualisiert: 2. November 2026 | Version: 5.25**

Dieses Dokument erläutert, wie offizielle System-E-Mails ausgestellt werden und wie Sie sie erkennen, sowie den Mechanismus des Manipulationsschutzes für die rechtlichen Dokumente dieser Website, damit Sie die Echtheit offizieller Mitteilungen und Dokumente prüfen können. Es ist auf Grundlage der [Übersicht über Datenschutz und Nutzungsbedingungen](/de/mail/overview/) und von [Datenverarbeitung und Sicherheit](/de/mail/data-security/) erlassen.

Die Versionen in Traditionellem Chinesisch (Taiwan) der rechtlichen Dokumente dieser Website sind die verbindlichen Fassungen; die Versionen in anderen Sprachen sind Vergleichsübersetzungen, und bei Unklarheiten im Wortlaut ist die verbindliche Fassung maßgeblich. Die rechtlichen und technischen Dokumente dieser Website folgen der Open-Source-Implementierung des Dienstes und zielen darauf ab, transparente, strenge und nichtkommerzielle Normen für die Community-Kommunikation zu etablieren.

![EpoCanvas Mail Dreischichten-Architektur der Verarbeitung offizieller E-Mails: Die Ausstellungsschicht sperrt die offizielle Absenderadresse und injiziert das Authentifizierungsmerkmal, die Zustellschicht fixiert den Inhalt als unveränderlichen Snapshot mit Rückgriff auf vorbereitete Vorlagen, die Client-Schicht isoliert das Rendern mit Shadow DOM und Inhaltsbereinigung](/images/mail/de/anti-tamper-architecture.svg)

*Abb.: Die drei Schichten der Verarbeitung offizieller E-Mails. Die Ausstellungsschicht sperrt die offizielle Absenderadresse und injiziert das Authentifizierungsmerkmal; die Zustellschicht fixiert den unveränderlichen Snapshot mit Rückgriff auf vorbereitete Vorlagen; die Client-Schicht isoliert das Rendern und trägt die Nachweisverifizierung der Dokumente.*

## 1. Offizielle Absenderidentität und offizielles Authentifizierungsmerkmal

Offizielle Systemmitteilungen und gewöhnliche Benutzer-E-Mails werden wie folgt unterschieden:

1. **Eine einzige offizielle Absenderadresse**: Willkommens-E-Mails und globale Ankündigungen werden vom System über die offizielle Adresse `announcement@epocanvas.com` ausgestellt. Diese Adresse ist im Programm verankert; offizielle E-Mails werden ausschließlich über den privilegierten Systemkanal erzeugt;
2. **Das offizielle Authentifizierungsmerkmal (isOfficial)**: Ist der Absender `announcement@epocanvas.com` oder `admin@epocanvas.com` oder trägt die E-Mail das Label „Offiziell", injiziert das System das offizielle Merkmal; der Lesebereich der Oberfläche zeigt dafür ein offizielles Kennzeichen sowie einen Hinweisbanner an, damit sich die E-Mail von gewöhnlichen E-Mails unterscheiden lässt;
3. **Lebenszyklus**: Willkommens-E-Mails und globale Ankündigungen laufen ab dem Tag der Zustellung nach der konfigurierten Anzahl von Tagen ab (standardmäßig 7) und werden nach Ablauf von einer Routineaufgabe des Systems bereinigt.

## 2. Verzeichnis der offiziellen E-Mails

Die offiziellen System-E-Mails des Dienstes beschränken sich auf die folgenden Typen; alle werden aus Systemvorlagen gerendert:

| Typ | Auslöser | Beschreibung |
| --- | --- | --- |
| Willkommens-E-Mail | Ein neues Postfach wird eingerichtet | eingebaute offizielle Vorlage in sechs Sprachen; läuft nach der konfigurierten Anzahl von Tagen ab (standardmäßig 7) |
| Globale Ankündigung | Ein Administrator veröffentlicht eine Systemankündigung | eingebaute offizielle Vorlage in sechs Sprachen; gleiche Gültigkeitsdauer wie die Willkommens-E-Mail |

Abgesehen von der Tabelle oben versendet das System unter keiner Adresse E-Mails mit Inhalten wie „Kontoanomalie", „Sie haben gewonnen" oder „Verifizierung überfällig". Wer eine E-Mail erhält, die sich als offiziell ausgibt, deren Absenderadresse jedoch nicht übereinstimmt, kann sie über den Meldeweg in Abschnitt 6 melden.

## 3. Unveränderliche Zustellung und vorbereitete Übersetzung

1. **Zustellung als unveränderlicher Snapshot**: Offizielle E-Mails werden beim Senden um ihre Variablen ergänzt und als unveränderlicher Inhalts-Snapshot fixiert; sie werden nicht neu generiert, wenn Empfänger später die Oberflächensprache wechseln. Dies wahrt die objektive Eindeutigkeit offizieller Mitteilungen;
2. **Rückgriff auf vorbereitete Übersetzungen**: Wenn Sie bei einer unveränderten offiziellen E-Mail „Übersetzen" wählen, rendert das System lokal direkt die vorbereitete offizielle Vorlage in der jeweiligen Sprache und überträgt keinen E-Mail-Inhalt an einen AI-Dienst; nur E-Mails, deren Textkörper ein Administrator geändert hat, durchlaufen die AI-Volltextübersetzung (siehe Abschnitt 6 der [Datenschutzerklärung](/de/mail/privacy-policy/)).

## 4. Isoliertes Rendern im Client

Beim Rendern von E-Mail-Inhalten (sowohl offizieller E-Mails als auch externer Eingänge) kommen im Browser die folgenden Isolationsmaßnahmen zum Einsatz:

1. **Shadow-DOM-Isolierung**: Der Textkörper wird innerhalb eines eigenen Shadow DOM gerendert; die globalen Stile und Skripte der Seite beeinflussen den E-Mail-Inhalt nicht, und Stile aus der E-Mail dringen ebenfalls nicht in die Seite aus;
2. **Whitelist-basierte Inhaltsbereinigung**: Der Textkörper wird mit DOMPurify bereinigt; die Tags `<script>`, `<iframe>`, `<object>`, `<embed>`, `<form>` und `<style>` sowie Inline-Ereignisbehandler werden ausnahmslos entfernt, um Skript-Injektion und Oberflächenfälschung zu blockieren.

## 5. Manipulationsschutz-Verifizierung der Dokumente

Diese Website ermöglicht einen SHA-256-Vergleich zwischen Markdown-Quelldateien und einem Integritätsmanifest. Manifest und Seite stammen von derselben Website und bilden keine unabhängige digitale Signatur; beide könnten gemeinsam verändert werden. Ein übereinstimmender Hash bedeutet nur, dass die ausgewählte Datei dem geladenen Manifest entspricht. Er belegt weder den Inhalt der Webseite noch die Identität des Herausgebers, die Echtheit des Dokuments oder die Rechtskonformität.

| Verifizierungsweg | Mechanismus | Beschreibung |
| --- | --- | --- |
| Manifest zur Dateiintegrität | `tamper-proof.json` | Liest bei der Erstellung die Dokumentdateien aus dem Arbeitsverzeichnis und erfasst SHA-256, Byteanzahl, Erstellungszeit, eine Git-HEAD-Referenz und den lokalen Dokumentstatus |
| Panel auf dieser Seite | „Integritätsvergleich der Quelldatei“, nur auf dieser Spezifikationsseite | Berechnet SHA-256 für eine ausgewählte lokale Quelldatei und vergleicht den Wert mit dem geladenen Manifest; es wird keine Datei hochgeladen und kein Hash der gerenderten Webseite berechnet |
| Vergleich über die Befehlszeile | Node.js-Befehl im Panel | Wandelt nur CRLF in LF um und berechnet anschließend SHA-256 in UTF-8; `sha256sum` oder OpenSSL direkt auf CRLF-Bytes verwendet eine andere Eingabe |
| Manifestquelle | `docs.epocanvas.com/epomail/tamper-proof.json` | HTTPS schützt die Verbindung; ein Manifest derselben Website ist für sich genommen keine Signatur oder Veröffentlichungszertifizierung, die über einen unabhängigen vertrauenswürdigen Kanal geprüft wurde |

Das Manifest verwendet die Dateien im Arbeitsverzeichnis zum Erstellungszeitpunkt, statt automatisch die committeten Dateien aus HEAD zu lesen. Enthalten die Dokumente nicht committete oder nicht erfasste Inhalte, können ihre Hashes nicht dieser committeten HEAD-Version zugeordnet werden; auch ein nicht erfasster Status belegt keine Übereinstimmung. Das HEAD-Datum ist ein Commit-Datum des Repositorys, nicht das Veröffentlichungsdatum dieser Seite.

:::tip[Eine Datei vergleichen]
Wählen Sie im Panel „Integritätsvergleich der Quelldatei“ auf dieser Seite die lokale Markdown-Quelldatei unter dem angezeigten Pfad aus und klicken Sie auf „Datei berechnen und vergleichen“. Vergleiche über die Befehlszeile müssen dieselbe Normalisierung der Zeilenenden verwenden. Eine Abweichung kann durch Version, Inhalt oder Manifest entstehen. Ein nicht verfügbares Manifest oder ein Lese- oder Berechnungsfehler ist kein erfolgreicher Vergleich.
:::

## 6. Verantwortungsgrenzen und Meldewege

1. **Gehostete Instanz**: Die Ausstellung offizieller E-Mails, die Absenderidentität und die Dokumentnachweise werden vom offiziellen Betreiberteam gepflegt;
2. **Selbst gehostete Instanzen**: Self-Hoster konfigurieren Zustellungskanäle und Schlüssel selbst und sollten ihre Instanz gemäß [Datenverarbeitung und Sicherheit](/de/mail/data-security/) absichern; für die offizielle Kommunikation einer selbst gehosteten Instanz ist der Betreiber dieser Instanz der verantwortliche Rechtsträger;
3. **Meldewege**: Wenn Sie eine E-Mail entdecken, die sich unter dem offiziellen Namen ausgibt, Verifizierungsanomalien des Nachweises oder Sicherheitslücken bemerken, wenden Sie sich bitte an:
   - Meldeweg für offizielle Sendungen und Sicherheit: `announcement@epocanvas.com`
   - Meldeweg für Privatsphäre und Datenschutz: `privacy@epocanvas.com`
