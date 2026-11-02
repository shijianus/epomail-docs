---
title: Overzicht van privacy en voorwaarden
description: Projectdoel, feitelijke verwerkingsrollen, juridische documenten, rangorde en contactgegevens van EpoCanvas Mail.
---

**Bijgewerkt op: 2 november 2026 | Versie: 5.21**


<!-- legal-review-draft -->
:::caution[Juridisch beoordelingsconcept: niet de geldende kennisgeving]
Dit concept bevat voorgestelde voorwaarden en nog te verifiëren punten. Het vervangt de huidige kennisgeving niet en certificeert geen naleving. Het mag niet worden gebruikt om verwerking te activeren voordat de identiteit en wettelijk vereiste contactgegevens van de exploitant, de werkelijke rechtsgronden, ontvangers en doorgiftewaarborgen, bewaartermijnen en verwijdering zijn geverifieerd en de vereiste informatie is verstrekt. De gezaghebbende versie is de Traditioneel-Chinese tekstbasis, niet een inwerkingtreding. Bestaande wettelijke plichten en gebruikersrechten blijven onaangetast.
:::

Deze pagina leidt u door de juridische documenten van EpoCanvas Mail. Lees de [Servicevoorwaarden](/nl/mail/terms-of-service/) en het [Privacybeleid](/nl/mail/privacy-policy/) voordat u een account maakt; registreer u niet als u de voorwaarden niet aanvaardt. Een document lezen betekent niet instemmen met iedere verwerking van persoonsgegevens.

De versie in traditioneel Chinees (Taiwan) is de officiële versie; andere talen zijn vertalingen ter vergelijking. Dit beperkt geen wettelijk vereiste duidelijke informatie, uitleg ten gunste van consumenten of rechten waarvan geen afstand kan worden gedaan. De bijwerkdatum vermeldt een tekstherziening, geen automatische toepassing van wijzigingen op alle gebruikers.

![Verband tussen voorwaarden, privacybeleid en ondersteunende documenten](/images/mail/nl/legal-architecture.svg)

*Figuur: elk document behandelt zijn onderwerp; dwingend recht, gegevensbeschermingsrechten en consumentenrechten gaan voor de overeengekomen documentrangorde.*

## 1. Platformidentiteit

EpoCanvas Mail is een persoonlijk onderhouden nevenproject zonder winstoogmerk, bedoeld om te leren en te testen. De broncode verschijnt onder MIT en gebruikt onder meer Cloudflare Workers, D1, KV en R2. Gratis gebruik of ontbreken van winstoogmerk geeft geen vrijstelling van toepasselijke AVG-, communicatiegeheim- of consumentenverplichtingen.

1. De gehoste instantie is `mail.epocanvas.com`, gebruikt EpoCanvas als contactnaam en heeft een bijbehorende mobiele app. De identiteit waarmee de werkelijke exploitant kan worden vastgesteld, diens locatie en contactgegevens moeten overeenkomstig paragraaf 2 van het Privacybeleid worden bekendgemaakt; een teamnaam schept geen afzonderlijke rechtspersoon.
2. Zelfgehoste instanties worden door hun werkelijke exploitanten beheerd. Die moeten informatie en voorwaarden publiceren die passen bij hun configuratie en toepasselijk recht, in plaats van alleen de naam of toezeggingen van de gehoste instantie over te nemen.

De gehoste dienst is bedoeld voor leren, ontwikkeling en gewone communicatietests door personen vanaf 16 jaar met de vereiste contractuele bekwaamheid. Er is geen toezegging van een SLA, permanente bezetting, blijvende hosting of nalevingscertificering. De dienst is ongeschikt voor noodcommunicatie, wettelijke bewaring of als enige belangrijke back-up; zie [Dienstomvang en ondersteuning](/nl/mail/service-scope/).

## 2. Bepaling van de rollen bij gegevensverwerking

Rollen hangen af van wie de doelen en middelen van elke verwerking daadwerkelijk bepaalt, niet alleen van een etiket als open source, zelfhosting of een contractuele benaming. Ook toepasselijk recht hangt van meer af dan de locatie van de exploitant. Toepasselijkheid van de AVG vereist beoordeling van onder meer vestigingsactiviteiten, het aanbieden van goederen of diensten aan personen in de EU of het volgen van hun gedrag daar; bereikbaarheid van een website vanuit de EU volstaat op zichzelf niet.

![Rollen bij broncodepublicatie, exploitatie en gebruik](/images/mail/nl/self-host-responsibilities.svg)

*Figuur: code publiceren is op zichzelf geen exploitatie van andermans instantie; auteurs die ook een dienst exploiteren of verwerking bepalen, blijven verantwoordelijk voor hun feitelijke rol.*

