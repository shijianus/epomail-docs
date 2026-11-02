---
title: Functiegids van EpoCanvas Mail
description: Functiegids van EpoCanvas Mail — indeling van de postvak IN, opstellen en verzenden, zoeksyntaxis, labelregelengine, extractie van verificatiecodes, spamaanpak, doorsturen en pushmeldingen, AI-mogelijkheden en het open platform.
---

**Bijgewerkt op: 2 november 2026 | Versie: 5.25**

Deze pagina beschrijft de implementatie van EpoCanvas Mail na deze wijzigingsronde. Bestaande schermafbeeldingen tonen waar bedieningselementen staan; ze bewijzen niet dat de wijzigingen in productie zijn genomen of alle functies zijn ingeschakeld. Voor positionering, ontwikkelgeschiedenis en uitrol, zie [Projectoverzicht](/nl/mail/project/); voor gegevensverwerking en bewaring, zie [Gegevensverwerking en beveiliging](/nl/mail/data-security/).

De juridische documenten op deze site zijn vastgesteld in het traditioneel Chinees (Taiwan) als officiële versies; versies in andere talen worden uitsluitend ter referentie verstrekt, en bij discrepantie is de versie in het traditioneel Chinees leidend.

![Panorama van de postvak IN van EpoCanvas Mail: links de toegang voor het schrijven van mail, de mappenboom (Primair, Met ster, Uitgesteld, Verzonden, Concepten, Alle e-mail, Spam, Prullenbak) en de gekleurde labels (Gemeenschap, Abonnementen, Promoties, Werk); rechts de lijst met afzender, onderwerp, samenvatting, verificatiecodebadge en officiële verificatiemarkering (interface in vereenvoudigd Chinees)](/images/mail/nl/ui/views-guide.png)

*Figuur: postvak IN (screenshot in vereenvoudigd Chinees). De lijst toont direct de verificatiecodebadge (groene rand) en de verificatiemarkering van officiële e-mail (blauw vinkje); de tellers van mappen en labels synchroniseren in realtime.*

<details>
<summary>Visuele handleiding: De inbox in één oogopslag —  de vier meestgebruikte ingangen</summary>

De vier gemarkeerde gebieden van deze panoramafoto van het postvak IN komen overeen met de vier ingangen die dagelijks het meest worden gebruikt: een nieuw bericht schrijven, belangrijke mail terugvinden, uitgestelde zaken nakijken en controleren wat er verzonden is.

1. **Schrijven (hoofdknop boven in de zijbalk)**: De enige ingang voor nieuwe mail: een klik opent het schrijfvenster als overlay (geen eigen route). Op mobiel wordt het een zwevende knop, en de diepe link `?composeTo=<address>` vult de geadresseerde alvast in. Vanuit elke weergave te gebruiken.
2. **Met ster (map in de zijbalk)**: Alle mail met een ster komt hier ongeacht de map samen: klik op het sterpictogram in een lijstrij om een bericht toe te voegen. Gebruik het voor mail die je bij de hand wilt houden; de teller in de zijbalk werkt realtime bij.
3. **Uitgesteld (map in de zijbalk)**: Een wachtruimte voor uitgestelde opvolging, met twee niveaus («dringend» en «wachtend»). Kies bij een bericht «Uitstellen» met een tijdstip; zodra die tijd aanbreekt, keert het automatisch terug bovenaan het postvak IN, zodat belangrijke zaken niet wegzakken.
4. **Verzonden (map in de zijbalk)**: Het archief van alles wat dit account heeft verzonden. Het uitgaande volume is begrensd door het dagelijkse quotum van de rol; mail binnen de site wordt rechtstreeks afgeleverd, mail naar buiten gaat via het afleverkanaal.

</details>

## 1. Postvak IN en indeling

