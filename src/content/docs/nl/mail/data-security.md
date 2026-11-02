---
title: Gegevensverwerking en Beveiligingsonderhoud
description: De gecontroleerde gegevenslevenscyclus, beveiligingsmaatregelen en beperkingen, en vereisten voor rechtenverzoeken, verwijdering en incidentafhandeling bij kleine instanties zonder winstoogmerk.
---

**Bijgewerkt op: 2 november 2026 | Versie: 5.21**


<!-- legal-review-draft -->
:::caution[Juridisch beoordelingsconcept: niet de geldende kennisgeving]
Dit concept bevat voorgestelde voorwaarden en nog te verifiëren punten. Het vervangt de huidige kennisgeving niet en certificeert geen naleving. Het mag niet worden gebruikt om verwerking te activeren voordat de identiteit en wettelijk vereiste contactgegevens van de exploitant, de werkelijke rechtsgronden, ontvangers en doorgiftewaarborgen, bewaartermijnen en verwijdering zijn geverifieerd en de vereiste informatie is verstrekt. De gezaghebbende versie is de Traditioneel-Chinese tekstbasis, niet een inwerkingtreding. Bestaande wettelijke plichten en gebruikersrechten blijven onaangetast.
:::

Deze pagina vult het [Privacybeleid](/nl/mail/privacy-policy/) aan en maakt onderscheid tussen mechanismen die in de opensourcecode zijn geïmplementeerd en maatregelen die de exploitant in de feitelijke implementatie moet uitvoeren. De technische basis is de opgehaalde versie van `shijianus/epomail`; broncode bewijst niet dat de online configuratie, overeenkomsten met leveranciers of afzonderlijke verwijderingen zijn gerealiseerd.

De versie in het traditioneel Chinees (Taiwan) is de officiële versie; vertalingen mogen dwingend recht of de rechten van betrokkenen niet beperken. De dienst is een door een particulier onderhouden project voor leren en testen zonder winstoogmerk, met maatregelen die in verhouding staan tot de risico's. Deze pagina bevat geen toezegging van ISO-certificering, verzekering, permanente personele bezetting of een dienstverleningsniveau voor bedrijven.

![Beveiligingslagen voor overdracht, verwerking, opslag en authenticatiegegevens](/images/mail/nl/security-trust-shield.svg)

*Figuur: controles op elke laag verminderen verschillende risico's; het bestaan van een mechanisme, een juiste configuratie en feitelijke verificatie zijn verschillende zaken.*

## 1. Beveiligingsfuncties en bekende beperkingen

### 1.1 Overdracht en vertrouwelijkheid van communicatie

De website en API moeten correct geconfigureerde HTTPS/TLS gebruiken. Dat de browserverbinding TLS gebruikt, garandeert niet dat de volledige route via uitgaande aflevering, de systemen van ontvangers, externe objectopslag en het doorsturen door gebruikers end-to-end versleuteld is. Ook externe afbeeldingen, openbare links en het delen van leestoegang kunnen gegevens blootstellen; zie de [Lijst van verwerkers](/nl/mail/sub-processors/).

### 1.2 Verwerking aan de rand en foutopsporing

De bedrijfslogica gebruikt Cloudflare Workers; blijvende gegevens worden in databases en opslagdiensten bewaard. Tijdens het ontleden, vertalen en afleveren van e-mails en het maken van reservekopieën kan onversleutelde inhoud in het geheugen worden verwerkt; sandboxes kunnen opnieuw worden gebruikt en er is geen garantie dat het fysieke geheugen na elk verzoek wordt vernietigd. Het ontbreken van eigen servers betekent evenmin dat het platform geen logboeken of momentopnamen heeft.

In logboeken moeten authenticatiegegevens, berichtteksten en onnodige identificerende gegevens worden afgeschermd. Gebruik voor tests bij voorkeur synthetische inhoud en geïsoleerde resources; upload geen echte e-mails, sleutels of databasekopieën naar openbare repositories of niet-goedgekeurde AI- of diagnosediensten om fouten te reproduceren.

