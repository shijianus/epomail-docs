---
title: Auditberichte
description: "Auditberichte von EpoCanvas Mail – die Risiko-Ticket-Konsole mit vier Boards: differenzierte Spaltensätze für Missbrauchsbedrohungen, Beschwerdeaudit, Risikomanagement und Vorgangsaufzeichnungen, mit Beweisschublade, Massenbearbeitung und Beschwerdeentscheidung für Administratoren."
---

**Aktualisiert: 2. November 2026 | Version: 5.25**

Die Auditberichte sind die Risiko-Ticket-Konsole des Verwaltungsbereichs (`#manage/admin/audit`; Abfragen erfordern `setting:query`, Bearbeitung, Entscheidungen und Bereinigung erfordern `setting:set`). Die Tickets werden in einer eigenen Audit-Log-Tabelle persistiert, der Verlauf lässt sich seitenweise durchsuchen. Vier Board-Karten am Seitenanfang fassen jeweils eine Klasse von Tickets zusammen; ein Klick wechselt den Arbeitsbereich zur differenzierten Tickettabelle des jeweiligen Boards.

![EpoCanvas Mail Auditbericht-Seite: vier Board-Karten am Seitenanfang und eine differenzierte Tickettabelle, die Karte Missbrauchsbedrohungen zeigt die Zähler für ausstehende und gesperrte Fälle, die Werkzeugleiste bietet Massenverlängerung, Aktualisierung, Zurücksetzung, Datenexport, Verlaufsbereinigung und einen Dokumentationslink](/images/mail/en/ui/audit-guide.png)

*Abb.: Auditberichte. Die vier Board-Karten geben die Ausrichtung vor, die Tickets werden einzeln bewertet, Beweisschublade und CSV-Export schließen den Vorgang ab.*

<details>
<summary>Visuelle Anleitung zu den Auditberichten: die sechs Ansatzpunkte einer Ticket-Konsole</summary>

Die sechs beschrifteten Bereiche der Auditbericht-Seite: Die vier Board-Karten bestimmen die Ausrichtung der Bewertung, Beweisschublade und Datenexport schließen ab.

1. **Karte Missbrauchsbedrohungen**: Das zentrale Register der Bedrohungskonten ab LV3 (Mehrfachkonten einer Person, ernsthafte Meldungen, Kontohandel und mehr); die Karte fasst in Echtzeit „Ausstehend N / Gesperrt N" zusammen; ein Klick öffnet das Bedrohungs-Board, dessen Leiste „Heute automatisch gefaltete Stapel" die automatisch archivierten Stapel der Routineprüfung aufklappt.
2. **Karte Beschwerdeaudit**: Die Anzahl der Beschwerde-Tickets, die Benutzer gegen Entscheidungen eingereicht haben; im Beschwerde-Board wird jedes Formular einzeln geprüft.
3. **Karte Risikomanagement**: Die Anzahl der Routine-Tickets der Risikokontrolle wie Spam oder IP-Wechsel über entfernte Standorte; im Risiko-Board erfolgt die Bewertung nach Schwere des Verstoßes.
4. **Karte Vorgangsaufzeichnungen**: Das Zahlenregister der abgeschlossenen Tickets (Sperrung, Entsperrung, aktualisierte Archivierung); im Aufzeichnungs-Board lässt sich der gesamte Verlauf nachvollziehen.
5. **Beweisschublade (Details)**: Der Punkt „Details" jedes Tickets öffnet die schreibgeschützte Beweisschublade: den zweispaltigen Abgleich von Basiswerten und tatsächlichen Beweisen, die Zeitachse des gesamten Bearbeitungszyklus und das mehrdimensionale Risikoprofil.
6. **Datenexport**: Exportiert die Tickets des aktuellen Boards spaltenvoll als CSV, zur Offline-Bewertung und zur Ablage.

</details>

## 1. Die vier Boards und ihre differenzierten Tickettabellen

