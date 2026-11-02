---
title: Datenexport und Speicherung
description: "EpoCanvas Mail Datenexport und Speicherung: die tatsächlich exportierten Felder und Umfangsbeschränkungen der drei Exportarten sowie die Anbindung eines persönlichen Objektspeichers."
---

**Aktualisiert: 2. November 2026 | Version: 5.25**

Diese Seite behandelt die zwei Bereiche Export und Speicherung der Seite „Einstellungen → Daten". Die Benachrichtigungen und die Weiterleitung derselben Seite finden Sie im [Leitfaden zu Benachrichtigungen und Weiterleitung](/de/mail/notify/); die rechtliche Stellung der exportierten Daten unter [Datenverarbeitung und Sicherheit](/de/mail/data-security/).

![EpoCanvas Mail Daten-Seite: drei Exportkarten, Speicherstandsmessgerät und Einstieg zur Anbindung des persönlichen Objektspeichers (Oberfläche in Vereinfachtem Chinesisch)](/images/mail/en/ui/data-guide.png)

*Abb.: Daten-Seite. Export- und Speicherverwaltung erscheinen auf derselben Seite; die Anhangsnutzung wird gegen das Kontingent der Identitätsgruppe gerechnet.*

<details>
<summary>Visuelle Anleitung zur Daten-Seite: vier Bereiche der Datensouveränität</summary>

Die vier Karten der Daten-Seite: drei Formate für die Datenmitnahme, ein Weiterleitungsbereich, ein Speicherbereich und ein Bereich für Drittanbieter-Berechtigungen, die vollständige Oberfläche für die Kontrolle über die eigenen Daten.

1. **Karte Benutzerdaten und Datenexport**: Bietet den JSON-Datenexport, das E-Mail-Archiv (MBOX/JSON/CSV) und den Export von Profildaten und Labels; alle drei stammen aus derselben Backend-Antwort, der Zeiträum-Parameter bleibt wirkungslos, auch die einzelne .eml-Datei wird aus bestehenden Feldern neu zusammengesetzt.
2. **Karte E-Mail- und Nachrichtenweiterleitung**: Punkt-für-Punkt-Konfiguration von Telegram-Push-Benachrichtigungen und automatischer Weiterleitung; ob dem Konto beide Funktionen zur Verfügung stehen, entscheiden die Schalter „Benutzerdatensteuerung" des Administrators.
3. **Karte Speicherplatz**: Zeigt die gemessene Nutzung von E-Mails und Anhängen sowie das gültige Kontingent; ein eigener Backblaze-B2-/S3-Speicher kann neue Anhänge übernehmen und umgeht die Systemkontingentprüfung im Anhangsspeicherpfad, die übrigen E-Mail-Beschränkungen gelten weiterhin; das Aufheben der Anbindung migriert keine alten Objekte.
4. **Karte Drittanbieter-Apps und -Dienste**: Zeigt OAuth-Berechtigungen an und bietet den Widerruf. Das Backend löscht die entsprechende Berechtigung, protokolliert den Widerruf und weist userinfo-Zugriffe anhand dieses Status zurück; nicht garantiert ist, dass Drittanbieter-Sitzungen, bereits erhaltene Daten und alle bestehenden Tokens gleichzeitig zurückgezogen werden.

</details>

## 1. Die drei Exportarten

| Export | Format | Umfang |
| --- | --- | --- |
| Vollständiger Datenexport | JSON | Ausgewählte Felder von Konto und Profildaten, ausgewählte Felder der E-Mails mit `is_del=0` sowie `customLabels`; ohne Anhangsdateien, originale MIME-Daten, vollständige Kontakt- und Alias-Daten, Sicherheitseinstellungen oder Audit-Aufzeichnungen |
| E-Mail-Verlaufsarchiv | MBOX, JSON oder CSV | Der Browser wandelt die E-Mail-Felder derselben Antwort in das gewählte Format um; das Backend ignoriert `type/format/range`, filtert nicht nach dem gewählten Zeitraum und schließt den Papierkorb aus |
| Kontakte und Konfiguration | JSON | Nur der zurückgegebene Profil-Teilbestand, customLabels und der Exportzeitpunkt; kein vollständiges Backup von Kontakten, Alias-Regeln oder sämtlichen Präferenzen |

Einzelne .eml-Dateien und das MBOX-Sammelarchiv werden gleichermaßen aus bestehenden Feldern neu zusammengesetzt und enthalten weder vollständige originale MIME-Daten noch Anhangsdateien. Der Papierkorb wird nach der Erstellungszeit der E-Mail jenseits von 7 Tagen geleert; eine Aufbewahrung von weiteren 7 Tagen nach dem Verschieben ist nicht garantiert. Sichern Sie Anhänge vor dem Löschen gesondert und prüfen Sie den Exportinhalt; zu Umfang und Rechten siehe [Datenschutzerklärung](/de/mail/privacy-policy/).

Die lokale Implementierung dieser Überarbeitung speichert außerdem vollständige ursprüngliche MIME-Daten vorübergehend im Objektspeicher, serverseitig mit AES-256-GCM verschlüsselt, zur Wiederaufnahme von Zustellungen. Die Anwendung setzt eine Bereinigungsfrist von 7 Tagen; Wiederholungsversuche nach Zustellfehlern können sie verlängern, und eine erfolgreiche Aufnahme in die Datenbank löscht das Objekt nicht sofort. Die geplante Bereinigung erfolgt stapelweise und bewahrt Objekte bei Löschfehlern für erneute Versuche auf. Dies ist keine Garantie einer Löschung bei Ablauf einer Speicher-TTL. Die vorübergehenden MIME-Daten sind vom Selbstbedienungsexport ausgeschlossen; .eml- und MBOX-Downloads werden weiterhin aus Feldern rekonstruiert. Dies bestätigt keine Bereitstellung auf allen Online-Instanzen.

