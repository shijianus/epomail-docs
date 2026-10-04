---
title: Servicevoorwaarden
description: Servicevoorwaarden van EpoCanvas Mail — aanvaarding en lezing van de voorwaarden, accountregels, inhoud van gebruikers, beperking van aansprakelijkheid, toepasselijk recht en bevoegde rechter.
---

**Datum van inwerkingtreding: 5 oktober 2026 | Versie: 5.11**

Deze voorwaarden vormen de overeenkomst tussen u en de Exploitant van de instantie die u gebruikt, met betrekking tot het gebruik van de dienst EpoCanvas Mail (hierna «de Dienst»). Door de registratie te voltooien, u aan te melden of de Dienst anderszins te gebruiken, verklaart u dat u de volledige inhoud van deze voorwaarden heeft gelezen en aanvaard; indien u niet instemt, registreer de Dienst dan niet of gebruik deze niet.

Deze voorwaarden zijn standaardvoorwaarden; de volledige tekst staat openbaar op de registratiepagina ter lezing voor u, en historische versies worden gearchiveerd samen met de open source-repository. Uw elektronisch gegeven instemming heeft dezelfde werking als een document en een handschriftelijke handtekening. Rechten die krachtens het toepasselijke recht niet door standaardvoorwaarden mogen worden uitgesloten of beperkt, blijven door deze voorwaarden onverlet.

De juridische documenten op deze site zijn vastgesteld in het traditioneel Chinees (Taiwan) als officiële versies; versies in andere talen worden uitsluitend ter referentie verstrekt, en bij discrepantie is de versie in het traditioneel Chinees leidend. De juridische en technische documenten op deze site volgen de open-sourceimplementatie van de dienst en beogen transparante, strenge, niet-commerciële normen voor gemeenschapscommunicatie.

![Contractlevenscyclus van de Servicevoorwaarden van EpoCanvas Mail: elektronische toestemming (registreren = akkoord, dezelfde kracht als schriftelijk) → nakoming (accountbeveiliging, uw inhoud, aansprakelijkheidsbeperkingen) → herziening (belangrijke wijzigingen worden aangekondigd vóór inwerkingtreding) → einde (opzegging, gegevensexport en verwijdering), rustend op het toepasselijke recht en de jurisdictie (vestigingsplaats van de Exploitant; gehoste instantie: Taiwan)](/images/mail/nl/tos-contract.svg)

*Figuur: de levenscyclus van het contract, van totstandkoming tot einde. Elektronische toestemming heeft dezelfde kracht als schriftelijk; account, inhoud en aansprakelijkheid in paragrafen 3, 5 en 10; herziening in paragraaf 12; beëindiging en gegevensverwijdering in paragraaf 8; toepasselijk recht en jurisdictie in paragraaf 11.*
## 1. Definities

1. **De Dienst**: alle functionaliteit die op een EpoCanvas Mail-instantie draait, waaronder de webclient, de mobiele app (epomail), de open API en de bijbehorende onderdelen.
2. **De Exploitant**: de persoon of het team dat de instantie die u gebruikt implementeert en uitbaat. Voor de gehoste instantie `mail.epocanvas.com` is dat het EpoCanvas-exploitatieteam; voor een zelfgehoste instantie is dat de implementateur ervan.
3. **U (de partij)**: de natuurlijke persoon of organisatie die zich registreert, zich aanmeldt of de Dienst anderszins gebruikt.
4. **Totstandkoming van de overeenkomst**: de overeenkomst komt tot stand met de Exploitant van de instantie waarop u zich registreert. Deze voorwaarden vormen een algemeen model: de gehoste instantie past ze rechtstreeks toe; een zelfhostende Exploitant kan ze na aanpassing als sitevoorwaarden gebruiken en dient dan de informatieverplichting jegens zijn gebruikers na te komen overeenkomstig het toepasselijke recht op zijn vestigingsplaats.

## 2. Beschrijving van de Dienst

De Dienst biedt beheer van meerdere mailboxen, het verzenden en ontvangen van e-mail binnen en buiten de site, bijlagen, labels en sterren, spamquarantaine, uitgestelde herinneringen, zoeken, AI-vertaling (optioneel), automatische extractie van verificatiecodes (optioneel), Telegram-pushmeldingen (optioneel), tweestapsverificatie (TOTP of passkeys), een open OAuth-platform en gegevensexport; welke functionaliteit daadwerkelijk beschikbaar is, wordt bepaald door wat de instantie heeft ingeschakeld.

De Dienst is gebouwd op een open source-project onder de MIT-licentie en blijft open source: de broncode is openbaar en controleerbaar, en u kunt de software zelf implementeren om over gelijkwaardige mogelijkheden te beschikken. De software zelf wordt geleverd «as is»; de licentievoorwaarden lopen gelijk met de aansprakelijkheidsregeling in deze voorwaarden (zie paragraaf 10).

