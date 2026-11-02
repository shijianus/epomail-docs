---
title: Übersicht über Datenschutz und Nutzungsbedingungen
description: Projektposition, tatsächliche Rollen bei der Datenverarbeitung, Aufbau der Rechtsdokumente, Rangfolge und Kontaktwege von EpoCanvas Mail.
---

**Aktualisiert: 2. November 2026 | Version: 5.25**

Diese Seite führt durch die Rechtsdokumente von EpoCanvas Mail. Lesen Sie die [Nutzungsbedingungen](/de/mail/terms-of-service/) und die [Datenschutzerklärung](/de/mail/privacy-policy/), bevor Sie ein Konto anlegen; wer die Dienstbedingungen nicht akzeptiert, sollte sich nicht registrieren. Das Lesen eines Dokuments ist keine Einwilligung in jede Verarbeitung personenbezogener Daten.

Nach der entsprechenden gemeinsamen Aktualisierung und Konfiguration zeigt der neue Registrierungsablauf Betreiberangaben, Bedingungsversion sowie Links zu Bedingungen und Datenschutzhinweisen und verlangt das Ankreuzen eines zunächst leeren Annahmekästchens. Fehlende Pflichtangaben schließen neue Registrierungen, ohne bestehende Anmeldungen oder administrative Initialisierung zu sperren. Für neue OAuth-Konten gilt dieselbe Prüfung; die Verknüpfung eines bestehenden Kontos erzwingt für sich keinen neuen Vertrag. Optionale Verarbeitung erfordert weiterhin gesonderte Entscheidungen; siehe [Einstellungsleitfaden](/de/mail/settings/#operator-notice) und [Nutzungsbedingungen](/de/mail/terms-of-service/). Diese Mechanismen belegen weder die Aktualisierung einer laufenden Instanz noch eine geprüfte echte Betreiberidentität oder tatsächlich geregelte Empfänger, Verträge und Speicherfristen.

Die Version in traditionellem Chinesisch (Taiwan) ist die offizielle Version dieser Website; die übrigen Sprachen sind Vergleichsübersetzungen. Diese Regelung schränkt die von anwendbarem Recht geforderte klare Information, eine verbraucherfreundliche Auslegung oder nicht abdingbare Rechte nicht ein. Das Aktualisierungsdatum erfasst eine Textänderung; Änderungen treten damit nicht automatisch gegenüber allen Nutzern in Kraft.

![Verhältnis von Nutzungsbedingungen, Datenschutzerklärung und ergänzenden Dokumenten](/images/mail/de/legal-architecture.svg)

*Abb.: Jedes Dokument behandelt seinen Gegenstand; zwingendes Recht sowie Datenschutz- und Verbraucherrechte haben Vorrang vor der vereinbarten Rangfolge der Dokumente.*

## 1. Plattformidentität

EpoCanvas Mail ist ein persönlich betriebenes Lern- und Testnebenprojekt ohne Gewinnerzielungsabsicht. Der Quellcode steht unter der MIT-Lizenz; der Dienst verwendet unter anderem Cloudflare Workers, D1, KV und R2. Bei Entwicklung und Wartung orientieren wir uns an den Datenschutzgrundsätzen der EU und unternehmen unter Berücksichtigung der tatsächlichen Datenrisiken, des Stands der Technik und angemessener Umsetzungskosten angemessene Anstrengungen, den Datenschutz zu verbessern. Bekannte Einschränkungen legen wir klar dar, damit Sie entscheiden können, ob Sie den Dienst und welche Funktionen nutzen möchten.

Die Bezugnahme auf EU-Grundsätze beschreibt die Ausrichtung des Projekts und den angestrebten angemessenen Sorgfaltsmaßstab. Sie ist weder eine Erklärung vollständiger Compliance noch ein Zertifikat, eine Eignung für jeden Zweck oder eine Garantie dafür, dass es keine Datenschutzvorfälle gibt. Ob die DSGVO und andere Gesetze gelten, richtet sich nach den tatsächlichen Tätigkeiten. Anwendbare zwingende Pflichten bleiben bestehen und werden weder durch den Testcharakter oder Risikohinweise noch durch die Zustimmung von Nutzern verringert. Konkrete Datenrisiken und mögliche Maßnahmen finden Sie in Abschnitt 1 der [Datenschutzerklärung](/de/mail/privacy-policy/).

1. Die gehostete Instanz ist `mail.epocanvas.com`, erreichbar unter dem Namen EpoCanvas, mit einer zugehörigen mobilen App. Identität, Standort und Kontaktdaten des tatsächlichen Betreibers werden nach Abschnitt 2 der Datenschutzerklärung offengelegt; ein Teamname begründet keine eigene Rechtspersönlichkeit.
2. Selbst gehostete Instanzen werden von ihrem tatsächlichen Betreiber verwaltet, der gesonderte Hinweise und Bedingungen entsprechend seiner Konfiguration und dem anwendbaren Recht veröffentlicht; Name oder Zusagen der gehosteten Instanz dürfen nicht einfach übernommen werden.

Der gehostete Dienst dient dem Lernen, der Entwicklung und gewöhnlichen Kommunikationstests durch Personen ab 16 Jahren mit der erforderlichen Geschäftsfähigkeit. Zugesichert werden kein SLA, keine Besetzung rund um die Uhr, kein dauerhaftes Hosting und keine Compliance-Zertifizierung. Er eignet sich nicht für Notfallkommunikation, gesetzliche Aufbewahrungspflichten oder als einzige wichtige Sicherungskopie; siehe [Leistungsumfang und Support](/de/mail/service-scope/).

## 2. Abgrenzung der Rollen in der Datenverarbeitung

Die Rollen richten sich danach, wer bei jedem Verarbeitungsvorgang die Zwecke und Mittel tatsächlich bestimmt, nicht allein nach Bezeichnungen wie „Open Source", „selbst gehostet" oder vertraglichen Etiketten. Auch für das anwendbare Recht kommt es auf mehr als den Standort des Betreibers an. Ob die DSGVO gilt, ist anhand von Tatbeständen wie Tätigkeiten einer Niederlassung, dem Anbieten von Waren oder Dienstleistungen an Personen in der EU oder der Überwachung von deren Verhalten zu prüfen; die Erreichbarkeit einer Website aus der EU reicht dafür allein nicht aus.

![Rollenverhältnisse zwischen Quellcode-Veröffentlichung, Instanzbetrieb und Nutzung](/images/mail/de/self-host-responsibilities.svg)

*Abb.: Allein die Veröffentlichung von Quellcode ist nicht der Betrieb einer Instanz einer anderen Person; Autoren, die gesondert betreiben oder die Verarbeitung bestimmen, bleiben nach ihrer tatsächlichen Rolle verantwortlich.*

| Situation | Datenverantwortlicher | Auftragsverarbeiter |
| --- | --- | --- |
| Gehostete Instanz | Der Betreiber verantwortet die Konto-, Sicherheits- und Kommunikationsdienstverarbeitung, deren Zwecke und Mittel er bestimmt; die Rolle bei E-Mail-Inhalten richtet sich nach der tatsächlichen Verwendung | Anbieter, die nach wirksamer Beauftragung und Weisung Infrastruktur oder Zustellung erbringen; derselbe Anbieter kann für selbst bestimmte Verarbeitungen eine andere Rolle haben |
| Selbst gehostete Instanz | Der Bereitsteller ist für die von ihm bestimmte Verarbeitung in der Regel Datenverantwortlicher; gemeinsame oder eigenständige Verantwortung oder Verarbeitung für einen anderen kommen ebenfalls vor, nicht automatisch ausschließlich | Bestimmt nach den tatsächlichen Diensten, Verträgen und Weisungen dieser Bereitstellung, nicht direkt nach der Liste der gehosteten Instanz |

Autoren und Beitragende, die nur Code veröffentlichen oder Korrekturen einreichen, übernehmen dadurch keine Betriebs- oder Verantwortlichenpflichten für Bereitstellungen anderer; betreibt dieselbe Person tatsächlich einen Dienst, greift diese Unterscheidung nicht. Einzelne Nutzer werden nicht allein durch das Senden oder Empfangen von E-Mails zu Datenverantwortlichen des Betreibers. Wer Daten für eine Organisation verarbeiten muss, stellt zuvor fest, ob dieser Zweck angenommen wird, und schließt erforderlichenfalls eine gesonderte Vereinbarung zur Auftragsverarbeitung (DPA) ab; eine Vereinbarung ändert die tatsächlichen Rollen nicht.

Das Fehlen einer an das Upstream-Projekt gemeldeten Nutzungsanalyse bedeutet nicht, dass es keine Netzwerkanfragen an Dritte gibt. Datenflüsse für Zustellung, Cloud-Infrastruktur, Menschlichkeitsprüfung, Schriftarten und wählbare Funktionen finden Sie in der [Liste der Unterauftragsverarbeiter](/de/mail/sub-processors/).

## 3. Aufbau der Dokumente

Die einzelnen Dokumente behandeln verschiedene Gegenstände. Ein Datenschutzhinweis ist weder eine pauschale Einwilligung in sämtliche Verarbeitungen noch eine Konformitätszertifizierung der Software oder des Dienstes.

| Dokument | Inhalt |
| --- | --- |
| [Datenschutzerklärung](/de/mail/privacy-policy/) | Datenquellen, Verarbeitungszwecke und Grundlagen, Aufbewahrung, Rechte und internationale Übermittlungen |
| [Nutzungsbedingungen](/de/mail/terms-of-service/) | Vertragsschluss, Nutzungsbedingungen, Änderungen, Beendigung, Haftung und Rechtsbehelfe |
| [Richtlinie zur akzeptablen Nutzung](/de/mail/acceptable-use/) | Untersagter Missbrauch, autorisierte Tests, verhältnismäßige Maßnahmen und Beschwerden |
| [Datenverarbeitung und Sicherheit](/de/mail/data-security/) | Datenlebenszyklus, Sicherheitskontrollen, Verschlüsselung und Exportgrenzen |
| [Liste der Unterauftragsverarbeiter](/de/mail/sub-processors/) | Anbieter, empfangene Daten, Auslösebedingungen und Übermittlungsregelungen |
| [Begriffsdefinitionen](/de/mail/key-terms/) | Geltungsbereich juristischer und technischer Begriffe |
| [Manipulationsschutz und offizielle Spezifikationen](/de/mail/tamper-proof/) | Erkennung offizieller E-Mails und Prüfung der Dokumentintegrität, keine staatliche oder Zertifizierung Dritter |

Zu Funktionen und Bereitstellung siehe außerdem den [Funktionsleitfaden](/de/mail/features/), die [Betriebsmodi](/de/mail/modes/), den [Bereitstellungsleitfaden](/de/mail/deployment/) und [Open Source und Rechtliches zur Selbstbereitstellung](/de/mail/open-source/).

## 4. Rangfolge

1. Zwingende Vorschriften des anwendbaren Rechts sowie nicht abdingbare Datenschutz- und Verbraucherrechte haben Vorrang; Vereinbarungen zum anwendbaren Recht und zu Gerichtsständen dürfen den gesetzlichen Zugang zu örtlichen Gerichten oder Aufsichtsbehörden nicht ausschließen.
2. Innerhalb dieser Grenzen regelt die Datenschutzerklärung Datenschutzangelegenheiten, die Nutzungsbedingungen die Dienstbedingungen und die Richtlinie zur akzeptablen Nutzung das Verhalten. Zweifel sind nach Thema und anwendbarem Recht auszulegen; begleitende Dokumente erweitern Haftungsbeschränkungen nicht.
3. Der offizielle Status der traditionell chinesischen Version unterliegt den Sprach- und Verbrauchergarantien am Anfang dieser Seite. Bekanntgabe wesentlicher Änderungen, erforderliche Einwilligung und Anwendungszeitpunkt richten sich nach Abschnitt 12 der Nutzungsbedingungen und nach der Datenschutzerklärung; fortgesetzte Nutzung ist nicht in jedem Fall eine Einwilligung in neue Verarbeitungszwecke.

Den Geltungsbereich des EU-Rechts können Sie im [offiziellen DSGVO-Text](https://eur-lex.europa.eu/eli/reg/2016/679/oj) nachlesen; Informationen zu den Aufsichtsbehörden enthält die [EDPB-Mitgliederliste](https://www.edpb.europa.eu/about-edpb/about-edpb/members_en).

## 5. Kontaktwege

- Datenschutz, Ausübung von Rechten und Beschwerden zum Datenschutz: `privacy@epocanvas.com`.
- Konto, Dienst und allgemeine Beschwerden: Nachrichten innerhalb der Website oder `admin@epocanvas.com`; ohne Anmeldung bleibt der E-Mail-Weg verfügbar.
- Fragen zum Quellcode: [GitHub Issues](https://github.com/shijianus/epomail/issues); veröffentlichen Sie keine personenbezogenen Daten, Zugangsdaten oder unveröffentlichte Schwachstellen.
- Selbst gehostete Instanzen: Kontakt über den von der jeweiligen Website veröffentlichten tatsächlichen Betreiber.

Ein Datenschutz-Postfach bedeutet nicht, dass ein Datenschutzbeauftragter (DPO) oder ein EU-Vertreter bestellt wurde. Der Betreiber bewertet die Bestellpflicht anhand der tatsächlich anwendbaren Voraussetzungen, nimmt Bestellungen vor, soweit gesetzlich erforderlich, und veröffentlicht überprüfbare Kontaktinformationen.
