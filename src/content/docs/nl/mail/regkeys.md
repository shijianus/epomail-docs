---
title: Registratiesleutels
description: Registratiesleutels van EpoCanvas Mail — uitnodigingscodes uitgeven, het aantal gebruik en de geldigheid beheren en de gebruikslog controleren.
---

**Datum van inwerkingtreding: 6 oktober 2026 | Versie: 5.16**

Registratiesleutels is de uitnodigingscode-interface van de beheerzone (`#manage/admin/reg-keys`, rechten-sleutel `reg-key:query`) en bepaalt wie zich op deze instantie kan registreren. De drie sitewijde codemodi (verplicht／uit／optioneel) worden bepaald door de kaart website-instellingen van de [systeeminstellingen](/nl/mail/system/).

![Figuur: de registratiesleutels](/images/mail/nl/ui/regkeys-guide.png)

*Figuur: de registratiesleutels*
*Aantekeningen: 1. *


## 1. Uitgeven

Het venster «Toevoegen» geeft per keer één registratiecode uit, met deze velden:

| Veld | Beschrijving |
| --- | --- |
| Registratiecode | Een willekeurige code van 8 tekens; met een klik op vernieuwen opnieuw gegenereerd |
| Gebonden groep | Accounts die met deze code registreren belanden in de opgegeven identiteitsgroep (de groepen staan in [Rechtenbeheer](/nl/mail/roles/)) |
| Geldigheid | Na de vervaldatum niet meer bruikbaar |
| Aantal gebruik | 1–99999; elke geslaagde registratie vermindert het met één |

## 2. Beheer en controle

| Handeling | Beschrijving |
| --- | --- |
| Lijst | Toont resterend gebruik, gebonden groep en geldigheid; in de bezoekersweergave zijn de gevoelige delen gemaskeerd |
| Kopiëren | Kopieert de codetekst met één klik, handig om aan genodigden te verstrekken |
| Gebruikslog | Toont welke accounts de code al hebben gebruikt |
| Verwijderen | Maakt de code onmiddellijk ongeldig |
| Ongebruikte opschonen | Wist met één klik alle codes die nog niet gebruikt zijn |

Een URL met een uitnodigingsparameter (`?code=`／`?regKey=`／`?invite=`) vult het registratieformulier direct in, zie sectie 5 van de [Interface en routekaart](/nl/mail/interface/).

<details>
<summary>Visuele handleiding: de Registratiesleutels in stappen</summary>

1. Ga in de beheerzone naar «Registratiesleutels» (vereist `reg-key:query`).
2. Klik op «Toevoegen» om een willekeurige code van 8 tekens uit te geven (met een klik op vernieuwen opnieuw gegenereerd).
3. Bind de identiteitsgroep waarin geregistreerde accounts terechtkomen, en stel de geldigheid en het aantal gebruik in (1–99999).
4. Kopieer de registratiecode en verstrek haar aan de genodigden; de «Gebruikslog» toont het verbruik; «Ongebruikte opschonen» maakt met één klik alle ongebruikte codes ongeldig.

</details>

## 3. Verwante documenten

| Bron | Link |
| --- | --- |
| De codemodi en het registratietraject op het aanmeldscherm | [Werkingsmodi](/nl/mail/modes/) |
| De definitie van de registratiegroep | [Rechtenbeheer](/nl/mail/roles/) |
| De schakelaar voor open registratie | [De configuratiekaarten van de systeeminstellingen](/nl/mail/system/) |
| De accountverantwoordelijkheid bij uitnodigingsregistratie | [Servicevoorwaarden](/nl/mail/terms-of-service/) |