## 3. Aanvraag en beveiliging van het account

1. **Registratiegegevens**: registratie vereist een geldig ontvangend e-mailadres en een wachtwoord. U kunt zich niet onder een valse identiteit registreren en geen domein gebruiken waarover u geen beschikkingsrecht heeft.
2. **Geschiktheid**: u bevestigt dat u 14 jaar of ouder bent; personen jonger dan 14 mogen de Dienst niet gebruiken. De leeftijd is gebaseerd op uw eerlijke verklaring bij registratie; de Dienst heeft geen afzonderlijk leeftijdsverificatiemechanisme, en bij een onjuiste verklaring kan de Exploitant het account beëindigen en de gegevens verwijderen. U zorgt er tevens voor dat uw registratie en gebruik binnen het recht van uw woonplaats blijven.
3. **Bewaring van referenties**: u draagt de verantwoordelijkheid voor het bewaren van uw wachtwoord, uw tweestapsverificatiereferenties en uw API-tokens. Handelingen die met uw referenties worden verricht, worden vermoed uw eigen handelingen te zijn.
4. **Tweestapsverificatie**: TOTP of passkeys wordt aanbevolen. Voor instanties met de e-mailmodus «versleuteld» kan de Exploitant activering verplicht stellen op grond van het beveiligingsbeleid.
5. **Bescherming bij aanmelding**: vijf opeenvolgende foutieve wachtwoordinvoer blokkeert de aanmelding voor twaalf uur; per account bestaan maximaal tien actieve sessies, en u kunt op elk apparaat uitloggen om tokens onmiddellijk in te trekken.
6. **Beperkingen bij registratie**: identificatoren als `admin` zijn door het systeem gereserveerd; de Exploitant kan de instantie zo instellen dat registratie uitsluitend met een registratiesleutel mogelijk is of geheel wordt gesloten; dit valt onder het beheer van de instantie.

## 4. Verlening en wijziging van de Dienst

1. **Beschikbaarheid**: de Dienst draait op de edge-infrastructuur van Cloudflare; de Exploitant spant redelijke inspanningen om de beschikbaarheid te handhaven, maar garandeert geen specifieke beschikbaarheidsgraad, aflevertermijn of hersteltermijn en biedt geen service level agreement (SLA).
2. **Wijziging van functionaliteit**: het open source-project ontwikkelt zich doorlopend; functionaliteit kan worden toegevoegd, aangepast of verwijderd; wezenlijke wijzigingen die de mogelijkheid raken om gegevens te verwijderen, worden vooraf aangekondigd.
3. **Experimentele functionaliteit**: functionaliteit die als «experimenteel» is gemarkeerd of in de testfase verkeert (zoals tekstherkenning en vertaling van afbeeldingen) wordt «as is» geleverd, kan onstabiel zijn en kan op elk moment worden aangepast of offline gehaald.
4. **Onderhoud en onderbrekingen**: de Exploitant kan de Dienst geheel of gedeeltelijk opschorten voor upgrades, herstel of maatregelen tegen misbruik; onbeschikbaarheid door storingen bij Cloudflare of bij upstream-leveranciers van AI- of afleverdiensten vormt geen wanprestatie van de Exploitant.

## 5. Uw inhoud

1. **Eigendom**: het eigendom van en de verantwoordelijkheid voor de e-mail die u verzendt en ontvangt en de bijlagen ervan rust bij u. De Exploitant gebruikt uw inhoud niet voor advertenties, modeltraining of overdracht aan anderen.
2. **Vergunning tot verwerking**: om opslag, aflevering, zoeken, pushbezorging en (optionele) vertaling te kunnen bieden, verleent u de Exploitant de vergunning uw inhoud uitsluitend technisch te verwerken binnen het bestek dat nodig is voor de exploitatie van de Dienst; de vergunning eindigt wanneer u het gebruik staakt en uw gegevens zijn verwijderd.
3. **Verantwoordelijkheid voor verzending**: u draagt de verantwoordelijkheid voor elke e-mail die u verzendt; geschillen en juridische aansprakelijkheid die voortvloeien uit de verzonden inhoud komen voor uw rekening.
4. **Kennisgeving over de toegankelijkheid van inhoud**: de Exploitant beoordeelt uw normale e-mail in beginsel niet actief. In de modus «alles» kan een beheerder technisch alle e-mail lezen (in de modus «privé» uitsluitend spam, verwijderde en onbeheerde e-mail) en treedt hij op bij meldingen of wettelijke verplichtingen. Voordat u een instantie kiest, dient u de exploitatiemodus daarvan te kennen; wie eisen stelt aan de vertrouwelijkheid, raadpleegt de toelichting op de reikwijdte van de versleuteling in paragraaf 10 van het [Privacybeleid](/nl/mail/privacy-policy/).

