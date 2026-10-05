---
title: Gebruikerslijst
description: De gebruikerslijst van EpoCanvas Mail — accounts opzoeken, wachtwoorden herstellen, identiteitsgroepen wijzigen, tweestaps herstellen, blokkeren en herstellen.
---

**Datum van inwerkingtreding: 6 oktober 2026 | Versie: 5.15**

De gebruikerslijst is de accountbeheerinterface van de beheerzone (`#manage/admin/users`, rechten-sleutel `user:query`); daar zoekt de beheerder alle accounts op de instantie op en handelt ze af.

## 1. Lijst en zoekopdracht

De lijst toont per account een rij met mailbox, verzend- en ontvangvolume, opslagverbruik, spam- en meldingteller; bovenaan kan op mailbox worden gezocht; paginering en sortering geven meteen antwoord.

## 2. Accountacties

| Handeling | Beschrijving |
| --- | --- |
| Wachtwoord herstellen | Geeft het account een nieuw eenmalig wachtwoord en verwittigt het om opnieuw aan te melden |
| Identiteitsgroep wijzigen | Wijzigt de groep van het account; quota en rechten schakelen onmiddellijk mee (de groepsdefinities staan in [Rechtenbeheer](/nl/mail/roles/)) |
| Tweestaps herstellen | De noodroute wanneer het account de tweede stap niet haalt; wist de TOTP- en toegangssleutelconfiguratie van het account |
| Blokkeren en herstellen | Na blokkade verliest het account onmiddellijk zijn sessies; na herstel kan het opnieuw aanmelden |
| Mailbox legen | Wist de e-mail onder het account (onomkeerbaar; met beleid gebruiken) |

## 3. De aansluiting van afhandeling en beroep

Een blokkade komt als waarschuwingsticket in het [Auditrapport](/nl/mail/audit/); een getroffen gebruiker kan via het beroepsportaal of de kanalen op de instantie beroep aantekenen, en de beheerder beoordeelt de zaak. De handhavingsladder en het evenredigheidsbeginsel staan in sectie 6 van het [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/).

## 4. Verwante documenten

| Bron | Link |
| --- | --- |
| Identiteitsgroepen en quotamalplaatjes | [Rechtenbeheer](/nl/mail/roles/) |
| Controle over de e-mail van de hele instantie | [E-mailcontrole over de hele opslag](/nl/mail/review/) |
| Waarschuwingstickets en de arbitrage van beroepen | [Auditrapport](/nl/mail/audit/) |
| Het gegevensdashboard | [Analysepagina](/nl/mail/analysis/) |
