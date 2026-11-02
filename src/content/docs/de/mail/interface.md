---
title: Oberflächen- und Routenübersicht
description: Oberflächen- und Routenübersicht für EpoCanvas Mail – die acht Ansichten des Postfachs, das Verfassen-Overlay, sämtliche Routen der Einstellungs- und Verwaltungsbereiche, die Abläufe des Anmeldebereichs, die OAuth-Zustimmungsseite und öffentliche Profile.
---

**Aktualisiert: 2. November 2026 | Version: 5.25**

Diese Seite führt durch jede Oberfläche von EpoCanvas Mail und ihre Route. Ein Ort besteht aus zwei Teilen: dem Pfadpräfix `/mail/u/N/` (N ist der Sitzungsindex im Mehrfachkonten-Modus; bei einem einzelnen Konto stets 0) und der hinter `#` stehenden Ansichtsroute (zum Beispiel `#inbox`); ältere direkte Pfade wie `/inbox` werden automatisch in die vollständige Form normalisiert. Der Anmeldebereich ist separat unter `/login/` bereitgestellt. Welche Zugriffe eine Route erlaubt, bestimmen die Berechtigungen der Identitätsgruppe, siehe [Betriebsmodi](/de/mail/modes/); die Wirkung jeder einzelnen Einstellung beschreibt der [Einstellungsleitfaden](/de/mail/settings/).

![EpoCanvas Mail Posteingang im Überblick: links der Verfassen-Einstieg und der Ordnerbaum, rechts die Nachrichtenliste mit Verifizierungscode-Badges und Markierungen offizieller Absender (Oberfläche in englischer Sprache)](/images/mail/en/ui/views-guide.png)

*Abb.: Posteingang (`#inbox`). Die acht Ansichten teilen sich dasselbe Listengerüst; Zähler und Labels werden in Echtzeit synchronisiert.*

<details>
<summary>Visuelle Anleitung zum Posteingang: die vier zuerst genutzten Einstiege</summary>

Die vier beschrifteten Bereiche dieser Posteingangsübersicht entsprechen den vier im Alltag am häufigsten genutzten Einstiegen: eine neue Nachricht schreiben, wichtige E-Mails erneut aufrufen, Zurückgestelltes prüfen und Gesendetes kontrollieren.

1. **Verfassen (Hauptschaltfläche oben in der Seitenleiste)**: Der einzige Einstieg für neue E-Mails in der gesamten Anwendung; ein Klick öffnet das Verfassen-Overlay (keine eigene Route). Auf Mobilgeräten erscheint eine schwebende Schaltfläche unten rechts, zudem unterstützt der Deep-Link `?composeTo=<Adresse>` das Vorbefüllen des Empfängers. Aus jeder Ansicht lässt sich mit einem Klick das Schreiben beginnen.
2. **Markierte Nachrichten (Ordner in der Seitenleiste)**: Alle mit Stern markierten E-Mails werden ordnerübergreifend hier gesammelt: Ein Klick auf das Sternsymbol in einer Listenzeile führt in diese Ansicht; gedacht für E-Mails, die dauerhaft aufbewahrt oder schnell wieder aufgerufen werden sollen; der Zähler in der Seitenleiste spiegelt die Anzahl in Echtzeit.
3. **Zurückgestellt (Ordner in der Seitenleiste)**: Der Ablagebereich für aufgeschobene Nachfragen, unterteilt in die zwei Stufen „Dringend" und „Warten": in den Nachrichtendetails „Zurückstellen" wählen und eine Zeit angeben; zum Fälligkeitszeitpunkt kehrt die Nachricht automatisch an den Anfang des Posteingangs zurück, Wichtiges versinkt nicht mehr am Grund der Liste.
4. **Gesendet (Ordner in der Seitenleiste)**: Das Ablagefach aller von diesem Konto versandten E-Mails; hier lässt sich nachprüfen, welche Nachrichten tatsächlich rausgegangen sind; das Sendevolumen unterliegt dem täglichen Sendekontingent der Kontorolle, interne Nachrichten werden direkt zugestellt, externe über den Zustellungskanal.

</details>

## 1. Hauptoberfläche des Postfachs