| Board | Enthaltene Tickets | Kernpunkte des Spaltensatzes |
| --- | --- | --- |
| Missbrauchsbedrohungen | Bedrohungskonten ab LV3: Mehrfachkonten einer Person, ernsthafte Meldungen, Kontohandel und mehr | Kompakte Bearbeitungsansicht: Nummer, Ziel, Status, Kategorie, Bearbeitung und Aktionen |
| Beschwerdeaudit | Beschwerden von Benutzern gegen Entscheidungen | Ticketnummer, Identitätsgruppe, Verstoßkategorie, Alarmanzahl, Bearbeitungsvorschlag, Ablaufzeit und letzte Entscheidung |
| Risikomanagement | Routinemäßige Risikokontrolle: Spam, IP-Wechsel über entfernte Standorte und mehr | Zusätzlich Spalten für Verstoßstufe, Alarmgrund und Frist |
| Vorgangsaufzeichnungen | Abgeschlossene Bearbeitungen und aktualisierte Archivierungen | Zusätzlich Spalten für Anzahl der Aktualisierungen, letzte Aktualisierung und Anzahl der Beschwerden |

Alle vier Boards teilen sich dieselben Filter- und Massenwerkzeuge: Nach dem Ankreuzen von Tickets lassen sich Massenentsperrung, Massensperrung, Massenverlängerung oder Massenlöschung durchführen; auf dem Bedrohungs-Board sind die Massenaktionen auf das Zuweisen einer verantwortlichen Person, das Starten einer Überprüfung und das Aufheben beschränkt, um massenhafte dauerhafte Sanktionen zu vermeiden.

## 2. Ticketbewertung und Bearbeitung

- Jedes Ticket führt eine Nummer, das Ziel (E-Mail-Adresse und Benutzerkennung), ein Statusabzeichen (ausstehend, gesperrt, aufgehoben und mehr), die Verstoßkategorie und einen Bearbeitungsvorschlag; die Verstoßkategorien (ausgehender Missbrauch, Kontosicherheit, Inhaltskonformität, Quotenumgehung und mehr) richten sich nach der Sanktionsleiter in Abschnitt 6 der [Richtlinie zur akzeptablen Nutzung](/de/mail/acceptable-use/);
- Die Bearbeitungsvorschläge stammen von der Regel-Engine (Sperre vorschlagen, Sperre aufrechterhalten, vorübergehend N Tage sperren, weiter beobachten, routinemäßige Archivierung und mehr); die Spalte der letzten Entscheidung hält fest, wer endgültig entschieden hat: die systemische Risikokontrollrichtlinie (automatische Endentscheidung der Engine), ein Sicherheitsauditor oder der Master;
- Die Inline-Aktionen umfassen Entsperren, erneutes Sperren, Verlängern (7 / 30 / 90 Tage oder dauerhafte Kontrolle) und das Nachtragen von Prüfnotizen; die Spalte der verantwortlichen Stellen unterscheidet automatisch ausgeführte Systemprogramme von menschlichen Sicherheitsadministratoren.

## 3. Beweisschublade und Zeitachse der Bearbeitung

„Details" öffnet die schreibgeschützte Beweisschublade des Sperrregisters. Das Sperrregister ist ein öffentlich einsehbares, transparentes Verzeichnis, das allein der Prüfung der Beweise und der Nachvollziehbarkeit von Entsperrungen dient und nicht willkürlich verändert werden kann:

- **Fallkarte**: Fallnummer, aktueller Status, E-Mail-Adresse des Benutzers, Sperrzeitpunkt, letzter Bearbeitungszeitpunkt, Verstoßkategorie, Ursachencode und Aufbewahrungsfrist der Beweise (noch 180 Tage);
- **Risikobewertung und Bearbeitungsgrundlage**: Beschwerdebegründung, Auslösegrund und der vollständige Bearbeitungstext;
- **Zeitachse des gesamten Bearbeitungs- und Beweiszyklus**: Lückenlose Protokollierung vom Treffer der Systemregel (Regel-Engine) über die ausgeführte Sperrung (System) bis zur manuell geprüften Aufhebung (Administration);
- **Mehrdimensionales Risikoprofil**: Zweispaltiger Abgleich der „tatsächlichen Beweiswerte des aktuellen Kontos" gegen „Systembasiswerte / Normalwerte / Risikoschwellen": Gerätefingerprint, Client, auslösende IP, Anzahl der mit derselben IP verknüpften Konten, Netzsegment-Topologie, Benutzermeldungen und Zustellrate, Position für Position gegenübergestellt.

