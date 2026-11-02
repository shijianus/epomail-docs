---
title: Schnellstart
description: "Schnellstart mit EpoCanvas Mail: der kürzeste Weg von der Registrierung bis zur ersten gesendeten Nachricht auf der gehosteten Instanz und die vollständige Sequenz vom Klonen des Repositorys bis zur Sende- und Empfangsprüfung auf einer selbst gehosteten Instanz."
---

**Aktualisiert: 2. November 2026 | Version: 5.25**

Diese Seite beschreibt die Registrierung auf der gehosteten Instanz (Weg A) und die Selbstbereitstellung (Weg B). Die folgenden Zeiten sind Schätzungen für die funktionale Einrichtung, ohne rechtliche oder sicherheitsbezogene Vorbereitung. Die beschriebenen neuen Registrierungs- und Datenkontrollen erfordern die gemeinsame Bereitstellung und Konfiguration des aktualisierten Workers, der React-Anmeldeoberfläche und der Vue-Einstellungsoberfläche; diese Seite belegt keine Aktualisierung oder Prüfung einer laufenden Instanz. Weitere Funktionen und Einstellungen erläutern die jeweiligen Leitfäden.

Die Rechtsdokumente dieser Website in traditionellem Chinesisch (Taiwan) sind die maßgebliche Version; die übrigen Sprachen sind Vergleichsübersetzungen, und im Zweifelsfall gilt die maßgebliche Version.

![EpoCanvas Mail Bereitstellungswege: derselbe Open-Source-Code, wobei jede gehostete oder selbst gehostete Instanz Ressourcen und externe Dienste entsprechend der Auswahl ihres tatsächlichen Betreibers nutzt](/images/mail/de/dual-nature-scale.svg)

*Abb.: Beide Wege laufen mit demselben Code. Auf der gehosteten Instanz muss die nutzende Person bei der Registrierung ausdrücklich das Kästchen zur Annahme der [Nutzungsbedingungen](/de/mail/terms-of-service/) ankreuzen; die [Datenschutzerklärung](/de/mail/privacy-policy/) informiert über die Verarbeitung und ist keine pauschale Einwilligung. Ab der Selbstbereitstellung muss der Bereitstellende die eigene Rolle anhand der tatsächlichen Verarbeitung bewerten (siehe [Datenschutz- und Nutzungsbedingungen-Übersicht](/de/mail/overview/), Abschnitt 2).*

## 1. Wahl des Wegs