## 6. Uitgaande aflevering en diensten van derden

1. **Uitgaande aflevering**: e-mail die naar buiten de site wordt verzonden, wordt afgeleverd via de door de Exploitant geconfigureerde kanalen (Cloudflare Email Workers, Resend of Mailjet). Aflevering via derden kan vertraging, terugsturing of onderschepping door de provider van de ontvanger ondervinden; de Exploitant geeft geen garantie over het afleverresultaat.
2. **Voorwaarden van derden**: bij het gebruik van Telegram-pushmeldingen, AI-vertaling, aanmelding via Linux DO, externe S3-opslag en vergelijkbare functionaliteit bent u tevens gebonden aan de voorwaarden van die diensten van derden.
3. **Open OAuth-platform**: waar u apps van derden via OAuth autoriseert, staat de reikwijdte van de autorisatie (openid / profile / email) en de wijze van intrekking beschreven in paragraaf 7 van het [Privacybeleid](/nl/mail/privacy-policy/); het gebruik van gegevens door die apps wordt beheerst door hun eigen voorwaarden.

## 7. Aanvaardbaar gebruik

Uw gebruik van de Dienst is gebonden aan alle bepalingen van het [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/), waaronder het verbod op het doorgeven van onrechtmatige inhoud, het verzenden van ongevraagde bulkmail, het aanvallen van het systeem of het verstoren van het gebruik door anderen. Bij overtreding kan de Exploitant optreden volgens de procedures die in dat beleid zijn vastgesteld, tot het verwijderen van het account en alle gegevens aan toe, en bewaart hij bewijs volgens de wet en werkt hij mee aan onderzoek door bevoegde organen.

## 8. Bewaring, verwijdering en beëindiging van het account

1. **Beëindiging door u**: u kunt uw account op elk moment zelf opzeggen via de instellingen, of de Exploitant verzoeken het te verwijderen. Na opzegging vervallen sessies onmiddellijk; de e-mail komt in een zacht-verwijderde staat en, tenzij de wet bewaring vereist, voert een beheerder de fysieke verwijdering binnen 90 dagen uit.
2. **Routinematige opschoning door het systeem**: spam staat zeven dagen in quarantaine en gaat daarna naar de prullenbak; e-mail in de prullenbak wordt door het systeem zeven dagen na ontvangst fysiek verwijderd (inclusief bijlagen). Verwijdering is onomkeerbaar; haal eerst via «Gegevensexport» een JSON-kopie op.
3. **Beëindiging door de Exploitant**: bij overtreding van het [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/) kan de Exploitant uw gebruik overeenkomstig dat beleid opschorten of beëindigen.
4. **Wettelijke bewaring**: voor bewaring die op grond van wetgeving of een gerechtelijke procedure noodzakelijk is, kan de Exploitant verwijdering binnen het noodzakelijke bestek uitstellen en volgens wettelijke procedure afhandelen.

## 9. Kennisgeving van maatregelen en rechtsmiddelen

Voordat de Exploitant uw gebruik op grond van «Aanvaardbaar gebruik» of de voorgaande paragraaf opschort of beëindigt, stelt hij u daarvan in kennis en biedt hij u de gelegenheid zich uit te laten of het euvel te herstellen, behoudens in urgente omstandigheden (zoals een lopende aanval of de verzending van onrechtmatige inhoud). Oordeelt u dat een maatregel ten onrechte is genomen, dan kunt u bezwaar maken volgens de procedure in de paragraaf «Bezwaar en meldingen» van het [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/); de Exploitant heroverweegt dan en antwoordt binnen een redelijke termijn.

Worden kennisgevingen krachtens deze voorwaarden als elektronisch document gedaan, dan is het moment waarop het document binnenkomt in het informatiesysteem van de ontvanger of in het door de ontvanger aangewezen systeem, het moment van betekening. Het e-mailadres dat u bij registratie opgeeft, is de plaats van betekening voor elektronische kennisgevingen; u zorgt dat dat adres berichten blijft ontvangen.

## 10. Vrijwaring en beperking van aansprakelijkheid