Die nach der Anmeldung erreichbare Hauptoberfläche gliedert sich nach Ansichtsrouten; es gibt neun Routen:

| Ansichtsroute | Oberfläche | Wichtigste Inhalte |
| --- | --- | --- |
| `#inbox` | Posteingang | Standardansicht; Umschalten zwischen aufsteigender und absteigender Zeitreihenfolge, inkrementelles Einfügen neuer E-Mails durch Polling, virtualisierte Liste, rote Punkte für Ungelesenes, Unterhaltungsgruppierung |
| `#all` | Alle E-Mails | ordnerübergreifende Sammelansicht; ein Klick auf ein Label in der Seitenleiste springt in diese Ansicht und filtert nach diesem Label |
| `#message` | Nachrichtendetails | Antworten / Allen antworten / Weiterleiten, Stern, Gelesen/Ungelesen, Verschieben nach, Als Spam melden, Zurückstellen, Label hinzufügen, Emoji-Reaktionen, KI-Volltextübersetzung, einzelne Nachricht oder ganze Unterhaltung drucken, .eml herunterladen, Original-Header anzeigen, Absender blockieren, Filter aus dieser Nachricht erstellen |
| `#sent` | Gesendet | von diesem Konto versandte E-Mails |
| `#drafts` | Entwürfe | lokale Entwürfe; ohne Empfänger wird ein Platzhalter angezeigt |
| `#starred` | Markierte Nachrichten | Sammelansicht der mit Stern markierten E-Mails |
| `#snoozed` | Zurückgestellt | die zwei Stufen Dringend und Warten; kehrt zum Fälligkeitszeitpunkt automatisch in den Posteingang zurück |
| `#spam` | Spam | vom System oder von Nutzern als Spam eingestufte E-Mails |
| `#trash` | Papierkorb | gelöschte E-Mails; physische Löschung 7 Tage nach Eingang |

Das Verfassen ist ein Overlay und keine eigene Route; es gibt drei Auslöser: die Schaltfläche „Verfassen" in der Seitenleiste, die schwebende Schaltfläche auf Mobilgeräten (erfordert Sendeberechtigung) und der Deep-Link `?composeTo=<Adresse>` (öffnet das Verfassenfenster und belegt den Empfänger vor).

![EpoCanvas Mail Verfassenfenster: der Absender ist auf das aktuelle Postfach festgelegt, Rich-Text-Werkzeugleiste mit Anhängen und Senden-Schaltfläche (Oberfläche in vereinfachtem Chinesisch)](/images/mail/ui/ui-compose.png)

*Abb.: Das Verfassen-Overlay. Nachrichten an interne Postfächer werden direkt zugestellt; Nachrichten nach außen laufen über den vom Betreiber konfigurierten Zustellungskanal.*

<details>
<summary>Visuelle Anleitung zum Verfassen-Overlay: die Bereiche von oben nach unten</summary>

Die Bereiche des Verfassen-Overlays von oben nach unten: festgelegter Absender, Empfänger und Betreff, Rich-Text-Werkzeugleiste, Textbearbeitungsbereich und untere Aktionsleiste.

- **Absenderzeile**: der Absender ist auf das angemeldete Postfach festgelegt und beim Verfassen nicht von Hand änderbar; E-Mails dieser Plattform tragen daher nie eine gefälschte From-Adresse. Konten mit mehreren Postfächern wechseln in dieser Zeile die Absenderidentität; Empfänger sehen das jeweils gewählte Postfach. Die Absenderadresse bestimmt auch, über welchen Zustellungskanal die ausgehende E-Mail läuft.
- **Empfänger- und Betreffzeile**: Empfänger lassen sich aus den Kontakten wählen oder über den Deep-Link `?composeTo=` vorbefüllen; der Betreff erscheint in Listen und lässt sich mit `subject:` durchsuchen.
- **Werkzeugleiste und Textbereich**: 17 Formatierungswerkzeuge: Absatz, Schriftgröße, Schriftstile, Farben, Ausrichtung, Listen, Zitat, Link, Bild, Tabelle, Emoji, Übersetzung und Quellcode-Modus.
- **Untere Aktionsleiste**: die Anhänge-Schaltfläche (Fähigkeit rollenabhängig freigegeben, Obergrenze nach Instanzeinstellung) und die Senden-Schaltfläche; intern direkte Zustellung, extern über den vom Betreiber konfigurierten Kanal.

