---
title: Label- en classificatiebeheer
description: Label- en classificatiebeheer van EpoCanvas Mail — labels aanmaken met icoon en kleur, het onderhoud van de vier fabriekslabels via heuristiek, de bouwer van classificatieregels en de statistieken.
---

**Datum van inwerkingtreding: 6 oktober 2026 | Versie: 5.16**

Labels en classificatieregels worden beheerd in «Instellingen → Labels» (`#settings/labels`). De volledige veldtabel van de regelvoorwaarden staat in sectie 7 van de [Zoek- en regelreferentie](/nl/mail/search/); deze pagina behandelt het beheer van de labels zelf en de statistieken.

![Figuur: de label- en classificatie-interface](/images/mail/nl/ui/labels-guide.png)

*Figuur: de label- en classificatie-interface*


## 1. Labels aanmaken en hun uiterlijk

| Handeling | Beschrijving |
| --- | --- |
| Nieuw label | In het labelgebied van de zijbalk (tot 7) of op de labelpagina aanmaken en een naam geven |
| Icoon | Vrij te kiezen uit de ingebouwde pictogrambibliotheek; een eigen SVG is ook mogelijk |
| Kleur | Vrij te kiezen uit het labelpalet; lijst en zijbalk tonen hem gesynchroniseerd |
| Verwijderen | Bij het verwijderen van een label worden ook de verwijzingen ervan in regels opgeheven |

## 2. De vier fabriekslabels

| Label | Onderhoud |
| --- | --- |
| Gemeenschap | De standaardregel classificeert automatisch op veelvoorkomende openbare mailboxdomeinen |
| Abonnementen | Ingebouwde heuristiek: afzenders met een «no-reply»-voorvoegsel, domeinen van e-mailmarketingplatforms, afmeldsignalen |
| Promoties | Ingebouwde heuristiek: onderwerpregels met kortingen en tijdsbeperking, de dichtheid van marketingwoorden in de body |
| Werk | Handmatig onderhouden of via eigen regels |

De vier fabriekslabels zijn te bewerken en te verwijderen; de heuristische classificatie geldt alleen voor nieuwe e-mail die nog niet handmatig is behandeld.

## 3. De bouwer van classificatieregels

- Een regel bestaat uit twee stappen, «voorwaarden + uitzonderingen»: de actie wordt uitgevoerd wanneer alle voorwaarden treffen en geen enkele uitzondering treft;
- De voorwaardevelden (afzender, geadresseerde, onderwerp, body, bevat in het adres en dergelijke) en de syntaxis voor meerdere waarden staan in sectie 7 van de [Zoek- en regelreferentie](/nl/mail/search/); de invoer van waarden krijgt aanvullingen vanuit de back-end;
- De numerieke waarde van `priority` bepaalt de uitvoervolgorde (kleiner eerst), en `stopProcessing` breekt bij een treffer de verdere regels af;
- Regels worden automatisch uitgevoerd bij ontvangst van e-mail en kunnen op de labelpagina ook handmatig op bestaande e-mail worden uitgevoerd.

## 4. Statistieken en controle

- Het labelgebied in de zijbalk toont in realtime per label het totaal en het aantal ongelezen;
- De classificatieresultaten zijn in de beheerzone op de [Analysepagina](/nl/mail/analysis/) te controleren op bronverdeling; de sitewijde witte en zwarte lijsten en de harde onderschepping worden door de beheerder in [Classificatiebeheer](/nl/mail/category/) ingesteld.

<details>
<summary>Visuele handleiding: de labels en de bouwer van classificatieregels in stappen</summary>

1. Ga naar «Instellingen → Labels»; maak een label aan in het labelgebied van de zijbalk of op de labelpagina (de zijbalk toont er ten hoogste 7).
2. Kies voor het label een pictogram uit de ingebouwde bibliotheek of upload een eigen SVG, en kies de labelkleur.
3. Voeg in het regelgebied een regel toe volgens de twee stappen «voorwaarden + uitzonderingen»; de invoer van waarden krijgt vanzelf aanvullingen.
4. Stel `priority` (kleiner eerst) en `stopProcessing` (afbreken bij een treffer) in; regels worden bij ontvangst van e-mail automatisch uitgevoerd en kunnen ook handmatig worden uitgevoerd.

</details>

## 5. Verwante documenten

| Bron | Link |
| --- | --- |
| Regelvoorwaarden en zoekoperators | [Zoek- en regelreferentie](/nl/mail/search/) |
| Sitewijde lijsten en harde onderschepping | [Classificatiebeheer](/nl/mail/category/) |
| Het dashboard van de classificatie | [Analysepagina](/nl/mail/analysis/) |
| Waar de labelsectie in de instellingen zit | [Instellingengids](/nl/mail/settings/) |
