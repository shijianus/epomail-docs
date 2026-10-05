---
title: Rechtenbeheer
description: Rechtenbeheer van EpoCanvas Mail — de zes identiteitsgroepen, de rechten-sleutels per onderdeel, de standaardgroep met groepsbescherming en de koppeling met de blogniveaus.
---

**Datum van inwerkingtreding: 6 oktober 2026 | Versie: 5.15**

Rechtenbeheer is de beheerinterface van de identiteitsgroepen in de beheerzone (`#manage/admin/roles`, rechten-sleutel `role:query`) en bepaalt de quota, de rechten-sleutels en de AI-modelautorisatie van elke groep. Het gedrag aan gebruikerskant van elke groep staat in sectie 3 van [Werkingsmodi](/nl/mail/modes/).

![Permissionspagina van EpoCanvas Mail: de tabel met de zes identiteitsgroepen en de kolommen voor quota, verzendlimiet, bijlagerecht en AI-modelautorisatie (interface in vereenvoudigd Chinees)](/images/mail/ui/ui-roles.png)

*Figuur: het architectuur- en gradatieoverzicht van de rechtenpagina. De interface labelt verzending en opslag van de groep Meester als «onbeperkt».*

## 1. Groepen en quota's

| Groep | Positionering | Fabrieksquota |
| --- | --- | --- |
| Bezoeker | Alleen-lezen zandbak | 0 mailboxen／0 MB／extern verzenden verboden |
| Gewone gebruiker | Basislid | 5 e-mails／1 mailbox／5 MB |
| Gewone gebruiker LV.0 | Gecertificeerde vriend | 8 e-mails／2 mailboxen／10 MB |
| Gewone gebruiker LV.1 | Actieve geleerde | 10 e-mails／3 mailboxen／25 MB／bijlagen toegestaan |
| Moderator | Medebeheer | 100 e-mails／10 mailboxen／500 MB／bijlagen toegestaan |
| Meester | Hoogste gezag | Geen plafond voor verzending en aantal mailboxen; opslag fabrieksstandaard 1024 MB (in de interface als «onbeperkt» gelabeld) en instelbaar |

## 2. Rechten-sleutels per onderdeel

Elke groep wordt per rechten-sleutel geautoriseerd (bijvoorbeeld `user:query` voor de gebruikerslijst, `setting:query`／`setting:set` voor het opvragen en afhandelen van de systeeminstellingen en het auditrapport). Welke rechten-sleutel elke beheerinterface nodig heeft, staat sectie voor sectie in sectie 4 van de [Interface en routekaart](/nl/mail/interface/); wijzigingen werken onmiddellijk door.

## 3. Standaardgroep en bescherming

- Nieuwe registraties belanden fabrieksstandaard in de groep Bezoeker; de standaardgroep is naar een andere groep te wijzigen;
- De groepen Bezoeker en Meester zijn tegen verwijdering beschermd;
- LV.0 en LV.1 synchroniseren automatisch via de blogniveaus (een blogaccount koppelen tilt het account naar LV.0, actieve blogdeelname naar LV.1);
- De AI-modelautorisatie is per groep getrapt en werkt samen met het dagquotum en de ratelimiet van de AI Hub in de [systeeminstellingen](/nl/mail/system/).

## 4. Verwante documenten

| Bron | Link |
| --- | --- |
| Het gedrag van elke groep aan gebruikerskant | [Werkingsmodi](/nl/mail/modes/) |
| Een account naar een andere groep verplaatsen | [Gebruikerslijst](/nl/mail/users/) |
| De AI-engine en haar quota | [De configuratiekaarten van de systeeminstellingen](/nl/mail/system/) |
| Hoe registratie bij de groepen aansluit | [Registratiesleutels](/nl/mail/regkeys/) |
