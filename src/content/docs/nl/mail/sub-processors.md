---
title: Lijst van verwerkers
description: Volledige lijst van de verwerkers, ontvangers van gegevens, betrokken gegevenscategorieën, triggercondities en mechanismen voor internationale doorgifte van EpoCanvas Mail.
---

# Lijst van verwerkers

**Datum van inwerkingtreding: 2 oktober 2026 | Versie: 5.7**

Deze lijst sluit aan bij paragraaf 7 van het [Privacybeleid](/nl/mail/privacy-policy/) en vermeldt volledig de derden die bij de persoonsgegevens van de Dienst betrokken zijn, de voorwaarden voor delen en de waarborgmechanismen. Het delen door de Dienst volgt het beginsel van minimale noodzakelijkheid: gegevens die de instantie niet hoeven te verlaten, verlaten die niet; gegevens die moeten worden verlaten, worden uitdrukkelijk vermeld met de ontvanger en de meegegeven gegevens. Met geen van de hierna genoemde partijen bestaat enige relatie van verkoop van gegevens of van het delen van advertentie-inkomsten.

Internationale doorgifte volgt de eisen van het toepasselijke recht en de beperkingen die bevoegde autoriteiten overeenkomstig de wet oplegen, met standaardcontractbepalingen en vergelijkbare mechanismen als waarborg voor de veiligheid van de doorgifte. Verwerkers verwerken de gegevens allemaal op instructie van de verwerkingsverantwoordelijke en binnen het bestek van het beoogde doel.

De juridische documenten op deze site zijn vastgesteld in het traditioneel Chinees (Taiwan) als officiële versies; versies in andere talen worden uitsluitend ter referentie verstrekt, en bij discrepantie is de versie in het traditioneel Chinees leidend. De juridische en technische documenten op deze site volgen de open-sourceimplementatie van de dienst en beogen transparante, strenge, niet-commerciële normen voor gemeenschapscommunicatie.

![Kaart van het delen met derden door EpoCanvas Mail: gecentreerd op de instantie, vier categorieën, namelijk verwerkers op basis van bewaarneming, op autorisatie van de betrokkene, door de betrokkene geactiveerde AI-verwerking en wettelijke vereisten; met het beginsel van minimale noodzakelijkheid en de toezeggingen van niet verkopen, geen advertenties en niet volgen](/images/mail/subprocessor-map.svg)

*Figuur: de vier categorieën van paden voor delen met derden door de Dienst. De activeringsvoorwaarden, de betrokken gegevens en de waarborgmechanismen per categorie staan in de hiernavolgende tabellen.*

## 1. Verwerkers (doorlopende infrastructuur)

| Verwerker | Functie | Betrokken gegevens | Doorgiftegebieden en waarborgen |
| --- | --- | --- | --- |
| Cloudflare, Inc. (Verenigde Staten) | edge computing (Workers), gestructureerde opslag (D1), sessies en cache (KV), objectopslag (R2), e-mailroutering (Email Routing), mensverificatie (Turnstile), edge-AI (Workers AI), edge-logs | requestmetadata, alle opgeslagen inhoud, verificatieverzoeken | wereldwijd edge-netwerk; certificeringen SOC 2 Type II en ISO/IEC 27001; het mechanisme van de Europese standaardcontractbepalingen (SCC) is beschikbaar; de doorgifte is tijdens de gehele overdracht versleuteld met TLS |
| Resend, Inc. / Mailjet (Sinch) (Verenigde Staten / Frankrijk) | aflevering van e-mail naar buiten de site (MTA) | de volledige uitgaande e-mail (ontvanger, onderwerp, berichttekst, bijlagen) | alleen geactiveerd bij verzending van e-mail waarvan de ontvangers buiten de site zijn en wanneer de Exploitant een afleverkanaal heeft geconfigureerd; de afleverreferenties worden bewaard als geïsoleerde API-tokens en komen niet in diagnostische logs |

## 2. Verwerkers geautoriseerd door de betrokkene