In der aktuellen lokalen Implementierung entfernt gewöhnliches Abmelden die aktuelle Sitzung, den Cache der geöffneten Nachricht und den Empfängerverlauf; Sitzungen anderer Konten und lokale Entwürfe bleiben erhalten. Das Löschen eines Entwurfseintrags entfernt Entwurf und `att`-Anhänge in einer gemeinsamen IndexedDB-Transaktion. Diese lokalen Inhalte gehören nicht zum Serverexport.

Sichern Sie benötigte Entwürfe anderweitig, bevor Sie ein Gerät gemeinsam nutzen oder weitergeben. Wählen Sie danach die Gerätebereinigung unter Einstellungen → Daten → Datenschutz und Gerätedaten. Die Bestätigung umfasst gespeicherte Anmeldungen, Gerätevertrauen, Caches, Einstellungen, Entwürfe und Anhänge ALLER Konten dieser Website in diesem Browser und meldet Sie ab. Eine Blockierung oder ein Teilfehler wird nicht als vollständige Löschung gemeldet: Wiederholen Sie den Vorgang nach den Hinweisen oder löschen Sie die Website-Daten über den Browser. Die Aktion widerruft nicht sämtliche serverseitigen Zugangsdaten und löscht keine Daten anderer Websites, Chatkopien, statischen Avatare auf dem Server, Audit-Aufzeichnungen oder Backups. Die automatische Codeerkennung auf derselben Karte ist standardmäßig aus; ihre Aktivierung erfordert eine persönliche Entscheidung, einen konfigurierten Dienst und Informationen zum Datenempfänger. Beschrieben wird die lokale Implementierung dieser Überarbeitung, nicht deren Bereitstellung auf sämtlichen Online-Instanzen; zu den Grenzen von Speichern derselben Origin siehe Abschnitt 4.3 der Datenschutzerklärung.

## 2. Speicherplatz

- Das Messgerät zur Anhangsnutzung zeigt Nutzung und Kontingent in Echtzeit; das Kontingent folgt der Identitätsgruppe (Werkswerte in Abschnitt 3 der [Betriebsmodi](/de/mail/modes/));
- Ein persönlicher Backblaze-B2-/S3-Speicherbucket lässt sich anbinden; nach der Aktivierung werden neue Anhänge nach der persönlichen Konfiguration gespeichert, der Anhangsspeicherpfad umgeht die Systemkontingentprüfung, aber Messung und übrige E-Mail-Beschränkungen bestehen fort. Gebühren des Anbieters und externe Aufbewahrungsregeln sind gesondert zu bestätigen, siehe [Liste der Drittanbieter-Prozessoren](/de/mail/sub-processors/);
- Das Aufheben der Anbindung migriert oder löscht keine Objekte im bisherigen Bucket. Ihre ursprüngliche BYO-Speicherzuordnung bleibt erhalten, bis die Objektbereinigungswarteschlange die betreffenden Arbeiten bestätigt; eine Trennung bestätigt keine Löschung. Zur Verfügbarkeit alter Anhänge und zu Löschgrenzen siehe [Datenverarbeitung und Sicherheit](/de/mail/data-security/).

<details>
<summary>Visuelle Anleitung: Export und Speicherung Schritt für Schritt</summary>

![Export und Speicherung Schritt für Schritt](/images/mail/en/ui/data.png)

1. Öffnen Sie „Einstellungen → Daten".
2. „Vollständiger Datenexport" lädt ein JSON mit ausgewählten Profildaten, den Feldern nicht gelöschter E-Mails und customLabels herunter; Anhänge, vollständige Kontakte und Sicherheitseinstellungen sind separat zu behandeln.
3. „E-Mail-Verlaufsarchiv": MBOX/JSON/CSV auswählen und herunterladen; das Format wird im Browser konvertiert, das Backend wendet den Zeitraum nicht an.
4. „Kontakte und Konfiguration" exportiert den zurückgegebenen Profil-Teilbestand und customLabels; prüfen Sie, ob die benötigten Kontakte und Präferenzen enthalten sind.
5. Auf der Speicherkarte die Anhangsnutzung einsehen; mit „Bucket anbinden" den eigenen Backblaze-B2-/S3-Speicher verbinden, danach werden Anhänge direkt in der persönlichen Cloud gespeichert.

</details>

## 3. Verwandte Dokumente

| Ressource | Link |
| --- | --- |
| Benachrichtigungen und Weiterleitung (die andere Hälfte derselben Seite) | [Leitfaden zu Benachrichtigungen und Weiterleitung](/de/mail/notify/) |
| Speicherebenen und Grundprinzip der Kontingentmessung | [Technische Architektur](/de/mail/architecture/) |
| Rechte der betroffenen Personen und Exportfrequenz | [Datenschutzerklärung](/de/mail/privacy-policy/) |
| Speicherbezogene Verwaltungskonfiguration | [Konfigurationskarten der Systemeinstellungen](/de/mail/system/) |
