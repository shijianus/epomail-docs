---
title: Such- und Regelreferenz
description: "Vollständige Such- und Regelreferenz von EpoCanvas Mail: E-Mail-Feldoperatoren, Bereichs-Flags, Präzisionsschalter, Hervorhebungsverhalten, administrative $-Suche, Einstellungssuche und sämtliche Bedingungen der Kategorien-Regel-Engine."
---

**Aktualisiert: 2. November 2026 | Version: 5.25**

EpoCanvas Mail hat zwei Suchsysteme: die nutzergerichtete E-Mail-Suche (Suchfeld in der Kopfzeile) und die administratorsgerichtete Gesamtbestandssuche (Abschnitt „Alle E-Mails“ im Verwaltungsbereich); die Einstellungsseiten haben darüber hinaus eine eigene Suche nach Konfigurationselementen. Diese Seite listet sämtliche Operatoren, Flags und Regelbedingungen einzeln auf, übereinstimmend mit der aktuellen Implementierung. Kategorienregeln teilen die Feldsemantik der Suche; die Regel-Engine wird ab Abschnitt 7 beschrieben.

![EpoCanvas Mail Suche: Nach der Eingabe von from:github zeigt die Liste nur Treffer-E-Mails mit hervorgehobenem Suchbegriff](/images/mail/en/ui/search-guide.png)

*Abb.: E-Mail-Suche. Operatoren lassen sich frei mit Schlüsselwörtern kombinieren; Treffer werden sofort hervorgehoben.*

<details>
<summary>Erläuterung zum Bild: Suche – die zwei zentralen Positionen einer Abfrage</summary>

Zwei markierte Bereiche zeigen eine vollständige Suche: Operatoren oder Schlüsselwörter werden ins Suchfeld eingegeben, die Trefferliste filtert sofort und hebt die Suchbegriffe hervor.

1. **Suchfeld in der Kopfzeile**: Sucht auf den E-Mail-Seiten nach E-Mails und auf den Einstellungsseiten nach Konfigurationselementen; unterstützt zehn Feldoperatoren wie `from:`/`to:`/`subject:`/`body:` sowie die Flags `is:`/`global:`; mehrere durch Leerzeichen verbundene Bedingungen gelten als UND-Beziehung, mit der Tabulatortaste lassen sich Operatoren vervollständigen.
2. **Trefferliste**: Zeigt nur E-Mails, die alle Bedingungen erfüllen; Treffer werden vom Browser nativ hervorgehoben (`hl:off` schaltet dies ab); ein Klick auf die Zeile öffnet die Detailansicht, das Auszugsfenster verschiebt sich automatisch zum Treffer und behält den Kontext.

</details>

## 1. Grundregeln der Syntax

- Mehrere Bedingungen werden durch Leerzeichen getrennt und verbinden sich als UND; getroffen wird erst, wenn alle erfüllt sind;
- Werte mit Leerzeichen werden in doppelte Anführungszeichen geschlossen, z. B. `subject:"Jahresbericht"`;
- Ein Schlüsselwort ohne Operator wird in fünf Feldern mit ODER gesucht: Betreff, Absendername, Absenderadresse, Empfängeradresse und Textkörper;
- Standardmäßig wird ohne Groß-/Kleinschreibung als unscharfe Teilzeichenfolge gesucht; Präzision und Groß-/Kleinschreibungsverhalten lassen sich über Flags ändern (Abschnitt 3).

```text
from:github subject:"Verifizierungscode" after:2026-10-01 exact:true
```

## 2. Feldoperatoren

Die zehn Feldoperatoren wirken auf das jeweilige Feld; Werte werden als Teilzeichenfolgen gesucht (außer Zeit- und Größenangaben):

