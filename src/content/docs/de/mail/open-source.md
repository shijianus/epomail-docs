---
title: "Open Source und Self-Hosting: Rechtliches"
description: Umfang der MIT-Lizenz, die Unterscheidung zwischen Autoren des Quellcodes und tatsächlichen Betreibern sowie die Datenschutzpflichten beim Self-Hosting.
---

**Aktualisiert: 2. November 2026 | Version: 5.25**

Diese Seite erläutert die Open-Source-Lizenz von EpoCanvas Mail und die Verantwortlichkeiten beim Self-Hosting. Das Projekt wird von einer Einzelperson auf nichtkommerzieller Basis gepflegt und dient dem Lernen und Testen; für den gehosteten Dienst gelten gesondert die [Nutzungsbedingungen](/de/mail/terms-of-service/) und die [Datenschutzerklärung](/de/mail/privacy-policy/). Bereitsteller müssen für ihren tatsächlichen Dienst eigene Bedingungen und Hinweise bereitstellen.

Die Version in Traditionellem Chinesisch (Taiwan) ist die verbindliche Fassung dieser Website; die anderen Sprachen sind Vergleichsübersetzungen. Diese Regelung beschränkt nicht die klare Information, die das anwendbare Recht verlangt, die verbraucherfreundliche Auslegung oder Rechte, die nicht ausgeschlossen werden können. Das Aktualisierungsdatum dokumentiert eine Textrevision und schreibt den mit dem Code mitgelieferten Originaltext der MIT-Lizenz nicht um.

![Rollenbeziehungen zwischen der Veröffentlichung von Quellcode und dem Betrieb einer Instanz](/images/mail/de/self-host-responsibilities.svg)

*Abb.: Die bloße Veröffentlichung von Code macht den Autor nicht zum Betreiber der Bereitstellung anderer; wer selbst betreibt oder die Datenverarbeitung bestimmt, unterliegt weiterhin den entsprechenden Pflichten.*

## 1. Lizenzbestimmungen

Der Quellcode ist unter der beiliegenden MIT License lizenziert; dieser Abschnitt ist eine Zusammenfassung und stets zusammen mit dem vollständigen Originaltext der Lizenz zu lesen.

1. Kopien der Software dürfen genutzt, vervielfältigt, geändert, zusammengeführt, veröffentlicht, verbreitet, unterlizenziert und verkauft werden; die nichtkommerzielle Ausrichtung des Projekts zieht die durch MIT erlaubte kommerzielle Nutzung nicht zurück.
2. Kopien der Software oder wesentliche Teile davon müssen die ursprünglichen Urheber- und Lizenzhinweise enthalten.
3. Die Lizenz enthält Klauseln zur Bereitstellung wie besehen und ohne Gewährleistung; sie wirken im Rahmen des anwendbaren Rechts.
4. Die Haftungsausschlüsse der Lizenz treten nicht über zwingendes Recht hinaus und befreien Autoren nicht automatisch von der Haftung, die daraus entsteht, dass sie gesondert einen gehosteten Dienst betreiben, tatsächlich Daten verarbeiten oder eigene Zusagen machen.

## 2. Jenseits der Lizenz

- MIT selbst verleiht keine Markenempfehlung oder Partnerstellung; die Nutzung von Namen und Kennzeichen unterliegt weiterhin den einschlägigen Rechten und Gesetzen, visuelle Assets richten sich nach ihrer tatsächlichen Lizenz.
- Selbst gehostete Sites müssen den tatsächlichen Betreiber klar kennzeichnen und dürfen sich nicht fälschlich als offizieller Betrieb, als offiziell zertifiziert oder als Upstream-Partner ausgeben.
- Abgeleitete Versionen sollten ihre Abweichungen vom Upstream beschreiben, um Wartung und Sicherheitsbewertung zu erleichtern; diese Seite fügt keine Nutzungsbeschränkungen für den Quellcode hinzu, die MIT widersprechen.

## 3. Rechtliche Stellung des Self-Hosters