### 1.3 Versleuteling in rust

E-mailmodi kunnen serverzijdige AES-256-GCM-versleuteling in rust toepassen op onderwerpen en berichtteksten; de reikwijdte hangt af van de modus en de status van de registratie. Bijlagen, oorspronkelijke e-mails en metadata krijgen niet automatisch dezelfde bescherming op applicatieniveau. De exploitant beschikt over sleutels en serverrechten en kan technisch ontsleutelen; modusbeperkingen in de beheerinterface staan niet gelijk aan end-to-end-vertrouwelijkheid.

De instantie moet afzonderlijke, zorgvuldig beheerde sleutels gebruiken, de initialisatie voltooien, de feitelijke versleutelingsstatus verifiëren en sleutelrotatie en toegangsrechten plannen. De aanwezigheid van versleutelingsfuncties in de broncode bewijst niet dat alle historische gegevens, back-ups of kopieën bij derden zijn versleuteld.

### 1.4 Authenticatiegegevens en sessies

In de bij deze controle onderzochte versie gebruiken nieuw opgeslagen wachtwoordgegevens PBKDF2-HMAC-SHA256 met een willekeurige salt per gebruiker en standaard 210.000 iteraties; de parameters zijn configureerbaar en oudere SHA-256-registraties of registraties met lagere parameters worden nog geaccepteerd en bij verificatie bijgewerkt. TOTP-sleutels gebruiken AES-256-GCM; herstelcodes hebben een hash en een versleutelde kopie van de oorspronkelijke codes die na hernieuwde verificatie kan worden getoond, en voor passkeys worden publieke authenticatiegegevens opgeslagen. Hashing garandeert niet dat wachtwoorden niet door raden kunnen worden achterhaald; parameters moeten ook later op basis van risico's en de stand van de techniek worden beoordeeld.

TOTP-instelsleutels kunnen 600 seconden tijdelijk in KV worden bewaard; wanneer bij het bijwerken van oudere wachtwoordgegevens multifactorauthenticatie nodig is, kan het ingevoerde wachtwoord 300 seconden in de nog niet afgeronde KV-procedure worden bewaard, mogelijk met verlenging. Daarom kan niet worden gesteld dat geen enkele route authenticatiegegevens in leesbare vorm opslaat; de exploitant moet de toegang beperken en onnodige tijdelijke opslag terugdringen. De lijst met aanmeldomgevingen bevat maximaal 15 vermeldingen met een verschuivende TTL van 180 dagen; registraties die meerdere accounts aan een IP-adres koppelen, hebben een TTL van 7.200 seconden. Authenticatiegegevens voor vertrouwde apparaten kunnen 60 dagen worden bewaard en gedurende de eerste 30 dagen delen van de multifactorauthenticatie overbodig maken.

Beperkingen na mislukte aanmeldingen en intrekking van sessies zijn geïmplementeerd; JWT's zijn standaard 30 dagen geldig. De capaciteitscontroles van de sessielijst verschillen aan de grenswaarden, zodat niet kan worden gesteld dat de code strikt maximaal 10 gelijktijdige sessies garandeert. Wanneer authenticatiegegevens in localStorage van de browser worden bewaard, moeten de risico's van gedeelde apparaten en toegang door scripts nog steeds worden beperkt.

### 1.5 Gegevensverwerkingsmatrix

