---
title: Analysepagina
description: De analysepagina van EpoCanvas Mail — een beheerdersronde langs het e-mailvolume, het onderscheppingspercentage, de bronverdeling, de groeicurves en de AI-verbruikmeters.
---

**Datum van inwerkingtreding: 6 oktober 2026 | Versie: 5.17**

De analysepagina is het gegevensdashboard van de beheerzone (`#manage/admin/analysis`, rechten-sleutel `analysis:query`) en bundelt de e-mail-, gebruikers- en AI-verbruiksindicatoren van de instantie. De maatstaf van elke indicator volgt de e-mailmodus: in de versleutelde modus (Level 3) leest de beheerkant de e-mailinhoud van gebruikers niet; de betreffende tellingen zijn van metadataniveau.

![Figuur: de analysepagina](/images/mail/nl/ui/analysis-guide.png)

*Figuur: de analysepagina*

<details>
<summary>Visuele handleiding: De statistiekentop —  drie meters, drie vragen</summary>

De drie meters op de eerste schermhelft van de analysepagina: de bronverdeling antwoordt waar de mail vandaan komt, de twee groeicurves hoe actief de instantie is.

1. **Verdeling van de e-mailbronnen**: De samenstelling van inkomende mail uit directe aflevering op de site en uit externe kanalen — een gezondheidscheck van het afleverkanaal; het effect van de governance (onderscheppingspercentage en spamhoeveelheid) controleer je terug in Classificatiebeheer.
2. **Gebruikersgroeicurve**: Het verloop van het aantal geregistreerde en actieve gebruikers; afgezet tegen de groepsquota op de pagina Rechtenbeheer bepaal je wanneer je moet opschalen of de standaardgroep moet aanpassen.
3. **E-mailgroeicurve**: Het verloop van het totale verzonden en ontvangen volume; samen met de AI-aanroeptrend op dezelfde pagina toetst het of het dagquotum en de ratelimiet van de AI Hub in de systeeminstellingen nog passen.

</details>

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
