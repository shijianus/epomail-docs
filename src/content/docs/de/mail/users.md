---
title: Benutzerliste
description: Benutzerliste von EpoCanvas Mail – Kontensuche, Zurücksetzen des Passworts, Wechsel der Identitätsgruppe, Zurücksetzen der Zwei-Faktor-Verifizierung sowie Sperren und Entsperren, erläutert für Administratoren.
---

**Aktualisiert: 2. November 2026 | Version: 5.25**

Die Benutzerliste ist die Kontoverwaltungsoberfläche des Verwaltungsbereichs (`#manage/admin/users`, Berechtigungsschlüssel `user:query`); hier suchen Administratoren alle Konten der Instanz und bearbeiten sie.

![Die Benutzerliste](/images/mail/en/ui/users-guide.png)

*Abb.: Die Benutzerliste*

<details>
<summary>Visuelle Anleitung zur Benutzerliste: vom Auffinden eines Kontos bis zur Inline-Bearbeitung</summary>

Die vier beschrifteten Bereiche der Benutzerliste: von der Suche bis zur Inline-Bearbeitung läuft die Kontoverwaltung der Administration auf einem Bildschirm ab.

1. **E-Mail-Suchfeld**: Oben lassen sich Konten nach E-Mail-Adresse suchen und lokalisieren, Seitennavigation und Sortierung liefern sofort Ergebnisse; zusammen mit den Zählern für Sende- und Empfangsvolumen, Speicherbelegung sowie Spam/Meldungen in der Liste lassen sich auffällige Konten schnell eingrenzen.
2. **Spalte Benutzer-E-Mail**: Die eindeutige Kennung des Kontos: Die E-Mail-Adresse ist der Kontoname, maßgeblich für Anmeldung, E-Mail-Empfang und jede Autorisierung. Inline-Aktionen (Passwort zurücksetzen, Gruppe wechseln, sperren) wirken auf das Konto dieser Spalte; drei weitere Spalten derselben Seite, Sende- und Empfangsvolumen, Speicherbelegung sowie Spam-/Meldungszähler, zeigen an, ob ein Konto auffällig ist.
3. **Spalte Speicherplatz**: Die aktuelle Speichernutzung der Anhänge des Kontos; im Vergleich mit dem Kontingent seiner Identitätsgruppe (siehe Berechtigungsverwaltungsseite) lässt sich entscheiden, ob Aufstockung oder Aufräumen nötig ist.
4. **Spalte Aktionen**: Die Inline-Verwaltungsaktionen: Passwort zurücksetzen (stellt ein einmaliges Passwort aus), Identitätsgruppe wechseln, Zwei-Faktor-Verifizierung zurücksetzen, Sperren und Entsperren sowie Benutzer-E-Mails löschen (unumkehrbar, mit Vorsicht verwenden).

</details>

## 1. Liste und Suche

Die Liste zeigt jedes Konto in einer eigenen Zeile mit E-Mail-Adresse, Sende- und Empfangsvolumen, Speicherbelegung, Spam- und Meldungszählern und weiteren Dimensionen; oben lässt sich nach E-Mail-Adresse suchen, Seitennavigation und Sortierung liefern sofort Ergebnisse.

## 2. Kontoaktionen

| Aktion | Beschreibung |
| --- | --- |
| Passwort zurücksetzen | Stellt dem Konto ein neues einmaliges Passwort aus und benachrichtigt es zur erneuten Anmeldung |
| Identitätsgruppe wechseln | Ändert die Gruppe des Kontos, Kontingent und Berechtigungen wechseln sofort mit (Gruppendefinitionen in der [Berechtigungsverwaltung](/de/mail/roles/)) |
| Zwei-Faktor-Verifizierung zurücksetzen | Der Notweg, wenn ein Konto die Zwei-Faktor-Prüfung nicht passiert; löscht seine TOTP-/Passkey-Konfiguration |
| Sperren und Entsperren | Nach der Sperrung verliert das Konto sofort seine Sitzung, nach der Aufhebung kann es sich wieder anmelden |
| Benutzer-E-Mails löschen | Entfernt die E-Mails dieses Kontos (unumkehrbar, mit Vorsicht verwenden) |

## 3. Bearbeitung und Beschwerdeweg

Eine Sperrung geht als Warn-Ticket in die [Auditberichte](/de/mail/audit/) ein; betroffene Benutzer können über das Beschwerdeportal oder Kanäle innerhalb der Instanz Beschwerde einlegen, die Administration bewertet sie. Die Sanktionsleiter und der Grundsatz der Verhältnismäßigkeit stehen in Abschnitt 6 der [Richtlinie zur akzeptablen Nutzung](/de/mail/acceptable-use/).

<details>
<summary>Visuelle Anleitung: Bedienungsschritte der Benutzerliste</summary>

1. Öffnen Sie im Verwaltungsbereich die „Benutzerliste" (erfordert den Berechtigungsschlüssel `user:query`).
2. Lokalisieren Sie das Konto über das Suchfeld oben nach E-Mail-Adresse.
3. Wählen Sie im Inline-Aktionsmenü: Passwort zurücksetzen, Identitätsgruppe wechseln, Zwei-Faktor-Verifizierung zurücksetzen, Sperren und Entsperren oder Benutzer-E-Mails löschen.
4. Sperrungen und Bearbeitungen gehen als Warn-Tickets in die Auditberichte ein, für die spätere Beschwerdeentscheidung.

</details>

## 4. Verwandte Dokumente

| Ressource | Link |
| --- | --- |
| Identitätsgruppen und Kontingentvorlagen | [Berechtigungsverwaltung](/de/mail/roles/) |
| Die E-Mail-Dimension über die gesamte Instanz prüfen | [Überprüfung aller E-Mails](/de/mail/review/) |
| Warn-Tickets und Beschwerdeentscheidungen | [Auditberichte](/de/mail/audit/) |
| Daten-Dashboards im Überblick | [Statistikseite](/de/mail/analysis/) |
