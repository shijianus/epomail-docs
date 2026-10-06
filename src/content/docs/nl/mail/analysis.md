---
title: Analysepagina
description: De analysepagina van EpoCanvas Mail — een beheerdersronde langs het e-mailvolume, het onderscheppingspercentage, de bronverdeling, de groeicurves en de AI-verbruikmeters.
---

**Datum van inwerkingtreding: 6 oktober 2026 | Versie: 5.16**

De analysepagina is het gegevensdashboard van de beheerzone (`#manage/admin/analysis`, rechten-sleutel `analysis:query`) en bundelt de e-mail-, gebruikers- en AI-verbruiksindicatoren van de instantie. De maatstaf van elke indicator volgt de e-mailmodus: in de versleutelde modus (Level 3) leest de beheerkant de e-mailinhoud van gebruikers niet; de betreffende tellingen zijn van metadataniveau.

![Figuur: de analysepagina](/images/mail/nl/ui/analysis-guide.png)

*Figuur: de analysepagina*
*Aantekeningen: 1. e-mail Source ｜ 2. gebruiker Growth ｜ 3. e-mail Growth*


## 1. De indicatoren in één oogopslag

| Meter | Inhoud |
| --- | --- |
| E-mailvolume | Totaal ontvangen, totaal verzonden, aantal verwijderde e-mails |
| Gebruikers | Aantal geregistreerde gebruikers, actieve gebruikers, verwijderde gebruikers |
| Beheer | Onderscheppingspercentage van het systeem, hoeveelheid spam |
| Bronverdeling | Verdeling van de e-mailbronnen (directe aflevering op de instantie／externe kanalen en dergelijke) |
| Trends | Gebruikersgroeicurve, e-mailgroeicurve |
| AI | Trend van het aantal AI-aanroepen en het tokenverbruik, verdeling van het gebruik per AI-model |

## 2. Typisch gebruik

- Beoordelen of de quota van de identiteitsgroepen bijstelling nodig hebben (afgezet tegen de fabrieksstandaardwaarden van [Rechtenbeheer](/nl/mail/roles/));
- Het onderscheppingspercentage en de spamhoeveelheid volgen en daar de lijsten en trefwoorden van [Classificatiebeheer](/nl/mail/category/) op bijstellen;
- De AI-trend volgen en controleren of het dagquotum en de ratelimiet van de AI Hub in de [systeeminstellingen](/nl/mail/system/) nog passend zijn.

<details>
<summary>Visuele handleiding: de Analysepagina raadplegen in stappen</summary>

1. Ga in de beheerzone naar de «Analysepagina» (vereist `analysis:query`).
2. Bekijk de drie groepen indicatorkaarten: e-mailvolume, gebruikers en beheer.
3. Met de groeicurves volgt u de trend van gebruikers en e-mail; de bronverdeling controleert de samenstelling van inkomende e-mail.
4. De trend van AI-aanroepen en tokenverbruik en de verdeling van het gebruik per model dienen om het quotum en de ratelimiet in de systeeminstellingen te toetsen.

</details>

## 3. Verwante documenten

| Bron | Link |
| --- | --- |
| Detailbeheer in de gebruikersdimensie | [Gebruikerslijst](/nl/mail/users/) |
| De configuratie van de AI-engine | [De configuratiekaarten van de systeeminstellingen](/nl/mail/system/) |
| Rechten-sleutels per groep verlenen | [Rechtenbeheer](/nl/mail/roles/) |
