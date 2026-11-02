---
title: Technische Architektur von EpoCanvas Mail
description: "Technische Architektur von EpoCanvas Mail: Cloudflare-Edge-Bereitstellungstopologie, Isolation zweier Datenbanken, Verschlüsselungssystem der drei Betriebsmodi, Anhang-Speicherkette, Rollen- und Berechtigungsmodell, E-Mail-Lebenszyklus und Sicherheitsdesign der Anwendung."
---

**Aktualisiert: 2. November 2026 | Version: 5.25**

Diese Seite dokumentiert die technische Umsetzung von EpoCanvas Mail: Bereitstellungstopologie, Datenverschlüsselung, Speicherketten, Berechtigungsmodell und E-Mail-Lebenszyklus. Sämtliche technischen Aussagen folgen der tatsächlichen Implementierung des Open-Source-Codes und lassen sich direkt nachprüfen; die Auswirkungen auf die Privatsphäre Einzelner und die gesetzlichen Hinweise finden sich unter [Datenverarbeitung und Sicherheitsmaßnahmen](/de/mail/data-security/) und [Datenschutzrichtlinie](/de/mail/privacy-policy/).

Die Rechtsdokumente dieser Website sind in der traditionellen chinesischen (Taiwan) Fassung die maßgebliche Version; die übrigen Sprachfassungen sind Vergleichsübersetzungen. Bei abweichender Bedeutung ist die maßgebliche Version ausschlaggebend.

![EpoCanvas Mail Systemarchitektur: Die Clientschicht (Web-App, Android-App, OAuth-Drittanbieter-Apps) bindet über den Cloudflare-Edge an; Workers tragen API, eingehende E-Mail-Verarbeitung und KI-Funktionen, der Ausgang läuft über Resend und Telegram; die Daten landen in den beiden D1-Datenbanken, in KV und im Objektspeicher](/images/mail/de/project-architecture.svg)

*Abb.: Systemarchitektur. Clients binden über den Edge an; eingehende E-Mails nimmt Email Routing entgegen und verarbeitet sie, ausgehende werden über konfigurierte Kanäle zugestellt. Daten können darüber hinaus an konfigurierte externe Speicher und Dienste übermittelt werden, siehe [Liste der Drittanbieter](/de/mail/sub-processors/).*

## 1. Bereitstellungstopologie

| Komponente | Umsetzung |
| --- | --- |
| Rechenleistung | Cloudflare Workers (V8-Isolate-Sandbox) verarbeiten Anfragen; der Server kann während der Verarbeitung Klartext einsehen. Der Quellcode garantiert nicht, dass die Sandbox bei Anfrageende zerstört oder sämtlicher Klartext gelöscht wird |
| Eingang | Cloudflare Email Routing nimmt E-Mails entgegen; postal-mime verarbeitet Textkörper, Header und Anhänge |
| Ausgang | Drei Kanäle in fester Reihenfolge: Cloudflare-Email-Workers-Binding, Resend-API, Mailjet; E-Mails zwischen eigenen Postfächern werden direkt in die Datenbank geschrieben |
| Strukturierte Speicherung | Cloudflare D1: Trennung von Nutzer- und E-Mail-Datenbank möglich, mit Rückfall auf eine einzelne Datenbank; die Nutzerdatenbank trägt Konten, Rollen und Einstellungen, die E-Mail-Datenbank E-Mails, Sterne und Anhang-Metadaten; die produktive Bindung muss separat verifiziert werden |
| Schlüssel-Wert-Speicher | Workers KV: Sitzungstoken, Zähler für Anmelderisiken, TOTP-Zwischenzustände, Nutzerprofile und Objektspeicher-Rückfallebene |
| Edge-Inferenz | Workers AI (u. a. Verifizierungscode-Extraktion, standardmäßig llama-3.1-8b-instruct) |
| Geplante Aufgaben | Im Repository auf täglich 16:00 UTC konfiguriert (00:00 des Folgetags, Taiwanzeit): Verifizierungszähler leeren, Sendezähler zurücksetzen, Spam und ungebundene OAuth-Identitäten bereinigen, Analyse-Cache aktualisieren; alle 5 Minuten Verarbeitung der Benachrichtigungs- und Objektlösch-Warteschlangen. Der Code enthält zusätzlich einen 30-Minuten-Zweig, diese Konfiguration registriert ihn jedoch nicht |
| Mensch-Maschine-Verifizierung | Cloudflare Turnstile (Prüfung über HTTP-API, bei Registrierung und neuen Postfächern) |