| Operator | Wert | Bedeutung |
| --- | --- | --- |
| `from:<Wert>` | Text | Absenderadresse oder Absendername enthält den Wert; `from:me` entspricht `is:sent` |
| `to:<Wert>` | Text | Empfängeradresse oder Empfängername enthält den Wert |
| `subject:<Wert>` | Text | Gleicht nur den Betreff ab |
| `subject_or_body:<Wert>` | Text | Betreff oder Textkörper enthält den Wert |
| `body:<Wert>` | Text | Gleicht nur den Klartext des Textkörpers ab |
| `larger:<Byte>` | Ganzzahl | E-Mail-Größe (Gesamtlänge aus Textkörper und Inhalt) mindestens so viele Byte |
| `smaller:<Byte>` | Ganzzahl | E-Mail-Größe höchstens so viele Byte |
| `before:<Datum>` | YYYY-MM-DD | Empfang vor diesem Datum |
| `after:<Datum>` | YYYY-MM-DD | Empfang nach diesem Datum |
| `label:<Name>` | Label-Name | Trifft E-Mails mit diesem Label; bei Nicht-ASCII-Zeichen im Labelnamen werden doppelte Anführungszeichen empfohlen |

## 3. Bereich und Flags

Flags ändern Suchbereich oder Darstellungsverhalten und werden nach dem Parsen aus den Schlüsselwörtern entfernt:

| Flag | Verhalten |
| --- | --- |
| `global:` | Weitet die Suche auf alle Postfächer aus, unbeeinflusst durch die aktuelle Ansicht |
| `is:sent` | Erzwingt die Einbeziehung gesendeter E-Mails |
| `is:spam` | Wechselt den Abfragebereich zu Spam |
| `is:trash` | Wechselt den Abfragebereich zum Papierkorb |
| `is:draft` | Frontend-Sprung zum Entwurfsordner (Entwürfe liegen nur auf dem Gerät) |
| `hl:off` | Deaktiviert die Hervorhebung der Treffer |
| `exact:true` | Exakter Abgleich an Wortgrenzen, vermeidet versehentliche Treffer durch Teilzeichenfolgen |
| `case:true` | Aktiviert Groß-/Kleinschreibung |

## 4. Hervorhebung und Auszüge

Treffer werden in Liste und Detailansicht hervorgehoben; das Auszugsfenster verschiebt sich zum Treffer, um den Kontext zu erhalten. Bei `exact:true` leuchten nur ganzwörtige Treffer, bei `case:true` wird Groß-/Kleinschreibung unterschieden, `hl:off` schaltet sämtliche Hervorhebung ab. Die Hervorhebung rendert der Browser nativ, der E-Mail-Inhalt bleibt unverändert.

## 5. Administrative `$`-Suche

Der Abschnitt „Alle E-Mails“ im Verwaltungsbereich bietet eine erweiterte `$`-Syntax für die Gesamtbestandsprüfung durch Administratoren:

| Token | Bedeutung |
| --- | --- |
| `$sender` | Suche nach Absendername oder -adresse |
| `$user` | Suche nach dem Konto, dem die E-Mail gehört |
| `$to` | Suche nach dem empfangenden Konto |
| `$subject` | Suche nach Betreff |
| `$received` / `$sent` / `$deleted` / `$norecipient` / `$all` | Statusfilter: empfangen, gesendet, gelöscht, ohne Empfänger, alle |

Die Tokens unterstützen englische Groß-/Kleinschreibungsvarianten und chinesische Aliasse (etwa `$发件人`, `$用户`, `$收件人`, `$主题`); enthält ein Wert selbst `$`, wird es als `\$` maskiert. Ein Rechtsklick auf eine beliebige E-Mail in der Liste startet direkt eine Suche nach ihrem Absender, empfangenden Konto oder besitzenden Nutzer. Im verschlüsselten Modus (Stufe 3) bleibt die administrative E-Mail-Liste dauerhaft leer, die Syntax dieses Abschnitts ist damit nicht verfügbar, siehe [Betriebsmodi](/de/mail/modes/), Abschnitt 2.

## 6. Suche auf den Einstellungsseiten

Auf den Einstellungsseiten schaltet das Suchfeld automatisch zur Suche nach Konfigurationselementen um:

| Eingabe | Verhalten |
| --- | --- |
| ohne Präfix | Sucht nur innerhalb des aktuellen Einstellungsbereichs, hebt Treffer hervor und scrollt sanft zur Position, null Anfragen |
| `all:` oder `global:` | Durchsucht alle Einstellungsseiten, Ausklappmenge gruppiert nach Seiten, ein Klick springt zur Position |
| `app:`, `oauth:`, `client:` | Durchsucht OAuth-Apps in der Verwaltung der Drittanbieter-Apps |