| Categorie | Opslaglocatie en inhoud | Bestaand opschoningsmechanisme | Beperkingen die de exploitant moet uitvoeren |
| --- | --- | --- | --- |
| Accounts en verificatie | Account-, profiel-, verificatie- en instellingsgegevens in D1; sessies in KV | Opzegging via zelfbediening markeert het account en wist de belangrijkste aanmeldstatus | De verwijdering van andere tokens, OAuth-gegevens, afbeeldingen en resterende gegevens afzonderlijk controleren; deactivering niet als volledige verwijdering beschouwen |
| Gewone e-mail | Onderwerpen, berichtteksten, metadata en labels in D1 | Handelingen van gebruikers, quotumopschoning en beheeropschoning | Gewone gegevens niet zonder doel voor onbepaalde tijd bewaren; back-ups en historische kopieën afzonderlijk afhandelen |
| Spam en prullenbak | E-mailgegevens en gekoppelde objecten | De dagelijkse verwerkingsroute vergelijkt vanaf `create_time` met de drempel van 7 dagen; na verplaatsing van spam naar de prullenbak kan in dezelfde ronde aan de verwijderingsvoorwaarden zijn voldaan | Geen vaste buffer van 7 dagen na verplaatsing naar de prullenbak; succesvolle uitvoering van geplande taken en nieuwe pogingen na fouten moeten worden gecontroleerd |
| Systeemberichten | Welkomst- en aankondigingsinhoud en vervalvelden | Sommige officiële e-mails worden bij het ophalen van de lijst op basis van de vervaltermijn, standaard 7 dagen, als verwijderd gemarkeerd en daarna via de dagelijkse route opgeschoond | Geen afzonderlijke onmiddellijke verwijdering zodra de termijn verstrijkt; de instantie moet de feitelijke termijn meedelen en de uitvoering controleren |
| Bijlagen en oorspronkelijke e-mails | Bijlagen in geconfigureerde opslag zoals S3, R2 of KV; de gecontroleerde inkomende route slaat volledige oorspronkelijke MIME-gegevens niet afzonderlijk duurzaam op | Sommige routes voor fysieke verwijdering van e-mail proberen gekoppelde objecten te verwijderen | Nieuwe pogingen na fouten, het oorspronkelijke opslagbackend, kopieën en verweesde objecten moeten worden gecontroleerd; geen toezegging van atomaire verwijdering via alle routes |
| Aanmeldingen en beveiligingsgebeurtenissen | IP-adres, User-Agent, apparaat, uitvoerende persoon, gebeurtenis en noodzakelijke gegevens over maatregelen | Accountvelden en afzonderlijke logboekmechanismen verschillen; er is geen algemene automatische vervaldatum aangetroffen | Minimalisering van velden, toegangsrechten en uitvoerbare bewaartermijnen vaststellen |
| Audits, klachten en beslissingen | Auditgebeurtenissen, risico- en ticketstatus, klachten, kennisgevingen en auditgegevens over autorisaties | Voorwaardelijke handmatige opschoning van gewone oude gebeurtenissen; geen standaard-TTL voor alle categorieën | Zie de bewaarvoorwaarden in de alinea hieronder; per categorie termijnen en verwijderingsprocedures instellen |
| Export en lokale kopieën | Door gebruikers gedownloade JSON-bestanden, afzonderlijke .eml-bestanden en browseropslag | Gebruikers beheren hun gedownloade kopieën | De reikwijdte van de export en lokale risico's meedelen; wettelijk te verstrekken maar ontbrekende gegevens via een handmatig verzoek aanvullen |

De dagelijkse opschoningsroute is ingesteld op 16:00 UTC, de volgende dag om 00:00 in Taiwan; daarnaast is er een geplande taak om de vijf minuten. Een ingestelde planning betekent niet dat elk type opschoning elke vijf minuten wordt uitgevoerd. Als een gebruiker een verwijdering uitvoert terwijl het gebruik al meer dan 90% van het quotum bedraagt, kunnen de geselecteerde e-mails direct fysiek worden verwijderd; het gaat dus niet uitsluitend om achtergrondtaken die bestaande prullenbake-mails wissen.