## 2. Technologie-Stack

| Schicht | Technologie |
| --- | --- |
| Client | Vue 3.5, Element Plus, Pinia, vue-i18n, ECharts, Dexie (lokale Entwürfe, nie auf dem Server), Vite 7, vite-plugin-pwa |
| Anmeldeoberfläche | React 18, Tailwind CSS 4, Vite 6 (separat gebaut, zusammen mit dem Frontend-Bundle ausgeliefert) |
| Server | Hono 4.12, Drizzle ORM, postal-mime, i18next, Resend SDK |
| Oberflächen-Assets | 300+ Offline-Vektoricons (null externe Anfragen), helles und dunkles Theme, Wörterbücher in sechs Sprachen |

## 3. Verschlüsselungssystem der Daten

- **Verschlüsselung im Ruhezustand in drei Betriebsmodi**: Der Modus „Alle“ lässt E-Mail-Felder unverschlüsselt; der Datenschutzmodus verschlüsselt je nach Status als Spam, im Papierkorb oder herrenlos; der Verschlüsselungsmodus verschlüsselt ausgewählte Felder. Der Feldumfang ist `subject/content/text/code`, nicht sämtliche Daten; siehe [Datenverarbeitung und Sicherheitsmaßnahmen](/de/mail/data-security/);
- **E-Mail-Verschlüsselung**: AES-256-GCM verwendet einen zufälligen Initialisierungsvektor von 12 Byte; Schlüssel werden pro Nutzer über HKDF-SHA256 abgeleitet; die Quellen sind der Reihe nach `email_enc_key`, `totp_enc_key`, `jwt_secret`; fehlen sämtliche, wird ein Fehler ausgelöst, ohne auf einen eingebauten Standardschlüssel zurückzufallen;
- **Schutz von Zugangsdaten**: Neue Passwörter werden standardmäßig mit PBKDF2-HMAC-SHA256 über 210.000 Iterationen und zufälligem Salt gehasht; die Iterationszahl ist konfigurierbar, ältere Hashes werden bei der Anmeldung auf den aktuellen Stand gehoben. Aktivierte TOTP-Geheimnisse werden mit AES-256-GCM verschlüsselt; für Wiederherstellungscodes werden sowohl der SHA-256-Hash als auch eine verschlüsselte Kopie des Originalcodes gespeichert; Passkeys speichern den öffentlichen Schlüssel und Credential-Metadaten. Ausnahmen bei der Speicherung temporärer Authentifizierungsdaten und weiterer Zugangsdaten siehe [Datenverarbeitung und Sicherheitsmaßnahmen](/de/mail/data-security/);
- **Grenze**: Das Vorstehende ist serverseitige Verschlüsselung im Ruhezustand, keine Ende-zu-Ende-Verschlüsselung; Anhänge liegen außerhalb des Verschlüsselungsumfangs.

## 4. Anhang-Speicherkette

Die Binärdaten von Anhängen werden der Reihe nach gespeichert: vom Nutzer mitgebrachtes S3 → vom Betreiber konfiguriertes S3 → Cloudflare R2 → KV als Rückfallebene. Metadaten liegen in D1; Downloads verwenden signierte Links und defensive Header. Bei der physischen E-Mail-Löschung wird zuerst der Anhang-Index entfernt und die Objektlöschung in die Warteschlange eingetragen, anschließend werden verbleibende Referenzen geprüft; nach 10 fehlgeschlagenen Wiederholungen stoppt der Vorgang, eine vollständige synchrone Löschung aller Objekte ist nicht garantiert. Externe Kopien siehe [Liste der Drittanbieter](/de/mail/sub-processors/).