Vervollständigungsvorschläge erscheinen während der Eingabe, mit der Tabulatortaste lässt sich ein Operator vervollständigen.

## 7. Bedingungen der Kategorienregeln

Der Regel-Builder im Labels-Bereich definiert jede Regel in zwei Schritten „Bedingungen + Ausnahmen“: Die Aktion läuft, wenn alle Bedingungen zutreffen und keine Ausnahme. Verfügbare Bedingungen:

| Bedingung | Bedeutung |
| --- | --- |
| `from` (Absender ist) | Absenderadresse oder -name im exakten Abgleich, mehrere durch Komma getrennte Werte unterstützt |
| `to` (Empfänger ist) | Empfänger im exakten Abgleich, mehrere Werte unterstützt |
| `sender_address_includes` (Absenderadresse enthält) | Abgleich nach Absenderdomäne oder Adressfragment |
| `recipient_address_includes` (Empfängeradresse enthält) | Abgleich nach Empfängerdomäne oder Adressfragment |
| `email_received_for_others` (auch an andere) | Die Adresse steht in einem weiteren Empfängerfeld |
| `subject_include` (Betreff enthält) | Betreff-Schlüsselwörter, mehrere Werte unterstützt |
| `message_body_includes` (Textkörper enthält) | Schlüsselwörter des Textkörpers, mehrere Werte unterstützt |
| `subject_or_body_include` (Betreff oder Textkörper enthält) | Eines von beiden trifft zu |
| `system_setting` (Systementscheidung) | Verweist auf eine systemweite Entscheidung (z. B. Whitelist-Treffer) |

:::note
Der Builder bietet darüber hinaus Bedingungen für Größe (`at_least`/`at_most`), Datum (`before`/`after`) und E-Mail-Header (`message_header_includes`); die aktuelle Version der Regel-Engine hat deren Bewertung noch nicht implementiert, eine ausgewählte Bedingung dieser Art trifft daher nicht zu. Sie sind hier aufgeführt, um Fehlkonfigurationen zu vermeiden.
:::

## 8. Aktionen und Priorität

- Trifft eine Regel zu, erhält die E-Mail das zugehörige Label gemäß der Regeldefinition;
- Der `priority`-Wert legt die Ausführungsreihenfolge fest, kleinere Werte zuerst;
- Ist `stopProcessing` aktiviert, endet bei einem Treffer dieser Regel die weitere Regelausführung;
- Regeln laufen beim E-Mail-Eingang automatisch, lassen sich aber auch manuell auf der Labels-Seite ausführen.

## 9. Eingebaute Heuristiken und Site-Governance

- Werkseitig sind vier Labels vorinstalliert: Community, Abos, Werbung und Arbeit; Abos und Werbung werden durch eingebaute Heuristiken gepflegt: Absender ohne Antwort-Präfix, Domänen von E-Mail-Marketingplattformen und Abmeldesignale laufen unter Abos; Rabatt- und Frist-Betreffwörter sowie die Dichte von Marketingwörtern unter Werbung;
- Site-weite Governance wird im Verwaltungsbereich „Kategorienverwaltung“ konfiguriert: Absender-Schwarz-/Weißlisten, Betreff- und Inhalts-Schlüsselwörter, Whitelist-Modus, Blockade leerer Absender, Blockade fremder Empfänger und Blockade ausführbarer Anhänge; ein Listen-Treffer setzt automatisch das zugehörige Label, harte Blockaden weisen E-Mails direkt ab und zählen mit;
- Details zum Verhalten von Regeln und Listen siehe [Funktionsanleitung](/de/mail/features/), Abschnitt 4.

## 10. Zugehörige Dokumente

| Ressource | Link |
| --- | --- |
| Oberflächenrouten und Position der Suchfelder | [Oberflächen- und Routenübersicht](/de/mail/interface/) |
| Verwaltungsort von Labels und Regeln | [Einstellungsanleitung](/de/mail/settings/) |
| Funktionsdetails mit Oberflächenabbildungen | [Funktionsanleitung](/de/mail/features/) |
| Einfluss des E-Mail-Modus auf den Suchbereich | [Betriebsmodi](/de/mail/modes/) |
