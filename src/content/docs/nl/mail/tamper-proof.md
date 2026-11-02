---
title: Officiële e-mailspecificaties en consistentiecontrole van het publicatiemanifest
description: Herkenning van systeemmail van EpoCanvas Mail, meldingstypen, aflevermomentopnamen, sjabloonvertaling, beperkingen van rendering en de reikwijdte van het vergelijken van twee records uit het publicatiemanifest.
---

**Bijgewerkt op: 2 november 2026 | Versie: 5.21**


<!-- legal-review-draft -->
:::caution[Juridisch beoordelingsconcept: niet de geldende kennisgeving]
Dit concept bevat voorgestelde voorwaarden en nog te verifiëren punten. Het vervangt de huidige kennisgeving niet en certificeert geen naleving. Het mag niet worden gebruikt om verwerking te activeren voordat de identiteit en wettelijk vereiste contactgegevens van de exploitant, de werkelijke rechtsgronden, ontvangers en doorgiftewaarborgen, bewaartermijnen en verwijdering zijn geverifieerd en de vereiste informatie is verstrekt. De gezaghebbende versie is de Traditioneel-Chinese tekstbasis, niet een inwerkingtreding. Bestaande wettelijke plichten en gebruikersrechten blijven onaangetast.
:::

Dit document beschrijft de herkenning van systeemberichten en de beperkingen van hun verwerking, samen met de consistentiecontrole van het publicatiemanifest op deze site. Deze controle authenticeert geen e-mails of documenten, verifieert geen digitale handtekeningen en certificeert geen wettelijke naleving. Bijbehorende regels staan in het [Privacy- en voorwaardenoverzicht](/nl/mail/overview/) en [Gegevensverwerking en Beveiligingsonderhoud](/nl/mail/data-security/).

Traditioneel Chinees (Taiwan) is de gezaghebbende versie van deze site; andere talen zijn referentievertalingen. Bij onduidelijkheid is de gezaghebbende versie leidend, onder voorbehoud van toepasselijke eisen voor duidelijke informatie, uitleg ten gunste van consumenten en niet-uitsluitbare gegevensbeschermings- en consumentenrechten. De open-sourceimplementatie beschrijft technisch gedrag en vervangt niet de wettelijke plichten van de feitelijke exploitant.

![Samenhang tussen afzendermarkeringen van systeemmail, aflevermomentopnamen en sjabloonvertaling, rendering in de client en records van het publicatiemanifest](/images/mail/nl/anti-tamper-architecture.svg)

*Figuur: afzendermarkeringen, momentopnamen van de berichttekst, inkapseling van stijlen en manifestrecords hebben elk hun doel en beperkingen. Samen vormen ze geen identiteitsauthenticatie, beveiligde scriptsandbox of garantie tegen manipulatie van documenten.*

## 1. Afzenderidentiteit van het systeem en weergavemarkeringen

Maak bij het herkennen van systeemcommunicatie onderscheid tussen weergaveregels van de toepassing en identiteitsauthenticatie:

1. Welkomstmail en algemene aankondigingen worden normaal door het systeem gegenereerd met het ingebouwde adres `announcement@epocanvas.com`. Dit sluit andere beveiligings- of beheermeldingen niet uit en maakt niet elk bericht dat dit adres toont authentiek.
2. `isOfficial` is een weergavemarkering van de toepassing: mail van `announcement@epocanvas.com` of `admin@epocanvas.com`, of met het label «officieel», kan een badge en banner tonen. De markering is geen digitale handtekening of onafhankelijke authenticatie van de afzender.
3. Sommige systeemmail wordt pas bij het lezen van de maillijst voor verwijdering gemarkeerd, op basis van een instelbare vervaltermijn (standaard 7 dagen), en daarna door de dagelijkse geplande taak opgeruimd. De mail wordt bij het verstrijken van de termijn niet onmiddellijk en volledig gewist. Zie paragraaf 1.5 van [Gegevensverwerking en Beveiligingsonderhoud](/nl/mail/data-security/) voor de feitelijke bewaartermijnen en opruimbeperkingen.

