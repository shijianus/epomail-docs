---
title: Konfigurationskarten der Systemeinstellungen im Detail
description: Die Konfigurationskarten der Systemeinstellungen von EpoCanvas Mail im Detail – elf Karten, eine nach der anderen erklärt, von den Website-Einstellungen über Personalisierung und Drittanbieter-Authentifizierung bis zu Speicherung, E-Mail-Push, AI-Engine, Benutzerdatensteuerung, Turnstile, Website-Ankündigungen, Auditbericht-Richtlinie und der Karte Über.
---

**Aktualisiert: 2. November 2026 | Version: 5.25**

Die Systemeinstellungsseite (`#manage/admin/system`, Berechtigungsschlüssel `setting:query` / `setting:set`) organisiert die gesamte Konfiguration auf Instanzebene in Konfigurationskarten. Diese Seite erklärt sie Karte für Karte; die Kartennamen entsprechen der Anwendungsoberfläche.

![Die elf Konfigurationskarten der Systemeinstellungen](/images/mail/en/ui/system-guide.png)

*Abb.: Die elf Konfigurationskarten der Systemeinstellungen*

<details>
<summary>Visuelle Anleitung zu den Systemeinstellungen: die fünf am häufigsten genutzten Konfigurationskarten</summary>

Die fünf Kern-Konfigurationskarten der Systemeinstellungsseite (insgesamt elf): Die Konfiguration auf Instanzebene ist nach Themen in Karten gegliedert, die Abbildung beschriftet die fünf am häufigsten genutzten.

1. **Karte Website-Einstellungen**: Die zentralen Schalter der Instanz: Offene Registrierung, öffentliche Profile, E-Mail-Modus (drei Stufen), Zwei-Faktor-Verifizierung, verborgene Anmeldedomain, Registrierungscodes, zusätzliche Postfächer, Schnellwechsel zwischen Mehrfachkonten und Regeln für Postfach-Präfixe.
2. **Karte Personalisierung**: Das Aushängeschild der Instanz: Der Websitetitel bestimmt den Markennamen auf der Anmeldeseite und im Browser-Tab, die Popup-Hinweise überschreiben die instanzweiten Hinweistexte, und die dynamische/statische Oberfläche entscheidet, ob die Anmeldeseite Animationen abspielt; der statische Modus eignet sich besser für leistungsschwache Geräte und Beweis-Screenshots. Änderungen wirken sofort für alle Benutzer.
3. **Karte Speicherung und Kerndatenbank**: Objektspeicher (B2/S3, standardmäßig Rückfall auf R2/KV), Architektur der Kern- und Drittanbieterdatenbanken, Obergrenze pro Anhang und kaskadierende Löschung, KV-Cache-Gesundheitsprüfung.
4. **Karte AI-Engine**: Wahl des AI-Providers (eigener OpenAI-kompatibler Endpunkt oder Cloudflare Workers AI), Aktivierungsschalter, Tageskontingente und Ratenbegrenzungen, Modellfreigaben je Identitätsgruppe.
5. **Karte Benutzerdatensteuerung**: Die Fähigkeitsschalter für normale Benutzer auf der Seite „Profildaten": Telegram-Push, E-Mail-Weiterleitung, Unterstützung der Drittanbieter-API, eigener Speicher und das Standardspeicherkontingent; der Datenexport bleibt jederzeit offen und unterliegt nicht dieser Karte.

</details>

## 1. Website-Einstellungen

Offene Registrierung, öffentliche Profile, E-Mail-Modus (drei Stufen, siehe Abschnitt 2 der [Betriebsmodi](/de/mail/modes/)), Zwei-Faktor-Verifizierung, verborgene Anmeldedomain, Registrierungscodes, zusätzliche Postfächer, Schnellwechsel zwischen Mehrfachkonten und Regeln für Postfach-Präfixe, allesamt Schalter auf Instanzebene.

## 2. Personalisierung

Websitetitel, Popup-Hinweise und die dynamische/statische Oberfläche steuern den Markenauftritt von Anmeldeseite und Benutzeroberfläche.

## 3. Drittanbieter-Authentifizierung und Single Sign-On

Der Hauptschalter für die Schnellanmeldung über Drittanbieter und die Anmeldedaten der einzelnen Provider (GitHub, Google, Microsoft, Apple, eigenes SSO); die Dreizustands-Anzeigeregel der Anmeldeseiten-Schaltflächen steht in Abschnitt 4 der [Betriebsmodi](/de/mail/modes/). Die Anzeige dieser Karte unterliegt einem Feature-Flag auf der Basisebene; eine Standardbereitstellung rendert sie nicht.

