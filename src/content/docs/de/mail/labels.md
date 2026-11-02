---
title: Labels und Kategorienverwaltung
description: "Labels und Kategorien von EpoCanvas Mail: Anlegen von Labels, Icons und Farben, heuristische Pflege der vier werkseitigen Labels, der Kategorien-Regel-Builder und die Statistikdarstellung."
---

**Aktualisiert: 2. November 2026 | Version: 5.25**

Labels und Kategorienregeln werden unter „Einstellungen → Labels“ (`#settings/labels`) verwaltet. Die vollständige Feldtabelle der Regelbedingungen steht in Abschnitt 7 der [Such- und Regelreferenz](/de/mail/search/); diese Seite beschreibt die Bedienung der Labels selbst und ihre Statistiken.

![Abbildung: Labels- und Kategorienverwaltung](/images/mail/en/ui/labels-guide.png)

*Abb.: Labels- und Kategorienverwaltung*

<details>
<summary>Erläuterung zum Bild: Labels – ein Eintrag zum Anlegen und drei Elemente pro Zeile</summary>

Drei markierte Bereiche der Labels-Seite: ein Eintrag zum Anlegen sowie die Zähler und Schalter in den Labelzeilen, sie decken sämtliche täglichen Label-Operationen ab.

1. **Schaltfläche „Label anlegen“**: Erstellt ein benutzerdefiniertes Label und vergibt den Namen; die Labels-Zone in der Seitenleiste zeigt höchstens 7 Einträge, werkseitig sind Community, Abos, Werbung und Arbeit vorinstalliert.
2. **Labelzeile**: Pro Label eine Karte: farbiges Label-Abzeichen (Icon aus der eingebauten Bibliothek oder eigenes SVG, Farbpalette frei wählbar) sowie drei Live-Zähler: Gesamtanzahl, aktuelle Anzahl und unbearbeitet.
3. **Sichtbarkeitsschalter und Zeilenaktionen**: Der Schalter steuert, ob das Label in der Seitenleiste erscheint; Bearbeiten ändert Aussehen und Regeln, das Löschen eines Labels hebt zugleich seine Verweise in Kategorienregeln auf.

</details>

## 1. Anlegen von Labels und ihr Erscheinungsbild

| Vorgang | Beschreibung |
| --- | --- |
| Label anlegen | In der Labels-Zone der Seitenleiste (höchstens 7) oder auf der Labels-Seite anlegen und benennen |
| Icon | Frei aus der eingebauten Icon-Bibliothek wählen, eigenes SVG ebenfalls unterstützt |
| Farbe | Label-Farbpalette frei wählbar, Liste und Seitenleiste zeigen sich synchron |
| Löschen | Beim Löschen eines Labels werden zugleich seine Verweise in Regeln aufgehoben |

## 2. Die vier werkseitigen Labels

| Label | Pflegeart |
| --- | --- |
| Community | Die Standardregel ordnet nach gängigen öffentlichen Postfachdomänen automatisch ein |
| Abos | Eingebaute Heuristik: Absender ohne Antwort-Präfix, Domänen von E-Mail-Marketingplattformen, Abmeldesignale |
| Werbung | Eingebaute Heuristik: Rabatt- und Frist-Betreffwörter, Dichte von Marketingwörtern im Textkörper |
| Arbeit | Manuell oder durch eigene Regeln gepflegt |

Die vier werkseitigen Labels lassen sich bearbeiten und löschen; die heuristische Einordnung greift nur bei neuen E-Mails, die noch nicht manuell bearbeitet wurden.

## 3. Kategorien-Regel-Builder

- Eine Regel besteht aus zwei Schritten „Bedingungen + Ausnahmen“: Die Aktion läuft, wenn alle Bedingungen zutreffen und keine Ausnahme;
- Die Bedingungsfelder (Absender, Empfänger, Betreff, Textkörper, Adress-enthält und so weiter) und die Mehrwert-Syntax stehen in Abschnitt 7 der [Such- und Regelreferenz](/de/mail/search/); die Werteingaben bieten Backend-Vervollständigung;
- Der `priority`-Wert legt die Ausführungsreihenfolge fest (kleinere zuerst), `stopProcessing` schneidet nach einem Treffer die nachfolgenden Regeln ab;
- Regeln laufen beim E-Mail-Eingang automatisch und lassen sich auf der Labels-Seite auch manuell auf bestehende E-Mails anwenden.

## 4. Statistiken und Überprüfung

- Die Labels-Zone in der Seitenleiste zeigt in Echtzeit die Gesamtanzahl und die ungelesenen Nachrichten je Label;
- Die Kategorisierungsergebnisse lassen sich auf der administrativen [Analyseseite](/de/mail/analysis/) nach Quellenverteilung überprüfen; site-weite Schwarz-/Weißlisten und harte Blockaden konfigurieren Administratoren unter [Kategorienverwaltung](/de/mail/category/).

<details>
<summary>Erläuterung zum Bild: Bedienungsschritte für Labels und Regel-Builder</summary>

1. „Einstellungen → Labels“ öffnen; in der Labels-Zone der Seitenleiste oder auf der Labels-Seite ein Label anlegen (die Seitenleiste zeigt höchstens 7).
2. Dem Label ein eingebautes Icon zuweisen oder ein eigenes SVG hochladen und die Label-Farbe wählen.
3. Im Regelbereich eine Regel in den zwei Schritten „Bedingungen + Ausnahmen“ hinzufügen; die Werteingaben bieten Vervollständigung.
4. `priority` (kleinere zuerst) und `stopProcessing` (spätere Regeln stoppen bei Treffer) setzen; Regeln laufen beim E-Mail-Eingang automatisch, eine manuelle Ausführung ist ebenfalls möglich.

</details>

## 5. Zugehörige Dokumente

| Ressource | Link |
| --- | --- |
| Regelbedingungen und Suchoperatoren | [Such- und Regelreferenz](/de/mail/search/) |
| Site-weite Listen und harte Blockaden | [Kategorienverwaltung](/de/mail/category/) |
| Kategorisierungs-Dashboards | [Analyseseite](/de/mail/analysis/) |
| Position des Labels-Bereichs in den Einstellungen | [Einstellungsanleitung](/de/mail/settings/) |