| Verwerker | Functie | Betrokken gegevens | Triggerconditie |
| --- | --- | --- | --- |
| Telegram | realtime pushmeldingen | afhankelijk van de configuratie: het onderwerp van de e-mail, de afzender (kan worden verborgen), de berichttekst (kan worden verborgen), verificatiecodes en een leeslink met 7 dagen geldigheid | alleen na koppeling van een Telegram-bot en het inschakelen van pushmeldingen |
| OAuth-apps van derden | aanmelding of geautoriseerde toegang via derden | beperkt tot openid / profile / email (identificator, e-mailadres, naam, avatar); toegangstokens zijn 2 uur geldig | alleen na actieve autorisatie door de betrokkene; op elk moment in te trekken op de pagina «Apps van derden», met onmiddellijke werking |
| Linux DO | identiteitsbron voor aanmelding via derden | de via OAuth verkregen gebruikersidentificator, nickname, avatar en vertrouwensniveau | alleen bij aanmelding met een Linux DO-account |
| Blog van het exploitatieteam (blog.epocanvas.com) | koppeling van blogactiviteitsniveau en quotumverhoging | uw e-mailadres (verzonden in de queryaanvraag) | alleen in realtime geraadpleegd wanneer u de blogniveausynchronisatie bekijkt |
| Avatar-afbeeldingshost (standaard: de eigen objectopslag van de instantie; de Exploitant kan via een omgevingsvariabele een externe host configureren) | opslag van avatars en afbeeldingen | het afbeeldingsbestand zelf | alleen bij het uploaden van avatars en dergelijke afbeeldingen; als een externe host is geconfigureerd, worden de afbeeldingsbestanden naar die host verzonden |

## 3. De AI-verwerkingsketen (met activering door de betrokkene als uitgangspunt)

| Dienst | Functie | Betrokken gegevens | Triggerconditie |
| --- | --- | --- | --- |
| Modelendpoint geconfigureerd door de instantie (standaard OpenAI-compatibel protocol) | e-mailvertaling | te vertalen tekstsegmenten (gehele alinea's hebben voorrang; lange teksten in segmenten) | alleen wanneer de betrokkene op «Vertalen» klikt |
| Cloudflare Workers AI | extractie van verificatiecodes (edge-inferentie), vertaal-back-up, tekstherkenning in afbeeldingen | het onderwerp en de eerste 6.000 tekens van de berichttekst (extractie van verificatiecodes); tekst en afbeeldingen voor vertaling en herkenning | extractie van verificatiecodes is de enige AI-verwerking die niet handmatig wordt geactiveerd (optioneel in te schakelen door de Exploitant); de overige worden door de betrokkene geactiveerd |
| MyMemory / openbare API's van Google Translate | vertaal-back-up | afgeknipte tekstfragmenten | uitsluitend als back-up wanneer het modelendpoint niet beschikbaar is |

De Exploitant traint geen enkel model met e-mailinhoud en zendt naar AI-diensten geen identiteitsgegevens van gebruikers dan de tekst die voor vertaling of herkenning nodig is.

## 4. Externe diensten in eigendom van de betrokkene of de Exploitant

| Dienst | Functie | Betrokken gegevens |
| --- | --- | --- |
| S3-compatibele opslag (AWS S3, Backblaze B2, MinIO en dergelijke) | externe opslag van bijlagen en originele e-mailblobs (BYOS) | de binaire inhoud van bijlagen en de bijbehorende toegangsreferenties |
| Externe databases zoals Turso / LibSQL | externe redundantie van gegevens | gegevenskopieën afhankelijk van de configuratie |

De voornoemde zelf aangebrachte diensten worden gekozen door de partij die ze configureert; die partij draagt er zelf zorg voor dat haar keuze voldoet aan de eisen die het recht op haar vestigingsplaats stelt aan internationale doorgifte.

## 5. Verzoeken aan derden op interfaceniveau

| Dienst | Functie | Toelichting |
| --- | --- | --- |
| Google Fonts | laden van interfacelettertypen | bij het laden van de pagina richt de browser een lettertypeverzoek tot Google; het IP-adres van de betrokkene verschijnt in de verzoeklogs van Google |
| Cloudflare Turnstile | mensverificatie | uitgevoerd bij registratie en bij het toevoegen van mailboxen; de betrouwbaarheid van de browser wordt beoordeeld zonder advertentiecookies of cross-site-tracking |

## 6. Delen op grond van wettelijke vereisten

De Exploitant maakt persoonsgegevens naar buiten bekend uitsluitend wanneer de wet dat dwingend verlangt of wanneer een rechterlijk orgaan dat op grond van wettelijke procedures verzoekt. De Exploitant verifieert de rechtmatigheid van het verzoek, maakt uitsluitend de minimale omvang openbaar die de wet verlangt, en stelt de getroffen betrokkenen binnen de grenzen van de wet in kennis (behoudens wanneer de wet dat verbiedt). Exploitanten van zelfgehoste instanties vullen de bijbehorende toezeggingen aan voor hun eigen rechtsgebied.

## 7. Kennisgeving van wijzigingen in verwerkers

Het toevoegen of vervangen van een verwerker is een wezenlijke wijziging in de zin van paragraaf 13 van het [Privacybeleid](/nl/mail/privacy-policy/); de Exploitant kondigt dat vooraf aan volgens de procedure in die paragraaf en werkt deze lijst bij.