## 4. Beschwerdeentscheidung und Übergabe der Bearbeitung

Beschwerde-Tickets prüft die Administration nach Durchsicht der Beweisschublade und gibt sie nach Bewertung frei oder weist sie zurück; eine Freigabe stellt die Sendefähigkeit des Kontos wieder her. Sperrungen lassen sich auch über die [Benutzerliste](/de/mail/users/) aussprechen. Die Sanktionsleiter und das Beschwerderecht der Benutzer stehen in Abschnitt 6 der [Richtlinie zur akzeptablen Nutzung](/de/mail/acceptable-use/).

<details>
<summary>Visuelle Anleitung: Bewertungsschritte für ein Warn-Ticket</summary>

![Bewertungsschritte für ein Warn-Ticket](/images/mail/en/ui/audit.png)

1. Öffnen Sie im Verwaltungsbereich die „Auditberichte" (Abfragen erfordern `setting:query`, Bearbeitung erfordert `setting:set`).
2. Wechseln Sie per Klick auf eine Board-Karte den Ticketbestand oder filtern Sie nach Status, Verstoßkategorie oder Risikostufe.
3. Öffnen Sie die Beweisschublade über „Details" und prüfen Sie den zweispaltigen Beweisabgleich und die Zeitachse der Bearbeitung.
4. Bearbeiten Sie je nach Board: entsperren, erneut sperren, verlängern oder Notizen ergänzen; bei Beschwerde-Tickets entscheiden Sie über Freigabe oder Zurückweisung.
5. Exportieren Sie die Tickets des aktuellen Boards bei Archivbedarf über „Datenexport" als CSV.

</details>

## 5. Export, Bereinigung und Modus-Kopplung

- **Datenexport**: Die Tickets des aktuellen Boards werden spaltenvoll als CSV exportiert (mit BOM-Kopf, direkt in Tabellenkalkulationssoftware öffnbar);
- **Verlaufsbereinigung**: Ein Klick entfernt die unkritischen Aufzeichnungen der Routineprüfung (nur Audit-Aufzeichnungen der normalen Risikostufe); Sperr- und Beschwerderegister bleiben unberührt;
- **Circuit-Breaker-Leiste**: Löst der globale Circuit Breaker aus, erscheint am oberen Rand des Bedrohungs-Boards eine Warnleiste; während der Auslösung werden neue Verstöße nur vorübergehend zurückgehalten, Konten werden nicht automatisch gesperrt;
- **Kopplung an den E-Mail-Modus**: Im Verschlüsselungsmodus (Level 3) werden die Zeitstempel der Aufzeichnungen anonymisiert entfernt; die Tickets lassen sich weiterhin nach Kategorie und Beweisen bewerten, die ursprüngliche Ereignisfolge ist nicht mehr rekonstruierbar.

## 6. Verwandte Dokumente

| Ressource | Link |
| --- | --- |
| Konfiguration der Warnschwellenwerte | [Konfigurationskarten der Systemeinstellungen](/de/mail/system/) |
| Sperr- und Entsperrvorgänge | [Benutzerliste](/de/mail/users/) |
| Anmeldeseitiges Verhalten bei Risikokontrolle | [Leitfaden zur Kontosicherheit](/de/mail/security/) |
| Sanktionsleiter und Beschwerderecht | [Richtlinie zur akzeptablen Nutzung](/de/mail/acceptable-use/) |
