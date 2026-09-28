---
title: Servicevoorwaarden
description: Servicevoorwaarden van EpoCanvas Mail — aanvaarding en leestijd van de voorwaarden, accountregels, inhoud van gebruikers, beperking van aansprakelijkheid, toepasselijk recht en bevoegde rechter, gesteld naar het recht van de Republiek China.
---

# Servicevoorwaarden

**Datum van inwerkingtreding: 29 september 2026 | Versie: 4.1**

Deze voorwaarden vormen de overeenkomst tussen u en de Exploitant van de instance die u gebruikt, met betrekking tot het gebruik van de dienst EpoCanvas Mail (hierna «de Dienst»). Door de registratie te voltooien, u aan te melden of de Dienst anderszins te gebruiken, verklaart u dat u de volledige inhoud van deze voorwaarden heeft gelezen en aanvaard; indien u niet instemt, registreer de Dienst dan niet of gebruik deze niet.

Deze voorwaarden zijn standaardcontractvoorwaarden. Overeenkomstig artikel 11-1 van de Wet inzake consumentenbescherming (消費者保護法) dient een ondernemer de consument vóór het sluiten van een standaardcontract een redelijke periode van ten hoogste dertig dagen te geven om de volledige inhoud van de voorwaarden door te lezen; de volledige tekst van deze voorwaarden staat openbaar op de registratiepagina, en historische versies worden gearchiveerd samen met de open source-repository. De uitleg van deze voorwaarden is tevens gebonden aan artikel 247-1 van het Burgerlijk Wetboek (民法): bedingen die zijn opgesteld voor gebruik in overeenkomsten van dezelfde soort en die naar de omstandigheden kennelijk onredelijk bezwarend zijn, zijn nietig. Overeenkomstig artikel 4 van de Wet op elektronische documenten en handtekeningen (電子簽章法) heeft uw elektronisch gegeven instemming functioneel dezelfde werking als een papieren document en handtekening; de rechtswerking ervan mag niet louter wegens de elektronische vorm worden ontkend.

De juridische documenten op deze site zijn vastgesteld in het traditioneel Chinees (Taiwan) als officiële versies; versies in andere talen worden uitsluitend ter referentie verstrekt, en bij discrepantie is de versie in het traditioneel Chinees leidend.

## 1. Definities

1. **De Dienst**: alle functionaliteit die op een EpoCanvas Mail-instance draait, waaronder de webclient, de mobiele app (epomail), de open API en de bijbehorende onderdelen.
2. **De Exploitant**: de persoon of het team dat de instance die u gebruikt implementeert en uitbaat. Voor de gehoste instance `mail.epocanvas.com` is dat het EpoCanvas-exploitatieteam; voor een zelfgehoste instance is dat de implementateur ervan.
3. **U (de partij)**: de natuurlijke persoon of organisatie die zich registreert, zich aanmeldt of de Dienst anderszins gebruikt.
4. **Totstandkoming van de overeenkomst**: de overeenkomst komt tot stand met de Exploitant van de instance waarop u zich registreert. Deze voorwaarden vormen een algemeen model: de gehoste instance past ze rechtstreeks toe; een zelfhostende Exploitant kan ze na aanpassing als sitevoorwaarden gebruiken en dient dan op grond van artikel 8 van de Taiwaneese Persoonsgegevenswet (個人資料保護法, "PDPA") de informatieverplichting jegens zijn gebruikers na te komen.

## 2. Beschrijving van de Dienst

De Dienst biedt beheer van meerdere mailboxen, het verzenden en ontvangen van e-mail binnen en buiten de site, bijlagen, labels en sterren, spamquarantaine, uitgestelde herinneringen, zoeken, AI-vertaling (optioneel), automatische extractie van verificatiecodes (optioneel), Telegram-pushmeldingen (optioneel), tweestapsverificatie (TOTP of passkeys), een open OAuth-platform en gegevensexport; welke functionaliteit daadwerkelijk beschikbaar is, wordt bepaald door wat de instance heeft ingeschakeld.

De Dienst is gebouwd op een open source-project onder de MIT-licentie en blijft open source: de broncode is openbaar en controleerbaar, en u kunt de software zelf implementeren om over gelijkwaardige mogelijkheden te beschikken. De software zelf wordt geleverd «as is»; de licentievoorwaarden lopen gelijk met de aansprakelijkheidsregeling in deze voorwaarden (zie paragraaf 10).

## 3. Aanvraag en beveiliging van het account

