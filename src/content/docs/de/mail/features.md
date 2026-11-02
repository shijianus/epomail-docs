---
title: EpoCanvas Mail Funktionshandbuch
description: "EpoCanvas Mail Funktionshandbuch – eine vollständige Darstellung: Ordnung im Posteingang, Verfassen und Senden, Suchsyntax, die Regel-Engine für Labels, Extraktion von Verifizierungscodes, Spam-Bekämpfung, Weiterleitung und Push-Benachrichtigungen, KI-Funktionen und die offene Plattform."
---

**Aktualisiert: 2. November 2026 | Version: 5.25**

Diese Seite beschreibt die Implementierung von EpoCanvas Mail nach dieser Änderungsrunde. Vorhandene Screenshots zeigen die Lage der Bedienelemente; sie belegen weder die Bereitstellung der Änderungen im Produktivbetrieb noch die Aktivierung sämtlicher Funktionen. Positionierung, Entwicklungsgeschichte und Bereitstellung erläutert die [Projektübersicht](/de/mail/project/); Verarbeitung und Aufbewahrung von Daten sind unter [Datenverarbeitung und Sicherheit](/de/mail/data-security/) beschrieben.

Die Rechtsdokumente dieser Website liegen in traditionellem Chinesisch (Taiwan) als verbindliche Fassung vor, alle übrigen Sprachfassungen sind Vergleichsübersetzungen; bei Unklarheiten im Wortlaut ist die verbindliche Fassung maßgeblich.

![EpoCanvas Mail Posteingang im Überblick: links der Verfassen-Einstieg, der Ordnerbaum (Primär, Markierte Nachrichten, Zurückgestellt, Gesendet, Entwürfe, Alle E-Mails, Spam, Papierkorb) und die farbigen Labels (Community, Abonnements, Werbung, Arbeit); rechts die Nachrichtenliste mit Absender, Betreff, Auszug, Verifizierungscode-Badge und Verifizierungsmarkierung offizieller Absender (Oberfläche in englischer Sprache)](/images/mail/en/ui/views-guide.png)

*Abb.: Posteingang. Die Liste zeigt direkt die Verifizierungscode-Badges (grüner Rahmen) und die Verifizierungsmarkierung offizieller E-Mails (Häkchen auf blauem Grund); die Ordner- und Label-Zähler werden in Echtzeit synchronisiert.*

<details>
<summary>Visuelle Anleitung zum Posteingang: die vier zuerst genutzten Einstiege</summary>

Die vier beschrifteten Bereiche dieser Posteingangsübersicht entsprechen den vier im Alltag am häufigsten genutzten Einstiegen: eine neue Nachricht schreiben, wichtige E-Mails erneut aufrufen, Zurückgestelltes prüfen und Gesendetes kontrollieren.

1. **Verfassen (Hauptschaltfläche oben in der Seitenleiste)**: Der einzige Einstieg für neue E-Mails in der gesamten Anwendung; ein Klick öffnet das Verfassen-Overlay (keine eigene Route). Auf Mobilgeräten erscheint eine schwebende Schaltfläche unten rechts, zudem unterstützt der Deep-Link `?composeTo=<Adresse>` das Vorbefüllen des Empfängers. Aus jeder Ansicht lässt sich mit einem Klick das Schreiben beginnen.
2. **Markierte Nachrichten (Ordner in der Seitenleiste)**: Alle mit Stern markierten E-Mails werden ordnerübergreifend hier gesammelt: Ein Klick auf das Sternsymbol in einer Listenzeile führt in diese Ansicht; gedacht für E-Mails, die dauerhaft aufbewahrt oder schnell wieder aufgerufen werden sollen; der Zähler in der Seitenleiste spiegelt die Anzahl in Echtzeit.
3. **Zurückgestellt (Ordner in der Seitenleiste)**: Der Ablagebereich für aufgeschobene Nachfragen, unterteilt in die zwei Stufen „Dringend" und „Warten": in den Nachrichtendetails „Zurückstellen" wählen und eine Zeit angeben; zum Fälligkeitszeitpunkt kehrt die Nachricht automatisch an den Anfang des Posteingangs zurück, Wichtiges versinkt nicht mehr am Grund der Liste.
4. **Gesendet (Ordner in der Seitenleiste)**: Das Ablagefach aller von diesem Konto versandten E-Mails; hier lässt sich nachprüfen, welche Nachrichten tatsächlich rausgegangen sind; das Sendevolumen unterliegt dem täglichen Sendekontingent der Kontorolle, interne Nachrichten werden direkt zugestellt, externe über den Zustellungskanal.

