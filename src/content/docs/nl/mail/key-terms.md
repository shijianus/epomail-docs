---
title: Begrippenlijst
description: Definities en grenzen van juridische rollen, gegevensbronnen, versleuteling, toegangsbeheer, bewaring en verwijdering.
---

**Bijgewerkt op: 2 november 2026 | Versie: 5.25**

Deze pagina verklaart begrippen in de juridische documenten van EpoCanvas Mail en schept geen afzonderlijke verwerkingsgrond of dienstgarantie. Rollen volgen werkelijke activiteiten en toepasselijk recht; technische reikwijdte volgt de uitgerolde implementatie en [Gegevensverwerking en beveiliging](/nl/mail/data-security/).

De versie in traditioneel Chinees (Taiwan) is de officiële versie; andere talen zijn vertalingen ter vergelijking. Dit beperkt geen wettelijk vereiste duidelijke informatie, uitleg ten gunste van consumenten of rechten waarvan geen afstand kan worden gedaan. De bijwerkdatum vermeldt een tekstherziening, geen vernieuwde toestemming.

![Kaart van juridische en technische begrippen](/images/mail/nl/key-terms-glossary.svg)

*Figuur: juridische definities beschrijven rechten en rollen, technische definities mechanismen en grenzen; geen van beide vervangt feitelijke beoordeling.*

## 1. Juridische begrippen

