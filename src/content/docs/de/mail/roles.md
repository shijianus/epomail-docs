---
title: Berechtigungsverwaltung
description: Berechtigungsverwaltung von EpoCanvas Mail – die sechs Identitätsgruppen, Berechtigungsschlüssel im Einzelnen, Standardgruppe und Gruppenschutz sowie die Kopplung an die Blogstufen, erläutert für Administratoren.
---

**Aktualisiert: 2. November 2026 | Version: 5.25**

Die Berechtigungsverwaltung ist die Verwaltungsoberfläche der Identitätsgruppen im Verwaltungsbereich (`#manage/admin/roles`, Berechtigungsschlüssel `role:query`); sie bestimmt Kontingente, Berechtigungsschlüssel und AI-Modellfreigaben jeder Gruppe. Das benutzerseitige Verhalten der Gruppen steht in Abschnitt 3 der [Betriebsmodi](/de/mail/modes/).

![EpoCanvas Mail Berechtigungsverwaltungsseite: die Tabelle der sechs Gruppen mit den Spalten Kontingent, Sendelimit, Anhangsberechtigung und AI-Modellfreigaben](/images/mail/en/ui/roles-guide.png)

*Abb.: Die Architektur- und Stufenübersicht der Berechtigungsverwaltungsseite. Die Oberfläche kennzeichnet Senden und Speicher der Master-Gruppe als „Unbegrenzt".*

<details>
<summary>Visuelle Anleitung zur Berechtigungsverwaltung: fünf Spalten bestimmen, was eine Gruppe darf</summary>

Die Tabelle der sechs Identitätsgruppen der Berechtigungsverwaltungsseite: Die fünf beschrifteten Spalten stehen für die fünf je Gruppe anpassbaren Ressourcen- und Berechtigungsdimensionen.

1. **Spalte Identität**: Sechs Gruppen mit Positionsbezeichnung: Normaler Benutzer, Besucher, Normaler Benutzer LV.0, LV.1, Moderator und Master; die Gruppe bestimmt die Standardwerte der übrigen vier Spalten, die Gruppen Besucher und Master sind geschützt und können nicht gelöscht werden.
2. **Spalte Speicherkontingent**: Ein Speicherkontingent für Anhänge je Gruppe (Besucher 0 MB bis Master 1024 MB, in der Oberfläche als „Unbegrenzt" gekennzeichnet); nach Anbindung eines persönlichen Objektspeichers belasten neue Anhänge dieses Kontingent nicht mehr.
3. **Spalte Sendelimit**: Das tägliche Sendekontingent (Normaler Benutzer 5 E-Mails bis Moderator 100 E-Mails, der Master ohne Obergrenze), der Zähler wird täglich zurückgesetzt; Gruppen ohne Sendeberechtigung (Besucher) sind hier mit „Senden verboten" gekennzeichnet.
4. **Spalte Anhänge**: Ob Anhänge gesendet und empfangen werden dürfen: Gruppen mit „Nur Text" senden ohne Anhänge, freigegebene Gruppen unterliegen zugleich dem Speicherkontingent und der Obergrenze pro Anhang.
5. **Spalte AI-Modellfreigaben**: Der Umfang der AI-Modelle, die die Gruppe aufrufen darf; zusammen mit den Tageskontingenten und Ratenbegrenzungen des AI-Hubs in den Systemeinstellungen wird die AI-Kapazität nach Identitätsgruppe gestuft bereitgestellt.

</details>

## 1. Gruppen und Kontingente

| Identitätsgruppe | Positionierung | Werkseitiges Kontingent |
| --- | --- | --- |
| Besucher | Nur-Lese-Sandkasten | 0 Postfächer / 0 MB / Senden verboten |
| Normaler Benutzer | Basismitglied | 5 E-Mails / 1 Postfach / 5 MB |
| Normaler Benutzer LV.0 | Zertifizierter Freund | 8 E-Mails / 2 Postfächer / 10 MB |
| Normaler Benutzer LV.1 | Aktiver Gelehrter | 10 E-Mails / 3 Postfächer / 25 MB / Anhänge gestattet |
| Moderator | Mitwirkende Verwaltung | 100 E-Mails / 10 Postfächer / 500 MB / Anhänge gestattet |
| Master | Höchste Autorität | Senden und Postfachanzahl unbegrenzt; Speicher werkseitig 1024 MB (in der Oberfläche als „Unbegrenzt" gekennzeichnet), anpassbar |

## 2. Berechtigungsschlüssel im Einzelnen

Jede Gruppe wird über Berechtigungsschlüssel autorisiert (etwa `user:query` zum Ansehen der Benutzerliste, `setting:query` / `setting:set` für Abfrage und Bearbeitung der Systemeinstellungen und Auditberichte). Die Berechtigungsschlüssel, die die einzelnen Verwaltungsoberflächen benötigen, sind Position für Position in Abschnitt 4 der [Oberflächen- und Routenübersicht](/de/mail/interface/) aufgeführt; Änderungen wirken sofort.

## 3. Standardgruppe und Schutz

- Die Standardgruppe, in die neu registrierte Konten gelangen, ist werkseitig Besucher und lässt sich auf eine andere Gruppe umstellen;
- Die beiden Gruppen Besucher und Master sind geschützt: Sie können nicht gelöscht werden;
- LV.0 und LV.1 werden über die Synchronisation mit den Blogstufen automatisch angepasst (wer ein Blogkonto verknüpft, steigt in LV.0 auf, aktive Interaktion führt zu LV.1);
- Die AI-Modellfreigaben sind je Gruppe gestaffelt, zusammen mit Kontingent und Ratenbegrenzung des AI-Hubs in den [Systemeinstellungen](/de/mail/system/).

<details>
<summary>Visuelle Anleitung: Bedienungsschritte der Berechtigungsverwaltung</summary>

![Bedienungsschritte der Berechtigungsverwaltung](/images/mail/en/ui/roles.png)

1. Öffnen Sie im Verwaltungsbereich die „Berechtigungsverwaltung" (erfordert den Berechtigungsschlüssel `role:query`).
2. Prüfen Sie in der Tabelle „Architektur- und Stufenübersicht" Speicherkontingent, Sendelimit und Anhangsberechtigung der sechs Gruppen (Master werkseitig 1024 MB, in der Oberfläche als „Unbegrenzt" gekennzeichnet).
3. Passen Sie beim Bearbeiten einer Gruppe Kontingent, Anhangsschalter und freigegebene AI-Modelle an; kreuzen Sie die Berechtigungsschlüssel einzeln an (etwa `user:query`, `setting:query`).
4. Die Standardgruppe ist werkseitig Besucher und lässt sich auf eine andere Gruppe umstellen; Besucher und Master sind geschützt und können nicht gelöscht werden.

</details>

## 4. Verwandte Dokumente

| Ressource | Link |
| --- | --- |
| Benutzerseitiges Verhalten der Gruppen | [Betriebsmodi](/de/mail/modes/) |
| Wechsel der Gruppe eines Kontos | [Benutzerliste](/de/mail/users/) |
| AI-Engine und Kontingente | [Konfigurationskarten der Systemeinstellungen](/de/mail/system/) |
| Zusammenspiel von Registrierung und Gruppen | [Registrierungsschlüssel](/de/mail/regkeys/) |
