---
title: Postfach-Oberfläche und Nachrichtendetails
description: "EpoCanvas Mail Postfach-Oberfläche im Detail: die acht Ansichten, alle Aktionen der Nachrichtendetailseite, das Verfassen-Overlay und die Unterhaltungsfäden, Schritt für Schritt."
---

**Aktualisiert: 2. November 2026 | Version: 5.25**

Diese Seite erläutert jede Ansicht der Postfach-Hauptoberfläche und jede Aktion der Nachrichtendetailseite. Die Routen der einzelnen Ansichten und das Grundgerüst der Oberfläche finden Sie in der [Oberflächen- und Routenübersicht](/de/mail/interface/); die hinter der Organisation stehende Suche und die Regeln in der [Referenz für Suche und Regeln](/de/mail/search/).

![EpoCanvas Mail Posteingang: dreispaltige geteilte Ansicht, Verifizierungscode-Badges und Markierungen offizieller Absender (Oberfläche in Vereinfachtem Chinesisch)](/images/mail/en/ui/views-guide.png)

*Abb.: Posteingang. Liste, Lesebereich und Seitenleiste wirken zusammen, die Zähler aktualisieren sich sofort.*

<details>
<summary>Visuelle Anleitung zum Posteingang: die vier zuerst genutzten Einstiege</summary>

Die vier beschrifteten Bereiche dieser Posteingangsübersicht, sie entsprechen den vier im Alltag am häufigsten genutzten Einstiegen: eine neue Nachricht schreiben, wichtige E-Mails erneut aufrufen, Zurückgestelltes prüfen und Gesendetes kontrollieren.

1. **Verfassen (Hauptschaltfläche oben in der Seitenleiste)**: Der einzige Einstieg für neue E-Mails; ein Klick öffnet das Verfassen-Overlay (keine eigene Route). Auf Mobilgeräten erscheint eine schwebende Schaltfläche unten rechts, zudem unterstützt der Deep-Link `?composeTo=<Adresse>` das Vorbefüllen des Empfängers. Aus jeder Ansicht lässt sich mit einem Klick das Schreiben beginnen.
2. **Markierte Nachrichten (Ordner in der Seitenleiste)**: Alle mit Stern markierten E-Mails werden ordnerübergreifend hier gesammelt: ein Klick auf das Sternsymbol in einer Listenzeile legt einen Stern an; gedacht für E-Mails, die dauerhaft aufbewahrt oder schnell wieder aufgerufen werden sollen; der Zähler in der Seitenleiste spiegelt die Anzahl in Echtzeit.
3. **Zurückgestellt (Ordner in der Seitenleiste)**: Der Ablagebereich für aufgeschobene Nachfragen, unterteilt in die zwei Stufen „Dringend" und „Warten": in den Details „Zurückgestellt" wählen und eine Zeit angeben; zum Fälligkeitszeitpunkt kehrt die Nachricht automatisch an den Anfang des Posteingangs zurück, Wichtiges versinkt nicht mehr am Grund der Liste.
4. **Gesendet (Ordner in der Seitenleiste)**: Das Ablagefach aller von diesem Konto versandten E-Mails; hier lässt sich nachprüfen, welche Nachrichten tatsächlich rausgegangen sind; das Sendevolumen unterliegt dem täglichen Sendekontingent der Kontorolle, interne Nachrichten werden direkt zugestellt, externe über den Zustellungskanal.

</details>

## 1. Die acht Ansichten

| Ansicht | Verhalten |
| --- | --- |
| Posteingang | Standardansicht; Umschalten zwischen aufsteigender und absteigender Zeitreihenfolge, inkrementelles Einfügen neuer E-Mails durch Polling, virtualisierte Liste, rote Punkte für Ungelesenes, Unterhaltungsgruppierung |
| Alle E-Mails | Ordnerübergreifende Zusammenfassung; ein Klick auf ein Label in der Seitenleiste filtert nach diesem Label |
| Gesendet | Von diesem Konto versandte E-Mails |
| Entwürfe | Lokale `draft`-Datensätze und `att`-Anhänge in IndexedDB; gewöhnliches Abmelden bewahrt Entwürfe, das Löschen eines Listeneintrags entfernt beide in einer gemeinsamen Transaktion |
| Markierte Nachrichten | Sammlung der mit Stern markierten E-Mails |
| Zurückgestellt | Die zwei Stufen Dringend und Warten; kehrt zum Fälligkeitszeitpunkt automatisch in den Posteingang zurück |
| Spam | Der geplante Bereinigungslauf rechnet ab der Erstellungszeit der E-Mail und verschiebt sie standardmäßig nach mehr als 7 Tagen in den Papierkorb; keine garantierten weiteren 7 Tage ab dem Verschieben in den Spam |
| Papierkorb | Auch die feste 7-Tage-Schwelle wird ab der Erstellungszeit berechnet; physische Löschung kann im selben Durchlauf wie das Verschieben aus dem Spam erfolgen. Überschreitet die Nutzung bereits 90 % des Kontingents, kann eine Löschaktion ebenfalls unmittelbar physisch löschen |

## 2. Aktionen der Nachrichtendetailseite