</details>

## 1. Posteingang und Organisation

| Fähigkeit | Beschreibung |
| --- | --- |
| E-Mail-Ansichten | acht Ansichten: Primär, Markierte Nachrichten, Zurückgestellt, Gesendet, Entwürfe, Alle E-Mails, Spam, Papierkorb; die Zähler werden in Echtzeit aktualisiert |
| Leselayout | Drei Spalten, Unterhaltungsfäden, Inline-Antworten und Reaktionen. Angezeigte Header bleiben rekonstruiert und belegen keine Transport- oder Speicherverschlüsselung. Zur Empfangswiederaufnahme werden vollständige Original-MIME-Bytes gesondert serverseitig mit AES-256-GCM verschlüsselt im Objektspeicher zwischengespeichert, nicht Ende-zu-Ende; Aufbewahrungsgrenzen stehen in Abschnitt 9. Entfernte Bilder und CSS sind standardmäßig gesperrt; nach einem Risikohinweis können Bilder nur für diese Nachricht geladen werden. Beim Drucken bleibt die Sperre standardmäßig bestehen; die Telegram-Freigabe bietet keine Schaltfläche für externe Ressourcen |
| Ordnungsaktionen | Stern vergeben, Zurückstellen (zu einer selbst gewählten Zeit), Als Spam melden bzw. Als Nicht-Spam melden, in den Papierkorb verschieben, endgültig löschen |
| Verifizierungscode-Badge | von Workers AI extrahierte Codes erscheinen direkt in Liste und Detailansicht (siehe Abschnitt 5) |
| Kennzeichnung offizieller E-Mails | Nachrichten offizieller Absender wie announcement@epocanvas.com tragen eine Verifizierungsmarkierung und einen erläuternden Hinweisbalken (siehe [Offizielle Absendernorm und Manipulationsschutz](/de/mail/tamper-proof/)) |

## 2. Verfassen und Senden

![EpoCanvas Mail Verfassenfenster: der Absender ist auf das aktuelle Postfach festgelegt, Empfänger können aus den Kontakten gewählt werden; unter dem Betrefffeld befindet sich die Rich-Text-Werkzeugleiste (Absatz, Schriftgröße, Fett, Listen, Zitat, Trennlinie, Link, Bild, Tabelle, Emoji, Übersetzung und Quellcode-Modus), unten die Schaltflächen für Anhänge und Senden (Oberfläche in englischer Sprache)](/images/mail/en/ui/compose-guide.png)

*Abb.: Verfassen. Der Rich-Text-Editor bietet 17 Formatierungswerkzeuge; Nachrichten an interne Empfänger werden direkt zugestellt, Nachrichten nach außen laufen über den Zustellungskanal.*

<details>
<summary>Visuelle Anleitung zum Verfassen-Overlay: vier Stationen von der Formatierung bis zum Versand</summary>

Die vier beschrifteten Bereiche des Verfassen-Overlays decken den gesamten Weg einer Nachricht von der Formatierung bis zum Versand ab: Die Werkzeugleiste bestimmt das Aussehen, Empfänger und Betreff bestimmen das Ziel, die Senden-Schaltfläche stößt die Zustellung an.

