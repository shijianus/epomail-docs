---
title: Accountbeveiligingsgids
description: De gids voor accountbeveiliging van EpoCanvas Mail — tweestapsverificatie in drie stappen inschakelen, herstelcodes beheren, toegangssleutels registreren en activeren, het verificatiegedrag bij aanmelding en het verwijderen van het account.
---

**Datum van inwerkingtreding: 5 oktober 2026 | Versie: 5.16**

Deze pagina loopt elke handeling op de pagina «Instellingen → Beveiliging» langs. Het algemene gedrag van tweestapsverificatie (vertrouwde apparaten, afgedwongen beleid) staat beschreven in [Werkingsmodi](/nl/mail/modes/), sectie 4; deze pagina behandelt alleen de configuratie. Ingang: zijbalk «Instellingen → Beveiliging» (`#settings/security`).

![Beveiligingsinstellingenpagina van EpoCanvas Mail: de wachtwoordwijziging en het tweestapscentrum met de drie tweede factoren (interface in vereenvoudigd Chinees)](/images/mail/ui/ui-security-2fa.png)

*Figuur: de beveiligingspagina. Bovenin gebruikersnaam en wachtwoord, onderin het tweestapsverificatiecentrum.*

## 1. Rondleiding langs de beveiligingspagina

| Blok | Inhoud |
| --- | --- |
| Gebruikersnaam en wachtwoord | Gebruikersnaam wijzigen, wachtwoord wijzigen (toont de tijd van de laatste wijziging) |
| Tweestapscentrum | Status van de hoofdschakelaar, plus drie kaarten: authenticator-app, back-upherstelcodes, toegangssleutels |
| Account verwijderen | De ingang voor verwijdering onderaan de pagina |

Of het centrum zichtbaar is, volgt de e-mailmodus van de instantie: in de privé- en versleutelde modus staat het voor iedereen verplicht aan; alleen in de Alle e-mail-modus (Level 1) kan de exploitant het uitzetten.

## 2. Tweestapsverificatie inschakelen (drie stappen)

1. Druk op de kaart «Authenticator-app» op «Instellen» en scan de QR-code met je authenticator; lukt het scannen niet, typ dan de getoonde sleutel handmatig over;
2. Voer de 6-cijferige code uit de authenticator in om de koppeling te bevestigen;
3. De pagina toont daarna 10 herstelcodes: druk op «Alles kopiëren» of «Download .txt» om ze te bewaren, of print ze voor offline opslag. Elke code werkt één keer, voor aanmelden wanneer de authenticator niet beschikbaar is.

## 3. Beheer van herstelcodes

- De kaart toont te allen tijde het aantal nog bruikbare codes;
- Het bekijken van de volledige lijst of het opnieuw genereren vereist het wachtwoord van het account;
- Genereer opnieuw voordat de codes op zijn; na een herstel vervallen alle oude codes.

## 4. Toegangssleutels

1. Druk op de kaart «Toegangssleutels» op «Toevoegen» en geef de sleutel een naam (bijvoorbeeld MacBook Touch ID, YubiKey 5C); de browser of het systeem start daarna de registratiestroom;
2. Een pas geregistreerde toegangssleutel is in afwachting: activeer haar onmiddellijk door goedkeuring met de gekoppelde authenticator, of wacht tot de tijdslimiet van 30 dagen verstrijkt;
3. Eenmaal actief is haar status actief; gebruik «Testen» om het ontgrendeltraject te controleren en verwijder de sleutel wanneer ze niet meer nodig is.

## 5. Verificatie bij aanmelding

- Na het wachtwoord volgt de tweede factor zoals geconfigureerd: een dynamische code, een herstelcode of een toegangssleutel, naar eigen keuze;
- Vink je bij aanmelding «Niet opnieuw vragen op dit apparaat» aan, dan is het apparaat 30 dagen vrijgesteld van herverificatie (de regels staan in [Werkingsmodi](/nl/mail/modes/), sectie 4);
- Detecteert het systeem een afwijkende aanmeldomgeving (meerdere regio's, gelijktijdige multi-IP-aanmeldingen), dan escaleert het: ook als de eerste factor slaagt, wordt een andere, verschillende tweede factor geëist;
- Het uitzetten van tweestapsverificatie vereist het wachtwoord van het account plus de huidige dynamische code of één herstelcode.

## 6. Account verwijderen

Onderaan de pagina staat de ingang voor verwijdering. Na verwijdering worden de accountgegevens verwerkt volgens de verwijderbepalingen van het [Privacybeleid](/nl/mail/privacy-policy/); exporteer eerst je gegevens via «Instellingen → Gegevens» (zie de [Gids voor meldingen en doorsturen](/nl/mail/notify/)).

## 7. Verwante documenten

| Bron | Link |
| --- | --- |
| Periodes van vertrouwde apparaten en regels voor aanmelding via derden | [Werkingsmodi](/nl/mail/modes/) |
| De secties van de instellingen en waar beveiliging zit | [Instellingengids](/nl/mail/settings/) |
| Gegevensexport, meldingen en doorsturen | [Gids voor meldingen en doorsturen](/nl/mail/notify/) |
| Hoe wachtwoorden en tokens worden opgeslagen | [Gegevensverwerking en beveiliging](/nl/mail/data-security/) |
