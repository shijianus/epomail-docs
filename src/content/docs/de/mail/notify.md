---
title: Leitfaden zu Benachrichtigungen und Weiterleitung
description: "Der Leitfaden zu Benachrichtigungen und Weiterleitung von EpoCanvas Mail: Binden des Telegram-Push, Push-Einstellungen und Feldanzeige sowie Ziele und Auslösertypen der automatischen Weiterleitung, Schritt für Schritt erläutert."
---

**Aktualisiert: 2. November 2026 | Version: 5.25**

Diese Seite erläutert Schritt für Schritt die zwei Fähigkeiten des Bereichs „E-Mail- und Nachrichtenweiterleitung" auf der Seite „Einstellungen → Daten": Telegram-Push-Benachrichtigungen und die automatische Weiterleitung. Ob beide Funktionen einem Konto offenstehen, entscheidet die Karte „Benutzerdatensteuerung" des Administrators; bei Deaktivierung werden die jeweiligen Bereiche nicht angezeigt. Datenexport und Speicherung liegen auf derselben Seite, siehe Abschnitt 5 des [Einstellungsleitfadens](/de/mail/settings/).

![EpoCanvas Mail Bereich E-Mail- und Nachrichtenweiterleitung: Telegram-Push-Status und Einstellungen der automatischen Weiterleitung](/images/mail/en/ui/notify-guide.png)

*Abb.: Der Bereich E-Mail- und Nachrichtenweiterleitung. Der Telegram-Push zeigt Status und Einrichtungseinstieg, die automatische Weiterleitung enthält Ziele und erweiterte Optionen.*

<details>
<summary>Visuelle Anleitung: Export und Weiterleitung — wie Daten mitgenommen werden und wie neue E-Mails Sie erreichen</summary>

Die drei Exportkarten der Seite „Daten" und der Kopfbereich „E-Mail- und Nachrichtenweiterleitung": oben wird geregelt, in welchem Format Daten mitgenommen werden, unten, wie neue E-Mails Sie in Echtzeit erreichen.

1. **Karte JSON-Datenexport**: Lädt ausgewählte Kontofelder, Felder nicht als gelöscht markierter E-Mails und eigene Labels herunter; Anhangsdateien, vollständige Sicherheitseinstellungen und sämtliche personenbezogenen Daten sind nicht enthalten.
2. **Karte E-Mail-Verlaufsarchiv**: Der Browser wandelt dieselbe Backend-Antwort in MBOX, JSON oder CSV um; das Backend wendet den gewählten Zeitraum nicht an, und vollständige ursprüngliche MIME-Daten sowie Anhangsdateien fehlen.
3. **Karte Kontakte und Konfiguration**: Exportiert die zurückgegebene Teilmenge der Profilfelder und eigene Labels; dies ist keine vollständige Sicherung des Kontaktverzeichnisses, der Alias-Regeln oder sämtlicher Einstellungen.
4. **Kopfbereich E-Mail- und Nachrichtenweiterleitung**: Einstieg zu Telegram-Benachrichtigungen und automatischer Weiterleitung. Persönliche Meldungen können alle oder wichtige Nachrichten auswählen; Vorschau und Codekopieren sind getrennte Optionen. Jeder Lese- oder Anhangsabruf prüft den aktuellen Status und die Widerrufsversion; zu Feldern und Weiterleitungsgrenzen siehe unten.

</details>

## 1. Telegram-Push-Benachrichtigungen

Der Push verwendet Ihren eigenen privaten Telegram-Bot; neue E-Mails erreichen Ihren Chat in Echtzeit:

1. Beantragen Sie bei @BotFather einen privaten Bot und notieren Sie das Bot-Token (in der Form `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`);
2. ermitteln Sie Ihre Chat-ID mit diesem Bot (senden Sie dem Bot eine beliebige Nachricht und fragen Sie sie über getUpdates ab; Gruppen sind negative Zahlen, Kanäle haben die Form `-100123456789`);
3. drücken Sie beim Punkt „Telegram-Push-Benachrichtigungen" auf „Einstellungen" und tragen Sie Bot-Token und Chat-ID ein; beim Empfang innerhalb eines Gruppen-Themas füllen Sie zusätzlich die Topic-ID aus;
4. Wählen Sie `all` oder `important` für persönliche Meldungen. Als wichtig gelten ausschließlich die exakten Labels `重要` / `important`, eine tatsächlich gespeicherte Sternmarkierung oder ein bereits vorhandener Verifizierungscode, nicht Wörter im Betreff. `notifyCodeOnly` ist standardmäßig `false` und steuert nur eine zusätzliche Schaltfläche zum Kopieren des Codes; sie erscheint nur für einen vorhandenen extrahierten Code von höchstens 256 Zeichen und ist kein Filter auf ausschließlich codehaltige Nachrichten;
5. prüfen Sie mit „Testnachricht senden“ den Zielchat und aktivieren Sie die Benachrichtigungen erst, nachdem Sie die übermittelten Felder und den Lese-Link geprüft haben.