1. **Registratiegegevens**: registratie vereist een geldig ontvangend e-mailadres en een wachtwoord. U kunt zich niet onder een valse identiteit registreren en geen domein gebruiken waarover u geen beschikkingsrecht heeft.
2. **Geschiktheid**: u bevestigt dat u 14 jaar of ouder bent; personen jonger dan 14 mogen de Dienst niet gebruiken. U zorgt er tevens voor dat uw registratie en gebruik binnen het recht van uw woonplaats blijven.
3. **Bewaring van referenties**: u draagt de verantwoordelijkheid voor het bewaren van uw wachtwoord, uw tweestapsverificatiereferenties en uw API-tokens. Handelingen die met uw referenties worden verricht, worden vermoed uw eigen handelingen te zijn.
4. **Tweestapsverificatie**: TOTP of passkeys wordt aanbevolen. Voor instances met de e-mailmodus «versleuteld» kan de Exploitant activering verplicht stellen op grond van het beveiligingsbeleid.
5. **Bescherming bij aanmelding**: vijf opeenvolgende foutieve wachtwoordinvoer blokkeert de aanmelding voor twaalf uur; per account bestaan maximaal tien actieve sessies, en u kunt op elk apparaat uitloggen om tokens onmiddellijk in te trekken.
6. **Beperkingen bij registratie**: identificatoren als `admin` zijn door het systeem gereserveerd; de Exploitant kan de instance zo instellen dat registratie uitsluitend met een registratiesleutel mogelijk is of geheel wordt gesloten; dit valt onder het beheer van de instance.

## 4. Verlening en wijziging van de Dienst

1. **Beschikbaarheid**: de Dienst draait op de edge-infrastructuur van Cloudflare; de Exploitant spant redelijke inspanningen om de beschikbaarheid te handhaven, maar garandeert geen specifieke beschikbaarheidsgraad, aflevertermijn of hersteltermijn en biedt geen service level agreement (SLA).
2. **Wijziging van functionaliteit**: het open source-project ontwikkelt zich doorlopend; functionaliteit kan worden toegevoegd, aangepast of verwijderd; wezenlijke wijzigingen die de mogelijkheid raken om gegevens te verwijderen, worden vooraf aangekondigd.
3. **Experimentele functionaliteit**: functionaliteit die als «experimenteel» is gemarkeerd of in de testfase verkeert (zoals tekstherkenning en vertaling van afbeeldingen) wordt «as is» geleverd, kan onstabiel zijn en kan op elk moment worden aangepast of offline gehaald.
4. **Onderhoud en onderbrekingen**: de Exploitant kan de Dienst geheel of gedeeltelijk opschorten voor upgrades, herstel of maatregelen tegen misbruik; onbeschikbaarheid door storingen bij Cloudflare of bij upstream-leveranciers van AI- of afleverdiensten vormt geen wanprestatie van de Exploitant.

## 5. Uw inhoud

1. **Eigendom**: het eigendom van en de verantwoordelijkheid voor de e-mail die u verzendt en ontvangt en de bijlagen ervan rust bij u. De Exploitant gebruikt uw inhoud niet voor advertenties, modeltraining of overdracht aan anderen.
2. **Vergunning tot verwerking**: om opslag, aflevering, zoeken, pushbezorging en (optionele) vertaling te kunnen bieden, verleent u de Exploitant de vergunning uw inhoud uitsluitend technisch te verwerken binnen het bestek dat nodig is voor de exploitatie van de Dienst; de vergunning eindigt wanneer u het gebruik staakt en uw gegevens zijn verwijderd.
3. **Verantwoordelijkheid voor verzending**: u draagt de verantwoordelijkheid voor elke e-mail die u verzendt; geschillen en juridische aansprakelijkheid die voortvloeien uit de verzonden inhoud komen voor uw rekening.
4. **Kennisgeving over de toegankelijkheid van inhoud**: de Exploitant beoordeelt uw normale e-mail in beginsel niet actief. In de modus «alles» kan een beheerder technisch alle e-mail lezen (in de modus «privé» uitsluitend spam, verwijderde en onbeheerde e-mail) en treedt hij op bij meldingen of wettelijke verplichtingen. Voordat u een instance kiest, dient u de exploitatiemodus daarvan te kennen; wie eisen stelt aan de vertrouwelijkheid, raadpleegt de toelichting op de reikwijdte van de versleuteling in paragraaf 10 van het [Privacybeleid](/nl/mail/privacy-policy/).

## 6. Uitgaande aflevering en diensten van derden

