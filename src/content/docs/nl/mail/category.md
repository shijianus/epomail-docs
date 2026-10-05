---
title: Classificatiebeheer
description: Classificatiebeheer van EpoCanvas Mail — de schakelaars voor ontvangen en verzenden, de configuratie van AI-herkenning en de witte en zwarte lijsten met harde onderschepping op siteniveau.
---

**Datum van inwerkingtreding: 6 oktober 2026 | Versie: 5.15**

Classificatiebeheer is de governance-interface op siteniveau in de beheerzone (`#manage/admin/rules`, rechten-sleutel `setting:query`) en legt sitewijde regels voor inkomende e-mail bovenop de persoonlijke regels van gebruikers. De persoonlijke labelregels staan in [Label- en classificatiebeheer](/nl/mail/labels/); de betekenis van de voorwaardevelden in sectie 7 van de [Zoek- en regelreferentie](/nl/mail/search/).

## 1. Schakelaars voor ontvangst, verzending en verversen

De hoofdschakelaars voor de ontvangstfunctie, de verzendfunctie en het automatisch verversen, plus de schakelaar voor e-mail zonder geadresseerde; met ontvangst uit wordt inkomende e-mail ronduit geweigerd.

## 2. AI-herkenning

De extractie van verificatiecodes door Workers AI met haar regelconfiguratie, en de AI API Key／URL／model — van dezelfde bron als de AI Hub in de [systeeminstellingen](/nl/mail/system/); hier wordt het herkenningsgedrag voor inkomende e-mail gestuurd (de verificatiecodebadge en dergelijke).

## 3. Lijsten en onderschepping

| Mechanisme | Beschrijving |
| --- | --- |
| Zwarte lijst van afzenders | Bij een treffer volgt onderschepping; te configureren als labelmodus of als directe onderschepping |
| Witte-lijstmodus | Alleen afzenders op de witte lijst worden afgeleverd; de rest wordt volgens het beleid behandeld |
| Harde onderschepping van afzenders | Wijst ronduit af en telt de onderscheppingen op |
| Trefwoorden in onderwerp en inhoud | E-mail die een trefwoord van de zwarte lijst raakt, wordt onderschept |
| Onderschepping van afzenders zonder naam | E-mail zonder naam van de afzender wordt geweigerd |
| Onderschepping van niet-geadresseerden | E-mail waarvan de geadresseerden geen adres van deze instantie bevatten, wordt geweigerd |
| Onderschepping van uitvoerbare bijlagen | E-mail met uitvoerbare bijlagen wordt geweigerd |

## 4. De gelaagdheid met de gebruikerskant

De lijsten op siteniveau worden door de beheerder onderhouden en gelden voor de hele instantie; de regels aan gebruikerskant gelden alleen voor de eigen mailbox. Treffers op beide niveaus passen automatisch het bijbehorende label toe. Het gedrag van lijsten en trefwoorden in detail staat in sectie 9 van de [Zoek- en regelreferentie](/nl/mail/search/); de afhandeling van misbruik in het [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/).

## 5. Verwante documenten

| Bron | Link |
| --- | --- |
| Labels en regels aan gebruikerskant | [Label- en classificatiebeheer](/nl/mail/labels/) |
| Onderscheppingspercentage en bronverdeling controleren | [Analysepagina](/nl/mail/analysis/) |
| Controle in de e-maildimensie | [E-mailcontrole over de hele opslag](/nl/mail/review/) |
| De grenzen van bulkverzending | [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/) |