Für persönliche Meldungen ist `includePreview` standardmäßig `false`. In `all` und `important` verwendet die Meldung auch bei ausgeschalteter Vorschau weiterhin den Betreff (oder einen allgemeinen Titel, wenn er fehlt), höchstens 200 Zeichen; ein ausdrückliches `true` ergänzt eine Vorschau von höchstens 400 Zeichen und einen Leselink, wenn die Konfiguration dies ermöglicht. Der Modus `privacy` sendet unabhängig von den anderen Optionen nur einen allgemeinen Titel ohne Betreff, Absender, Empfänger, Code oder Link. Systemmeldungen folgen unabhängig den vom Administrator festgelegten Systemfeldern; der persönliche Vorschauschalter deaktiviert sie nicht. Bot-Token und Chat-ID gehen an das Backend und bleiben nicht nur auf dem Gerät. Die automatische KI-Codeerkennung ist standardmäßig aus und verlangt gesondert eine persönliche Auswahl und einen konfigurierten Dienst; sie ist von Meldungsfiltern und der Codekopieroption zu unterscheiden.

Die lokale Implementierung dieser Überarbeitung prüft bei jedem Telegram-Lese- oder Anhangsabruf die Ablaufzeit, den Status von Eigentümer, Postfach und Nachricht sowie die Widerrufsversion. Das Abschalten der persönlichen Vorschau blockiert auch alte persönliche Links. Die geteilte Leseansicht lädt keine externen Inhalte. Das Deaktivieren persönlicher Benachrichtigungen oder Ändern einschlägiger Einstellungen widerruft alte Links. Die Schaltfläche für den Widerruf bestehender Lese-Links unter Einstellungen → Daten widerruft alle für dieses Konto bereits ausgestellten Links aus persönlichen und Systembenachrichtigungen; künftige Meldungen können unabhängig neue Links erzeugen. Gewöhnliches Abmelden widerruft diese Links nicht; eine Kontodeaktivierung blockiert den Zugriff über die laufenden Statusprüfungen. Der Widerruf entfernt weder bereits in Telegram-Chats vorhandene Inhalte noch heruntergeladene Kopien. Diese Mechanismen bestätigen keine Aktualisierung sämtlicher Online-Instanzen; siehe die [Liste der Unterauftragsverarbeiter](/de/mail/sub-processors/).

## 2. Automatische Weiterleitung

| Einstellung | Beschreibung |
| --- | --- |
| Automatische Weiterleitung aktivieren | Hauptschalter; nach dem Einschalten erscheinen die folgenden Einstellungen |
| Weiterleitungsziele | eine oder mehrere Zieladressen, mehrere durch Komma getrennt |
| Auslösertyp | Alle E-Mails oder wörtlicher Präfixabgleich des Empfängerpostfachs, etwa `billing`; `*` ist kein Platzhalter, und eine leere Alias-Präfixliste leitet nichts weiter |
| Betreff-Kopfzeile | optional der weitergeleiteten Betreffzeile eine `[Fwd]`-Kopfzeile hinzufügen, damit sie im Zielpostfach erkennbar ist |

:::note
Persönliche Weiterleitung mit intelligenten Regeln (`rules`) ist derzeit nicht verfügbar: Zur Laufzeit wird nichts weitergeleitet, ohne Rückfall auf alle Nachrichten; das Speichern einer aktivierten `rules`-Konfiguration wird abgelehnt. Gespeichertes `keepCopy` wird zu `true` normalisiert: `keepCopy=false` wird nur bei aktivierter Weiterleitung abgelehnt und eine deaktivierte Konfiguration ebenfalls als `true` gespeichert. Weiterleitung löscht das Original nicht automatisch. Dies beschreibt den aktuellen lokalen Quellcode; Tests werden noch wiederholt und bestätigen keine Online-Bereitstellung.
:::

## 3. Zustellungspfad und Schleifenschutz

Die Weiterleitung nutzt vorrangig den nativen Kanal der Plattform. Schlägt dieser fehl, kann der System-Zustellungskanal einspringen und je nach Einstellung `[Fwd]` voranstellen. Dieser Ausweichaufruf übermittelt nur Felder wie Betreff und Inhalt, keine gewöhnlichen Anhänge; der vollständige Empfang der ursprünglichen E-Mail ist daher nicht gewährleistet. Ziele, die dem Empfänger oder ursprünglichen Absender entsprechen, werden übersprungen; dies garantiert nicht, dass sämtliche Weiterleitungsschleifen über mehrere Stationen verhindert werden. Vorgeschaltete Systemregeln können den Eingangsablauf auch unmittelbar beenden und persönliche Benachrichtigungen sowie Weiterleitungen überspringen. Zur Regelsemantik siehe Abschnitt 7 der [Such- und Regelreferenz](/de/mail/search/).

## 4. Verwandte Dokumente

| Ressource | Link |
| --- | --- |
| Standort der Daten-Seite innerhalb der Einstellungen | [Einstellungsleitfaden](/de/mail/settings/) |
| Datenverarbeitung von Weiterleitung und Push | [Datenverarbeitung und Sicherheit](/de/mail/data-security/) |
| Zwei-Faktor-Verifizierung und Kontosicherheit | [Leitfaden zur Kontosicherheit](/de/mail/security/) |
| Die Schalter der Benutzerdatensteuerung des Administrators | [Betriebsmodi](/de/mail/modes/) |