</details>

## 2. Grundgerüst der Oberfläche

Die Hauptoberfläche besteht aus vier Bereichen:

| Bereich | Elemente |
| --- | --- |
| obere Leiste | Suchfeld (E-Mail-Suche auf den E-Mail-Seiten, Konfigurationssuche auf den Einstellungsseiten, siehe [Such- und Regelreferenz](/de/mail/search/)), Hell/Dunkel-Umschalter, Hilfe, Ankündigungsglocke (erscheint, wenn ungelesene Ankündigungen vorliegen), Kontomenü (Profilbild, Speichernutzungsanzeige, Kontodetails, Einstellungen, Abmelden; im Fuß des Menüs externe Links zu Projektübersicht, Datenschutzerklärung und Nutzungsbedingungen; im Mehrfachkonten-Modus zusätzlich Wechseln, Hinzufügen und vollständiges Abmelden) |
| Seitenleiste | Verfassen-Schaltfläche, acht Ordner-Einträge mit Ungelesen-Zählern, Labelbereich (bis zu 7 Labels) und Einstieg zum Anlegen neuer Labels |
| Statusleiste | Verbindungsstatus, Zeitpunkt der letzten Synchronisierung, Anzahl der ungelesenen E-Mails, E-Mail-Modus-Badge (Hinweis im verschlüsselten Modus) und Versionsnummer |
| Hauptbereich | Liste oder Details der aktuellen Ansicht |

Bei einer Breite unter 1025 Pixeln klappt die Seitenleiste in eine Schublade zusammen, die über einem abgedunkelten Hintergrund aufgerufen wird; beim Wechseln der Route schließt sie sich automatisch.

## 3. Einstellungsbereich

Beim Aufrufen der Einstellungen wechselt der Hauptbereich zu den Einstellungspanels, und die E-Mail-Seitenleiste wird ausgeblendet. Fünf Abschnittsrouten:

| Abschnittsroute | Abschnitt | Inhalt |
| --- | --- | --- |
| `#settings/profile` | Profildaten | Profilbild, Spitzname, Geschlecht, Geburtstag, E-Mail-Adresse, Telefonnummer und Anschrift |
| `#settings/general` | Allgemein | persönliche Vorstellung, Farbschema, Design-Hintergrundbild, Leseeinstellungen, Sprache und Datenschutz |
| `#settings/security` | Sicherheit | Benutzername und Passwort, Zwei-Faktor-Zentrum, Passkeys, Kontolöschung |
| `#settings/data` | Daten | Datenexport, Benachrichtigungen und Weiterleitung, Autorisierungen von Drittanbieter-Apps, Speicher |
| `#settings/labels` | Labels | Labelverwaltung und der Regel-Builder für die Klassifizierung |

![EpoCanvas Mail Allgemein-Seite der Einstellungen: Bereich für die persönliche Darstellung, Design-Hintergrundbild und Farbschema (Oberfläche in vereinfachtem Chinesisch)](/images/mail/ui/ui-settings-general.png)

*Abb.: Abschnitt „Allgemein". Die fünf Einstellungsabschnitte teilen sich dasselbe Grundgerüst; die linke Spalte ist die Abschnittsnavigation.*

<details>
<summary>Visuelle Anleitung zum Rahmen des Einstellungsbereichs: Navigation links, Inhalt rechts</summary>

So sieht der Abschnitt mit den allgemeinen Einstellungen aus: Die linke Spalte navigiert durch die fünf Einstellungsabschnitte, der rechte Bereich zeigt die allgemeinen Punkte (Farbschema, Design-Hintergrundbild und weitere).