| Mogelijkheid | Beschrijving |
| --- | --- |
| E-mailweergaven | Acht weergaven: Primair, Met ster, Uitgesteld, Verzonden, Concepten, Alle e-mail, Spam, Prullenbak; tellers worden in realtime bijgewerkt |
| Leesindeling | Drie kolommen, gespreksthreads, inline antwoorden en reacties. Getoonde headers blijven gereconstrueerd en bewijzen geen versleuteling tijdens transport of opslag. Ontvangstherstel slaat daarnaast alle oorspronkelijke MIME-bytes tijdelijk in objectopslag op met server-side AES-256-GCM, niet end-to-end; bewaarbeperkingen staan in paragraaf 9. Externe afbeeldingen en CSS zijn standaard geblokkeerd; na een risicomelding kunnen afbeeldingen alleen voor dit bericht worden geladen. Afdrukken blijft standaard geblokkeerd en Telegram-delen heeft geen knop voor externe bronnen |
| Sorteeracties | Ster geven, uitstellen (op een zelfgekozen tijdstip), melden als spam／geen spam, naar de prullenbak verplaatsen, definitief verwijderen |
| Verificatiecodebadge | Verificatiecodes die door Workers AI zijn geëxtraheerd, verschijnen rechtstreeks in de lijst en de details (zie sectie 5) |
| Markering van officiële e-mail | E-mail van officiële afzenders zoals announcement@epocanvas.com draagt de verificatiemarkering en een uitlegbalk (zie [Beveiliging tegen manipulatie en normen](/nl/mail/tamper-proof/)) |

## 2. Opstellen en verzenden

![Schrijvenster van EpoCanvas Mail: de afzender is vastgezet op de huidige mailbox, geadresseerden kunnen uit de contacten worden gekozen; onder het onderwerpveld staat de werkbalk voor tekstopmaak (alinea, tekengrootte, vet, lijsten, citatie, scheidingslijn, koppeling, afbeelding, tabel, emoji, vertaling en broncodemodus), onderaan de bijlagen en de verzendknop](/images/mail/nl/ui/compose-guide.png)

*Figuur: schrijven (screenshot in vereenvoudigd Chinees). De teksteditor biedt 17 opmaakhulpmiddelen; geadresseerden op de site krijgen de mail rechtstreeks afgeleverd, e-mail naar buiten gaat via het afleverkanaal.*

<details>
<summary>Visuele handleiding: Het venster voor een nieuw bericht —  vier haltes, van opmaak tot verzending</summary>

Vier gebieden van het schrijfvenster, van opmaak tot aflevering: de werkbalk bepaalt hoe het bericht eruitziet, geadresseerden en onderwerp bepalen waar het heen gaat, en de verzendknop brengt het weg.

1. **Werkbalk voor tekstopmaak (boven de body)**: 17 opmaakhulpmiddelen: alinea en tekengrootte, vet/cursief/onderstreept/doorgehaald, kleur, uitlijning, geordende en ongeordende lijsten, citatie, scheidingslijn, koppeling, afbeelding, tabel, emoji, vertaling en broncodemodus — alles meteen zichtbaar terwijl je schrijft.
2. **Regel met geadresseerden**: Kies contacten of typ zelf adressen. Mailboxen op de site worden rechtstreeks afgeleverd (geen extern transport); adressen buiten de site gaan via het kanaal dat de exploitant heeft geconfigureerd (Resend/Mailjet en dergelijke).
3. **Onderwerpregel**: Het eerste wat de ontvanger ziet, samen met de samenvatting van de eerste regel in de lijst en in pushmeldingen. Een duidelijk onderwerp loont later bij het zoeken met de operator `subject:`.
4. **Verzendknop (rechtsonder)**: Eén klik en het bericht is weg: binnen de site direct en ogenblikkelijk, naar buiten via het afleverkanaal; achteraf controleer je het in de weergave «Verzonden». Het recht op bijlagen hangt van de rol af, met een limiet per bestand die per instantie is ingesteld (fabrieksstandaard 25 MB).

</details>

