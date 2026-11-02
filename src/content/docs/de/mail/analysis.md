---
title: Statistikseite
description: Die Statistikseite von EpoCanvas Mail – Dashboards für Sende- und Empfangsvolumen, Abfangrate, Quellenverteilung, Wachstumskurven und AI-Nutzung, ein Rundgang für Administratoren.
---

**Aktualisiert: 2. November 2026 | Version: 5.25**

Die Statistikseite ist das Daten-Dashboard des Verwaltungsbereichs (`#manage/admin/analysis`, Berechtigungsschlüssel `analysis:query`); sie bündelt die E-Mail-, Benutzer- und AI-Nutzungskennzahlen der Instanz. Die Messbasis der einzelnen Kennzahlen folgt dem E-Mail-Modus: Im Verschlüsselungsmodus (Level 3) liest die Verwaltungsseite die Inhalte der Benutzer-E-Mails nicht, die betreffenden Zähler bleiben auf Metadatenebene.

![Die Statistikseite](/images/mail/en/ui/analysis-guide.png)

*Abb.: Die Statistikseite*

<details>
<summary>Visuelle Anleitung: der erste Bildschirm der Statistikseite, drei Anzeigen beantworten je eine Frage</summary>

Die drei Anzeigen des ersten Bildschirms der Statistikseite: Die Quellenverteilung beantwortet, woher die E-Mails kommen, die beiden Wachstumskurven beantworten, wie aktiv die Instanz ist.

1. **Quellenverteilung der E-Mails**: Der Anteil der eingehenden Zustellwege wie direkte Zustellung innerhalb der Instanz und externe Kanäle; daran lässt sich die Gesundheit der Zustellkanäle bewerten; die Governance-Ergebnisse (Abfangrate und Spammenge) werden in der Kategorieverwaltung nachgeprüft.
2. **Benutzer-Wachstumskurve**: Der zeitliche Verlauf registrierter und aktiver Benutzer; im Vergleich mit den Gruppenkontingenten der Berechtigungsverwaltungsseite lässt sich ablesen, wann Aufstockung oder ein Wechsel der Standardgruppe nötig werden.
3. **E-Mail-Wachstumskurve**: Der zeitliche Verlauf des Sende- und Empfangsgesamtvolumens; zusammen mit dem AI-Nutzungstrend derselben Seite zeigt sich, ob Tageskontingent und Ratenbegrenzung des AI-Hubs in den Systemeinstellungen noch passen.

</details>

## 1. Kennzahlen im Überblick

| Anzeige | Inhalt |
| --- | --- |
| E-Mail-Gesamtvolumen | Empfangen gesamt, gesendet gesamt, Anzahl gelöschter E-Mails |
| Benutzer | Anzahl registrierter Benutzer, aktiver Benutzer, gelöschter Benutzer |
| Governance | Systemseitige Abfangrate, Spammenge |
| Verteilung | Quellenverteilung der E-Mails (direkte Zustellung innerhalb der Instanz / externe Kanäle und mehr) |
| Trends | Benutzer-Wachstumskurve, E-Mail-Wachstumskurve |
| AI | Trend der AI-Aufrufe und des Token-Verbrauchs, Verteilung der AI-Modellnutzung |

## 2. Typische Verwendung

- Bewerten, ob die Kontingente der einzelnen Identitätsgruppen angepasst werden müssen (gegen die werkseitigen Werte der [Berechtigungsverwaltung](/de/mail/roles/));
- Abfangrate und Spammenge beobachten und daran die Listen und Schlüsselwörter der [Kategorieverwaltung](/de/mail/category/) nachjustieren;
- Den AI-Nutzungstrend verfolgen und prüfen, ob Tageskontingent und Ratenbegrenzung des AI-Hubs in den [Systemeinstellungen](/de/mail/system/) noch passen.

<details>
<summary>Visuelle Anleitung: Leseschritte der Statistikseite</summary>

1. Öffnen Sie im Verwaltungsbereich die „Statistikseite" (erfordert den Berechtigungsschlüssel `analysis:query`).
2. Lesen Sie die drei Kennzahlengruppen E-Mail-Gesamtvolumen, Benutzer und Governance.
3. An den Wachstumskurven verfolgen Sie die Benutzer- und E-Mail-Entwicklung; die Quellenverteilung prüft die eingehende Zusammensetzung.
4. AI-Aufruf- und Token-Trends sowie die Verteilung der Modellnutzung dienen dem Abgleich von Kontingent und Ratenbegrenzung der Systemeinstellungen.

</details>

## 3. Verwandte Dokumente

| Ressource | Link |
| --- | --- |
| Detailverwaltung in der Benutzer-Dimension | [Benutzerliste](/de/mail/users/) |
| Konfiguration der AI-Engine | [Konfigurationskarten der Systemeinstellungen](/de/mail/system/) |
| Vergabe der Berechtigungsschlüssel je Gruppe | [Berechtigungsverwaltung](/de/mail/roles/) |