## 2. Catalogus van systeemmail en meldingen

Systeemcommunicatie omvat de volgende typen. Of en hoe ze worden verzonden, hangt af van de implementatie, configuratie en gebeurtenissen; ze is niet beperkt tot welkomstmail en aankondigingen:

| Type | Aanleiding | Beschrijving |
| --- | --- | --- |
| Welkomstmail | Aanmaken van een nieuwe mailbox | Kan ingebouwde sjablonen in zes talen gebruiken; bewaring en opruiming volgens paragraaf 1 |
| Algemene aankondiging | Een beheerder publiceert een systeemaankondiging | Kan ingebouwde sjablonen in zes talen of gewijzigde inhoud gebruiken; bewaring en opruiming volgens paragraaf 1 |
| Beveiligingsmelding | Aanmeldings- of beveiligingsgebeurtenis, of een incident met wettelijke meldplicht | Kan afhankelijk van gebeurtenissen en toepasselijke regels worden verzonden; een bericht over accountbeveiliging is niet noodzakelijk vervalst |
| Melding van een beheerbesluit of bezwaar | Beheermaatregel, besluit of beoordeling van een bezwaar | Kan maatregelen en beoordelingsuitkomsten meedelen; bewaring van bijbehorende records staat in het document over gegevensbeveiliging |

Een afzenderadres, weergavemarkering of link in een bericht bewijst op zichzelf geen echtheid. Controleer meldingen via een bekende en vertrouwde ingang van de dienst. Gebruik bij twijfel de kanalen in paragraaf 6 en voer geen inloggegevens in via verdachte links.

## 3. Aflevermomentopnamen en sjabloonvertaling

1. Bij sjabloonberichten worden tijdens het verzenden variabelen vervangen en wordt een momentopname van de berichttekst opgeslagen. Het wijzigen van de interfacetaal herschrijft op zichzelf de opgeslagen tekst niet. Dit is geen onveranderbare opslag en biedt geen digitale handtekening of identiteitsauthenticatie.
2. Bij «Vertalen» kan een overeenkomend, beschikbaar sjabloon in de doeltaal lokaal worden weergegeven. Een niet-herkend of ontbrekend sjabloon, gewijzigde berichttekst of andere ontbrekende overeenkomst leidt naar het algemene vertaalproces, dat ingestelde modellen, Workers AI of openbare vertaaldiensten als terugval kan gebruiken. Er is geen algemene garantie dat officiële mail de dienst nooit verlaat. Ontvangers, verwerkingsketens en vereiste waarborgen staan in de paragrafen 6 en 7 van het [Privacybeleid](/nl/mail/privacy-policy/).

## 4. Beperkingen van rendering in de client

Mailrendering gebruikt inkapseling van stijlen en sanering van inhoud. Geen van beide is een onafhankelijke identiteits- of beveiligingscertificering:

1. Shadow DOM kapselt het DOM en de reikwijdte van stijlen in om wederzijdse beïnvloeding van mail- en paginastijlen te verminderen. Het is geen beveiligingsgrens voor scripts: paginascripts kunnen de inhoud nog steeds benaderen of manipuleren, en het is geen sandbox met een afzonderlijke origin.
2. DOMPurify verwijdert gevaarlijke tags en inline gebeurtenisafhandelaars volgens de configuratie om inhoudsinjectie te beperken. De werking hangt af van de versie, configuratie en verdere verwerking; het garandeert niet dat alle scriptinjectie, interfacevervalsing of verzoeken om externe bronnen worden voorkomen.

## 5. Consistentiecontrole van het publicatiemanifest

`tamper-proof.json` is de bestaande bestandsnaam van het publicatiemanifest, geen bewering dat het ondertekend of onveranderbaar is. Het online paneel vergelijkt alleen het record voor deze pagina in twee manifestantwoorden van de huidige site. Het berekent geen hash van de pagina-inhoud.

