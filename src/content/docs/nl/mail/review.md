---
title: E-mailcontrole over de hele opslag
description: De e-mailcontrole over de hele opslag van EpoCanvas Mail — zoeken in de beheerdimensie, de detail-lade en fysieke verwijdering, met de invloed van de e-mailmodus op de ingang.
---

**Datum van inwerkingtreding: 6 oktober 2026 | Versie: 5.15**

De e-mailcontrole over de hele opslag is de e-mailinterface van de beheerzone (`#manage/admin/mail`, rechten-sleutel `all-email:query`). Naam en zichtbaar bereik van de sectie volgen de e-mailmodus: de Alle e-mail-modus (Level 1) toont «Alle e-mail», de privémodus (Level 2) toont «Spam», en de versleutelde modus (Level 3) verbergt de hele sectie (zie [Werkingsmodi](/nl/mail/modes/), sectie 2).

## 1. Zoeken

- De geavanceerde `$`-syntax in de bovenbalk werkt over de hele opslag: `$sender`／`$user`／`$to`／`$subject` plus statustokens; de betekenis per operator staat in sectie 5 van de [Zoek- en regelreferentie](/nl/mail/search/);
- Met een rechtsklik op een e-mail in de resultatenlijst start meteen een nieuwe zoekronde op haar afzender, het ontvangende account of de bezittende gebruiker.

## 2. Detail en afhandeling

| Mogelijkheid | Beschrijving |
| --- | --- |
| Detail-lade | Opent één e-mail met volledige inhoud en omgevingsgegevens, zonder de lijst te verlaten |
| Fysieke verwijdering | Voert fysieke verwijdering uit op e-mail die de regels overtreedt (anders dan de prullenbak aan gebruikerskant); de handeling laat sporen na |
| Sortering | Sorteren op tijd om recente gebeurtenissen te vinden |

Verdachte accounts die de controle aan het licht brengt, kunnen meteen in de [Gebruikerslijst](/nl/mail/users/) worden afgehandeld; risicogebeurtenissen komen per klasse in het [Auditrapport](/nl/mail/audit/).

<details>
<summary>Visuele handleiding: de e-mailcontrole over de hele opslag in stappen</summary>

![De e-mailcontrole over de hele opslag in stappen](/images/mail/nl/ui/review.png)

1. Ga in de beheerzone naar «Alle e-mail» (in de privémodus als «Spam» getoond, in de versleutelde modus verborgen).
2. Zoek in de bovenbalk met de geavanceerde `$`-syntax, zoals `$user:<mailbox>` en `$subject:<trefwoord>`; statustokens filteren verzonden／verwijderd／zonder geadresseerde.
3. Een rechtsklik op een willekeurige e-mail in de lijst start meteen een nieuwe zoekronde op haar afzender, het ontvangende account of de bezittende gebruiker.
4. Open de detail-lade om inhoud en omgevingsgegevens te verifiëren, en voer daarna de fysieke verwijdering uit (anders dan de prullenbak aan gebruikerskant).

</details>

## 3. Verwante documenten

| Bron | Link |
| --- | --- |
| Zoeken met `$` en de statustokens | [Zoek- en regelreferentie](/nl/mail/search/) |
| De e-mailmodus en het zichtbare bereik van de beheerkant | [Werkingsmodi](/nl/mail/modes/) |
| Meldingen en de beoordeling van waarschuwingen | [Auditrapport](/nl/mail/audit/) |
| Afhandeling in de gebruikersdimensie | [Gebruikerslijst](/nl/mail/users/) |