## 5. Sitzungen sowie Rollen und Berechtigungen

JWTs (HS256) sind standardmäßig 30 Tage gültig; KV speichert eine Sitzungs-Zulassungsliste sowie einen Nutzersnapshot, aus dem einige sensible Felder entfernt sind. Der Code prüft vor dem Aufnehmen einer neuen Sitzung, ob die Anzahl größer als 10 ist; üblicherweise können somit 11 erhalten bleiben, es besteht kein hartes Limit von genau 10; die KV-Lebensdauer kann durch Aktivität verlängert oder durch einige Operationen verkürzt werden. Abmelden entfernt die aktuelle Sitzung, Deaktivieren löscht die Sitzungsdatensätze des Kontos; die Berechtigungen folgen RBAC mit sechs vordefinierten Standardrollen:

| Rolle | Tägliche Sendungen | Speicherkontingent | Anhänge | Zusätzliche Befugnisse |
| --- | --- | --- | --- | --- |
| Besucher | Verboten | 0 | Nein | Nur-Lese-Sandbox |
| Normaler Nutzer | 5 Nachrichten | 5 MB | Nein | Grundlegender Versand und Empfang |
| Normaler Nutzer LV.0 | 8 Nachrichten | 10 MB | Nein | Aufwertung gekoppelt an Blog-Stufe |
| Normaler Nutzer LV.1 | 10 Nachrichten | 25 MB | Ja | Grundlegender Versand und Empfang mit Anhängen |
| Administrator | 100 Nachrichten | 500 MB | Ja | Nutzerverwaltung, Verwaltung sämtlicher E-Mails (durch den E-Mail-Modus begrenzt) |
| Master | Unbegrenzt | 1024 MB | Ja | Sämtliche Berechtigungen |

Geschützte Routen prüfen JWT, KV-Sitzung und die jeweils geltenden Rollenberechtigungen; einige öffentliche Endpunkte haben eigene Verifizierungsabläufe. Die Deaktivierung löscht die regulären Sitzungsdatensätze, ohne sämtliche Berechtigungen, Daten oder Kopien bei Dritten synchron zu entfernen.

## 6. E-Mail-Lebenszyklus

| Phase | Verhalten |
| --- | --- |
| Löschung | Normale Löschung setzt `is_del=1`; der tägliche Job räumt den Papierkorb ab, wenn `email.create_time` älter als 7 Tage ist, nicht erst 7 Tage nach dem Verschieben; eine ausdrückliche endgültige Löschung oder Kontingentbedingungen können die physische Löschung direkt auslösen |
| Spam-Quarantäne | `spamRetentionDays` beträgt standardmäßig 7 Tage ab E-Mail-Erstellung; die E-Mail wandert in den Papierkorb und kann im selben Durchlauf die Bedingung für die physische Löschung erfüllen |
| Kontingentbereinigung | Fordert der Nutzer eine Löschung an und übersteigt die vorhandene Speicherbelegung strikt 90 % des Kontingents, werden die ausgewählten E-Mails direkt physisch gelöscht; einen Hintergrundjob, der allein beim Erreichen von 90 % automatisch räumt, gibt es nicht |
| Offizielle E-Mails | Beim Lesen der E-Mail-Liste werden abgelaufene E-Mails von den festgelegten offiziellen Absenderadressen anhand von `welcomeExpireDays` (Standard 7 Tage) und Erstellungszeit als gelöscht markiert; die anschließende physische Bereinigung übernimmt separat der Papierkorb-Job |
| Kaskadenlöschung | Die endgültige Löschung normaler E-Mails und die Papierkorb-Bereinigung entfernen Anhang-Index und Sterne und registrieren Wiederholungen der Objektlöschung; der Abdeckungsumfang unterscheidet sich zwischen den Batch-Pfaden verschiedener Administratoren |
| Kontodeaktivierung | Es wird nur die Nutzerdatenzeile als gelöscht markiert und Sitzungen werden entfernt; Postfach, E-Mails und Profil werden nicht mit als gelöscht markiert, eine Aufgabe zur automatischen physischen Löschung 90 Tage nach der Deaktivierung gibt es nicht, siehe [Datenschutzrichtlinie](/de/mail/privacy-policy/) |

