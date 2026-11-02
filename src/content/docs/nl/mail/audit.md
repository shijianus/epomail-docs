---
title: Auditrapport
description: "Het auditrapport van EpoCanvas Mail — de risicoticketconsole met vier panelen: gedifferentieerde kolommen voor misbruikdreigingen, beroepsonderzoek, risicobeheer en actielog, met een bewijslade, batchafhandeling en beroepsarbitrage voor beheerders."
---

**Bijgewerkt op: 2 november 2026 | Versie: 5.25**

Het auditrapport is de risicoticketconsole van het beheergebied (`#manage/admin/audit`; raadplegen vereist `setting:query`, afhandelen, arbitrage en opruimen vereisen `setting:set`). Tickets worden bewaard in een aparte auditlogtabel met gepagineerde geschiedenis. Vier paneelkaarten bovenaan vatten elk één ticketklasse samen; een klik schakelt de werkbank naar de gedifferentieerde tickettabel van dat paneel.

![Auditrapportpagina van EpoCanvas Mail: vier paneelkaarten bovenaan en een gedifferentieerde tickettabel, de misbruikdreiging-kaart met tellers voor in behandeling en geblokkeerd, met een werkbalk voor batchverlenging, verversen, resetten, data-export, geschiedenisopruiming en een documentatielink](/images/mail/nl/ui/audit-guide.png)

*Figuur: auditrapport. De vier kaarten zetten de richting, tickets worden rij voor rij beoordeeld, en de bewijslade plus de CSV-export maken de cyclus af.*

<details>
<summary>Uitleg bij de figuur: auditrapport — zes aanknopingspunten van de console</summary>

De zes geannoteerde zones van de pagina: de vier paneelkaarten bepalen de beoordelingsrichting, de bewijslade en de data-export maken het werk af.

1. **Kaart Misbruikdreigingen**: het geconsolideerde register van bedreigingsaccounts LV3 en hoger (multi-accounting, ernstige meldingen, doorverkoop van accounts, enz.), met de live telling «in behandeling N / geblokkeerd N»; een klik opent het dreigingenpaneel, en de balk «vandaag automatisch ingeklapte batches» klapt de automatisch gearchiveerde routinebatches open.
2. **Kaart Beroepsonderzoek**: het aantal beroepstickets dat gebruikers tegen een uitspraak hebben ingediend; ga naar het beroepenpaneel en toets elk formulier na.
3. **Kaart Risicobeheer**: het aantal routinetickets zoals spam en roamende IP-sprongen; ga naar het risicopaneel en beoordeel op overtredingsniveau.
4. **Kaart Actielog**: het register van afgeronde tickets (blokkades, deblokkades, archiefupdates); ga naar het logpaneel en volg het hele traject terug.
5. **Bewijslade (Details)**: de knop «Details» bij elk ticket opent een alleen-lezen bewijslade: de vergelijking van werkelijke bewijswaarden met de referentie, de volledige afhandelingstijdlijn en een multidimensionaal risicoprofiel.
6. **Data exporteren**: exporteert de tickets van het huidige paneel als CSV met alle kolommen, voor beoordeling offline en archivering.

</details>

## 1. Vier panelen en hun gedifferentieerde tickettabellen

| Paneel | Tickets | Kolommen |
| --- | --- | --- |
| Misbruikdreigingen | Bedreigingsaccounts LV3+: multi-accounting, ernstige meldingen, doorverkoop, enz. | Compacte afhandelweergave: nummer, doelwit, status, categorie, afhandeling en acties |
| Beroepsonderzoek | Beroepen van gebruikers tegen een uitspraak | Ticketnr., identiteitsgroep, overtredingscategorie, alarmen, advies, vervaltijd en eindbevoegdheid |
| Risicobeheer | Routinerisico's: spam, IP-sprongen, enz. | Extra kolommen voor overtredingsniveau, alarmreden en deadline |
| Actielog | Afgeronde afhandelingen en archiefupdates | Extra kolommen voor updates, laatste update en beroepen |

De vier panelen delen dezelfde filters en batchhulpmiddelen: na selectie kunt u batchgewijs deblokkeren, blokkeren, verlengen of verwijderen; op het dreigingenpaneel zijn de batchacties beperkt tot verantwoordelijke toewijzen, onderzoek starten en vrijgeven, om massale permanente sancties te voorkomen.

## 2. Ticketbeoordeling en afhandeling