1. **Uitgaande aflevering**: e-mail die naar buiten de site wordt verzonden, wordt afgeleverd via de door de Exploitant geconfigureerde kanalen (Cloudflare Email Workers, Resend of Mailjet). Aflevering via derden kan vertraging, terugsturing of onderschepping door de provider van de ontvanger ondervinden; de Exploitant geeft geen garantie over het afleverresultaat.
2. **Voorwaarden van derden**: bij het gebruik van Telegram-pushmeldingen, AI-vertaling, aanmelding via Linux DO, externe S3-opslag en vergelijkbare functionaliteit bent u tevens gebonden aan de voorwaarden van die diensten van derden.
3. **Open OAuth-platform**: waar u apps van derden via OAuth autoriseert, staat de reikwijdte van de autorisatie (openid / profile / email) en de wijze van intrekking beschreven in paragraaf 9 van het [Privacybeleid](/nl/mail/privacy-policy/); het gebruik van gegevens door die apps wordt beheerst door hun eigen voorwaarden.

## 7. Aanvaardbaar gebruik

Uw gebruik van de Dienst is gebonden aan alle bepalingen van het [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/), waaronder het verbod op het doorgeven van onrechtmatige inhoud, het verzenden van ongevraagde bulkmail, het aanvallen van het systeem of het verstoren van het gebruik door anderen. Bij overtreding kan de Exploitant optreden volgens de procedures die in dat beleid zijn vastgesteld, tot het verwijderen van het account en alle gegevens aan toe, en bewaart hij bewijs volgens de wet en werkt hij mee aan onderzoek door bevoegde organen.

## 8. Bewaring, verwijdering en beëindiging van het account

1. **Beëindiging door u**: u kunt uw account op elk moment zelf opzeggen via de instellingen, of de Exploitant verzoeken het te verwijderen. Na opzegging vervallen sessies onmiddellijk; de e-mail komt in een zacht-verwijderde staat totdat een beheerder de fysieke verwijdering uitvoert.
2. **Routinematige opschoning door het systeem**: spam staat zeven dagen in quarantaine en gaat daarna naar de prullenbak; e-mail in de prullenbak wordt door het systeem zeven dagen na ontvangst fysiek verwijderd (inclusief bijlagen). Verwijdering is onomkeerbaar; haal eerst via «Gegevensexport» een JSON-kopie op.
3. **Beëindiging door de Exploitant**: bij overtreding van het [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/) kan de Exploitant uw gebruik overeenkomstig dat beleid opschorten of beëindigen.
4. **Wettelijke bewaring**: voor bewaring die op grond van wetgeving of een gerechtelijke procedure noodzakelijk is, kan de Exploitant verwijdering binnen het noodzakelijke bestek uitstellen en volgens wettelijke procedure afhandelen.

## 9. Kennisgeving van maatregelen en rechtsmiddelen

Voordat de Exploitant uw gebruik op grond van «Aanvaardbaar gebruik» of de voorgaande paragraaf opschort of beëindigt, stelt hij u daarvan in kennis en biedt hij u de gelegenheid zich uit te laten of het euvel te herstellen, behoudens in urgente omstandigheden (zoals een lopende aanval of de verzending van onrechtmatige inhoud). Oordeelt u dat een maatregel ten onrechte is genomen, dan kunt u bezwaar maken volgens de procedure in de paragraaf «Bezwaar en meldingen» van het [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/); de Exploitant heroverweegt dan en antwoordt binnen een redelijke termijn.

Kennisgevingen krachtens deze voorwaarden die als elektronisch document worden gedaan, worden wat het moment van verzending en ontvangst betreft beoordeeld overeenkomstig artikel 9 van de Wet op elektronische documenten en handtekeningen: heeft de ontvanger een informatiesysteem aangewezen voor de ontvangst van elektronische documenten, dan is het moment waarop het document in dat systeem binnenkomt het moment van ontvangst; heeft hij geen systeem aangewezen, dan geldt het moment waarop het document in het informatiesysteem van de ontvanger binnenkomt. Het e-mailadres dat u bij registratie opgeeft, is de plaats van betekening voor elektronische kennisgevingen; u zorgt dat dat adres berichten blijft ontvangen.

## 10. Vrijwaring en beperking van aansprakelijkheid