| | Weg A: gehostete Instanz | Weg B: Selbstbereitstellung |
| --- | --- | --- |
| Geeignet für | das Produkt zuerst ausprobieren, ohne eigene Infrastruktur | bereits im Besitz einer Domain und eines Cloudflare-Kontos und Wunsch nach voller Datenhoheit |
| Voraussetzungen | ein Browser | Domain, Cloudflare-Konto, Node.js und pnpm; für ausgehende E-Mails zusätzlich ein Konto bei einem Zustellungskanal |
| Zeitaufwand | rund 10 Minuten | rund 30 Minuten |
| Kosten | derzeit keine kostenpflichtigen Funktionen | der eigene Cloudflare-Verbrauch des Bereitstellenden |
| Einstieg | [mail.epocanvas.com](https://mail.epocanvas.com) | [Bereitstellungsleitfaden](/de/mail/deployment/) |

## 2. Weg A: gehostete Instanz

1. **Konto erstellen**: Öffnen Sie [mail.epocanvas.com](https://mail.epocanvas.com), wechseln Sie auf der Anmeldeseite zum Registrierungsformular, prüfen Sie die von der Instanz angezeigten Betreiberangaben, die aktuelle Fassung der Bedingungen und die [Nutzungsbedingungen](/de/mail/terms-of-service/), und setzen Sie vor dem Absenden einer Adresse nach dem Muster „Präfix @ Instanz-Domain" mit einem Passwort (6–30 Zeichen) das nicht vorangekreuzte Kästchen „Ich akzeptiere die Nutzungsbedingungen". Die [Datenschutzerklärung](/de/mail/privacy-policy/) informiert dabei über die Verarbeitung; ein Kästchen ist keine pauschale Einwilligung in den Datenschutz. Fehlen erforderliche Rechtshinweise oder Angaben zur Fassung der Bedingungen, wird die Neuregistrierung geschlossen. Diese Sperre betrifft nur neue Registrierungen; bestehende Anmeldungen und administrative Initialisierungspfade bleiben verfügbar. Ob ein Einladungscode oder eine Menschlichkeitsprüfung erforderlich ist, entscheidet die Instanzkonfiguration; fordern Sie bei Bedarf einen Code beim Betreiber an oder gelangen Sie über den Parameter `?code=` direkt zum Registrierungsformular. Die Registrierung wirkt sofort, eine E-Mail-Verifizierung ist nicht nötig.
2. **Identitätsgruppe prüfen**: Nach der Registrierung gelangen Sie in die von der Instanz voreingestellte Gruppe; bei der Registrierung mit Einladungscode gelangen Sie in die an diesen Code gebundene Gruppe. Die Gruppe bestimmt das tägliche Sendekontingent, die Postfachanzahl, das Speicherkontingent und die Anhangsrechte; die werkseitig eingespielten Werte stehen in [Betriebsmodi](/de/mail/modes/), Abschnitt 3.
3. **Erste Nachricht empfangen**: Prüfen Sie nach der Registrierung die Willkommensnachricht und senden Sie synthetische Testinhalte von einem von Ihnen kontrollierten externen Postfach, um den Empfang zu prüfen. Die Extraktion von Verifizierungscodes ist standardmäßig aus: Die Instanz muss `verificationCodeEnabled` aktivieren und aktuelle Verarbeitungshinweise bereitstellen; zusätzlich müssen Sie Ihre standardmäßig ausgeschaltete persönliche Einstellung aktivieren. Jede Übersetzungsanfrage erfordert die Bestätigung der aktuellen Hinweise; Bild-OCR verlangt außerdem eine ausdrückliche Auswahl für diese Anfrage und die serverseitige Freigabe. Der Rückgriff auf öffentliche Übersetzung ist standardmäßig aus. Siehe [Einstellungsleitfaden](/de/mail/settings/#optional-processing).
4. **Erste Nachricht senden**: Klicken Sie in der Seitenleiste auf „Schreiben", um die Schreibebene zu öffnen. Empfänger auf der Instanz erhalten die Zustellung direkt; externe Adressen gehen über den vom Betreiber konfigurierten Zustellungskanal. Das Sendevolumen unterliegt dem täglichen Sendekontingent; der Zähler wird täglich zurückgesetzt.
5. **Automatische Sortierung einschalten**: Werkseitig sind vier Labels voreingestellt, nämlich Sozial, Abonnements, Werbung und Arbeit, und neue E-Mails werden nach integrierten Heuristiken einsortiert; eigene Regeln, Ausnahmen und Prioritäten behandelt [Labels und Klassifizierungsverwaltung](/de/mail/labels/).
6. **Zwei-Faktor-Verifizierung aktivieren**: Binden Sie unter „Einstellungen → Sicherheit" in drei Schritten eine Authenticator-App (TOTP) an; nach Abschluss werden 10 Einmal-Wiederherstellungscodes angezeigt, die Sie offline aufbewahren sollten. Die Schritte stehen im [Einstellungsleitfaden zur Kontosicherheit](/de/mail/security/).
7. **Telegram-Push anbinden** (optional): Empfangen Sie neue E-Mails in Echtzeit über Ihren eigenen Bot, mit einem für 7 Tage gültigen Lese-Link innerhalb der Instanz. Die Schritte stehen im [Leitfaden zu Benachrichtigungen und Weiterleitung](/de/mail/notify/).
8. **Daten exportieren** (optional): Laden Sie unter „Einstellungen → Daten" JSON mit den ausgewählten personenbezogenen Daten und den Feldern ungelöschter E-Mails herunter; Anhangsdateien, das vollständige ursprüngliche MIME und sämtliche Sicherheitseinstellungen sind nicht enthalten. Der Papierkorb wird nach einer Erstellungszeit der E-Mail von über 7 Tagen geleert; speichern Sie benötigte Anhänge vor dem Löschen separat. Siehe [Datenexport und Speicher](/de/mail/data/), die [Datenschutzerklärung](/de/mail/privacy-policy/), [Datenverarbeitung und Sicherheitsmaßnahmen](/de/mail/data-security/) und die [Liste der externen Verarbeiter](/de/mail/sub-processors/).

## 3. Weg B: Selbstbereitstellung

1. **Voraussetzungen prüfen**: eine Domain, ein Cloudflare-Konto, Node.js und pnpm; für ausgehende E-Mails ein Konto bei einem Zustellungskanal wie Resend oder Mailjet. Die vollständige Liste steht im [Bereitstellungsleitfaden](/de/mail/deployment/), Abschnitt 1. Vor einer Kaltbereitstellung zuerst `temp_login_ui` (React) und danach `mail-vue` (Vue) bauen; der `mail-vue`-Build kopiert die Anmeldeoberfläche in die statischen Worker-Assets.
2. **Bauen und bereitstellen**: Bauen Sie die Oberflächen und stellen Sie den Worker in dieser Reihenfolge bereit (Bereitstellungsziel und eigene Domains werden in `wrangler.toml` konfiguriert):

```bash
git clone https://github.com/shijianus/epomail.git
cd epomail
pnpm --dir mail-worker install --frozen-lockfile
node scripts/build-prod.mjs
```

3. **Geheimnisse setzen und bereitstellen**: Führen Sie im Repository-Stamm `pnpm --dir mail-worker exec wrangler secret put jwt_secret` und `pnpm --dir mail-worker exec wrangler secret put totp_enc_key` aus; ein ebenso eingerichtetes separates `init_secret` wird empfohlen. Führen Sie danach `pnpm --dir mail-worker exec wrangler deploy` aus. Geben Sie Werte interaktiv ein, niemals in URLs, versionierten Dateien oder öffentlichen Beispielen.
4. **Initialisieren und Hinweise konfigurieren**: Senden Sie `POST /api/init` über HTTPS mit `init_secret` im Header `x-init-secret` (nur ohne separates Geheimnis wird auf `jwt_secret` zurückgegriffen), um Tabellen, Standardgruppen und das Hauptkonto anzulegen. Ein in der Antwort enthaltenes Anfangspasswort ist vertraulich aufzubewahren und sofort zu ändern. Melden Sie sich in der Verwaltung an und vervollständigen Sie die [Betreiberhinweise](/de/mail/settings/#operator-notice), bevor Sie Registrierungen öffnen; fehlende Angaben sperren weder die administrative Initialisierung noch bestehende Anmeldungen.
5. **Eingang anbinden**: Aktivieren Sie Email Routing für die Domain im Cloudflare-Dashboard und leiten Sie die Zieladressen an den Worker weiter; eingehende E-Mails werden beim Eintreffen sofort geparst.
6. **Ausgang anbinden**: Konfigurieren Sie den Zustellungskanal in den Systemeinstellungen; bis dahin können Postfächer auf der Instanz weiterhin direkt untereinander zustellen.
7. **Senden und Empfangen prüfen**: Prüfen Sie in einer isolierten Testumgebung mit eigens angelegten Konten und synthetischen Daten die Vertragsannahme bei Registrierung, Willkommensmail, internen Austausch sowie externen Versand und Empfang; veröffentlichen Sie keine Produktionszugangsdaten. Diese funktionalen Rauchtests belegen weder vollständige Sicherheit, Datenschutz-, Lösch- oder Rechtsvorbereitung noch eine unmittelbare Freigabe für echte Nutzer.
8. **Rechtliche Stellung bestätigen**: Bewerten Sie Rollen anhand der tatsächlichen Entscheidung über Zwecke und Mittel; Selbsthosting macht Sie nicht automatisch zum alleinigen Verantwortlichen. Veröffentlichen Sie echte Identität, Standort, Kontakt und gesetzlich erforderliche Anschrift und prüfen Sie Empfänger, wirksame Verträge, Übermittlungen und Speicherfristen. Vorlagen oder ausgefüllte Einstellungen beweisen diese Tatsachen nicht. Siehe [Open Source und Rechtliches zur Selbstbereitstellung](/de/mail/open-source/).

## 4. Nach dem Einstieg

- Funktionspanorama und Bedienung jeder Oberfläche: [Funktionsleitfaden](/de/mail/features/), [Oberflächen- und Routenübersicht](/de/mail/interface/);
- Suche und Automatisierung im Detail: [Such- und Regelreferenz](/de/mail/search/), [Labels und Klassifizierungsverwaltung](/de/mail/labels/);
- Administratorkonfiguration und Betriebsmodi: [Einstellungsleitfaden](/de/mail/settings/), [Betriebsmodi](/de/mail/modes/);
- Bei Problemen: Supportkanäle in [Leistungsumfang und Support](/de/mail/service-scope/), Abschnitt 4; Leistungsgrenzen und Aufbewahrungsfristen in Abschnitt 2 derselben Seite.