1. **Rich-Text-Werkzeugleiste (über dem Nachrichtentext)**: 17 Formatierungsfunktionen: Absatz und Schriftgröße, Fett/Kursiv/Unterstrichen/Durchgestrichen, Farben, Ausrichtung, geordnete und ungeordnete Listen, Zitat, Trennlinie, Link, Bild, Tabelle, Emoji, Übersetzung und Quellcode-Modus, mit sofort sichtbarer Wirkung beim Schreiben.
2. **Zeile für die Empfänger**: Auswahl aus den Kontakten oder direkte Eingabe von Adressen; Nachrichten an interne Postfächer werden direkt zugestellt (kein externer Transport), externe Adressen laufen über den vom Betreiber konfigurierten Kanal (Resend/Mailjet und andere).
3. **Betreffzeile**: das Erste, was Empfänger sehen; sie erscheint zusammen mit dem Auszug der ersten Textzeile in der Liste und in Push-Benachrichtigungen. Ein aussagekräftiger Betreff erleichtert später das Auffinden mit dem Operator `subject:`.
4. **Senden-Schaltfläche (unten rechts)**: ein Klick stößt die Zustellung an: intern direkt und binnen Sekunden, extern über den Zustellungskanal; anschließend lässt sich das in der Ansicht „Gesendet" nachprüfen. Die Anhangsfähigkeit wird je nach Rolle freigegeben, die Obergrenze pro Anhang folgt der Instanzeinstellung (Werkseinstellung 25 MB).

</details>

- **Rich-Text-Bearbeitung**: Absätze, Schriftgröße, Fett/Kursiv/Unterstrichen/Durchgestrichen, Farben, Ausrichtung, geordnete und ungeordnete Listen, Zitat, Trennlinie, Link, Bild, Tabelle, Emoji, Übersetzung und Quellcode-Modus;
- **Anhänge**: das Senden und Empfangen von Anhängen wird je nach Kontorolle freigegeben; die Obergrenze für die Größe eines einzelnen Anhangs folgt der Instanzeinstellung (Standard 25 MB; sie gilt nur für Nutzer des öffentlichen Speichers des Betreibers, wer eigenen Speicher mitbringt, unterliegt ihr nicht); das Speicherkontingent wird je nach Rolle festgelegt;
- **Zustellungsumfang**: Nachrichten an interne Postfächer werden direkt zugestellt (kein externer Transport); E-Mails an externe Adressen laufen über den vom Betreiber konfigurierten Kanal (Resend/Mailjet und andere); die beteiligten Dritten sind in der [Liste der Unterauftragsverarbeiter](/de/mail/sub-processors/) aufgeführt;
- **Versandverwaltung**: nachvollziehbar in der Ansicht „Gesendet"; das Sendevolumen unterliegt dem täglichen Sendekontingent der Kontorolle (siehe Abschnitt 6).

## 3. Suchsyntax

![EpoCanvas Mail Suchleiste mit eingegebenem from:github: die Liste zeigt ausschließlich die zutreffenden GitHub-Benachrichtigungen, die Zähler der Seitenleiste bleiben synchron (Oberfläche in englischer Sprache)](/images/mail/en/ui/search-guide.png)

*Abb.: Suche. Feldoperatoren lassen sich frei mit Stichwörtern kombinieren; die Trefferliste aktualisiert sich sofort.*

<details>
<summary>Visuelle Anleitung zur Suche: die zwei entscheidenden Stellen einer Abfrage</summary>

Die zwei beschrifteten Bereiche zeigen eine vollständige Suchabfrage: Wer Operator oder Stichwort in das Suchfeld eingibt, erhält eine sofort gefilterte Trefferliste, in der die Treffer hervorgehoben sind.

1. **Suchfeld in der oberen Leiste**: durchsucht E-Mails auf den E-Mail-Seiten und Konfigurationseinträge auf den Einstellungsseiten; zehn Feldoperatoren wie `from:`/`to:`/`subject:`/`body:` sowie die Schalter `is:`/`global:` stehen bereit; mehrere durch Leerzeichen getrennte Bedingungen werden als UND verknüpft, die Tab-Taste vervollständigt Operatoren.
2. **Trefferliste**: angezeigt werden nur Nachrichten, die sämtliche Bedingungen erfüllen; die Trefferwörter werden mit der nativen Hervorhebung des Browsers markiert (mit `hl:off` lässt sich das abschalten). Ein Klick auf die Zeile öffnet die Details, der Auszug schwenkt automatisch zur Fundstelle und bewahrt den Kontext.