| Controleroute | Mechanisme | Reikwijdte en beperkingen |
| --- | --- | --- |
| Publicatiemanifest | `tamper-proof.json` | Legt tijdens de build de SHA-256 en bytegrootte van bronbestanden uit de werkboom vast na omzetting van CRLF naar LF, plus de toenmalige Git HEAD; een commitidentificatie bewijst niet dat de werkboom geen ongecommitte wijzigingen bevat |
| Paneel op deze pagina | «Consistentiecontrole van het publicatiemanifest» | Alleen op deze pagina, na de inleiding en figuur en vóór paragraaf 1; vergelijkt de SHA-256 van het record en de volledige `gitCommit` tussen de eerste en volgende lezing |
| Handmatige bronbestandsvergelijking | Node / `sha256sum` / OpenSSL | Controleer herkomst en versie van manifest en bestanden afzonderlijk en hash lokale Markdown met dezelfde regels voor regeleinden; het paneel voert deze handeling niet uit |
| Bron van het verzoek | Manifestadres met dezelfde origin op de huidige site | Leest alleen het manifest van die site, zonder GitHub-verzoek voor onafhankelijke verificatie; HTTPS alleen bewijst niet de identiteit van de uitgever of de rechtsgevolgen van een document |

Succes betekent alleen dat de hash van het record voor deze pagina en `gitCommit` bij beide manifestlezingen gelijk zijn. Het verifieert niet de pagina-inhoud, identiteit van de uitgever, digitale handtekeningen of wettelijke naleving. Het manifest en script komen van dezelfde site; vervanging van beide kan nog steeds een consistent resultaat opleveren. Dit is dus geen onafhankelijke vertrouwensbasis.

:::tip[Manifestconsistentie controleren]
Klik op «Manifestconsistentie controleren» in het paneel op deze pagina. De eerste geldige lezing stelt alleen een uitgangswaarde vast en toont geen succes. Een afwijkende hash of commit bij de volgende lezing geeft «Verificatie mislukt»; ook een nieuwe publicatie kan een verschil veroorzaken. Netwerk- of HTTP-fouten, ongeldige JSON of structuur, een ontbrekend paginarecord, een SHA-256 die niet uit 64 hexadecimale tekens bestaat of een ongeldige volledige Git-commit geven «Verificatie niet mogelijk», nooit succes. Na een eerste fout stelt succesvol herladen alleen de uitgangswaarde vast en is nog een controle nodig. Klap de afzonderlijke instructies in het paneel uit voor handmatige vergelijking van bronbestanden.
:::

## 6. Verantwoordelijkheidsgrenzen en meldkanalen

1. De feitelijke exploitant van de gehoste instantie onderhoudt de systeemmeldingen en het publicatiemanifest. EpoCanvas is een projectnaam, geen bewijs van een afzonderlijke rechtspersoon of gecertificeerd beveiligingsteam. Identiteit van de exploitant en wettelijk vereiste informatie staan in paragraaf 2 van het [Privacybeleid](/nl/mail/privacy-policy/).
2. De feitelijke exploitant van een zelfgehoste instantie configureert bezorging, sjablonen, sleutels en gegevensonderhoud en voert toepasselijke maatregelen uit volgens [Gegevensverwerking en Beveiligingsonderhoud](/nl/mail/data-security/). Alleen broncode publiceren maakt iemand niet tot exploitant van een andere instantie; wie daadwerkelijk exploiteert of de verwerking bepaalt, blijft op basis van de feiten verantwoordelijk.
3. Meld vermoedelijke nabootsing van een afzender, manifestverschillen of beveiligingsproblemen via:
   - Kanaal voor systeemverzending en beveiliging: `announcement@epocanvas.com`
   - Kanaal voor privacy en gegevensbescherming: `privacy@epocanvas.com`

Deze rolverdeling, de aard van het project en de taalvoorrang sluiten geen wettelijk niet-beperkbare aansprakelijkheid, gegevensbeschermings- of consumentenrechten uit, en beperken evenmin rechtstreeks verhaal bij bevoegde autoriteiten en rechtbanken.