| Gruppe | Aktionen |
| --- | --- |
| Antworten | Antworten, Allen antworten, Weiterleitung; Inline-Antwort und Emoji-Reaktionen |
| Ordnen | Markierung, Gelesen/Ungelesen, Verschieben nach (Posteingang/Spam/Papierkorb), Archivieren, Zurückstellen (vorgegebene oder selbst gewählte Zeit), Label hinzufügen, Als Spam melden / Als Nicht-Spam melden |
| AI | Volltextübersetzung mit Angaben zum Datenempfänger und Bestätigung bei jeder Anfrage; OCR ist standardmäßig aus. Automatische Codeerkennung ist standardmäßig aus und erfordert eine persönliche Auswahl sowie einen konfigurierten Dienst |
| Ausgabe | Nachricht oder Unterhaltung drucken, eine .eml-Datei aus vorhandenen Feldern rekonstruieren und herunterladen sowie verfügbare Header ansehen; der Selbstbedienungsexport enthält keine vollständigen ursprünglichen MIME-Daten aus der vorübergehenden Zustellwiederherstellung |
| Governance | Absender blockieren, Filter aus dieser Nachricht erstellen (Label setzen/als gelesen markieren/in Spam verschieben/in den Papierkorb verschieben) |

## 3. Das Verfassen-Overlay

Das Verfassen ist ein Overlay (keine eigene Route) und wird von drei Stellen aus geöffnet: der Schaltfläche „Verfassen" in der Seitenleiste, der schwebenden Schaltfläche auf Mobilgeräten (erfordert Sendeberechtigung) und dem Deep-Link `?composeTo=<Adresse>` (Empfänger vorbefüllt).

- Empfänger unterstützen die Auswahl aus den Kontakten; E-Mails an Postfächer innerhalb der Instanz werden direkt zugestellt, E-Mails nach außen über den vom Betreiber konfigurierten Kanal;
- Rich-Text-Werkzeugleiste mit 17 Elementen: Absätze, Schriftgröße, fett, kursiv, unterstrichen, durchgestrichen, Farben, Ausrichtung, geordnete und ungeordnete Listen, Zitat, Trennlinie, Link, Bild, Tabelle, Emojis sowie Übersetzungs- und Quellcode-Modus;
- Die Anhangsfähigkeit wird je Kontorolle freigegeben, die Obergrenze pro Anhang folgt den Instanzeinstellungen.

## 4. Unterhaltungen und Typografie

Die Nachrichtendetails unterstützen Unterhaltungsfäden, gestufte Typografie und schwebende Schnellantworten. Angezeigte Header und heruntergeladene .eml-Dateien bleiben aus Feldern rekonstruiert und sind kein Download vollständiger ursprünglicher MIME-Daten; zur verschlüsselten Wiederherstellungskopie und Bereinigungsfrist siehe [Datenexport und Speicherung](/de/mail/data/). Die lokale Implementierung dieser Überarbeitung blockiert externe Bilder, netzwerkladende Styles und aktive Inhalte standardmäßig. Beim gewöhnlichen Lesen lassen sich Bilder nur für die aktuelle Nachricht freigeben, nachdem auf die mögliche Übermittlung der IP-Adresse und des Öffnungsvorgangs hingewiesen wurde. Beim Drucken bleiben externe Inhalte standardmäßig blockiert; die geteilte Telegram-Leseansicht bietet keine Freigabe externer Inhalte. Sichere eingebettete Bilder und bestätigte Website-Anhänge sind von Tracking-Ressourcen Dritter zu unterscheiden.

Gewöhnliches Abmelden entfernt die aktuelle Sitzung, den Cache der geöffneten Nachricht und den Empfängerverlauf, bewahrt aber Sitzungen anderer Konten und lokale Entwürfe. Die vollständige lokale Website-Bereinigung erfordert eine gesonderte Bestätigung über die [Bereinigungsaktion der Datenseite](/de/mail/data/). Dies beschreibt den lokalen Code und bestätigt keine Aktualisierung sämtlicher Online-Instanzen. Zu Speichergrenzen siehe Abschnitt 4.3 der [Datenschutzerklärung](/de/mail/privacy-policy/), zu offiziellen Kennzeichnungen die [Offizielle Absendernorm und den Manipulationsschutz](/de/mail/tamper-proof/).

<details>
<summary>Visuelle Anleitung: die Postfach-Ansichten und die Nachrichtendetails</summary>

![Postfach-Ansichten und Nachrichtendetails](/images/mail/en/ui/views.png)

1. Nach der Anmeldung landen Sie standardmäßig im Posteingang (`/mail/u/0/#inbox`); die Schaltflächen oben schalten zwischen aufsteigender und absteigender Zeitreihenfolge um.
2. Neue E-Mails werden durch das Polling automatisch am Anfang der Liste eingefügt, Ungelesenes zeigt einen roten Punkt; der Ordnerbaum der Seitenleiste wechselt zwischen den acht Ansichten.
3. Ein Klick auf ein Label in der Seitenleiste wechselt die Liste zu „Alle E-Mails", gefiltert nach diesem Label.
4. Ein Klick auf eine beliebige E-Mail öffnet die Detailansicht (`#message/<hash>`): Antworten, Markierung, Zurückstellen, Label hinzufügen, Übersetzung, .eml-Download und weitere Aktionen finden Sie in der Aktionsleiste der Seite.

</details>

## 5. Verwandte Dokumente

| Ressource | Link |
| --- | --- |
| Ansichtsrouten und Oberflächengerüst | [Oberflächen- und Routenübersicht](/de/mail/interface/) |
| Suchoperatoren und Filterbedingungen | [Referenz für Suche und Regeln](/de/mail/search/) |
| Labels und Regel-Builder | [Labels und Klassifizierungsverwaltung](/de/mail/labels/) |
| Datenverarbeitung der Übersetzung | [Datenschutzerklärung](/de/mail/privacy-policy/), Abschnitt 6 |