- **Teksteditor met opmaak**: alinea's, tekengrootte, vet, cursief, onderstreept, doorgehaald, kleuren, uitlijning, geordende en ongeordende lijsten, citatie, scheidingslijn, koppeling, afbeelding, tabel, emoji, vertaling en broncodemodus;
- **Bijlagen**: de mogelijkheid om bijlagen te versturen en te ontvangen wordt per accountrol ingeschakeld; de maximale grootte van één bijlage volgt de instelling van de instantie (standaard 25 MB; dit beperkt alleen gebruikers die de openbare opslag van de exploitant gebruiken, gebruikers met eigen opslag zijn niet beperkt); de opslagquota is per rol ingesteld;
- **Verzendbereik**: directe aflevering in mailboxen op de site (geen extern transport); e-mail naar buiten de site wordt afgeleverd via de kanalen die de Exploitant heeft geconfigureerd (Resend／Mailjet en dergelijke); de betrokken derden staan in de [Lijst van verwerkers](/nl/mail/sub-processors/);
- **Verzendbeheer**: in te zien in de weergave «Verzonden»; het uitgaande volume is begrensd door de dagelijkse verzendquota van de accountrol (zie sectie 6).

## 3. Zoeksyntaxis

![Resultaatweergave van EpoCanvas Mail na invoer van from:github in de zoekbalk: de lijst toont uitsluitend de overeenkomende GitHub-meldingen; de tellers in de zijbalk blijven gesynchroniseerd (interface in vereenvoudigd Chinees)](/images/mail/nl/ui/search-guide.png)

*Figuur: zoeken (screenshot in vereenvoudigd Chinees). Veldoperators kunnen met vrije trefwoorden worden gecombineerd; de trefferslijst wordt in realtime vernieuwd.*

<details>
<summary>Visuele handleiding: Zoeken —  de twee plekken die tellen in één zoekopdracht</summary>

Twee gebieden tonen één volledige zoekopdracht: typ een operator of trefwoord in het zoekvak, en de trefferslijst filtert onmiddellijk met de treffers gemarkeerd.

1. **Zoekvak in de bovenbalk**: Zoekt mail op mailpagina's en instellingen op instellingenpagina's. Tien veldoperators (`from:`, `to:`, `subject:`, `body:`, …) plus vlaggen zoals `is:` en `global:`; met spaties gescheiden voorwaarden combineren als EN, en Tab vult operators aan.
2. **Trefferslijst**: Alleen berichten die aan alle voorwaarden voldoen worden getoond, met de treffers native door de browser gemarkeerd (`hl:off` zet dit uit). Een rij openen schuift het fragmentvenster naar de treffer, zodat de context bewaard blijft.

</details>

| Operator | Voorbeeld | Beschrijving |
| --- | --- | --- |
| `from:` | `from:github` | filteren op afzender |
| `to:` | `to:baas` | filteren op geadresseerde |
| `subject:` | `subject:code` | filteren op onderwerp |
| `body:` / `subject_or_body:` | `body:factuur` | filteren op body／op onderwerp of body |
| `larger:` / `smaller:` | `larger:10M` | filteren op grootte van de e-mail |
| `before:` / `after:` | `after:2026-10-01` | filteren op datum |
| `label:` | `label:Werk` | filteren op label |
| `global:` | `global:project` | zoeken op de hele site, alle mailboxen meegenomen |
| `is:` | `is:sent`, `is:spam`, `is:trash` | filteren op status |

De markering van treffers is gebaseerd op de CSS Highlights API; zoeken op de hele site en zoeken op de pagina bestaan naast elkaar op twee niveaus.De volledige referentie van elke veldoperator, vlag en regelvoorwaarde staat in de [Zoek- en regelreferentie](/nl/mail/search/).

## 4. Labels en de regelengine voor classificatie

