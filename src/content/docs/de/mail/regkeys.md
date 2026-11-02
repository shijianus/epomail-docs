---
title: Registrierungsschlüssel
description: Registrierungsschlüssel von EpoCanvas Mail für das Ausstellen von Einladungscodes, die Verwaltung von Verwendungen und Gültigkeit sowie die Prüfung der Nutzungsprotokolle, erläutert für Administratoren.
---

**Aktualisiert: 2. November 2026 | Version: 5.25**

Die Registrierungsschlüssel sind die Einladungscode-Oberfläche des Verwaltungsbereichs (`#manage/admin/reg-keys`, Berechtigungsschlüssel `reg-key:query`); sie steuern, wer sich auf dieser Instanz registrieren darf. Die drei instanzweiten Modi der Registrierungscodes (Pflichtfeld, aus oder optional) legt die Karte Website-Einstellungen der [Systemeinstellungen](/de/mail/system/) fest.

![Die Registrierungsschlüssel](/images/mail/en/ui/regkeys-guide.png)

*Abb.: Die Registrierungsschlüssel*

<details>
<summary>Visuelle Anleitung: die leere Seite der Registrierungsschlüssel, Ausstellungseinstieg und Suchfeld</summary>

Der Leerzustand der Registrierungsschlüssel-Seite, bevor ein Einladungscode ausgestellt wurde: eine Ausstellungs-Schaltfläche und ein Suchfeld bilden sämtliche Bereiche dieser Seite.

1. **Schaltfläche „Registrierungscode hinzufügen"**: Der Ausstellungseinstieg: Im Dialog wird jeweils ein 8-stelliger Zufallscode erzeugt (per Klick auf Aktualisieren neu generierbar) und an die Identitätsgruppe nach der Registrierung, die Gültigkeit und die Anzahl der Verwendungen gebunden (1–99999, jede erfolgreiche Registrierung zählt einen Abgang).
2. **Suchfeld für Registrierungscodes**: Nach der Ausstellung filtert und findet es Codes; es zeigt verbleibende Verwendungen, gebundene Gruppe und Gültigkeit; sensible Felder werden in der Besucheransicht automatisch maskiert.
3. **Leerzustandskarte**: Die Anleitung, solange die Instanz noch keinen Registrierungscode ausgestellt hat; nach der ersten Ausstellung wird der Bereich zur Codeliste mit Kopieren per Klick, Nutzungsprotokoll, Einzellöschung und der Sammelstornierung „Unbenutzte bereinigen".

</details>

## 1. Ausstellung

Der Dialog „Hinzufügen" stellt jeweils einen Registrierungscode aus, konfigurierbar:

| Feld | Beschreibung |
| --- | --- |
| Registrierungscode | Ein 8-stelliger Zufallscode, per Klick auf Aktualisieren neu generierbar |
| Gebundene Gruppe | Konten, die sich über diesen Code registrieren, landen in der festgelegten Identitätsgruppe (Gruppen in der [Berechtigungsverwaltung](/de/mail/roles/)) |
| Gültigkeit | Nach dem Ablaufdatum nicht mehr verwendbar |
| Verwendungen | 1–99999; jede erfolgreiche Registrierung zählt einen Abgang |

## 2. Verwaltung und Prüfung

| Aktion | Beschreibung |
| --- | --- |
| Liste | Zeigt verbleibende Verwendungen, gebundene Gruppe und Gültigkeit; sensible Abschnitte sind in der Besucheransicht maskiert |
| Kopieren | Kopiert den Code-Text per Klick, zur Weitergabe an Eingeladene |
| Nutzungsprotokoll | Zeigt, welche Konten den Code bereits verwendet haben |
| Löschen | Macht den Code sofort ungültig |
| Unbenutzte bereinigen | Entfernt alle noch nicht verwendeten Codes mit einem Klick |

URLs mit Einladungscode-Parameter (`?code=` / `?regKey=` / `?invite=`) befüllen das Registrierungsformular direkt vor, siehe Abschnitt 5 der [Oberflächen- und Routenübersicht](/de/mail/interface/).

<details>
<summary>Visuelle Anleitung: Bedienungsschritte der Registrierungsschlüssel</summary>

1. Öffnen Sie im Verwaltungsbereich die „Registrierungsschlüssel" (erfordert den Berechtigungsschlüssel `reg-key:query`).
2. Erzeugen Sie per „Hinzufügen" einen 8-stelligen Zufallscode (per Klick auf Aktualisieren neu generierbar).
3. Binden Sie die Identitätsgruppe nach der Registrierung und legen Sie Gültigkeit und Anzahl der Verwendungen fest (1–99999).
4. Kopieren Sie den Code und senden Sie ihn an die Eingeladenen; über das „Nutzungsprotokoll" prüfen Sie den Verbrauch; „Unbenutzte bereinigen" macht sämtliche unbenutzten Codes mit einem Klick ungültig.

</details>

## 3. Verwandte Dokumente

| Ressource | Link |
| --- | --- |
| Registrierungscode-Modi und Ablauf auf der Anmeldeseite | [Betriebsmodi](/de/mail/modes/) |
| Definition der Registrierungsgruppen | [Berechtigungsverwaltung](/de/mail/roles/) |
| Der Schalter für die offene Registrierung | [Konfigurationskarten der Systemeinstellungen](/de/mail/system/) |
| Kontoverantwortung bei Einladungsregistrierung | [Nutzungsbedingungen](/de/mail/terms-of-service/) |