Het eindpunt voor auditopschoning accepteert alleen een specifiek bereik: gewone auditgebeurtenissen ouder dan 180 dagen, met normaal risico en een status van afgesloten, verlopen of afgewezen, met uitsluiting van verwijzingen door geldige blokkeringen. Dit zijn technische verwijderingsvoorwaarden, geen wettelijke minimale bewaartermijn; andere gebeurtenissen, klachten, beslissingen, kennisgevingen en autorisatieregistraties verlopen daardoor niet automatisch. De exploitant moet rechtmatige bewaarregels en uitvoerbare opschoning aanvullen en mag de aanwezigheid van een «wisknop» niet beschrijven alsof alle logboeken volgens een vastgestelde termijn worden verwijderd.

## 2. Verantwoordelijkheden voor exploitatie en opensourcecode

### 2.1 Gehoste testinstantie

Het ontbreken van winstoogmerk en onderhoud door een particulier kunnen invloed hebben op de omvang en uitvoering van redelijke maatregelen, maar heffen de wettelijke verantwoordelijkheid voor echte gegevens niet op. Er is geen toezegging van back-upvoorzieningen op bedrijfsniveau, gegevens die nooit verloren gaan of permanent gratis exploitatie; gebruikers moeten zelf de noodzakelijke kopieën bewaren en de exploitant moet ook noodzakelijke beveiliging en de afhandeling van rechtenverzoeken uitvoeren.

### 2.2 Broncodeauteurs en beheerders van implementaties

Wie alleen broncode levert en niet de doeleinden of middelen van verwerking van een specifieke instantie bepaalt, draagt daardoor niet de exploitatieverplichtingen van die instantie. Als dezelfde auteur daarnaast een gehoste instantie exploiteert, is die verantwoordelijk voor die exploitatie; ook rollen waarin daadwerkelijk gezamenlijk wordt beslist of in opdracht wordt verwerkt, moeten op basis van de feiten worden vastgesteld en kunnen niet vooraf door een document worden uitgesloten.

### 2.3 Beheer in verhouding tot de omvang

Een kleine instantie kan werken met een beknopte gegevensinventaris, minimale toegangsrechten, sleutelisolatie, controlelijsten voor leveranciersovereenkomsten en doorgiften, registraties van periodieke opschoning en een contactprocedure voor incidenten. Volgens de wet moet worden beoordeeld of een verwerkingsregister, EU-vertegenwoordiger, functionaris voor gegevensbescherming of effectbeoordeling nodig is. Alleen het opensourcekarakter of testen zonder winstoogmerk vereist geen toezegging van certificering, een speciaal team of specificaties voor zakelijke inkoop.

### 2.4 Controles vóór openstelling voor anderen

De identiteit en het adres van de exploitant, feitelijke derden en hun locaties, rechtmatige verwerkingsgrondslagen, keuze en intrekking bij functies die toestemming vereisen, bewaring van logboeken en back-ups, volledige accountverwijdering en het volgen van verzoeken moeten allemaal in de instantie worden geregeld. Gegevensstromen waarvoor de noodzakelijke grondslag of waarborgen nog ontbreken, moeten worden uitgeschakeld; alleen de informatieverstrekking aanpassen volstaat niet om verwerking voort te zetten. Nog te controleren instantiegegevens staan in paragrafen 2 en 8 van het [Privacybeleid](/nl/mail/privacy-policy/) en paragraaf 7 van de [Lijst van verwerkers](/nl/mail/sub-processors/).

## 3. Rechten, verwijdering en incidenten

### 3.1 Export en aanvullende verzoeken

De JSON-export via zelfbediening bevat een deel van de persoonsgegevens, een mapping van e-mails die niet als verwijderd zijn gemarkeerd en aangepaste labels; deze bevat niet alle ontvangstvelden, de binaire inhoud van bijlagen, oorspronkelijke e-mails, alle mailboxaliassen of beheerauditgegevens. Een afzonderlijk .eml-bestand is evenmin gegarandeerd gelijk aan alle persoonsgegevens in de database. Machineleesbare export vervult op zichzelf niet alle verplichtingen inzake inzage en overdraagbaarheid.