- Vier labels staan standaard voorgeconfigureerd: **Gemeenschap** (automatische classificatie op veelvoorkomende openbare mailboxdomeinen), **Abonnementen**, **Promoties**, **Werk**; kleuren en pictogrammen van labels zijn aanpasbaar;
- Regelvoorwaarden zijn combineerbaar (bevat in het afzenderadres, trefwoorden in het onderwerp, systeeminstellingen en dergelijke), met uitzonderingen en prioriteiten; labels worden automatisch bij ontvangst toegepast, of handmatig;
- Globale beheerinstrumenten: zwarte lijst van afzenders, zwarte lijst van trefwoorden in onderwerp en inhoud, witte-lijstmodus, onderschepping van afzenders zonder naam, onderschepping van niet-geadresseerden, onderschepping van uitvoerbare bijlagen en telling van afwijzingen door harde onderschepping;
- Labelstatistieken (totaal, ongelezen) worden in realtime in de zijbalk getoond; de classificatieresultaten zijn op de analysepagina te controleren.

## 5. Automatische extractie van verificatiecodes

![Detail van een e-mail in EpoCanvas Mail: de 6-cijferige verificatiecode uit een Cloudflare-mail wordt in groot lettertype getoond; zowel lijst als detail dragen de groene verificatiecodebadge](/images/mail/ui/ui-detail-verification.png)

*Figuur: automatische extractie mag het volledige onderwerp en maximaal 6.000 JavaScript-tekens van de berichttekst alleen naar Workers AI sturen als alle onderstaande globale voorwaarden, instantie-informatie en gebruikerskeuze zijn vervuld. Het onderwerp telt niet mee voor de tekstlimiet. Zie paragraaf 6 van het [Privacybeleid](/nl/mail/privacy-policy/) voor de rechtsgrondslag.*

<details>
<summary>Visuele handleiding: Hoe de verificatiecode-extractie in het leesvenster verschijnt</summary>

Het effect van de verificatiecode-extractie in de e-maildetails: de code van 6 cijfers in groot lettertype, met een groene badge in zowel de lijst als de details.

- **Gebied met de code in groot lettertype**: De code die Workers AI uit het onderwerp en de eerste 6,000 tekens van de body haalt, wordt direct groot weergegeven zodat je hem makkelijk kunt overnemen.
- **Groene badge**: Het groene merkteken op zowel de lijstrij als de detailpagina betekent "dit bericht bevat een geëxtraheerde verificatiecode", zodat je het al in de lijst herkent zonder elk bericht te openen. De badge verschijnt alleen bij een geslaagde extractie; zonder match of met uitgeschakelde extractie blijft hij weg — zijn afwezigheid bewijst dus niet dat de mail veilig is, alleen dat er geen code te kopiëren valt.
- **Grens**: Automatische extractie vereist samen de globale `aiCode`, `contentProcessing.verificationCodeEnabled` van de instantie, een geldige `noticeUrl` en `privacyPreferences.aiVerificationCode === true` van de gebruiker. Die voorkeur staat standaard op `false` en kan in de gegevensinstellingen worden uitgezet om volgende verzoeken te stoppen. Deze keuze vervangt geen volledige informatie, rechtsgrondslag of leveranciersovereenkomst; zie paragraaf 6 van het privacybeleid.

</details>

## 6. Spambeheer

- Quarantaine en bewaring: de dagelijkse taak berekent de bewaartermijn voor spam vanaf de aanmaaktijd van de e-mail en verplaatst deze standaard na 7 dagen naar de prullenbak. Ook de vaste prullenbakdrempel van 7 dagen wordt vanaf de aanmaaktijd berekend, zodat fysieke verwijdering in dezelfde ronde kan plaatsvinden; er zijn geen 7 extra bewaardagen. Meldingen van spam of geen spam werken de persoonlijke vertrouwenslijst bij volgens de betreffende procedure;
- Beperkingen op uitgaande e-mail: de dagelijkse verzendquota is per rol vastgesteld (gewone gebruikers 5 berichten, LV.0 8, LV.1 10, beheerders 100, het masteraccount is onbeperkt), met tellers die dagelijks worden gereset; de aanpak van quotummisbruik staat in sectie 6 van het [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/);
- De verantwoordelijkheid voor het verzenden van betaalde en marketinginhoud ligt bij de afzender; het ongevraagd bulkversturen van commerciële e-mail is verboden gedrag (zie sectie 3 van het [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/)).

## 7. Doorsturen en pushmeldingen