</details>

| Operator | Beispiel | Bedeutung |
| --- | --- | --- |
| `from:` | `from:github` | nach Absender filtern |
| `to:` | `to:boss` | nach Empfänger filtern |
| `subject:` | `subject:Verifizierungscode` | nach Betreff filtern |
| `body:` / `subject_or_body:` | `body:Rechnung` | nach Textkörper bzw. nach Betreff oder Textkörper filtern |
| `larger:` / `smaller:` | `larger:10M` | nach Nachrichtengröße filtern |
| `before:` / `after:` | `after:2026-10-01` | nach Datum filtern |
| `label:` | `label:Arbeit` | nach Label filtern |
| `global:` | `global:Projekt` | postfachübergreifende instanzweite Suche |
| `is:` | `is:sent`, `is:spam`, `is:trash` | nach Status filtern |

Treffer werden über die CSS Highlights API hervorgehoben; die instanzweite Suche und die Suche innerhalb einer Seite bestehen auf zwei Ebenen nebeneinander. Eine vollständige Referenz aller Feldoperatoren, Schalter und Regelbedingungen bietet die [Such- und Regelreferenz](/de/mail/search/).

## 4. Labels und die Regel-Engine für die Klassifizierung

- Standardmäßig sind vier Labels vorinstalliert: **Community** (automatisch anhand gängiger öffentlicher Postfachdomänen einsortiert), **Abonnements**, **Werbung** und **Arbeit**; Farbe und Symbol der Labels lassen sich anpassen;
- Regelbedingungen lassen sich kombinieren (Absenderadresse enthält, Betreff-Stichwörter, Systemeinstellungen und weitere), mit Ausnahmen und Prioritäten; eingehende E-Mails werden beim Empfang automatisch gelabelt, manuelles Labeln ist ebenfalls möglich;
- Globale Steuerungswerkzeuge: Absender-Sperrliste, Sperrlisten für Betreff- und Inhaltsstichwörter, Zulassungslistenmodus, Blockierung leerer Absendernamen, Blockierung nicht an den Empfänger adressierter Nachrichten, Blockierung ausführbarer Anhänge und Zähler für durch harte Blockierung abgewiesene Nachrichten;
- Label-Statistiken (Gesamtzahl, Ungelesene) erscheinen in Echtzeit in der Seitenleiste; die Klassifizierungsergebnisse lassen sich auf der Analyseseite nachprüfen.

## 5. Automatische Extraktion von Verifizierungscodes

![EpoCanvas Mail Nachrichtendetails: der sechsstellige Code aus einer Cloudflare-Verifizierungs-E-Mail erscheint in großer Schrift; Liste und Details tragen beide das grüne Verifizierungscode-Badge (Oberfläche in vereinfachtem Chinesisch)](/images/mail/ui/ui-detail-verification.png)

*Abb.: Nur wenn die nachstehenden globalen Voraussetzungen, Instanzhinweise und die Nutzerwahl sämtlich erfüllt sind, darf die automatische Extraktion den vollständigen Betreff und bis zu 6.000 JavaScript-Zeichen des Textkörpers an Workers AI senden. Der Betreff zählt nicht zum Textlimit. Die Rechtsgrundlage beschreibt Abschnitt 6 der [Datenschutzerklärung](/de/mail/privacy-policy/).*

<details>
<summary>Visuelle Anleitung: die Extraktion von Verifizierungscodes in den Nachrichtendetails</summary>

Die Extraktion des Verifizierungscodes in den Nachrichtendetails: Der sechsstellige Code erscheint in großer Schrift, Liste und Details tragen beide das grüne Badge.