- **Abschnittsnavigation links**: die Umschaltung zwischen den fünf Abschnitten Profildaten, Allgemein, Sicherheit, Daten und Labels; beim Aufrufen der Einstellungen wird die E-Mail-Seitenleiste ausgeblendet, bis „Zurück zu den E-Mails" in die Hauptoberfläche zurückführt.
- **Bereich für die persönliche Darstellung**: drei Farbschemata (dunkel, hell, „System folgen") und das globale Design-Hintergrundbild (acht Voreinstellungen plus eigenes Bild oder eigene URL). Es gilt für alle Ansichten der gesamten Website; anders als der „persönliche Hintergrund", der nur den Postfachbereich überdeckt. Die obere Leiste bietet zudem eine Schnellumschaltung des Farbschemas, sodass ein Zurückkehren zu dieser Seite nicht nötig ist.
- **Übrige Gruppen**: die drei verbleibenden Gruppen dieser Seite: Leseeinstellungen (Posteingangstyp, Position des Lesebereichs, Unterhaltungsansicht), Sprache (eine von sechs Oberflächensprachen, eine von 16 KI-Übersetzungssprachen) und Datenschutz (zentraler Einstieg für die Präferenzen zur Verarbeitung personenbezogener Daten und zur KI-Verarbeitung). Diese Abbildung zeigt nur die linke Spalte und das Erscheinungsbild; die Bedeutung der einzelnen Punkte erklärt Abschnitt 3 des Einstellungsleitfadens.

</details>

## 4. Verwaltungsbereich

Die Routen des Verwaltungsbereichs folgen dem Muster `#manage/admin/<Abschnitt>`; das Rollengruppen-Segment im Pfad muss zur Identität des Kontos passen (`admin` für das Master-Konto, `moderator` für Mitverwalter), andernfalls wird automatisch auf einen verfügbaren Abschnitt normalisiert. Jeder Abschnitt ist an einen eigenen Berechtigungsschlüssel gebunden, der auf der Seite Berechtigungsverwaltung je nach Gruppe vergeben wird:

| Abschnittsroute | Abschnitt | Berechtigungsschlüssel | Zuständigkeit |
| --- | --- | --- | --- |
| `#manage/admin/analysis` | Analyseseite | `analysis:query` | Sende- und Empfangsvolumen, Blockierungsrate, Quellenverteilung, Wachstumskurven und KI-Nutzungs-Dashboards |
| `#manage/admin/users` | Benutzerliste | `user:query` | Kontosuche, Passwort zurücksetzen, Gruppenzuweisung anpassen, Sperren und Wiederherstellen |
| `#manage/admin/mail` | Alle E-Mails | `all-email:query` | Überprüfung des gesamten E-Mail-Bestands, erweiterte Suche mit `$`, Detail-Drawer und physische Löschung |
| `#manage/admin/roles` | Berechtigungsverwaltung | `role:query` | Identitätsgruppen, Kontingentvorlagen und KI-Modellautorisierung |
| `#manage/admin/reg-keys` | Registrierungscodes | `reg-key:query` | Ausstellung und Prüfung von Einladungscodes |
| `#manage/admin/system` | Systemeinstellungen | `setting:query` | Konfiguration auf Instanzebene; die Liste der Konfigurationskarten erscheint im [Einstellungsleitfaden](/de/mail/settings/) |
| `#manage/admin/apps` | App-Verwaltung | `setting:query` | Anmeldeinformationen für OAuth 2.0/OIDC-Drittanbieter-Apps |
| `#manage/admin/rules` | Klassifizierungsverwaltung | `setting:query` | Schalter für Empfang und Versand, KI-Erkennung, Sperr- und Zulassungslisten sowie harte Blockierung |
| `#manage/admin/audit` | Betriebsberichte | `setting:query` | Prüfung, Bearbeitung und Einspruchsentscheidung für die vier Warnungsklassen |

![EpoCanvas Mail Betriebsberichte-Seite: Warnungstickets der vier Klassen mit Bearbeitungsschaltflächen (Oberfläche in vereinfachtem Chinesisch)](/images/mail/ui/ui-audit-report.png)

*Abb.: Betriebsberichte (`#manage/admin/audit`). Die Prüfung erfolgt in einer Liste; die Bearbeitungsschaltflächen verzweigen nach Warnungsklasse.*

<details>
<summary>Visuelle Anleitung: die Betriebsberichte als Tabelle in der Verwaltungsansicht</summary>

Die Seite Betriebsberichte aus Sicht der Verwaltung: Warnungstickets werden tabellarisch geprüft, die Bearbeitungsschaltflächen verzweigen nach Warnungsklasse.

- **Tickettabelle**: eine Zeile pro Warnungsticket; die Spalten umfassen Klasse (Audit/Risikokontrolle/Sperrung/Einspruch), Priorität (P0/P1), den aktuellen Status sowie die Angaben des aktiven Umgebungspools in Klartext: IP, Geografie, Gerät und Fingerabdruck. Der Umgebungspool wird nach Anfrageverhalten aggregiert; sichtbare Auffälligkeiten entstehen erst, wenn sich dasselbe Konto von mehreren IPs aus gleichzeitig anmeldet.
- **Bearbeitungsschaltflächen**: die Schaltflächen verzweigen nach Ticketklasse: Bei Einspruchswarnungen steht „Freigabe nach Prüfung" am prominentesten (die Freigabe stellt das Konto wieder her), bei Sperrungswarnungen tritt „Warnung aufheben" hervor, die übrigen Klassen nutzen das Standardaktionsmenü. Die Schaltfläche übermittelt nur das Prüfergebnis; die eigentliche Sperrung oder Wiederherstellung erfolgt auf der Benutzerlistenseite, beide Seiten bleiben synchron.
- **Moduskopplung**: dieselbe Tabelle hat in den drei E-Mail-Modi unterschiedliche Formen: Im Alle-E-Mails-Modus (L1) ist die Information am vollständigsten; im Datenschutzmodus (L2) erscheint die Seite wie in dieser Abbildung; im verschlüsselten Modus (L3) sind Zeitstempel entfernt und die Zeitspalte ausgeblendet, sodass die Verwaltung nur anhand von Klasse und Umgebungspool entscheiden kann und die Reihenfolge der Ereignisse nicht rekonstruierbar ist.

</details>

## 5. Anmeldebereich

`/login/` ist eine eigenständige Anmeldungsanwendung, getrennt von der Hauptoberfläche bereitgestellt. Eine einzige Anmeldekarte trägt sämtliche Abläufe:

| Ablauf | Verhalten |
| --- | --- |
| Passwort-Anmeldung | Konto (E-Mail-Adresse) und Passwort werden übermittelt; wiederholtes Fehlschlagen löst eine Brute-Force-Sperre aus |
| Zwei-Faktor-Verifizierung | Authenticator-App (sechsstelliger TOTP-Code), Ersatzwiederherstellungscodes und Passkeys, einzeln oder mehrere nacheinander; das Ankreuzen von „Auf diesem Gerät künftig nicht erneut nachfragen" gewährt 30 Tage Vertrauen |
| Anmeldung über Drittanbieter | Anbieter, die der Administrator aktiviert und mit Schlüsseln konfiguriert hat, erscheinen als Schaltflächen; aktivierte Anbieter ohne Schlüssel erscheinen ausgegraut mit „Demnächst verfügbar" |
| Registrierung | E-Mail-Adresse (optional mit voreingestelltem Domänen-Suffix), Passwort und Registrierungscode; die Registrierungscode-Modi sind Pflicht, deaktiviert und optional; die URL kann einen Einladungscode-Parameter tragen |
| Passwort vergessen | ein Dialog springt zum externen Einspruchsportal und übergibt die Parameter für Einspruchsart, Oberflächensprache und E-Mail-Adresse |
| Konto hinzufügen | im Mehrfachkonten-Modus über `?action=addAccount&u=N` erreichbar; nach der Anmeldung landet die Sitzung auf dem zugehörigen Sitzungsplatz |

![EpoCanvas Mail Anmeldeseite: Eingabefelder für E-Mail-Adresse und Passwort, das Kontrollkästchen „In der Umlaufbahn bleiben" und Schaltflächen für die Schnellanmeldung über Drittanbieter (Oberfläche in vereinfachtem Chinesisch)](/images/mail/ui/ui-login-oauth.png)

*Abb.: Die Anmeldeseite. Die Dreizustands-Anzeigeregel der Drittanbieter-Schaltflächen steht in Abschnitt 4 der [Betriebsmodi](/de/mail/modes/).*

<details>
<summary>Visuelle Anleitung: alle Abläufe der Anmeldeseite</summary>

Der Anmeldebereich im Ganzen: Eine einzige Karte trägt Passwort-Anmeldung, Zwei-Faktor-Verifizierung, Schnellanmeldung über Drittanbieter, Registrierung und Passwort-Wiederherstellung.

- **Eingabebereich**: der meistgenutzte Weg dieser Seite: Die E-Mail-Adresse ist zugleich das Konto, das Passwort wird als gesalzener Hash gespeichert; der Server berührt es nie im Klartext. Wiederholte Fehlversuche lösen eine Brute-Force-Sperre aus, deren Granularität und Dauer die Backend-Richtlinie bestimmt; nach dem Ankreuzen von „In der Umlaufbahn bleiben" entfällt auf diesem Gerät für 30 Tage die erneute Verifizierung.
- **Drittanbieter-Bereich**: Anbieter, die der Administrator aktiviert und mit Schlüsseln versehen hat, erscheinen als Schaltflächen; aktivierte ohne Schlüssel erscheinen ausgegraut mit „Demnächst verfügbar", nicht aktivierte erscheinen gar nicht.
- **Übrige Abläufe**: dieselbe Karte trägt drei weitere Wege: Konten mit aktivierter Zwei-Faktor-Verifizierung gelangen nach dem Absenden zum zweiten Faktor (TOTP, Wiederherstellungscode oder Passkey); im Registrierungscode-Modus belegt ein code-Parameter das Registrierungsformular vor; „Passwort vergessen" springt zum externen Einspruchsportal und übergibt Einspruchsart, Oberflächensprache und E-Mail-Adresse. Die einzelnen Regeln stehen in Abschnitt 4 der Betriebsmodi-Seite.

</details>

## 6. Eigenständige Seiten und globale Funktionen

| Oberfläche | Route | Beschreibung |
| --- | --- | --- |
| OAuth-Zustimmungsseite | `#/oauth/authorize` | erscheint, wenn eine Drittanbieter-App eine Autorisierung anfordert: App-Informationen, offizielles Verifizierungsabzeichen, Liste der Zugriffsbereiche sowie Autorisieren/Abbrechen |
| Öffentliches Profil | `/<Benutzername>` | ohne Anmeldung erreichbar; zeigt Profilbild, Zeitzone, Identitätsgruppe, Beitrittsdatum, ein persönliches Daten-Dashboard und „Per E-Mail kontaktieren"; ob es geöffnet ist, entscheidet der Schalter „Öffentliche Profile" des Administrators |
| 404-Seite | übrige Pfade | Leerzustand-Seite für unbekannte Pfade mit einem Weg zurück zur Startseite |
| PWA | — | die Webanwendung lässt sich als App installieren; zusätzlich steht eine Android-App (epomail) bereit |

Der E-Mail-Modus verändert auch die Verwaltungsoberfläche: Im verschlüsselten Modus (Level 3) ist der Einstieg zur Überprüfung des gesamten E-Mail-Bestands verborgen, und die Betriebsberichte verlieren ihre Zeitstempel; siehe [Betriebsmodi](/de/mail/modes/), Abschnitt 2.

## 7. Verwandte Dokumente

| Ressource | Link |
| --- | --- |
| OAuth-Anwendungsregistrierung und Anbindung der Endpunkte | [OAuth-Anwendungsregistrierung und Anbindung der Endpunkte](/de/mail/api/) |
| Suchoperatoren, Verwaltungssuche und Bedingungen für Klassifizierungsregeln | [Such- und Regelreferenz](/de/mail/search/) |
| Jeder Einstellungsabschnitt im Einzelnen | [Einstellungsleitfaden](/de/mail/settings/) |
| Funktionen im Detail mit Oberflächen-Screenshots | [Funktionshandbuch](/de/mail/features/) |
| Betriebsarten und Berechtigungsgruppen | [Betriebsmodi](/de/mail/modes/) |
| Projektübersicht: Positionierung und Bereitstellung | [Projektübersicht](/de/mail/project/) |