- **Persoonlijk doorsturen**: automatisch doorsturen naar andere adressen met cc. `rules` is niet beschikbaar en verstuurt niets; een lege `alias`-lijst evenmin. `keepCopy` staat vast op `true` om het origineel te bewaren en kan niet in de interface worden uitgezet. Ingeschakelde `rules` of ingeschakeld doorsturen met `keepCopy: false` opslaan wordt geweigerd; frontend en backend moeten samen worden bijgewerkt;
- **Globaal doorsturen**: de beheerder kan doorstuurregels op systeemniveau configureren, afhankelijk van de e-mailmodus (uitgeschakeld in de modus «Versleuteld»);
- **Telegram-pushmeldingen**: Persoonlijk `all` omvat alle e-mail; `important` vereist het exacte label `重要` of `important`, een werkelijk opgeslagen ster of bestaande code. `notifyCodeOnly` is een aparte opt-in om een bestaande code te kopiëren, standaard `false`, geen filter of nieuwe extractie. `includePreview`, ook `false`, bepaalt samenvatting en leesknop. Compatibiliteitsmodus `privacy` stuurt alleen een algemene melding zonder onderwerp, afzender, ontvanger, code, samenvatting of link; andere persoonlijke modi laten afzender en ontvanger eveneens weg. Systeemmeldingen gebruiken eigen systeemvelden. Elke verzending controleert actuele gebruiker-, mailbox- en berichtstatus en de D1-versie, ook zonder voorvertoning; lees- en bijlageverzoeken eveneens. Persoonlijke meldingen wijzigen of de gegevensinstellingen gebruiken trekt oude links in, los van toekomstige meldingen. Oude tokens zonder scope en OSS v1 vereisen vernieuwde links; chatkopieën zijn niet terug te halen. Frontend en backend moeten samen worden bijgewerkt; productie-uitrol is niet aangetoond. Zie de [Gids voor meldingen en doorsturen](/nl/mail/notify/);

## 8. AI-mogelijkheden

| Mogelijkheid | Trigger | Beschrijving |
| --- | --- | --- |
| Extractie van verificatiecodes | Automatisch bij nieuwe e-mail, alleen als aan alle voorwaarden van paragraaf 5 is voldaan; standaard uit voor gebruikers | Workers AI-inferentie; via de gegevensinstellingen zijn volgende verzoeken te stoppen |
| Volledige vertaling | De balk openen of een taal kiezen verstuurt niets; elke externe vertaling vereist uitdrukkelijke bevestiging | Globale AI, `contentProcessing.translationEnabled` en een geldige informatie-URL moeten aanstaan. Elk verzoek bevat `confirmed: true` en een `noticeUrl` die exact bij de huidige configuratie past; anders blijft de functie uit. Passende meegeleverde officiële vertalingen blijven lokaal. Openbare MyMemory/Google-aanroepen, ook voor ontbrekende segmenten, zijn uit `ai-service` verwijderd. `contentProcessing.publicTranslationFallbackEnabled` blijft `false`, opslaan als `true` wordt geweigerd en de beheeroptie staat als niet beschikbaar vermeld. Huidige ontvangers staan in de [Lijst van verwerkers](/nl/mail/sub-processors/) |
| Tekstherkenning in afbeeldingen | Bevestigde vertaling met server-side `contentProcessing.ocrEnabled === true` en expliciet `enableOcr: true` voor dit verzoek | Anders `false`; alleen tekst vertalen is mogelijk en oude OCR-voorkeuren worden niet hergebruikt. Ingesloten afbeeldingen of externe URL's kunnen worden verwerkt; decoratiefiltering blijft heuristisch |
| AI Hub | beheerdersconfiguratie | verbinding met multimodel-eindpunten die OpenAI-compatibel zijn, snelheidstests zonder tokens, modelautorisatie per rol |