- **Bereich mit großem Code**: der von Workers AI aus dem Betreff und den ersten 6.000 Zeichen des Textkörpers extrahierte Code, in großer Schrift dargestellt, damit sich das Abtippen erleichtert.
- **Grünes Badge**: das grüne Merkmal, das gleichzeitig in der Listenzeile und auf der Detailseite erscheint; es bedeutet „Diese E-Mail enthält einen extrahierten Verifizierungscode", sodass solche Nachrichten direkt in der Liste erkennbar sind, ohne jede einzeln öffnen zu müssen. Das Badge erscheint nur bei erfolgreicher Extraktion; bei einem Nichttreffer oder deaktivierter Extraktion wird es nicht angezeigt. Sein Fehlen bedeutet also nicht, dass die E-Mail sicher ist, sondern nur, dass kein Code zum Abtippen vorhanden ist.
- **Grenzen**: Die automatische Extraktion erfordert gemeinsam das globale `aiCode`, `contentProcessing.verificationCodeEnabled` der Instanz, eine gültige `noticeUrl` und die Nutzereinstellung `privacyPreferences.aiVerificationCode === true`. Letztere ist standardmäßig `false` und kann in den Dateneinstellungen ausgeschaltet werden, um weitere Anfragen zu stoppen. Diese Auswahl ersetzt weder vollständige Information noch Rechtsgrundlage oder Anbieterverträge; siehe Abschnitt 6 der Datenschutzerklärung.

</details>

## 6. Spam-Bekämpfung

- Isolierung und Aufbewahrung: Der tägliche Bereinigungslauf bestimmt die Aufbewahrungsdauer von Spam anhand der Erstellungszeit der E-Mail und verschiebt sie standardmäßig nach 7 Tagen in den Papierkorb. Auch dessen feste 7-Tage-Schwelle wird ab der Erstellungszeit berechnet, sodass die physische Löschung im selben Durchlauf erfolgen kann; es gibt keine zusätzliche garantierte Aufbewahrung von 7 Tagen. Spam- bzw. Nicht-Spam-Meldungen aktualisieren persönliche Vertrauenslisten entsprechend dem jeweiligen Ablauf;
- Begrenzungen nach außen: das tägliche Sendekontingent wird je nach Rolle festgelegt (normale Konten 5, LV.0 8, LV.1 10, Administratoren 100 Nachrichten; für das Master-Konto gilt keine Obergrenze), die Zähler werden täglich zurückgesetzt; gegen Kontingentmissbrauch wird nach der [Richtlinie zur akzeptablen Nutzung](/de/mail/acceptable-use/), Abschnitt 6, vorgegangen;
- Die Verantwortung für den Transport kostenpflichtiger und werblicher Inhalte liegt beim Absender; unaufgefordert versandte Massenwerbe-E-Mails stellen einen verbotenen Akt dar (siehe [Richtlinie zur akzeptablen Nutzung](/de/mail/acceptable-use/), Abschnitt 3).

## 7. Weiterleitung und Push-Benachrichtigungen

- **Persönliche Weiterleitung**: automatisches Weiterleiten an andere Adressen mit CC. `rules` ist nicht verfügbar und versendet nichts; ebenso eine leere `alias`-Liste. `keepCopy` ist zum Erhalt des Originals auf `true` festgelegt und in der Oberfläche nicht abschaltbar. Aktivierte `rules` oder aktive Weiterleitung mit `keepCopy: false` werden beim Speichern abgelehnt; Frontend und Backend müssen gemeinsam aktualisiert werden;
- **Globale Weiterleitung**: Administratoren können systemweite Weiterleitungsregeln konfigurieren, gebunden an den E-Mail-Modus (im verschlüsselten Modus deaktiviert);
- **Telegram-Push**: Persönliches `all` umfasst alle E-Mails; `important` verlangt das exakte Label `重要` oder `important`, einen tatsächlich gespeicherten Stern oder vorhandenen Code. `notifyCodeOnly` ist ein separates Opt-in zum Kopieren eines vorhandenen Codes, standardmäßig `false`, kein Filter und keine neue Extraktion. `includePreview`, ebenfalls `false`, steuert Vorschau und Leseschaltfläche. Der Kompatibilitätsmodus `privacy` sendet nur einen allgemeinen Hinweis ohne Betreff, Absender, Empfänger, Code, Vorschau oder Link; andere persönliche Modi lassen Absender und Empfänger ebenfalls weg. Systemmeldungen nutzen unabhängige Systemfelder. Jeder Versand prüft aktuelle Nutzer-, Postfach- und Nachrichtenstatus sowie die D1-Version, auch ohne Vorschau; ebenso Lese- und Anhangsabrufe. Persönliche Einstellungen ändern oder Dateneinstellungen nutzen widerruft alte Links unabhängig von künftigen Meldungen. Alte Token ohne Scope und OSS v1 erfordern neue Links; Chat-Kopien sind nicht rückholbar. Frontend und Backend müssen gemeinsam aktualisiert werden; Produktivbetrieb ist damit nicht belegt. Siehe den [Leitfaden zu Benachrichtigungen und Weiterleitung](/de/mail/notify/);