## 4. Speicherung und Kerndatenbank

Objektspeicher (B2/S3, standardmäßig Rückfall auf R2/KV), Architektur der Kern- und Drittanbieterdatenbanken (Turso und Ähnliches), Obergrenze pro Anhang und kaskadierende Löschung, KV-Cache-Gesundheitsprüfung. Technische Details in der [Technischen Architektur](/de/mail/architecture/).

## 5. E-Mail-Push

Der offizielle Telegram-Bot (instanzweite Push-Benachrichtigungen), die Anzeigeeinstellungen der Push-Felder (Absender/Empfänger/Inhalt einzeln ein- und ausblendbar), globale Weiterleitung und Regelweiterleitung; im Verschlüsselungsmodus dauerhaft gesperrt. Private Bots auf Benutzerseite im [Leitfaden zu Benachrichtigungen und Weiterleitung](/de/mail/notify/).

## 6. AI-Engine und Modellintegration

Wahl des AI-Providers (eigener OpenAI-kompatibler Endpunkt oder Cloudflare Workers AI), Aktivierungsschalter, Tageskontingente und Ratenbegrenzungen sowie Modellfreigaben je Identitätsgruppe (in Verbindung mit der [Berechtigungsverwaltung](/de/mail/roles/)).

## 7. Benutzerdatensteuerung

Steuert die Fähigkeitsschalter für normale Benutzer auf der Seite „Profildaten": Telegram-Push, E-Mail-Weiterleitung, Unterstützung der Drittanbieter-API, eigener Speicher und das Standardspeicherkontingent; der Datenexport bleibt jederzeit offen und unterliegt nicht dieser Karte.

## 8. Turnstile-Bot-Verifizierung

Site-Key und Schalter der Bot-Verifizierung, wirksam an öffentlichen Einstiegen wie der Registrierung.

## 9. Website-Ankündigungen

Ankündigungs-Popups auf der Anmeldeseite, Ankündigungs-Mailings und Vorlagen für Willkommens-E-Mails (mehrsprachig, Zustellung in der jeweiligen Empfängersprache); die Zustellungssemantik offizieller E-Mails in [Offizielle E-Mails und Manipulationsschutz](/de/mail/tamper-proof/).

## 10. Auditberichte

Die Betriebs-Schwellenwerte, bei deren Erreichen Warnungen ausgelöst werden (steuern die Ticket-Erzeugung in den [Auditberichten](/de/mail/audit/)).

## 11. Über

Versionsinformationen der Instanz und die Update-Prüfung (gegen die GitHub Releases).

<details>
<summary>Visuelle Anleitung: die elf Konfigurationskarten im Überblick (Nummerierung entspricht der Beschriftung der Oberfläche)</summary>

1. ① Website-Einstellungen: Offene Registrierung, öffentliche Profile, E-Mail-Modus, Zwei-Faktor-Verifizierung, Registrierungscodes, zusätzliche Postfächer, Schnellwechsel zwischen Mehrfachkonten, Postfach-Präfixe.
2. ② Personalisierung: Websitetitel, Popup-Hinweise, dynamische/statische Oberfläche. ③ Speicherung und Kerndatenbank: B2/S3, Kern- und Drittanbieterdatenbank, Anhangsgrenze.
3. ④ E-Mail-Push: offizieller Telegram-Bot, Anzeige und Ausblendung der Push-Felder, globale und Regelweiterleitung. ⑤ AI-Engine: Provider, Kontingente und Ratenbegrenzung, Modellfreigaben.
4. ⑥ Benutzerdatensteuerung: Schalter auf Benutzerseite für Push, Weiterleitung, API und eigenen Speicher sowie das Standardkontingent. ⑦ Turnstile-Bot-Verifizierung. ⑧ Website-Ankündigungen: Popups, Mailings und Vorlagen für Willkommens-E-Mails.
5. ⑨ Auditberichte: Schwellenwerte für Warnauslösungen. ⑩ Über: Version und Update-Prüfung. Die Karte Drittanbieter-Authentifizierung und Single Sign-On wird über ein Feature-Flag gesteuert.

</details>

## 12. Verwandte Dokumente

| Ressource | Link |
| --- | --- |
| Die benutzerseitige Stelle zum Ändern der Kontofähigkeiten | [Datenexport und Speicherung](/de/mail/data/) |
| Gruppenkontingente und Modellfreigaben | [Berechtigungsverwaltung](/de/mail/roles/) |
| Bereitstellung und Einspielung der Schlüssel | [Bereitstellungsleitfaden](/de/mail/deployment/) |
| Wirkung der Schalter auf die Oberfläche | [Betriebsmodi](/de/mail/modes/) |