## 7. Sicherheitsdesign der Anwendung

- **Schutz vor Aufzählung im Routing**: E-Mail-URLs verwenden durchweg 20-stellige, mit HMAC-SHA256 signierte zufällige Hashes, gebunden an Nutzer und Tenant; fortlaufende IDs werden nicht offengelegt, Aufzählung und BOLA/IDOR sind konstruktiv ausgeschlossen;
- **Dreifacher XSS-Schutz**: DOMPurify-Whitelist-Bereinigung, Filterung von body-style-Injektionen sowie Anhang-Ausgabe hinter einer MIME-Whitelist mit strikter CSP und `nosniff`;
- **SSRF-Blockade**: Ausgehende Anfragen werden gegen öffentliche Adressen geprüft; Loopback-, RFC-1918- und Cloud-Metadaten-Adressen werden durchweg abgelehnt;
- **Anmeldeschutz**: Fehlversuche werden unter dem Schlüssel der eingegebenen Anmeldekennung gezählt; ab 5 Fehlern wird die Anmeldung abgelehnt, jeder Fehler schreibt einen 12-Stunden-TTL. Es handelt sich nicht um eine atomare Kontosperre, die alle Aliase teilen. Zusätzlich gelten Turnstile sowie TOTP-/Passkey-Verifizierung;
- **Integrität offizieller E-Mails**: Festlegung der offiziellen Absenderidentität, unveränderliche Snapshot-Zustellung und Dokumenten-Integritätsprüfung, siehe [Manipulationsschutz und offizielle Spezifikationen](/de/mail/tamper-proof/).

## 8. Beobachtbarkeit und Qualitätssicherung

- Das Repository aktiviert Cloudflare observability; die Anwendung speichert darüber hinaus in D1/KV Identitätsoperationen, Meldungen, Entscheidungen und Anmeldeumgebungsdaten. Die meisten Audit-Datensätze haben keinen automatischen Ablauf; die tatsächliche Aufbewahrungsdauer der Plattform-Logs muss verifiziert werden, siehe [Datenschutzrichtlinie](/de/mail/privacy-policy/);
- Über hundert automatisierte Test-, Audit- und Inspektionsskripte: Playwright-Browserregression über den echten Stack, End-to-End-Assertionen aus dem öffentlichen Netz, repo-weite statische Scans und das i18n-Dreigestirn für sechs Sprachen (siehe [Projektübersicht](/de/mail/project/), Abschnitt 7).

## 9. Zugehörige Dokumente

| Ressource | Link |
| --- | --- |
| Betriebsmodi: Bereitstellungsformen, E-Mail-Modi und Anmeldung | [Betriebsmodi](/de/mail/modes/) |
| Einstellungsanleitung: persönliche Einstellungen und Verwaltungskonsole | [Einstellungsanleitung](/de/mail/settings/) |
| Funktionsdetails mit Oberflächenabbildungen | [Funktionsanleitung](/de/mail/features/) |
| Positionierung und Entwicklungsgeschichte | [Projektübersicht](/de/mail/project/) |
| Verschlüsselungssemantik, Aufbewahrungsfristen und Rechte der betroffenen Personen | [Datenverarbeitung und Sicherheitsmaßnahmen](/de/mail/data-security/) |
| Spezifikationen offizieller E-Mails und Manipulationsschutz-Prüfung | [Manipulationsschutz und offizielle Spezifikationen](/de/mail/tamper-proof/) |
