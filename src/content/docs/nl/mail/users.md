---
title: Gebruikerslijst
description: De gebruikerslijst van EpoCanvas Mail — accounts opzoeken, wachtwoorden herstellen, identiteitsgroepen wijzigen, tweestaps herstellen, blokkeren en herstellen.
---

**Datum van inwerkingtreding: 6 oktober 2026 | Versie: 5.17**

De gebruikerslijst is de accountbeheerinterface van de beheerzone (`#manage/admin/users`, rechten-sleutel `user:query`); daar zoekt de beheerder alle accounts op de instantie op en handelt ze af.

![Figuur: de gebruikerslijst](/images/mail/nl/ui/users-guide.png)

*Figuur: de gebruikerslijst*

<details>
<summary>Visuele handleiding: De gebruikerslijst —  van account vinden tot ingrijpen in de rij</summary>

Vier gebieden van de gebruikerslijst: van opzoeken tot handelen per rij — het accountbeheer van de beheerder op één scherm.

1. **Zoekvak op e-mailadres**: Bovenaan zoek je accounts op mailbox, met paginering en sortering die meteen antwoorden; samen met de tellers per rij voor verzonden/ontvangen, opslagverbruik en spam/meldingen heb je afwijkende accounts snel in het vizier.
2. **Kolom e-mailadres**: De unieke identiteit van het account: het e-mailadres is de accountnaam en leidt alles — aanmelden, post ontvangen, elke toewijzing. Rijacties (wachtwoord resetten, groep wijzigen, blokkeren) gelden voor het account dat deze kolom noemt; de buurkolommen — verzonden/ontvangen, opslag, spam en meldingen — verraden of een account afwijkend doet.
3. **Kolom opslagruimte**: Het actuele verbruik van de bijlagenopslag van het account; afgezet tegen de quota van de identiteitsgroep (zie de pagina Rechtenbeheer) bepaal je of opschalen of opruimen nodig is.
4. **Kolom instellingen (acties)**: Handelingen per rij: wachtwoord herstellen (geeft een eenmalig wachtwoord uit), identiteitsgroep wijzigen, tweestapsverificatie herstellen, blokkeren en herstellen, en de mailbox van de gebruiker legen (onomkeerbaar — met beleid gebruiken).

</details>

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

<details>
<summary>Visuele handleiding: de Gebruikerslijst in stappen</summary>

1. Ga in de beheerzone naar de «Gebruikerslijst» (vereist `user:query`).
2. Zoek bovenaan in het zoekveld het account op mailbox.
3. Kies in het actiemenu per rij: wachtwoord herstellen, identiteitsgroep wijzigen, tweestaps herstellen, blokkeren en herstellen, of de mailbox legen.
4. Blokkades en afhandeling komen als waarschuwingsticket in het Auditrapport terecht, ten behoeve van de latere arbitrage van beroepen.

</details>

## 4. Verwante documenten

| Bron | Link |
| --- | --- |
| Identiteitsgroepen en quotamalplaatjes | [Rechtenbeheer](/nl/mail/roles/) |
| Controle over de e-mail van de hele instantie | [E-mailcontrole over de hele opslag](/nl/mail/review/) |
| Waarschuwingstickets en de arbitrage van beroepen | [Auditrapport](/nl/mail/audit/) |
| Het gegevensdashboard | [Analysepagina](/nl/mail/analysis/) |
