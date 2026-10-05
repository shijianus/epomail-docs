---
title: Analysepagina
description: De analysepagina van EpoCanvas Mail — een beheerdersronde langs het e-mailvolume, het onderscheppingspercentage, de bronverdeling, de groeicurves en de AI-verbruikmeters.
---

**Datum van inwerkingtreding: 6 oktober 2026 | Versie: 5.15**

De analysepagina is het gegevensdashboard van de beheerzone (`#manage/admin/analysis`, rechten-sleutel `analysis:query`) en bundelt de e-mail-, gebruikers- en AI-verbruiksindicatoren van de instantie. De maatstaf van elke indicator volgt de e-mailmodus: in de versleutelde modus (Level 3) leest de beheerkant de e-mailinhoud van gebruikers niet; de betreffende tellingen zijn van metadataniveau.

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

## 3. Verwante documenten

| Bron | Link |
| --- | --- |
| Detailbeheer in de gebruikersdimensie | [Gebruikerslijst](/nl/mail/users/) |
| De configuratie van de AI-engine | [De configuratiekaarten van de systeeminstellingen](/nl/mail/system/) |
| Rechten-sleutels per groep verlenen | [Rechtenbeheer](/nl/mail/roles/) |