## 8. KI-Funktionen

| Fähigkeit | Auslösung | Beschreibung |
| --- | --- | --- |
| Verifizierungscode-Extraktion | Automatisch bei neuen E-Mails nur unter sämtlichen Bedingungen aus Abschnitt 5; für Nutzer standardmäßig aus | Workers-AI-Inferenz; weitere Anfragen lassen sich in den Dateneinstellungen stoppen |
| Volltextübersetzung | Öffnen der Leiste oder Sprachwechsel übermittelt nichts; jede externe Übersetzung erfordert ausdrückliche Bestätigung | Globale KI, `contentProcessing.translationEnabled` und eine gültige Hinweis-URL müssen aktiviert sein. Jede Anfrage enthält `confirmed: true` und eine exakt zur aktuellen Konfiguration passende `noticeUrl`; sonst bleibt die Funktion aus. Passende mitgelieferte offizielle Übersetzungen bleiben lokal. Öffentliche MyMemory/Google-Aufrufe, auch für fehlende Segmente, wurden aus `ai-service` entfernt. `contentProcessing.publicTranslationFallbackEnabled` bleibt `false`, Speichern von `true` wird abgelehnt und die Verwaltungsoption ist als nicht verfügbar gekennzeichnet. Aktuelle Empfänger stehen in der [Liste der Unterauftragsverarbeiter](/de/mail/sub-processors/) |
| Texterkennung in Bildern | Bestätigte Übersetzung mit serverseitigem `contentProcessing.ocrEnabled === true` und ausdrücklichem `enableOcr: true` für diese Anfrage | Andernfalls `false`; reine Textübersetzung ist möglich, alte OCR-Präferenzen werden nicht übernommen. Eingebettete Bilder oder entfernte Bild-URLs können verarbeitet werden; die Dekorationsfilterung bleibt heuristisch |
| AI Hub | durch den Administrator konfiguriert | Anbindung multimodaler Endpunkte auf OpenAI-kompatiblen Protokollen, 0-Token-Latenztest, Modelle werden je nach Rolle autorisiert |

Der Betreiber verwendet E-Mails nicht selbst als Datensatz für das Modelltraining. Aufbewahrung, Training und Weiternutzung durch Dritte sind anhand der tatsächlichen Verträge und Einstellungen zu bestätigen. Eine erforderliche Einwilligung muss freiwillig und ebenso einfach widerrufbar sein, wie sie erteilt wurde. Fehlen tatsächlich ausführbare Wahlmöglichkeiten, ist die betreffende Verarbeitung zu deaktivieren; eine Schaltfläche in der Oberfläche allein belegt keine Erfüllung dieser Anforderungen. Siehe die Abschnitte 6 und 9 der [Datenschutzerklärung](/de/mail/privacy-policy/).

## 9. Offene Plattform und Datensouveränität