| Begrip | Definitie |
| --- | --- |
| Persoonsgegevens | Informatie over een geïdentificeerde of identificeerbare natuurlijke persoon, inclusief accounts, netwerkregistraties en informatie in berichten, bijlagen of metadata; niet beperkt tot registratievelden |
| Anonimisering / pseudonimisering | Anonimisering vereist dat personen niet kunnen worden geïdentificeerd met middelen waarvan redelijkerwijs valt te verwachten dat zij worden gebruikt; gepseudonimiseerde, gehashte of afgeschermde gegevens die met aanvullende informatie weer aan personen kunnen worden gekoppeld, kunnen nog steeds persoonsgegevens zijn. Synthetische e-mails maken echte accounts en toegangslogboeken niet automatisch anoniem |
| Zeer gevoelige persoonsgegevens | Onder meer gegevens over gezondheid, genetische gegevens, biometrische gegevens met het oog op unieke identificatie en gegevens over het seksuele leven die bijzondere wettelijke bescherming genieten; gegevens over strafrechtelijke veroordelingen en strafbare feiten volgen afzonderlijke regels, en categorieën en voorwaarden verschillen per rechtsgebied |
| Verzamelen / verwerken / gebruiken | Verkrijgen, registreren, opslaan, opvragen, doorgeven, gebruiken en verwijderen; Taiwanees recht onderscheidt categorieën terwijl AVG-verwerking ruimer is, zonder mechanische gelijkstelling |
| Verwerkingsverantwoordelijke | Wie alleen of gezamenlijk doelen en middelen van bepaalde verwerking bepaalt; volgens feiten, zonder automatische exclusiviteit door zelfhosting of elke particuliere gebruiker als verantwoordelijke aan te merken |
| Verwerker | Wie namens een verantwoordelijke onder rechtmatige instructies verwerkt; dezelfde aanbieder kan andere activiteiten waarvan deze de doelen bepaalt zelfstandig controleren |
| Betrokkene | Natuurlijke persoon op wie gegevens betrekking hebben, waaronder gebruikers, afzenders, ontvangers en in mail genoemde personen, ook zonder account |
| Internationale doorgifte | Activiteiten die juridisch grensoverschrijdende verstrekking of toegang door een buitenlandse ontvanger vormen; geldige mechanismen volgen feitelijke routes, zonder automatische voldoening door leverancierscertificering |
| Informatieverplichting | Wettelijke informatie over identiteit van de verwerkende partij, doelen, grondslagen, bronnen, ontvangers, bewaring en rechten; indirecte bronnen omvatten afzenders, identiteitsaanbieders, melders en integraties, met termijnen en uitzonderingen volgens recht |
| Specifiek doel | Vooraf omschreven doel, waarbij verwerking rechtmatig, noodzakelijk en verenigbaar blijft; leren of testen staat willekeurig gebruik van echte mail niet toe |
| Marketingbezwaar | Wettelijk recht om direct marketing te weigeren; stop het betrokken gebruik na bezwaar en bied een toegankelijke afmeldmogelijkheid |
| Bevoegde autoriteit | Autoriteit met bevoegdheid volgens actuele wet en verwerking, niet uitsluitend op de locatie van de exploitant; EU-autoriteiten staan in de [EDPB-ledenlijst](https://www.edpb.europa.eu/about-edpb/about-edpb/members_en) |
| Seksuele beelden zonder toestemming | Intieme beelden zonder toestemming gemaakt of verspreid, inclusief schadelijke synthetische beelden; toegangsbeperking, noodzakelijke bewaring en rechtsmiddelen volgens het [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/) |
| Seksuele uitbuiting van kinderen | Seksueel misbruik, uitbuiting of grooming van kinderen, of productie, bezit of verspreiding van betrokken onrechtmatig materiaal; bescherming, melding en bewijs volgens toepasselijk recht |
| Toepasselijk contractrecht | Geldig gekozen of wettelijk bepaald contractrecht; dwingende consumenten-, gegevens- en rechtsbeschermingsrechten blijven, volgens paragraaf 11 van de [Servicevoorwaarden](/nl/mail/terms-of-service/) |
| Standaardcontract | Vooraf voor meerdere gebruikers opgestelde voorwaarden; oneerlijke bedingen of uitsluiting van onaantastbare rechten worden niet geldig door alleen op accepteren te klikken |
| Verwerkersovereenkomst (DPA) | Noodzakelijke overeenkomst over feitelijke verwerking voor een ander, instructies, beveiliging, bijstand en beëindiging; organisatiegebruik vereist afzonderlijke bevestiging en overeenkomst, zonder wijziging van rollen door benamingen |
| Functionaris voor gegevensbescherming (DPO) | Onafhankelijke gegevensbeschermingsfunctie die bij wettelijke voorwaarden moet worden aangewezen; een algemeen privacyadres bewijst geen benoeming |
| EU-vertegenwoordiger | In de EU aangewezen vertegenwoordiger wanneer vereist voor bepaalde AVG-verwerking buiten de EU; onderscheiden van de DPO en niet verondersteld benoemd vanwege Europese interfacetalen |

## 2. Technische begrippen

| Begrip | Definitie |
| --- | --- |
| Instantie (site) | EpoCanvas Mail-uitrol onder beheer van een bepaalde exploitant, zoals `mail.epocanvas.com`; gegevensstromen volgen infrastructuur en functieconfiguratie |
| Exploitant | Natuurlijke persoon of organisatie die de dienst daadwerkelijk bepaalt en beheert; een auteur die ook exploiteert, draagt bijbehorende plichten |
| PBKDF2 | Afleiding van een verificatiewaarde uit wachtwoord en salt om raden duurder te maken; geen garantie dat zwakke wachtwoorden niet worden gekraakt, feitelijke parameters in beveiligingsdocumentatie |
| TOTP | Eenmalige codes op basis van gedeeld geheim en tijd; de server moet zijn geheim beschermen en bewaart niet alleen een publieke sleutel |
| Passkey | WebAuthn-referentie; de server bewaart publieke sleutel, referentie-ID en noodzakelijke verificatiemetadata. De privésleutel wordt beheerd door authenticator of gekozen synchronisatiedienst en niet naar de verificatieserver van deze dienst gestuurd |
| JWT (sessietoken) | Ondertekend token voor aanmeldsessies; ondertekening is geen versleuteling, en geldigheid, intrekking en grenzen volgen de uitgerolde implementatie |
| localStorage | Browseropslag die sessies kan overleven en aanmeldstatus of voorkeuren kan bevatten; bewijst niet dat elke pagina of derdencomponent geen cookies gebruikt |
| Versleuteling in rust | Versleuteling van opgeslagen gegevens; mailonderwerp en tekst volgen de modus, zonder automatische bescherming van bijlagen en metadata door dezelfde applicatieversleuteling. Wie server en sleutels beheert kan mogelijk ontsleutelen |
| End-to-end-versleuteling (E2EE) | Ontwerp waarin alleen communicatie-eindpunten kunnen ontsleutelen; de dienst biedt die garantie niet en zelfstandig OpenPGP gebruiken verbergt niet noodzakelijk envelopinformatie of andere metadata |
| HMAC-gemaskeerde routering | Koppelen van bron-ID's aan gebruikersinformatie om opsomming en onbevoegde toegang te beperken; serverautorisatie blijft nodig en afwezigheid van toegangsfouten is niet gegarandeerd |
| RBAC | Acties en gegevenstoegang per rol beperken; werking hangt af van configuratie, controles en onderhoud, zonder absolute veiligheidsgarantie |
| D1 / KV / R2 | Cloudflare-database-, sleutel-waarde- en objectopslag; locaties, kopieën en bewaring volgen configuratie en aanbiedersafspraken |
| Telemetrie | Automatisch rapporteren van gebruiks- of diagnosegegevens; geen upstream-gebruiksanalyse betekent niet geen derdenverkeer voor lettertypen, verificatie, bezorging of optionele diensten |
| Zacht / fysiek verwijderen | Gegevens markeren of gebruik beperken, of verwijderen uit bepaalde opslag; geen gelijktijdige verwijdering van back-ups, externe kopieën en wettelijk bewaard bewijs, en geen zekere herstelbaarheid of onherstelbaarheid |
| BYOS | Geconfigureerde S3-compatibele opslag gebruiken; eindpunten, toegangsgegevens en bestanden kunnen voor toegang door de instantie worden verwerkt en blijven niet uitsluitend op het gebruikersapparaat |
| Workers AI | Cloudflare-inferentiedienst; ingeschakelde automatische processen en gebruikersfuncties kunnen berichtinhoud versturen, met bereik en grondslag in het [Privacybeleid](/nl/mail/privacy-policy/) |
| Turnstile | Mensverificatie van Cloudflare; verzoeken en noodzakelijke technische gegevens omvatten derdenverwerking, beschreven in de [Lijst van verwerkers](/nl/mail/sub-processors/) |
| SSRF-bescherming | Controles tegen het verleiden van een server tot ongeschikte bestemmingen; dekking en werking volgen verzoekpaden en uitrol, zonder alle risico's van externe verzoeken uit te sluiten |

## 3. Overige

Niet omschreven begrippen volgen het [Privacybeleid](/nl/mail/privacy-policy/), de [Servicevoorwaarden](/nl/mail/terms-of-service/) en toepasselijk recht. Zie de [officiële tekst](https://eur-lex.europa.eu/eli/reg/2016/679/oj) voor AVG-begrippen; deze pagina claimt geen certificering. Vragen naar `privacy@epocanvas.com`.