Niet-opgenomen gegevens die volgens de wet kunnen worden opgevraagd, moeten via een handmatig kanaal worden geverifieerd en aangevuld; het ontbreken van een functie is geen grond om het verzoek te weigeren. Antwoordtermijnen, verificatie, kosten en klachten volgen paragraaf 9 van het [Privacybeleid](/nl/mail/privacy-policy/).

### 3.2 Verwijderingsprocedure

Opzegging via zelfbediening omvat momenteel het logisch verwijderen van het account en de afhandeling van de belangrijkste aanmeldstatus; er is geen bewezen automatische volledige fysieke verwijdering na 90 dagen. De logica voor mailboxen en inkomende e-mail controleert de markering voor logische verwijdering niet overal, zodat niet kan worden gegarandeerd dat opzegging de ontvangst van e-mail onmiddellijk stopt; een ingeschakelde openbare profielpagina moet eveneens afzonderlijk worden uitgeschakeld en gecontroleerd. Ook verwijdering door een beheerder bewijst op zichzelf niet dat auditgegevens, OAuth-autorisaties, afbeeldingen en alle objecten zijn verwijderd.

Nieuwe verwijderingspogingen na fouten bij zelf aangebrachte externe opslag zijn afhankelijk van de oorspronkelijke opslagconfiguratie; als accountinstellingen eerst worden verwijderd, kan een latere poging het oorspronkelijke backend mogelijk niet meer vinden. Bewaar vóór volledige verwijdering eerst de noodzakelijke informatie om de te verwijderen gegevens te lokaliseren, controleer de afhandeling van elk object en wis daarna de bijbehorende instellingen veilig.

Verwijderingsverzoeken moeten een volgbaar dossier krijgen waarin accounts, aliassen, e-mails, objecten, verificatie en autorisaties, audit- en back-upsystemen afzonderlijk worden gecontroleerd; voor wettelijk te bewaren gegevens moet de grondslag worden vastgelegd, het gebruik worden afgezonderd en moeten de redenen en termijnen worden meegedeeld voor zover deze kunnen worden verstrekt. Stuur geen antwoord dat «alles volledig is verwijderd» voordat de voltooiing is bevestigd. Het ontbreken van interne automatisering mag niet leiden tot overschrijding van de wettelijke termijnen voor verzoeken.

### 3.3 Minimalisering en gebruikerskeuze

Niet-noodzakelijke profielvelden, openbare pagina's en externe meldingen moeten door de gebruiker worden gekozen; optionele diensten mogen alleen de benodigde velden verzenden. Vóór AI, openbare alternatieve vertaalroutes of externe bronnen voor echte persoonsgegevens worden ingeschakeld, moeten een geldige grondslag, duidelijke informatie en passende waarborgen aanwezig zijn. Voor openbare velden en inhoud die voor iedereen met een leeslink toegankelijk is, moet worden aangegeven wie toegang heeft en welke beperkingen voor intrekking gelden.

### 3.4 Incidentafhandeling

Na ontdekking van een incident moeten de gevolgen worden beperkt, noodzakelijke bewijzen worden veiliggesteld, de betrokken gegevens en risico's worden vastgesteld en beslissingen worden vastgelegd. Melding aan de toezichthouder onder de AVG is afhankelijk van de risicovoorwaarden en moet, indien mogelijk, binnen 72 uur na kennisneming plaatsvinden; bij een hoog risico moeten betrokkenen volgens de wet zonder onredelijke vertraging worden geïnformeerd. De volledige regels staan in paragraaf 10 van het [Privacybeleid](/nl/mail/privacy-policy/); een openbare aankondiging van een kwetsbaarheid mag niet standaard individuele kennisgevingen vervangen.

Beveiligingsproblemen kunnen privé worden gemeld via `announcement@epocanvas.com`; privacy- en rechtenverzoeken via `privacy@epocanvas.com`. Openbare toelichtingen op correcties mogen geen incidentdetails bevatten waarmee gebruikers kunnen worden geïdentificeerd of authenticatiegegevens die nog kunnen worden misbruikt.