- **OAuth 2.0 / OIDC-Zentrum**: Anwendungen lassen sich autorisieren und Berechtigungen widerrufen. Die tatsächlich zurückgegebenen Angaben können E-Mail-Adresse, Namen, Avatar und Rollenfelder umfassen und werden nicht unbedingt auf den angefragten scope reduziert. Ein Widerruf holt bereits übermittelte Daten, ausgestellte ID-Token oder Sitzungen bei Dritten nicht zurück; siehe die Liste der Unterauftragsverarbeiter;
- **Integrationsleitfaden**: Registrierung von Apps in der Verwaltung, Endpunkte und Integrationscode sind unter [Offene Plattform und API-Anbindung](/de/mail/api/) beschrieben;
- **Datenexport**: Die Einstellungen exportieren ausgewählte Profilfelder, Felder nicht als gelöscht markierter E-Mails und `customLabels`, ohne Anhangsdateien, vollständige Kontakte, Regeln, Sicherheits- oder Auditdaten; das Backend wendet den gewählten Zeitraum nicht an. Exporte enthalten keine zwischengespeicherten Original-MIME-Daten; .eml-Dateien bleiben rekonstruiert. Die anwendungsseitige 7-Tage-Frist kann durch Wiederholungsversuche verlängert werden; Erfolg löscht das Objekt nicht sofort, und die geplante Stapelbereinigung kann scheitern und Reste hinterlassen, also keine garantierte TTL. D1-Empfangs-Claims enthalten Metadaten, nicht den Rohinhalt. Die drei Ausblendoptionen öffentlicher Profilstatistiken gelten auch für die API; gelöschte oder deaktivierte Nutzer liefern 404, ohne statische Avatare automatisch physisch zu löschen. Die neue Kontoschließung deaktiviert das Konto, widerruft Zugriffe und vermerkt `manual_review`, keine vollständige Löschung. Siehe [Datenexport und Speicherung](/de/mail/data/);

## 10. Oberfläche und mobile Nutzung

- sechs Oberflächensprachen (vereinfachtes Chinesisch, traditionelles Chinesisch, English, Français, Español, Nederlands), mit vollständig symmetrischen Wörterbüchern in Frontend und Backend;
- Helles und dunkles Design, über 300 Offline-Vektoricons, responsives Layout, PWA und eine Android-App (epomail). Vue nutzt nach Entfernung der externen Google-Fonts-Verweise Systemschriften; React hostet seine Schriften selbst. Avatare, Turnstile und andere externe Ressourcen können weiterhin Anfragen auslösen; dies ist keine Zusage einer Anwendung ohne externe Anfragen.

![EpoCanvas Mail Posteingang der englischen Oberfläche: vollständige Mehrsprachigkeit; die Seitenleiste zeigt Compose, Main, Starred, Snoozed, Sent, Drafts, All Mail, Spam und Trash sowie die Labels Social, Subscriptions, Promotions und Work](/images/mail/ui/ui-inbox-en.png)

*Abb.: Oberfläche in englischer Sprache. Die Oberflächensprache lässt sich in den Einstellungen wechseln; die Symmetrie der Wörterbücher in allen sechs Sprachen wird durch statische Audit-Skripte gesichert.*

<details>
<summary>Visuelle Anleitung: der englische Posteingang und seine Entsprechung zur chinesischen Fassung</summary>

Der Posteingang der englischen Oberfläche: vollständig isomorph zur chinesischen Fassung; die Symmetrie der Wörterbücher in allen sechs Sprachen wird durch statische Audit-Skripte gesichert.

- **Seitenleiste**: Compose, Starred, Snoozed, Sent sowie die Labels Social/Subscriptions/Promotions/Work entsprechen eins zu eins der chinesischen Struktur.
- **Liste**: Position, Schriftgröße und Farbwahl von Absender, Betreff, Auszug und Verifizierungscode-Badge stimmen in jedem Punkt mit der chinesischen Fassung überein: Die Lokalisierung tauscht nur Textbausteine aus, nie das Layout; deshalb lassen sich Screenshots und Anleitungen sprachübergreifend wiederverwenden. Daten, Zahlen und Zähler werden ebenfalls nach der Oberflächensprache formatiert.
- **Umschaltung**: der Ort der Sprachwahl: in den allgemeinen Einstellungen im Bereich „Sprache" eine von sechs Auswahlmöglichkeiten (简体中文, 繁體中文, English, Español, Français, Nederlands); die Änderung wirkt sofort, ohne erneute Anmeldung. Zustellung und Anzeige sind getrennt: Systembenachrichtigungen und Willkommens-E-Mails werden in der jeweils eigenen Spracheinstellung des Empfängers erzeugt und folgen nicht der Oberflächensprache des Absenders.