| Situatie | Verwerkingsverantwoordelijke | Verwerker |
| --- | --- | --- |
| Gehoste instantie | De exploitant is verantwoordelijk voor account-, beveiligings- en communicatieverwerking waarvan deze doelen en middelen bepaalt; rollen voor berichtinhoud volgen het feitelijke gebruik | Infrastructuur- of bezorgaanbieders volgens geldige afspraken en instructies; dezelfde aanbieder kan een andere rol hebben voor zelfstandig bepaalde verwerking |
| Zelfgehoste instantie | De uitroller is doorgaans verantwoordelijk voor zelf bepaalde verwerking; gezamenlijke of zelfstandige verantwoordelijkheid en verwerking voor anderen zijn mogelijk, zonder automatische exclusiviteit | Volgens werkelijke diensten, contracten en instructies van de uitrol, niet rechtstreeks overgenomen uit de gehoste lijst |

Auteurs en bijdragers die alleen code of reparaties publiceren, krijgen daardoor geen exploitatie- of verantwoordelijkenplichten voor andermans uitrol. Dat onderscheid stelt hen niet vrij wanneer zij zelf een dienst exploiteren. Particuliere gebruikers worden niet automatisch verantwoordelijken die de exploitant instrueren doordat zij mail versturen of ontvangen. Verwerking voor organisaties vereist voorafgaande bevestiging dat het gebruik wordt ondersteund en zo nodig een afzonderlijke verwerkersovereenkomst (DPA); die verandert de werkelijke rollen niet.

Geen gebruiksanalyse naar het oorspronkelijke project betekent niet dat er geen netwerkverzoeken naar derden zijn. Bezorging, cloudinfrastructuur, mensverificatie, lettertypen en optionele functies staan in de [Lijst van verwerkers](/nl/mail/sub-processors/).

## 3. Documentstructuur

De documenten behandelen verschillende onderwerpen. Privacyinformatie is geen algemene toestemming voor verwerking en geen certificering van software of dienst.

| Document | Inhoud |
| --- | --- |
| [Privacybeleid](/nl/mail/privacy-policy/) | Bronnen, doelen en grondslagen, bewaring, rechten en internationale doorgifte |
| [Servicevoorwaarden](/nl/mail/terms-of-service/) | Totstandkoming, gebruik, wijzigingen, beëindiging, aansprakelijkheid en rechtsmiddelen |
| [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/) | Verboden misbruik, toegestane tests, evenredige maatregelen en bezwaar |
| [Gegevensverwerking en beveiliging](/nl/mail/data-security/) | Gegevenslevenscyclus, beveiligingscontroles en grenzen aan versleuteling en export |
| [Lijst van verwerkers](/nl/mail/sub-processors/) | Aanbieders, ontvangen gegevens, aanleidingen en doorgifteafspraken |
| [Begrippenlijst](/nl/mail/key-terms/) | Reikwijdte van juridische en technische begrippen |
| [Officiële mail en integriteitscontrole](/nl/mail/tamper-proof/) | Herkenning van systeemmail en documentintegriteit, geen overheids- of derdencertificering |

Functies en uitrol worden toegelicht in de [Functiegids](/nl/mail/features/), [Werkingsmodi](/nl/mail/modes/), [Uitrolgids](/nl/mail/deployment/) en [Open source en zelfhosting](/nl/mail/open-source/).

## 4. Rangorde

1. Dwingend toepasselijk recht en gegevens- en consumentenrechten waarvan niet kan worden afgeweken, gaan voor. Rechts- en forumkeuze kunnen wettelijke toegang tot lokale rechters of toezichthouders niet wegnemen.
2. Binnen die grenzen behandelt het Privacybeleid privacy, de Servicevoorwaarden dienstvoorwaarden en het Beleid voor acceptabel gebruik gedrag. Onduidelijkheden volgen onderwerp en toepasselijk recht; ondersteunende documenten verruimen aansprakelijkheidsuitsluitingen niet.
3. De officiële status van traditioneel Chinees is onderworpen aan de taal- en consumentenwaarborgen bovenaan deze pagina. Kennisgeving, noodzakelijke toestemming en toepassing van belangrijke wijzigingen volgen paragraaf 12 van de Voorwaarden en het Privacybeleid; voortgezet gebruik is niet automatisch toestemming voor nieuwe doelen.

Raadpleeg de [officiële AVG-tekst](https://eur-lex.europa.eu/eli/reg/2016/679/oj) voor het toepassingsbereik en de [EDPB-ledenlijst](https://www.edpb.europa.eu/about-edpb/about-edpb/members_en) voor toezichthouders.

## 5. Contactpunten

- Privacy, rechtenverzoeken en klachten over gegevensbescherming: `privacy@epocanvas.com`.
- Accounts, dienst en algemeen bezwaar: interne berichten of `admin@epocanvas.com`, ook als inloggen niet lukt.
- Broncode: [GitHub Issues](https://github.com/shijianus/epomail/issues). Publiceer geen persoonsgegevens, inloggegevens of nog niet openbaar gemaakte kwetsbaarheden.
- Zelfgehoste instanties: benader de werkelijke exploitant die de site vermeldt.

Een privacyadres betekent niet dat een functionaris voor gegevensbescherming (DPO) of EU-vertegenwoordiger is benoemd. De exploitant moet de feitelijke voorwaarden beoordelen, wettelijk vereiste benoemingen uitvoeren en verifieerbare contactgegevens publiceren.