- Elk ticket draagt een nummer, een doelwit (e-mail en gebruikers-ID), een statusbadge (in behandeling, geblokkeerd, vrijgegeven, enz.), een overtredingscategorie en een afhandeladvies; de overtredingscategorieën (uitzendmisbruik, accountbeveiliging, inhoudsnaleving, quotumontwijking, enz.) sluiten aan bij de sanctieladder van sectie 6 van het [Acceptabel gebruik beleid](/mail/acceptable-use/);
- De adviezen komen van de beleidsengine (blokkade adviseren, blokkade behouden, tijdelijke blokkade van N dagen, doorlopend observeren, routinearchief, enz.), en de kolom eindbevoegdheid registreert wie besliste: het systeemrisicobeleid (automatisch enginevonnis), een beveiligingsauditor of de masterbeheerder;
- Inline-acties omvatten deblokkeren, opnieuw blokkeren, verlengen (7 / 30 / 90 dagen of permanent) en toegevoegde notities; de kolom verantwoordelijke onderscheidt geautomatiseerde systeemprogramma's van menselijke beheerders.

## 3. Bewijslade en afhandelingstijdlijn

«Details» opent de bewijslade van het blokkaderegister (alleen-lezen) — het blokkaderegister is een openbaar, transparant register voor het verifiëren van bewijs en het bijhouden van deblokkeringen, zonder willekeurige wijziging:

- **Zaakkaart**: zaaknummer, huidige status, e-mail van de gebruiker, blokkadetijdstip, laatste afhandeling, overtredingscategorie, redencode en bewaarvenster van het bewijs (nog 180 dagen);
- **Risicobeoordeling en gronden**: de volledige beroepstekst, de triggerreden en de afhandeltoelichting;
- **Volledige levenscyclus-tijdlijn**: registraties van de regelhit (beleidsengine), via de blokkade-uitvoering (systeem), tot de vrijgave na handmatige toetsing (beheerder);
- **Multidimensionaal risicoprofiel**: een zij-aan-zij-vergelijking van de «werkelijke bewijswaarden van dit account» met de «systeemreferentie / normale waarden / risicodrempels» — apparaatvingerafdruk, client, trigger-IP, accounts per IP, subnettopologie, meldingen en verzendsnelheid, punt voor punt.

## 4. Beroepsarbitrage en overdracht

Beroepstickets worden door een beheerder ge-arbitreerd na controle van de bewijslade: vrijgeven of afwijzen — vrijgeven herstelt onmiddellijk de verzendcapaciteit; blokkades kunnen ook vanuit de [gebruikerslijst](/mail/users/) worden uitgevoerd. De sanctieladder en de beroepsrechten staan in sectie 6 van het [Acceptabel gebruik beleid](/mail/acceptable-use/).

<details>
<summary>Uitleg bij de figuur: een waarschuwingsticket beoordelen</summary>

![Een waarschuwingsticket beoordelen](/images/mail/nl/ui/audit.png)

1. Open «Auditrapport» in het beheergebied (raadplegen met `setting:query`, afhandelen met `setting:set`).
2. Klik op een paneelkaart om van ticketset te wisselen, of filter op status, overtredingscategorie of risiconiveau.
3. Open de bewijslade «Details» en toets de bewijsvergelijking en de tijdlijn na.
4. Handeel per paneel: deblokkeren, opnieuw blokkeren, verlengen of notities toevoegen; bij beroepen: vrijgeven of afwijzen.
5. Gebruik «Data exporteren» om de tickets van het huidige paneel als CSV te archiveren.

</details>

## 5. Export, opruiming en moduskoppeling

- **Data exporteren**: exporteert de tickets van het huidige paneel als CSV met alle kolommen (met BOM, direct te openen in spreadsheetsoftware);
- **Historische logboeken opschonen**: één klik verwijdert niet-kritieke routine-inspectieregistraties (alleen auditregistraties met normaal risiconiveau); de blokkade- en beroepsregisters blijven onaangeroerd;
- **Zekeringbalk**: wanneer de globale zekering trip, verschijnt er een waarschuwingsbalk bovenaan het dreigingenpaneel; tijdens de trip worden nieuwe overtredingen alleen vastgehouden en worden geen accounts automatisch geblokkeerd;
- **Moduskoppeling**: in de versleutelde modus (Level 3) worden tijdstempels geanonimiseerd; tickets blijven beoordeelbaar op categorie en bewijs, maar de volgorde van de feiten is niet meer te reconstrueren.

## 6. Gerelateerde documenten

| Bron | Link |
| --- | --- |
| Waarschuwingsdrempels instellen | [De configuratiekaarten van de systeeminstellingen](/mail/system/) |
| Accounts blokkeren en herstellen | [Gebruikerslijst](/mail/users/) |
| Inloggedrag van risicobeheer | [Accountbeveiligingsgids](/mail/security/) |
| Sanctieladder en beroepsrechten | [Acceptabel gebruik beleid](/mail/acceptable-use/) |