</details>

![EpoCanvas Mail mobiler Posteingang: responsives Layout bei einer Breite von 375 Pixeln, die Seitenleiste ist als Schublade eingeklappt, die Liste bleibt vollständig lesbar (Oberfläche in vereinfachtem Chinesisch)](/images/mail/ui/ui-inbox-mobile.png)

*Abb.: Mobil. Dieselbe Instanz passt sich Desktop- und Mobilbrowsern an; die Installation ist auch über PWA oder die Android-App möglich.*

<details>
<summary>Visuelle Anleitung: der mobile Posteingang und die Abwägungen seines responsiven Layouts</summary>

Der mobile Posteingang bei einer Breite von 375 Pixeln: Die Seitenleiste ist als Schublade eingeklappt, die Liste bleibt vollständig lesbar.

- **Seitenleiste als Schublade**: bei einer Fensterbreite unter 1025 Pixeln klappt die linke Leiste automatisch in eine Schublade zusammen: Das Hamburger-Symbol ruft sie über einem abgedunkelten Hintergrund auf, die Wahl einer Ansicht schließt sie wieder, ohne den Lesebereich zu verdecken. Desktop und Mobilgeräte nutzen dieselbe Seitenleistenstruktur, daher stimmen Zähler und Labels in beiden Formen vollständig überein.
- **Schwebende Verfassen-Schaltfläche**: das Gegenstück zur Verfassen-Schaltfläche des Desktops: unten rechts fixiert, beim Scrollen dauerhaft sichtbar; ein Tap öffnet das Verfassen im Vollbild. Sie erscheint nur, wenn das Konto eine Sendeberechtigung besitzt; Besucher oder Gruppen mit deaktivierter Sendeberechtigung sehen diese Schaltfläche nicht und gelangen daher nicht in den Verfassen-Ablauf.
- **Liste**: dieselbe virtualisierte Liste wie auf dem Desktop: Lange Postfächer rendern nur die Zeilen im Sichtbereich, die Ladezeit des ersten Bildschirms wächst also nicht mit der Gesamtzahl der E-Mails. Die Touch-Ziele sind für die mobile Erreichbarkeit vergrößert, Informationsdichte und Spaltenaufbau entsprechen jedoch dem Desktop; mobile Screenshots eignen sich daher ebenfalls zum Abgleich der Felder.

</details>

## 11. Verwandte Dokumente

| Ressource | Link |
| --- | --- |
| OAuth-Anwendungsregistrierung und Anbindung der Endpunkte | [OAuth-Anwendungsregistrierung und Anbindung der Endpunkte](/de/mail/api/) |
| Suchoperatoren, Verwaltungssuche und Regelbedingungen | [Such- und Regelreferenz](/de/mail/search/) |
| Oberflächen-Routen und die Lage der Einstellungsbereiche | [Oberflächen- und Routenübersicht](/de/mail/interface/) |
| Betriebsformen: Bereitstellungsformen, E-Mail-Modi und Anmeldearten | [Betriebsmodi](/de/mail/modes/) |
| Einstellungsleitfaden: persönliche Einstellungen und Verwaltungskonsole | [Einstellungsleitfaden](/de/mail/settings/) |
| Projektübersicht: Positionierung und Bereitstellung | [Projektübersicht](/de/mail/project/) |
| Technische Architektur und Sicherheitsdesign | [Technische Architektur](/de/mail/architecture/) |
| Offizielle E-Mails und Prüfung gegen Manipulation | [Offizielle Absendernorm und Manipulationsschutz](/de/mail/tamper-proof/) |
| Datenverarbeitung und Aufbewahrungsfristen | [Datenverarbeitung und Sicherheit](/de/mail/data-security/) |
| Datenschutzerklärung (KI-Hinweise und Rechte) | [Datenschutzerklärung](/de/mail/privacy-policy/) |