De exploitant gebruikt e-mails niet zelf als dataset voor modeltraining; bewaring, training en hergebruik door derden moeten aan de hand van de feitelijke overeenkomsten en instellingen worden vastgesteld. Toestemming voor verwerking moet vrij kunnen worden ingetrokken, even eenvoudig als zij is gegeven. Als uitvoerbare keuzemogelijkheden ontbreken, moet de betreffende verwerking worden uitgeschakeld; de aanwezigheid van een interfaceknop bewijst op zichzelf geen naleving (zie paragrafen 6 en 9 van het [Privacybeleid](/nl/mail/privacy-policy/)).

## 9. Open platform en gegevensautonomie

- **OAuth 2.0 / OIDC-authenticatiecentrum**: apps kunnen worden geautoriseerd en autorisaties kunnen worden ingetrokken; de feitelijk teruggegeven gegevens kunnen het e-mailadres, de naam, avatar en rolvelden omvatten en zijn niet noodzakelijk beperkt tot de gevraagde scope. Intrekking haalt reeds verstrekte gegevens, uitgegeven ID-tokens of sessies bij derden niet terug; zie de lijst van verwerkers;
- **Integratiegids**: het registreren van apps aan beheerderskant, eindpunten en integratiecode staan in [Open platform en API-toegang](/nl/mail/api/);
- **Gegevensexport**: De instellingen exporteren geselecteerde profielvelden, velden van niet als verwijderd gemarkeerde e-mails en `customLabels`, zonder bijlagebestanden, volledige contacten, regels, beveiligingsinstellingen of auditgegevens; de backend past de gekozen periode niet toe. Exports bevatten geen tijdelijk opgeslagen oorspronkelijke MIME; .eml-bestanden blijven gereconstrueerd. De applicatiedeadline van 7 dagen kan bij herpogingen worden verlengd; succes verwijdert het object niet meteen en geplande batchopruiming kan mislukken en resten achterlaten, dus geen gegarandeerde TTL. D1-ontvangstclaims bevatten metadata, niet de ruwe berichtinhoud. De drie instellingen voor het verbergen van openbare profielstatistieken beperken ook de API; verwijderde of uitgeschakelde gebruikers geven 404, zonder automatische fysieke verwijdering van statische avatars. De nieuwe accountsluiting schakelt het account uit, trekt toegang in en registreert `manual_review`, geen volledige wissing. Zie [Gegevensexport en opslag](/nl/mail/data/);

## 10. Interface en mobiel

- Zes interfacetalen (Vereenvoudigd Chinees, Traditioneel Chinees, English, Français, Español, Nederlands), met volledig symmetrische woordenboeken in zes talen, zowel aan de front-end als aan de back-end;
- Lichte en donkere modus, meer dan 300 offline vectorpictogrammen, responsieve indeling, PWA en een Android-app (epomail). Vue gebruikt systeemlettertypen zonder externe Google Fonts-koppelingen; React host zijn lettertypen zelf. Avatars, Turnstile en andere externe bronnen kunnen nog verzoeken doen; dit is geen toezegging van nul externe verzoeken.

![Postvak IN van de Engelse interface van EpoCanvas Mail: volledige meertaligheid; de zijbalk toont Compose, Main, Starred, Snoozed, Sent, Drafts, All Mail, Spam, Trash en de labels Social, Subscriptions, Promotions, Work](/images/mail/ui/ui-inbox-en.png)

*Figuur: interface in het English. De interfacetaal is in te stellen; de symmetrie van de woordenboeken in zes talen wordt gewaarborgd door statische auditscripts.*

<details>
<summary>Visuele handleiding: De inbox in het Engels en hoe die de Chinese build weerspiegelt</summary>

Het postvak IN in de Engelse interface: volledig gelijk van structuur aan de Chinese versie; de symmetrie van het woordenboek in zes talen wordt door statische auditscripts gewaarborgd.

