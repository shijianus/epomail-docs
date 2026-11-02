---
title: "Open source en zelfhosting: juridisch kader"
description: Reikwijdte van MIT, onderscheid tussen auteurs en werkelijke exploitanten en gegevensbeschermingsplichten bij zelfhosting.
---

**Bijgewerkt op: 2 november 2026 | Versie: 5.25**

Deze pagina beschrijft de open-sourcelicentie en zelfhostingverantwoordelijkheden van EpoCanvas Mail. Een particulier onderhoudt het project zonder winstoogmerk voor leren en testen; de gehoste dienst volgt afzonderlijk de [Servicevoorwaarden](/nl/mail/terms-of-service/) en het [Privacybeleid](/nl/mail/privacy-policy/). Uitrollers moeten voorwaarden en informatie voor hun werkelijke diensten geven.

De versie in traditioneel Chinees (Taiwan) is de officiële versie; andere talen zijn vertalingen ter vergelijking. Dit beperkt geen wettelijk vereiste duidelijke informatie, uitleg ten gunste van consumenten of rechten waarvan geen afstand kan worden gedaan. De bijwerkdatum vermeldt een tekstherziening en herschrijft de bij de code geleverde MIT-licentie niet.

![Rollen bij codepublicatie en instantie-exploitatie](/images/mail/nl/self-host-responsibilities.svg)

*Figuur: code publiceren maakt de auteur niet tot exploitant van andermans uitrol; auteurs die diensten exploiteren of verwerking bepalen, dragen de bijbehorende plichten.*

## 1. De licentie

De broncode volgt de bijgevoegde MIT License. Deze samenvatting moet samen met de oorspronkelijke volledige licentie worden gelezen.

1. Gebruik, kopiëren, wijzigen, samenvoegen, publiceren, verspreiden, sublicentiëren en verkopen van kopieën zijn toegestaan; het niet-commerciële projectdoel trekt door MIT toegestaan commercieel gebruik niet in.
2. Kopieën of wezenlijke delen moeten de oorspronkelijke auteursrecht- en toestemmingsvermeldingen behouden.
3. De licentie bevat levering in huidige staat en uitsluiting van garanties, voor zover toepasselijk recht dit toestaat.
4. Aansprakelijkheidsuitsluitingen gaan niet boven dwingend recht en stellen auteurs niet automatisch vrij voor afzonderlijke dienstverlening, feitelijke gegevensverwerking of eigen toezeggingen.

## 2. Buiten de licentie

- MIT verleent op zichzelf geen merksteun of partnerstatus. Namen en merken volgen relevante rechten en wet; visuele middelen volgen hun werkelijke licenties.
- Zelfgehoste sites moeten hun werkelijke exploitant duidelijk vermelden en mogen niet ten onrechte officiële exploitatie, certificering of samenwerking claimen.
- Afgeleide versies behoren verschillen te beschrijven voor onderhoud en veiligheidsbeoordeling; deze pagina voegt geen met MIT strijdige broncodebeperkingen toe.

## 3. De juridische positie van de zelf-uitroller

- Rollen volgen doelen en middelen per activiteit. Uitrollers zijn doorgaans verantwoordelijk voor zelf bepaalde verwerking, maar kunnen gezamenlijk verantwoordelijk zijn of voor anderen verwerken; zelfhosting maakt niet automatisch uitsluitend verantwoordelijk en niet iedere particulier is verantwoordelijke.
- Toepasselijk recht gaat verder dan de uitrollocatie. Beoordeel AVG-vestigings- en extraterritoriale voorwaarden, communicatiegeheim en dwingende consumentenbescherming; zonder winstoogmerk werken geeft geen vrijstelling. Rollen staan in paragraaf 2 van het [Overzicht](/nl/mail/overview/).
- Documenten kunnen als schrijfvoorbeeld dienen, maar identiteit, contact, bronnen, functies, bewaring en doorgifte moeten worden geverifieerd. Organisatieverwerking vereist voorafgaande aanvaarding en zo nodig een aparte DPA; teksten kopiëren of rollen benoemen vervangt geen rechtsgrond en werkelijke maatregelen.
- Derdenrelaties volgen feitelijke diensten en contracten; sommige aanbieders zijn voor bepaalde activiteiten zelfstandig verantwoordelijk. Leg niet alle derdenvoorwaarden aan elke gebruiker op. Verifieer aanbieders en doorgifte; de gehoste [Lijst van verwerkers](/nl/mail/sub-processors/) is geen algemene garantie.

## 4. Technische drempel en beveiligingsverantwoordelijkheid

Volg de [Uitrolgids](/nl/mail/deployment/) voor sleutels, rechten en updates en beoordeel back-ups, verwijdering, incidentafhandeling en noodzakelijke beveiliging. Upstreamreparaties werken niet automatisch elke uitrol bij; een testomgeving geeft geen recht op willekeurig gebruik van echte gegevens.

Codepublicatie alleen biedt geen SLA, permanente ondersteuning, blijvende hosting of certificering. Werkelijke exploitanten moeten beveiliging en rechtenafhandeling volgens risico en recht uitvoeren. Versleuteling en toegangsbeheer garanderen geen afwezigheid van lekken; zie [Gegevensverwerking en beveiliging](/nl/mail/data-security/) voor grenzen.

## 5. Bijdragen

- Bugs en voorstellen kunnen via [GitHub Issues](https://github.com/shijianus/epomail/issues), code via Pull Request; aanvaarding van elke inzending of een antwoordtermijn is niet beloofd.
- Bijdragers moeten bevoegd zijn onder de repositorylicentie in te dienen en vereiste derdenvermeldingen behouden. Een bijdrage alleen maakt geen exploitant of verwerkingsverantwoordelijke.
- Meld niet-openbare kwetsbaarheden en persoonsgegevens privé via paragraaf 5 van het [Overzicht](/nl/mail/overview/); meldingen te goeder trouw en rechtmatig onderzoek verliezen geen bescherming door kritiek op het project.

## 6. Verwante documenten

| Bron | Link |
| --- | --- |
| Juridische documenten, rollen en rangorde | [Overzicht van privacy en voorwaarden](/nl/mail/overview/) |
| Configuratiestappen voor zelfhosting | [Uitrolgids](/nl/mail/deployment/) |
| Gehoste functies en ondersteuningsgrenzen | [Dienstomvang en ondersteuning](/nl/mail/service-scope/) |
| Juridische en technische begrippen | [Begrippenlijst](/nl/mail/key-terms/) |
