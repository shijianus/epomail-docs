---
title: Kategorienverwaltung
description: "Die Kategorienverwaltung von EpoCanvas Mail: Schalter für Empfang und Versand, Konfiguration der AI-Erkennung sowie Sperr- und Freigabelisten und Regeln für die harte Blockierung, die site-weite Governance-Ebene."
---

**Aktualisiert: 2. November 2026 | Version: 5.25**

Die Kategorienverwaltung ist die site-weite Governance-Oberfläche des Verwaltungsbereichs (`#manage/admin/rules`, Berechtigungsschlüssel `setting:query`) und lagert über die persönlichen Regeln der Benutzer eine instanzweite Governance des E-Mail-Empfangs. Persönliche Labelregeln finden Sie unter [Labels und Kategorienverwaltung](/de/mail/labels/); die Semantik der Bedingungsfelder ist in Abschnitt 7 der [Such- und Regelreferenz](/de/mail/search/) beschrieben.

![Abbildung: Die Oberfläche der Kategorienverwaltung](/images/mail/en/ui/category-guide.png)

*Abb.: Die Oberfläche der Kategorienverwaltung*

<details>
<summary>Visuelle Anleitung zur Kategorienverwaltung: vier Verteidigungslinien des site-weiten E-Mail-Empfangs</summary>

Die vier Governance-Karten der Kategorienverwaltung: von den Hauptschaltern für Empfang und Versand über die AI-Erkennung bis zu den Listen und der harten Blockierung, vier Verteidigungslinien des site-weiten Empfangs.

1. **Karte E-Mail-Einstellungen (Empfangs- und Sendeschalter)**: Hauptschalter für Empfang, Versand und automatische Aktualisierung sowie der Schalter für den Umgang mit E-Mails ohne Empfänger; ist der Empfang ausgeschaltet, werden eingehende E-Mails direkt abgewiesen.
2. **Karte AI-Modell und API-Schlüssel-Integration**: Extraktion von Verifizierungscodes per Workers AI samt ihrer Regeln sowie die Konfiguration von AI-API-Key/URL/Modell — gleiche Quelle wie der AI Hub; hier wird das Verhalten der eingehenden Erkennung gesteuert (Verifizierungscode-Abzeichen und Ähnliches).
3. **Karte Basislistenregeln**: Absender-Sperrliste (konfigurierbar als Labelmodus oder direkte Blockierung), Freigabelistenmodus (nur Absender innerhalb der Freigabeliste werden zugestellt), Sperrlisten für Betreff- und Inhaltsschlüsselwörter, Blockierung leerer Absender, Blockierung fremder Empfänger sowie Blockierung ausführbarer Anhänge.
4. **Karte Regeln für harte Blockierung**: das letzte Mittel, das direkt ablehnt und den Blockierungszähler fortlaufend erhöht; Listentreffer erhalten automatisch das entsprechende Label, die Blockierungswirkung lässt sich auf der Analyseseite nachprüfen.

</details>

## 1. Schalter für Empfang, Versand und Aktualisierung

Hauptschalter für Empfangsfunktion, Versandfunktion und automatische Aktualisierung sowie der Schalter für den Umgang mit E-Mails ohne Empfänger; ist die Empfangsfunktion ausgeschaltet, werden eingehende E-Mails direkt abgewiesen.

## 2. AI-Erkennung

Extraktion von Verifizierungscodes per Workers AI samt ihrer Regelkonfiguration sowie AI-API-Key / URL / Modell — gleiche Quelle wie der AI Hub der [Systemeinstellungen](/de/mail/system/); hier wird das Verhalten der eingehenden Erkennung gesteuert (Verifizierungscode-Abzeichen und Ähnliches).

## 3. Listen und Blockierung

| Mechanismus | Beschreibung |
| --- | --- |
| Absender-Sperrliste | Treffer werden blockiert; konfigurierbar als Labelmodus oder direkte Blockierung |
| Freigabelistenmodus | nur Absender innerhalb der Freigabeliste werden zugestellt; alle übrigen werden nach Richtlinie behandelt |
| Harte Blockierung von Absendern | direkte Ablehnung mit fortlaufend erhöhtem Blockierungszähler |
| Betreff- und Inhaltsschlüsselwörter | E-Mails, die Schlüsselwörter der Sperrliste treffen, werden blockiert |
| Blockierung leerer Absender | E-Mails ohne Absendernamen werden abgewiesen |
| Blockierung fremder Empfänger | E-Mails, deren Empfänger keine Adresse dieser Instanz enthalten, werden abgewiesen |
| Blockierung ausführbarer Anhänge | E-Mails mit ausführbaren Anhängen werden abgewiesen |

## 4. Abgrenzung zur Benutzerebene

Site-weite Listen werden von Administratoren gepflegt und wirken auf die gesamte Instanz; benutzerseitige Regeln wirken nur auf das eigene Postfach, und Treffer auf beiden Ebenen erhalten automatisch das entsprechende Label. Details zum Verhalten der Listen und Schlüsselwörter finden Sie in Abschnitt 9 der [Such- und Regelreferenz](/de/mail/search/), den Umgang mit Missbrauch in der [Richtlinie zur akzeptablen Nutzung](/de/mail/acceptable-use/).

<details>
<summary>Visuelle Anleitung: Bedienungsschritte der site-weiten Governance</summary>

1. Verwaltungsbereich „Kategorienverwaltung" öffnen (Berechtigungsschlüssel `setting:query` erforderlich).
2. Schalter für Empfang / Versand und automatische Aktualisierung sowie den Umgang mit E-Mails ohne Empfänger konfigurieren.
3. Die Verifizierungscode-Erkennung per Workers AI und ihre API-Parameter konfigurieren.
4. Nach Bedarf aktivieren: Absender-Sperrliste, Freigabelistenmodus, harte Blockierung von Absendern, Betreff- und Inhaltsschlüsselwörter, Blockierung leerer Absender, Blockierung fremder Empfänger, Blockierung ausführbarer Anhänge.
5. Listentreffer erhalten automatisch das Label, die harte Blockierung lehnt direkt ab und zählt mit; die Blockierungswirkung lässt sich anschließend auf der Analyseseite nachprüfen.

</details>

## 5. Verwandte Dokumente

| Ressource | Link |
| --- | --- |
| Benutzerseitige Labels und Regeln | [Labels und Kategorienverwaltung](/de/mail/labels/) |
| Überprüfung der Blockierungsquote und der Quellenverteilung | [Analyseseite](/de/mail/analysis/) |
| E-Mail-dimensionale Prüfung | [Überprüfung aller E-Mails](/de/mail/review/) |
| Grenzen des Massenversands | [Richtlinie zur akzeptablen Nutzung](/de/mail/acceptable-use/) |