1. **Levering «as is»**: de Dienst (inclusief de software) wordt geleverd «as is» en «as available», zonder enige expliciete of impliciete garantie, waaronder garanties van verkoopbaarheid, geschiktheid voor een bepaald doel en niet-inbreuk; dit loopt gelijk met de vrijwaringsomvang van de MIT-licentie waaronder de software wordt uitgegeven.
2. **Grenzen van de werking**: het voorgaande en andere bedingen die de aansprakelijkheid van de Exploitant vrijwaren of verminderen, uw verplichtingen verzwaren of uw rechten beperken, verbinden voor zover die bedingen naar de omstandigheden kennelijk onredelijk zijn of onder het toepasselijke recht niet zijn toegestaan, niet.
3. **Beperking van aansprakelijkheid**: binnen de wettelijk maximale omvang is de cumulatieve aansprakelijkheid van de Exploitant jegens u beperkt tot het hoogste van het bedrag dat u in de afgelopen 12 maanden daadwerkelijk aan de Exploitant heeft betaald (bij gratis instanties doorgaans nul) en 100 Amerikaanse dollar. De Exploitant is niet aansprakelijk voor indirecte schade, verlies van gegevens, bedrijfsschade of schade aan de goede naam. U maakt zelf back-ups van belangrijke e-mail.
4. **Wettelijke aansprakelijkheid blijft buiten de beperking**: aansprakelijkheid die krachtens het toepasselijke recht niet bij overeenkomst kan worden uitgesloten of beperkt (waaronder de aansprakelijkheid van de Exploitant wegens het niet nakomen van zijn verplichtingen voor de bescherming van persoonsgegevens), wordt door de aansprakelijkheidsbeperking in het voorgaande onderdeel niet kwijtgescholden of beperkt.
5. **Overmacht**: voor dienstonderbrekingen en gegevensverlies door natuurrampen, oorlog, overheidsingrijpen, storingen in het kernnet, grootschalige cyberaanvallen of het stopzetten van diensten door derde leveranciers, is de Exploitant, mits hij redelijke inspanningen heeft verricht, niet aansprakelijk.

## 11. Toepasselijk recht, bevoegde rechter en administratief toezicht

1. Voor de uitleg, de geldigheid en de uitvoering van deze voorwaarden geldt als toepasselijk recht het recht op de vestigingsplaats van de Exploitant: voor de gehoste instantie `mail.epocanvas.com` is dat het recht van Taiwan; voor een zelfgehoste instantie is dat het recht op de vestigingsplaats van de implementateur.
2. Geschillen die uit deze voorwaarden voortvloeien, worden eerst in onderling overleg opgelost; komt het overleg niet tot een oplossing, dan geldt voor geschillen over de gehoste instantie de arrondissementsrechtbank Taipei (Taiwan) als bevoegde rechter in eerste aanleg, en gelden voor zelfgehoste instanties de bevoegdheidsafspraken die hun Exploitant publiceert. Dwingende wettelijke regels over bevoegdheid gaan voor.
3. Voor de verwerking van persoonsgegevens in de gehoste instantie geldt het recht van Taiwan; de Exploitant aanvaardt de controle en het toezicht die het bevoegd gezag daar overeenkomstig de wet uitvoert, en stelt beveiligingsmaatregelen voor persoonsgegevensbestanden op en verbetert die doorloend (zie [Gegevensverwerking en beveiliging](/nl/mail/data-security/)).

## 12. Herziening van de voorwaarden

Deze voorwaarden kunnen worden herzien naarmate de Dienst zich ontwikkelt. Wezenlijke wijzigingen worden aangekondigd via een bericht op de site of een systeemmail, en de datum van inwerkingtreding en het versienummer bovenaan deze pagina worden bijgewerkt. Gebruikt u de Dienst na de inwerkingtreding van een wijziging voort, dan wordt u geacht de herziene voorwaarden te hebben aanvaard; indien u niet instemt, staakt u het gebruik en exporteert of verwijdert u uw gegevens. Historische versies van wezenlijke herzieningen worden gearchiveerd in de versiegeschiedenis van de open source-repository; herziene voorwaarden worden vóór de inwerkingtreding op de voornoemde wijze openbaar ter lezing aangeboden.

## 13. Contact

- **Gehoste instantie (`mail.epocanvas.com`)**: intern bericht of `admin@epocanvas.com`; voor privacy en klachten `privacy@epocanvas.com`
- **Open source-project**: Issues in de GitHub-repository (`github.com/shijianus/epomail`)
- **Zelfgehoste sites**: neem contact op met de Exploitant van de betreffende site

---

*Deze voorwaarden vormen samen met het [Privacybeleid](/nl/mail/privacy-policy/) en het [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/) de volledige overeenkomst tussen u en de Exploitant; de rangorde tussen de documenten staat in het [Overzicht van privacy en voorwaarden](/nl/mail/overview/). Dit document is een algemeen model opgesteld door de open source-gemeenschap en vormt geen juridisch advies; de Exploitant raadpleegt vóór de formele exploitatie een advocaat en past de tekst aan de eigen bedrijfsvoering aan.*