1. **Levering «as is»**: de Dienst (inclusief de software) wordt geleverd «as is» en «as available», zonder enige expliciete of impliciete garantie, waaronder garanties van verkoopbaarheid, geschiktheid voor een bepaald doel en niet-inbreuk; dit loopt gelijk met de vrijwaringsomvang van de MIT-licentie waaronder de software wordt uitgegeven.
2. **Grenzen van de werking**: het voorgaande en andere bedingen die de aansprakelijkheid van de Exploitant vrijwaren of verminderen, uw verplichtingen verzwaren of uw rechten beperken, vallen onder de regeling van standaardcontracten in artikel 247-1 van het Burgerlijk Wetboek en artikel 17 van de Wet inzake consumentenbescherming; bedingen die naar de omstandigheden kennelijk onredelijk bezwarend zijn of strijdig zijn met de door het bevoegd gezag aangekondigde verplichte en verboden bedingen, zijn gedeeltelijk nietig.
3. **Beperking van aansprakelijkheid**: binnen de wettelijk maximale omvang is de cumulatieve aansprakelijkheid van de Exploitant jegens u beperkt tot het hoogste van het bedrag dat u in de afgelopen 12 maanden daadwerkelijk aan de Exploitant heeft betaald (bij gratis instances doorgaans nul) en 100 Amerikaanse dollar. De Exploitant is niet aansprakelijk voor indirecte schade, verlies van gegevens, bedrijfsschade of schade aan de goede naam. U maakt zelf back-ups van belangrijke e-mail.
4. **Schadevergoeding voor persoonsgegevens blijft buiten de beperking**: schadevergoeding voor inbreuk op uw rechten door een schending van de Persoonsgegevenswet door de Exploitant wordt beheerst door artikel 29 van die wet: alleen wanneer een niet-overheidsorgaan kan aantonen dat geen opzet of nalatigheid aan de schending ten grondslag ligt, is het niet aansprakelijk; deze wettelijke aansprakelijkheid wordt door de aansprakelijkheidsbeperking in het voorgaande onderdeel niet kwijtgescholden of beperkt.
5. **Overmacht**: voor dienstonderbrekingen en gegevensverlies door natuurrampen, oorlog, overheidsingrijpen, storingen in het kernnet, grootschalige cyberaanvallen of het stopzetten van diensten door derde leveranciers, is de Exploitant, mits hij redelijke inspanningen heeft verricht, niet aansprakelijk.

## 11. Toepasselijk recht, bevoegde rechter en administratief toezicht

1. Voor de uitleg, de geldigheid en de uitvoering van deze voorwaarden geldt het recht van de Republiek China als toepasselijk recht.
2. Geschillen die uit deze voorwaarden voortvloeien, worden eerst in onderling overleg opgelost; komt het overleg niet tot een oplossing, dan aanvaarden beide partijen de arrondissementsrechtbank Taipei (Taiwan) als bevoegde rechter in eerste aanleg. Dwingende wettelijke regels over bevoegdheid gaan voor.
3. De Exploitant accepteert op grond van artikel 1-1 en artikel 22 van de PDPA de controle en audit door het bevoegd gezag (de Commissie voor de Bescherming van Persoonsgegevens, PDPC) en kan zich daar zonder geldige reden niet aan onttrekken, die bemoeilijken of weigeren; en op grond van artikel 20-1 van dezelfde wet en artikel 12 van de Uitvoeringsregeling (個人資料保護法施行細則) stelt hij een plan voor het onderhoud van de beveiliging van persoonsgegevensbestanden op en verbetert dat doorloend.

## 12. Herziening van de voorwaarden

Deze voorwaarden kunnen worden herzien naarmate de Dienst zich ontwikkelt. Wezenlijke wijzigingen worden aangekondigd via een bericht op de site of een systeemmail, en de datum van inwerkingtreding en het versienummer bovenaan deze pagina worden bijgewerkt. Gebruikt u de Dienst na de inwerkingtreding van een wijziging voort, dan wordt u geacht de herziene voorwaarden te hebben aanvaard; indien u niet instemt, staakt u het gebruik en exporteert of verwijdert u uw gegevens. Historische versies van wezenlijke herzieningen worden gearchiveerd in de versiegeschiedenis van de open source-repository. Overeenkomstig artikel 11-1 van de Wet inzake consumentenbescherming worden herziene voorwaarden vóór de inwerkingtreding op de voornoemde wijze ter lezing aangeboden.

## 13. Contact

- **Gehoste instance (`mail.epocanvas.com`)**: intern bericht of `admin@epocanvas.com`; voor privacy en klachten `privacy@epocanvas.com`
- **Open source-project**: Issues in de GitHub-repository (`github.com/shijianus/epomail`)
- **Zelfgehoste sites**: neem contact op met de Exploitant van de betreffende site

---

*Deze voorwaarden vormen samen met het [Privacybeleid](/nl/mail/privacy-policy/) en het [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/) de volledige overeenkomst tussen u en de Exploitant; de rangorde tussen de documenten staat in het [Overzicht van privacy en voorwaarden](/nl/mail/overview/). Dit document is een algemeen model opgesteld door de open source-gemeenschap en vormt geen juridisch advies; de Exploitant raadpleegt vóór de formele exploitatie een advocaat en past de tekst aan de eigen bedrijfsvoering aan.*