- Rollen richten sich nach Zweck und Mitteln jeder einzelnen Verarbeitung. Bereitsteller sind für die von ihnen bestimmte Verarbeitung in der Regel Datenverantwortliche, können sie aber auch gemeinsam mit Dritten steuern oder für einen Dritten verarbeiten; Self-Hosting begründet nicht eine alleinige, ausschließliche Verantwortlichkeit, und nicht jeder einzelne Benutzer ist Datenverantwortlicher.
- Das anwendbare Recht ist nicht auf das Recht am Ort des Bereitstellers beschränkt. Prüfen Sie die Ansiedlungs- oder Extraterritorialitätsvoraussetzungen der DSGVO, die Vertraulichkeit der Kommunikation und den nicht abdingbaren Verbraucherschutz; Nichtkommerzialität befreit nicht von diesen Pflichten. Zu den Rollen im Einzelnen siehe Abschnitt 2 der [Übersicht](/de/mail/overview/).
- Die Dokumente dieser Website können als Vorlage für Hinweise dienen, doch Identität des Betreibers, Kontaktwege, Datenherkunft, Funktionen, Speicherdauer und Übermittlung sind zu verifizieren. Wer als Organisation Auftragsverarbeitung beauftragt, sollte zuvor die Annahme klären und bei Bedarf eine gesonderte DPA vereinbaren; das Kopieren von Dokumenten oder das Vergeben von Labels ersetzt keine Rechtsgrundlage und keine tatsächlichen Maßnahmen.
- Beziehungen zu Dritten entstehen nach den tatsächlichen Diensten und Verträgen; einige Anbieter sind für bestimmte Aktivitäten selbst Datenverantwortliche. Es dürfen nicht sämtliche Drittbedingungen pauschal den Benutzern auferlegt werden; Anbieter und Übermittlungsregelungen sind selbst zu prüfen. Die [Liste der Auftragsverarbeiter](/de/mail/sub-processors/) der gehosteten Instanz ist keine allgemeingültige Garantie.

## 4. Technische Hürden der Bereitstellung und Sicherheitsverantwortung

Konfigurieren Sie Schlüssel, Berechtigungen und Updates entlang der [Bereitstellungsanleitung](/de/mail/deployment/) und bewerten Sie Backups, Löschung, Reaktion auf Vorfälle und die erforderlichen Sicherheitsmaßnahmen. Upstream-Patches aktualisieren nicht automatisch alle Bereitstellungen; eine Testumgebung darf nicht als Erlaubnis verstanden werden, echte Daten beliebig einzusetzen.

Die bloße Veröffentlichung von Code umfasst kein SLA, keinen Support rund um die Uhr, kein dauerhaftes Hosting und keine Compliance-Zertifizierung. Der tatsächliche Betreiber muss die Pflichten zu Sicherheit und Rechteabwicklung weiterhin gemäß Risiko und anwendbarem Recht erfüllen; Verschlüsselung und Zugriffskontrolle garantieren keinen Schutz vor Datenabfluss, zu den konkreten Grenzen siehe [Datenverarbeitung und Sicherheit](/de/mail/data-security/).

## 5. Beiträge und Rückmeldungen

- Für Fehler und Funktionsvorschläge nutzen Sie [GitHub Issues](https://github.com/shijianus/epomail/issues), für Code Pull Requests; eine Annahme im Einzelfall oder eine Frist wird nicht zugesagt.
- Beitragende müssen berechtigt sein, Inhalte gemäß der im Repository geltenden Lizenz einzureichen, und erforderliche Drittangaben bewahren; die bloße Beteiligung macht sie nicht zum Betreiber oder Datenverantwortlichen der Instanz.
- Nicht offengelegte Schwachstellen und personenbezogene Daten melden Sie bitte privat über Abschnitt 5 der [Übersicht](/de/mail/overview/); Meldungen in gutem Glauben und rechtmäßige Forschung verlieren ihren Schutz nicht dadurch, dass sie das Projekt kritisieren.

## 6. Verwandte Dokumente

| Ressource | Link |
| --- | --- |
| Rechtliche Dokumente, Rollen und Rangfolge der Wirksamkeit | [Übersicht über Datenschutz und Nutzungsbedingungen](/de/mail/overview/) |
| Konfigurationsschritte für das Self-Hosting | [Bereitstellungsanleitung](/de/mail/deployment/) |
| Funktionen des gehosteten Dienstes und Grenzen des Supports | [Leistungsumfang und Support](/de/mail/service-scope/) |
| Rechtliche und technische Begriffe | [Begriffsdefinitionen](/de/mail/key-terms/) |
