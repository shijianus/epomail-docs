---
title: Betriebsmodi
description: "EpoCanvas Mail Betriebsmodi: Bereitstellungsformen, die drei Datenschutzstufen der E-Mail-Modi, Identitätsgruppen und Kontingente, Anmeldung und Zwei-Faktor-Verifizierung sowie Mehrfachkonten und Anzeigearten der Oberfläche."
---

**Aktualisiert: 2. November 2026 | Version: 5.25**

Dieselbe Codebasis zeigt je nach Konfiguration unterschiedliche Betriebsformen: Eine Instanz kann gehostet betrieben oder selbst gehostet werden; der Administrator wählt zwischen drei E-Mail-Modi die Balance aus Datenschutz und Prüfbarkeit; Konten erhalten je nach Identitätsgruppe die entsprechenden Kontingente und Berechtigungen; auch Anmeldung, Mehrfachkonten und Anzeige der Oberfläche bieten mehrere Optionen. Diese Seite erläutert das Verhalten der einzelnen Modi und ihre Unterschiede. Die mit den Modi verbundenen Datenverarbeitungen finden Sie unter [Datenverarbeitung und Sicherheit](/de/mail/data-security/); die Funktionsbedienung im [Funktionsleitfaden](/de/mail/features/); die Einstiegspunkte der einzelnen Einstellungen im [Einstellungsleitfaden](/de/mail/settings/).

## 1. Bereitstellungsformen: gehostete Instanz und Selbstbereitstellung

Der Dienst ist in den folgenden zwei Formen nutzbar; die Abgrenzung des Verantwortlichen für die Daten ist in Abschnitt 2 der [Übersicht zu Datenschutz und Bedingungen](/de/mail/overview/) beschrieben:

| Form | Betreiber | Geeignet für |
| --- | --- | --- |
| Gehostete Instanz | Das EpoCanvas-Betriebsteam ([mail.epocanvas.com](https://mail.epocanvas.com)) | Registrieren und loslegen, ohne eigene Domain und Cloudflare-Konto |
| Selbst gehostete Instanz | Die bereitstellende Person oder Organisation | Die wesentlichen Ressourcen werden vom Bereitsteller konfiguriert; ausgehende Zustellung, Identitätsquellen, Objektspeicher, KI und Benachrichtigungen können weitere Anbieter einbeziehen, siehe die Liste der Unterauftragsverarbeiter |

## 2. E-Mail-Modus: drei Datenschutzstufen

Der Administrator wählt den E-Mail-Modus der Instanz auf der Karte Website-Einstellungen der Systemeinstellungen. Der Modus bestimmt die Verschlüsselungsstrategie der E-Mail-Speicherung und den Umfang, in dem die Verwaltung die Inhalte von Benutzer-E-Mails einsehen kann:

![EpoCanvas Mail Systemeinstellungen, Karte Website-Einstellungen: das Ausklappmenü des E-Mail-Modus ist geöffnet und zeigt die drei Optionen Alle-E-Mails-Modus (Level 1), Privater E-Mail-Modus (Level 2 [Empfohlen]) und Verschlüsselter E-Mail-Modus (Level 3 [E2EE]); der aktuelle Wert ist Privater E-Mail-Modus mit einem Level-2-Badge für erweiterten Datenschutz (Oberfläche in Vereinfachtem Chinesisch)](/images/mail/en/ui/mode-guide.png)

*Abb.: Beispiel der Oberfläche zur Auswahl des E-Mail-Modus. Die abgebildeten Moduswerte und Badges belegen weder die aktuelle Konfiguration der Live-Instanz noch eine Ende-zu-Ende-Verschlüsselung.*

<details>
<summary>Visuelle Anleitung zum E-Mail-Modus: wie ein einziges Ausklappmenü den Datenschutz der gesamten Instanz bestimmt</summary>

Der Bereich E-Mail-Modus auf der Karte Website-Einstellungen der Systemeinstellungen: Das Ausklappmenü beeinflusst die spätere Verschlüsselung von Feldern und die Sichtbarkeit in der Verwaltung. Es belegt keine abgeschlossene Massenmigration historischer Daten.

1. **Ausklappmenü E-Mail-Modus**: Level 1 speichert E-Mails im Klartext. Level 2, der private Modus, ist die Werkseinstellung und verschlüsselt Teile von Inhalt und Betreff der Benutzer-E-Mails serverseitig im Ruhezustand. Level 3, der verschlüsselte Modus, erweitert den Umfang der Verschlüsselung im Ruhezustand; die Verwaltungsliste gibt keine Benutzer-E-Mails zurück. Keiner dieser Modi bietet Ende-zu-Ende-Verschlüsselung; der Server behält die Fähigkeit zur Entschlüsselung.
2. **Level-2-Badge für erweiterten Datenschutz**: Die Verwaltungsliste zeigt im privaten Modus Spam, Papierkorb und nicht zugeordnete E-Mails; der Hauptschalter der Zwei-Faktor-Verifizierung ist auf aktiviert gesperrt. Das Badge belegt nicht, dass Administratoren technisch keinen Zugriff auf andere Daten haben.
3. **Die drei ausgeklappten Optionen**: Ein E2EE-Label in der Oberfläche oder in Screenshots ändert nichts am tatsächlichen Design mit serverseitiger Verschlüsselung. Der verschlüsselte Modus blendet den Einstieg zur Überprüfung aller E-Mails aus, entfernt Zeitstempel aus Auditberichten und deaktiviert systemweite Weiterleitung und Bot-Benachrichtigungen. Persönlich konfigurierte Übermittlungen nach außen werden dadurch nicht automatisch abgeschaltet.

</details>

| Modus | E-Mail-Speicherung | Sichtbarkeit der Verwaltung | Hauptschalter Zwei-Faktor | Globale Weiterleitung und Bot-Push |
| --- | --- | --- | --- | --- |
| Alle-E-Mails-Modus (Level 1) | Alles im Klartext | Alle E-Mails | Kann deaktiviert werden | Kann aktiviert werden |
| Privater E-Mail-Modus (Level 2, Werkseinstellung) | Zwischen Benutzern ausgetauschte E-Mails werden mit AES-256-GCM ruhend verschlüsselt; der Papierkorb bleibt zur Wiederherstellung im Klartext | Nur Spam, Papierkorb und nicht zugeordnete E-Mails | Auf aktiviert gesperrt | Kann aktiviert werden |
| Verschlüsselter E-Mail-Modus (Level 3, in der Oberfläche als E2EE bezeichnet) | Erweiterte serverseitige Verschlüsselung von Betreff und Inhalt im Ruhezustand; Anhänge und Routing-Metadaten sind nicht automatisch eingeschlossen | Liefert keinerlei Benutzer-E-Mail-Liste | Auf aktiviert gesperrt | Systemweit auf deaktiviert gesperrt; persönliche Konfigurationen sind gesondert zu prüfen |

Ein Moduswechsel beeinflusst die weitere Verarbeitung und die Verwaltungslisten, belegt aber keine vollständige Migration aller historischen Datensätze, Kopien oder Anhänge. Im verschlüsselten Modus bleibt die Verwaltungsliste leer, Auditberichte entfernen Zeitstempel aus einem Teil der Aufzeichnungen, und der Prüfeinstieg in der Verwaltungsseitenleiste wird ausgeblendet. Persönliche E-Mail-Weiterleitung und Telegram-Benachrichtigungen werden durch den instanzweiten Modus nicht automatisch abgeschaltet; sie unterliegen den jeweiligen Kontrollen und persönlichen Einstellungen. Im privaten Modus werden beim Verschieben einer E-Mail in den Papierkorb zunächst Betreff, Inhalt und Verifizierungscodes entschlüsselt gespeichert und für die Verwaltung sichtbar. Nach der Wiederherstellung werden sie entsprechend dem Modus erneut verschlüsselt.

## 3. Identitätsgruppen und Kontingente

Jedes Konto gehört zu einer Identitätsgruppe; die Gruppe bestimmt das Sendekontingent, die Anzahl der Postfächer, das Speicherkontingent und die Anhangsberechtigung:

![EpoCanvas Mail Berechtigungsseite: eine Tabelle listet die sechs Identitätsgruppen Normaler Benutzer, Besucher, Normaler Benutzer LV.0, Normaler Benutzer LV.1, Moderator und Master auf, jeweils mit Spalten für Positionsbezeichnung, Speicherkontingent, Sendelimit, Anhangsberechtigung und AI-Modellfreigaben (Oberfläche in Vereinfachtem Chinesisch)](/images/mail/en/ui/roles-guide.png)

*Abb.: Architektur- und Stufenübersicht der Berechtigungsseite. Speicherkontingent, Sendelimit und Anhangsberechtigung werden je Gruppe festgelegt; für die Master-Gruppe sind Senden und Postfachanzahl unbegrenzt.*

<details>
<summary>Visuelle Anleitung zur Berechtigungsverwaltung: fünf Spalten bestimmen, was eine Gruppe darf</summary>

Die Tabelle der sechs Identitätsgruppen auf der Berechtigungsseite: fünf beschriftete Spalten für die fünf Ressourcen- und Berechtigungsdimensionen, die je Gruppe angepasst werden können.

1. **Spalte Identität**: Sechs Gruppen: Normaler Benutzer, Besucher, Normaler Benutzer LV.0, LV.1, Moderator und Master, jeweils mit Positionsbezeichnung; die Gruppe bestimmt die Standardwerte der übrigen vier Spalten, die Gruppen Besucher und Master sind geschützt und können nicht gelöscht werden.
2. **Spalte Speicherkontingent**: Ein Speicherkontingent für Anhänge je Gruppe (Besucher 0 MB bis Master 1024 MB, in der Oberfläche als „Unbegrenzt" gekennzeichnet); nach Anbindung eines persönlichen Objektspeichers belasten neue Anhänge dieses Kontingent nicht mehr.
3. **Spalte Sendelimit**: Das tägliche Sendekontingent (Normaler Benutzer 5 bis Moderator 100, Master unbegrenzt), der Zähler wird täglich zurückgesetzt; Gruppen ohne Sendeberechtigung (Besucher) sind hier mit „Senden verboten" gekennzeichnet.
4. **Spalte Anhänge**: Ob Anhänge gesendet und empfangen werden dürfen: Gruppen mit „Nur Text" senden ohne Anhänge, freigegebene Gruppen unterliegen dem Speicherkontingent und der Obergrenze pro Anhang.
5. **Spalte AI-Modellfreigaben**: Der Umfang der AI-Modelle, die die Gruppe aufrufen darf; zusammen mit den Tageskontingenten und Ratenbegrenzungen des AI-Hubs in den Systemeinstellungen wird die AI-Kapazität nach Identität gestuft bereitgestellt.

</details>

| Identitätsgruppe | Positionierung | Tägliche Sendung | Postfächer | Speicherkontingent | Anhänge |
| --- | --- | --- | --- | --- | --- |
| Besucher | Sandkasten mit Lesezugriff für Open-Source-Erprobung und Inspektion | Verboten | 0 | 0 MB | Nicht gestattet |
| Normaler Benutzer | Basismitglied | 5 | 1 | 5 MB | Nicht gestattet |
| Normaler Benutzer LV.0 | Zertifizierter Freund | 8 | 2 | 10 MB | Nicht gestattet |
| Normaler Benutzer LV.1 | Aktiver Gelehrter | 10 | 3 | 25 MB | Gestattet |
| Moderator | Mitwirkende Verwaltung | 100 | 10 | 500 MB | Gestattet |
| Master | Höchste Autorität | Unbegrenzt | Unbegrenzt | 1024 MB | Gestattet |

Neue Registrierungen landen werkseitig in der Standardgruppe Besucher; der Betreiber kann die Standardgruppe auf der Berechtigungsseite ändern. Die Stufen LV.0 und LV.1 werden über die Synchronisation mit den Blogstufen automatisch angepasst: Wer ein Blogkonto verknüpft, steigt in LV.0 auf, aktive Interaktion im Blog führt zu LV.1. Der Besucher ist ein schreibgeschützter Sandkasten mit voll funktionsfähiger Oberfläche: Er kann die schreibgeschützten Verwaltungsbereiche durchsehen, darf aber keine E-Mails versenden. Kontingente und Berechtigungen lassen sich auf der Berechtigungsseite auch an die Anforderungen der Instanz anpassen; die obige Tabelle zeigt die werkseitig eingespielten Werte. Senden und Postfachanzahl der Master-Gruppe stehen über Nullwerte für unbegrenzt, der Speicher ist werkseitig mit 1024 MB eingespielt (die Berechtigungsseite kennzeichnet ihn als „Unbegrenzt") und kann bei Bedarf angepasst werden.

## 4. Anmeldung und Zwei-Faktor-Verifizierung

![EpoCanvas Mail Anmeldeseite: Eingabefelder für E-Mail-Adresse und Anmeldepasswort, Kontrollkästchen „Orbit-Verbindung beibehalten" und Anmelde-Schaltfläche, darunter die Schnellanmelde-Schaltflächen für Google und GitHub, beide mit ausgegrautem „Demnächst verfügbar"-Badge (Oberfläche in Vereinfachtem Chinesisch)](/images/mail/en/ui/login-guide.png)

*Abb.: Anmeldeseite. Die Passwortanmeldung ist die Basismethode; Drittanbieter-Schaltflächen, die der Administrator aktiviert hat, ohne Anmeldedaten zu hinterlegen, sind als „Demnächst verfügbar" ausgegraut, nicht aktivierte werden nicht angezeigt.*

<details>
<summary>Visuelle Anleitung zur Anmeldeseite: drei Schritte einer Passwortanmeldung</summary>

Die drei Kernbereiche der Anmeldeseite: der vollständige Eingabe- und Übermittlungspfad einer Passwortanmeldung; die Schnellanmelde-Schaltflächen der Drittanbieter befinden sich unterhalb der Karte.

1. **E-Mail-Eingabefeld**: Das Konto ist die E-Mail-Adresse selbst; im Registrierungscode-Modus kann diese Seite mit dem Parameter `?code=` für den Einladungscode das Registrierungsformular direkt vorbefüllen.
2. **Passwort-Eingabefeld**: Das Passwort wird über TLS zur Prüfung an den Server übermittelt; der Server erhält dabei den eingegebenen Wert. Dauerhafte Prüfeinträge verwenden gesalzene Hashes, während einige noch nicht abgeschlossene MFA-Abläufe zusätzlich kurzzeitig Klartext zwischenspeichern; siehe die Sicherheitsdokumentation. Der Einstieg „Passwort vergessen“ kann Beschwerdeart, Sprache und E-Mail-Adresse an das konfigurierte Beschwerdeportal übermitteln.
3. **Anmelde-Schaltfläche**: Nach dem Absenden gelangen Konten mit aktivierter Zwei-Faktor-Verifizierung zur zweiten Verifizierungsstufe; wiederholte Fehlversuche lösen eine Brute-Force-Sperre aus. Nach Ankreuzen von „Orbit-Verbindung beibehalten" entfällt die erneute Verifizierung auf diesem Gerät für 30 Tage.

</details>

- Passwortanmeldung: die auf jeder Instanz verfügbare Basismethode; Passwörter werden als gesalzene Hashes gespeichert, wiederholte Fehlversuche lösen eine Brute-Force-Sperre aus;
- Zwei-Faktor-Verifizierung: über das Zwei-Faktor-Zentrum der Sicherheitseinstellungen durch den Kontoinhaber selbst aktivierbar; für den zweiten Faktor stehen drei Wege bereit: Authenticator-App (TOTP-Einmalcodes), Ersatzwiederherstellungscodes (10 Einmalcodes) und Passkeys (Hardware-Sicherheitsschlüssel oder biometrische Entsperung des Geräts);
- Vertrauenswürdige Geräte: nach Ankreuzen von „Auf diesem Gerät künftig nicht mehr nachfragen" im Schritt der Zwei-Faktor-Verifizierung entfällt die erneute Verifizierung auf dem Gerät für 30 Tage; zwischen dem 30. und dem 60. Tag wird erneut nachgefragt, nach 60 Tagen erlischt das Vertrauen; bei erkannter Automatisierung oder Manipulation der Umgebung wird die Befreiung stets verweigert;
- Schnellanmeldung über Drittanbieter: der Administrator aktiviert und konfiguriert GitHub, Google, Microsoft, Apple und eigenes SSO einzeln mit Anmeldedaten; aktivierte Provider ohne Anmeldedaten werden als „Demnächst verfügbar" ausgegraut angezeigt, nicht aktivierte erscheinen gar nicht. Die mit der Drittanbieter-Anmeldung verbundenen Daten finden Sie in der [Liste der Drittanbieter-Prozessoren](/de/mail/sub-processors/).

![EpoCanvas Mail Sicherheitseinstellungen: oben die Karten für Benutzername, Postfach und Passwortänderung; darunter listet das Zwei-Faktor-Zentrum die drei zweiten Faktoren Authenticator-App, Ersatzwiederherstellungscodes und Passkeys auf, jeweils mit Konfigurationsstatus und Einstellungs-Schaltflächen (Oberfläche in Vereinfachtem Chinesisch)](/images/mail/en/ui/twofa-guide.png)

*Abb.: Das Zwei-Faktor-Zentrum auf der Seite der Sicherheitseinstellungen. Jeder zweite Faktor wird unabhängig konfiguriert und kann kombiniert werden.*

<details>
<summary>Visuelle Anleitung zum Zwei-Faktor-Zentrum: vier Karten und drei zweite Faktoren</summary>

Die vier beschrifteten Bereiche der Sicherheitsseite: oben der Einstieg zur Änderung der Kontozugangsdaten, darunter listet das Zwei-Faktor-Zentrum drei zweite Faktoren nebeneinander auf, die sich kombinieren lassen.

1. **Karte Benutzername und Passwort**: Änderung von Benutzername und Anmeldepasswort mit Anzeige der letzten Änderung; auch das Deaktivieren der Zwei-Faktor-Verifizierung erfordert hier die Eingabe von Passwort und Einmalcode.
2. **Authenticator-App (TOTP)**: Nach dem Einscannen des QR-Codes entsteht alle 30 Sekunden ein 6-stelliger Verifizierungscode; mit Abschluss der Bindung werden sofort 10 Wiederherstellungscodes angezeigt, jeder nur einmal nutzbar, für Fälle, in denen die App nicht verfügbar ist.
3. **Ersatzwiederherstellungscodes**: Der Rückfalloff für die Anmeldung, wenn die App nicht verfügbar ist: die Karte zeigt die verbleibende Anzahl in Echtzeit; das Anzeigen der vollständigen Codes oder die Neuerzeugung erfordert das Kontopasswort, nach dem Zurücksetzen verlieren alle alten Codes ihre Gültigkeit.
4. **Passkeys**: Hardware-Sicherheitsschlüssel oder biometrische Entsperung des Geräts: ein neu registrierter Passkey wird sofort aktiviert, sobald die gebundene Authenticator-App ihn freigibt (oder automatisch nach Ablauf der 30-tägigen Fristensperre); nach der Aktivierung lässt sich mit „Testen" der Entriegelungsvorgang prüfen.

</details>

## 5. Mehrfachkonten-Modus

Der Administrator kann den Schnellwechsel für mehrere Konten aktivieren; standardmäßig ist er aus. Das Avatar-Menü zeigt dann angemeldete Konten sowie Wechsel- und Hinzufügeoptionen; `/mail/u/Index/` wählt das Konto. Konten können getrennte Sitzungen haben, und lokale Entwurfsdatenbanken werden nach Postfachadresse gewählt. Speicher derselben Origin sind jedoch keine getrennten Browserprofile. In der lokalen Implementierung dieser Überarbeitung beendet gewöhnliches Abmelden nur die aktuelle Sitzung und entfernt den Cache der geöffneten Nachricht sowie den Empfängerverlauf; Sitzungen anderer Konten und Entwürfe bleiben erhalten. Es widerruft nicht alle Tokens oder Freigabelinks. Der Wechsel zwischen Postfach-Aliasen desselben Kontos erzeugt keine neue Sitzung. Dies bestätigt keine Bereitstellung auf allen Online-Instanzen; zu gemeinsam genutzten Geräten siehe Abschnitt 4.3 der Datenschutzerklärung.

![EpoCanvas Mail Avatar-Menü, geöffnet in der oberen rechten Ecke des Posteingangs: das aktuelle Konto admin (Master) mit Wechselpfeil, die Schaltfläche „Verwalten Sie Ihre Epomail-Konten" und die Speicherstandsanzeige (Oberfläche in Vereinfachtem Chinesisch)](/images/mail/ui/ui-account-menu.png)

*Abb.: Schnellwechsel zwischen Mehrfachkonten. Das Menü bündelt die angemeldeten Konten; das Hinzufügen eines Kontos läuft über den eigenen Ablauf der Anmeldeseite, die Sitzungen überschreiben sich nicht gegenseitig.*

<details>
<summary>Visuelle Anleitung zum Avatar-Menü: Einstieg zu Mehrfachkonten und Kontodetails</summary>

Das in der oberen rechten Ecke geöffnete Avatar-Menü: der gebündelte Einstieg für den Mehrfachkonten-Wechsel und die Kontodetails.

- **Kontenzeile**: Das aktuelle Konto (admin · Master) mit Wechselpfeil; im Mehrfachkonten-Modus werden die angemeldeten Sitzungen aufgelistet. `/mail/u/N/` wählt ein Konto aus; der Pfad selbst bewirkt keine Trennung von Speicher oder Gerätezugriff.
- **Schaltfläche „Verwalten Sie Ihre Epomail-Konten“**: Fügt über die Anmeldeseite ein Konto hinzu und führt zur Wechselliste zurück; die Route trennt den Speicher nicht. Um Daten aller Konten dieser Website aus diesem Browser zu entfernen, bestätigen Sie die Gerätebereinigung gesondert unter Einstellungen → Daten. Gewöhnliches Abmelden löscht Entwürfe anderer Konten nicht stillschweigend.
- **Speicherstandsanzeige**: Der Fortschrittsbalken für den Anhangsspeicher des aktuellen Kontos: der Zähler ist der belegte Anhangsspeicher dieses Kontos, der Nenner das Kontingent seiner Identitätsgruppe (Werkswerte je Gruppe auf der Berechtigungsseite). Nach Anbindung eines persönlichen Objektspeichers zählen neue Anhänge hier nicht mehr mit; ein Stillstand des Balkens bedeutet daher nicht, dass Anhänge nicht angekommen sind.

</details>

## 6. Oberflächensprachen und Anzeigearten

Die Oberfläche ist in sechs Sprachen verfügbar: 简体中文, 繁體中文, English, Français, Español und Nederlands; umgeschaltet wird in den allgemeinen Einstellungen, System-E-Mails und Willkommens-E-Mails werden in der Sprache des Empfängers zugestellt. Die Anzeigeart kennt drei Zustände: dunkel, hell und „System folgen"; zusätzlich gibt es ein globales Design-Hintergrundbild und einen persönlichen Hintergrund. Die Web-Version lässt sich als PWA installieren, zudem ist eine Android-App (epomail) verfügbar.

## 7. Verwandte Dokumente

| Ressource | Link |
| --- | --- |
| Vollständige Schritte für die Selbstbereitstellung | [Bereitstellungsleitfaden](/de/mail/deployment/) |
| Dienstgrenzen und Supportkanäle der gehosteten Instanz | [Leistungsumfang und Support](/de/mail/service-scope/) |
| Projektpositionierung und Bereitstellungsart | [Projektvorstellung](/de/mail/project/) |
| Punkt-für-Punkt-Rundgang durch persönliche Einstellungen und Verwaltungskonsole | [Einstellungsleitfaden](/de/mail/settings/) |
| Funktionsdetails mit Oberflächen-Screenshots | [Funktionsleitfaden](/de/mail/features/) |
| Datenschutzbedeutung und Speicherfristen der E-Mail-Modi | [Datenverarbeitung und Sicherheit](/de/mail/data-security/) |
| Sichtbarkeitsbereich der Verwaltung für E-Mail-Inhalte | [Datenschutzerklärung](/de/mail/privacy-policy/), Abschnitt 4 |