- **Zijbalk**: Weergaven als Compose, Starred, Snoozed en Sent en de labels Social/Subscriptions/Promotions/Work corresponderen één op één.
- **Lijst**: Afzender, onderwerp, samenvatting en verificatiecodebadge staan exact op dezelfde plek, in dezelfde grootte en kleur als in de Chinese build: lokalisatie wisselt alleen teksten uit, nooit de opmaak — daarom blijven schermafbeeldingen en instructies tussen talen herbruikbaar. Data, getallen en tellers worden ook opgemaakt volgens de interfacetaal.
- **Wisselen**: Hier stel je de interfacetaal in: een keuze uit zes (vereenvoudigd Chinees, traditioneel Chinees, English, Español, Français, Nederlands) in de groep "Taal" van de algemene instellingen, met onmiddellijke werking en zonder opnieuw in te loggen. Weergave en bezorging zijn gescheiden — systeemmeldingen en welkomstmail worden opgemaakt in de eigen taal van elke ontvanger, niet in de interfacetaal van de afzender.

</details>

![Mobiele postvak IN van EpoCanvas Mail: responsieve indeling bij een breedte van 375, de zijbalk klapt in als lade en de lijst blijft volledig leesbaar (interface in vereenvoudigd Chinees)](/images/mail/ui/ui-inbox-mobile.png)

*Figuur: mobiel (screenshot in vereenvoudigd Chinees). Dezelfde instantie past zich aan aan desktop- en mobiele browsers; installeren kan ook via een PWA of de Android-app.*

<details>
<summary>Visuele handleiding: De mobiele inbox en de responsieve afwegingen</summary>

Het postvak IN op mobiel bij een breedte van 375: de zijbalk klapt in tot een lade en de lijst blijft volledig leesbaar.

- **Zijbalk als lade**: Onder 1025 pixels breed klapt de linkerkolom in tot een lade: de hamburgerknop opent hem over een afschermvlak heen en zodra je een weergave kiest sluit hij weer, zodat het leesvenster vrij blijft. Desktop en mobiel delen dezelfde zijbalkstructuur, dus tellers en labels zijn in beide vormen exact gelijk.
- **Zwevende knop Schrijven**: De mobiele tegenhanger van de knop Schrijven op het bureaublad: vastgezet rechtsonder, blijft zichtbaar tijdens scrollen en opent bij een tik het volledige schrijfvenster. Hij verschijnt alleen bij accounts met verzendrecht — een Bezoeker of een groep met verzenden uit ziet hem nooit en kan het opstelscherm dus niet bereiken.
- **Lijst**: Dezelfde gevirtualiseerde lijst als op het bureaublad: een lange mailbox rendert alleen de zichtbare rijen, zodat het eerste beeld niet vertraagt naarmate de mailbox groeit. Raakdoelen zijn vergroot voor mobiel bereik, terwijl informatiedichtheid en kolomstructuur identiek blijven — mobiele schermafbeeldingen blijven dus geldig om velden te controleren.

</details>

## 11. Gerelateerde documenten

| Resource | Link |
| --- | --- |
| OAuth-appregistratie en eindpuntintegratietutorial | [OAuth-appregistratie en eindpuntintegratietutorial](/nl/mail/api/) |
| Zoekoperators, beheerderszoek en regelvoorwaarden | [Zoek- en regelreferentie](/nl/mail/search/) |
| Interfaceroutes en locatie van de instellingensecties | [Interface en routekaart](/nl/mail/interface/) |
| Werkingsmodi: implementatievormen, e-mailmodi en aanmelding | [Werkingsmodi](/nl/mail/modes/) |
| Instellingengids: persoonlijke instellingen en de beheerconsole | [Instellingengids](/nl/mail/settings/) |
| Positionering en implementatie van het project | [Projectoverzicht](/nl/mail/project/) |
| Technische architectuur en beveiligingsontwerp | [Technische architectuur](/nl/mail/architecture/) |
| Officiële e-mail en verificatie tegen manipulatie | [Beveiliging tegen manipulatie en normen](/nl/mail/tamper-proof/) |
| Gegevensverwerking en bewaartermijnen | [Gegevensverwerking en beveiliging](/nl/mail/data-security/) |
| Privacybeleid (AI-informatie en rechten) | [Privacybeleid](/nl/mail/privacy-policy/) |
