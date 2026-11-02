---
title: Officiële e-mailspecificaties en verificatie tegen manipulatie
description: Hoe de officiële systeemmail van EpoCanvas Mail wordt uitgegeven en herkend — de officiële vlag, onveranderlijke aflevering, isolatie van rendering in de client en verificatie tegen manipulatie van documenten.
---

**Bijgewerkt op: 2 november 2026 | Versie: 5.25**

Dit document legt uit hoe officiële systeemmail wordt uitgegeven en hoe u haar herkent, en beschrijft het verificatiemechanisme tegen manipulatie van de juridische documenten op deze site, zodat u de echtheid van officiële communicatie en documenten kunt bevestigen. Het is opgesteld krachtens het [Privacy- en voorwaardenoverzicht](/nl/mail/overview/) en [Gegevensverwerking en Beveiligingsonderhoud](/nl/mail/data-security/).

De juridische documenten op deze site zijn vastgesteld in het traditioneel Chinees (Taiwan) als officiële versies; versies in andere talen worden uitsluitend ter referentie verstrekt, en bij discrepantie is de versie in het traditioneel Chinees leidend. De juridische en technische documenten op deze site volgen de open-sourceimplementatie van de dienst en beogen transparante, strenge, niet-commerciële normen voor gemeenschapscommunicatie.

![Drielagige architectuur van officiële mail van EpoCanvas Mail: de uitgiftelaag vergrendelt het officiële afzenderadres en injecteert de officiële vlag; de afleverlaag fixeert een onveranderlijke momentopname met terugval op vooraf ingestelde vertaling; de clientlaag isoleert rendering met Shadow DOM en inhoudssanering](/images/mail/nl/anti-tamper-architecture.svg)

*Figuur: de drie lagen van de verwerking van officiële mail. De uitgiftelaag vergrendelt het officiële afzenderadres en injecteert de officiële vlag; de afleverlaag fixeert een onveranderlijke momentopname met terugval op vooraf ingestelde vertaling; de clientlaag isoleert rendering en draagt de documentverificatie.*

## 1. Officiële afzenderidentiteit en de officiële vlag

Officiële systeemcommunicatie onderscheidt zich van gewone gebruikersmail als volgt:

1. **Eén officieel afzenderadres**: welkomstmail en wereldwijde aankondigingen worden door het systeem verstuurd vanaf `announcement@epocanvas.com`. Het adres is in het programma ingebouwd; officiële mail wordt alleen via de bevoorrechte systeempijplijn gegenereerd;
2. **De officiële vlag (isOfficial)**: mail waarvan de afzender `announcement@epocanvas.com` of `admin@epocanvas.com` is, of die het label «officieel» draagt, krijgt de vlag van het systeem; het leesvenster toont een officieel insigne en een banner, zodat u haar van gewone mail kunt onderscheiden;
3. **Levenscyclus**: welkomstmail en wereldwijde aankondigingen vervallen na een instelbaar aantal dagen (standaard 7) na aflevering en worden door een geplande taak opgeruimd.

## 2. Catalogus van officiële mail

De officiële systeemmail van de dienst is beperkt tot de volgende typen, alle gegenereerd uit ingebouwde sjablonen:

| Type | Trigger | Beschrijving |
| --- | --- | --- |
| Welkomstmail | er wordt een nieuwe mailbox aangemaakt | ingebouwd zestalig officieel sjabloon; vervalt na de ingestelde dagen (standaard 7) |
| Wereldwijde aankondiging | een beheerder publiceert een systeemaankondiging | ingebouwd zestalig officieel sjabloon; dezelfde looptijd als welkomstmail |

Buiten deze tabel stuurt het systeem nooit, vanaf geen enkel adres, mail van het soort «account afwijkend», «u heeft gewonnen» of «verificatie verlopen». Ontvangt u mail die zich officieel noemt vanaf een ander afzenderadres, meld dat dan via het kanaal in paragraaf 6.

## 3. Onveranderlijke aflevering en vooraf ingestelde vertaling

1. **Aflevering via onveranderlijke momentopname**: de variabelen van officiële mail worden bij het verzenden vervangen en de inhoud als momentopname vastgelegd; zij wordt niet opnieuw gegenereerd wanneer de ontvanger later de interfacetaal wisselt, waardoor officiële communicatie objectief uniek blijft;
2. **Terugval op vooraf ingestelde vertaling**: wanneer u «Vertalen» gebruikt op een ongewijzigde officiële mail, wordt het vooraf ingestelde officiële sjabloon in uw taal lokaal gerenderd en wordt geen mailinhoud naar een AI-dienst gestuurd; alleen mail waarvan een beheerder de body heeft gewijzigd, gaat door volledige AI-vertaling (zie paragraaf 6 van het [Privacybeleid](/nl/mail/privacy-policy/)).

## 4. Isolatie van rendering in de client

Mailinhoud (zowel officiële als inkomende mail) wordt in de browser onder de volgende isolatiemaatregelen gerenderd:

1. **Shadow DOM-isolatie**: de body wordt binnen een eigen Shadow DOM gerenderd; paginabrede stijlen en scripts kunnen de mailinhoud niet beïnvloeden, en stijlen uit de mail kunnen niet naar de pagina lekken;
2. **Sanering via whitelist**: de body wordt met DOMPurify gezuiverd; de tags `<script>`, `<iframe>`, `<object>`, `<embed>`, `<form>` en `<style>` en inline event-handlers worden verwijderd, wat scriptinjectie en interfacevervalsing blokkeert.

## 5. Verificatie tegen manipulatie van documenten

Deze site biedt SHA-256-vergelijking tussen Markdown-bronbestanden en een integriteitsmanifest. Het manifest en de pagina komen van dezelfde site en vormen geen onafhankelijke digitale handtekening; beide kunnen samen worden gewijzigd. Een gelijke hash betekent alleen dat het gekozen bestand overeenkomt met het geladen manifest. Dit bevestigt niet de inhoud van de webpagina, de identiteit van de uitgever, de echtheid van het document of juridische naleving.

| Verificatieroute | Mechanisme | Beschrijving |
| --- | --- | --- |
| Manifest voor bestandsintegriteit | `tamper-proof.json` | Leest bij het genereren de documentbestanden uit de werkboom en registreert SHA-256, het aantal bytes, de generatietijd, een Git HEAD-referentie en de lokale documentstatus |
| Paneel op deze pagina | «Integriteit van bronbestand vergelijken», alleen op deze specificatiepagina | Berekent SHA-256 van een gekozen lokaal bronbestand en vergelijkt die met het geladen manifest; er wordt niets geüpload en de gerenderde webpagina wordt niet gehasht |
| Vergelijken via de opdrachtregel | Node.js-opdracht in het paneel | Zet alleen CRLF om naar LF vóór de UTF-8-SHA-256-berekening; `sha256sum` of OpenSSL rechtstreeks op CRLF-bytes uitvoeren gebruikt andere invoer |
| Manifestbron | `docs.epocanvas.com/epomail/tamper-proof.json` | HTTPS beschermt de verbinding; een manifest van dezelfde site is op zichzelf geen handtekening of publicatiecertificering die via een onafhankelijk vertrouwd kanaal is gecontroleerd |

Het manifest gebruikt de werkboombestanden op het moment van genereren en leest niet automatisch de gecommitte bestanden in HEAD. Als de documenten niet-gecommitte of niet-gevolgde inhoud bevatten, kunnen hun hashes niet aan die gecommitte HEAD-versie worden toegeschreven; een niet-vastgelegde status bevestigt evenmin overeenstemming. De HEAD-datum is een commitdatum van de repository, niet de publicatiedatum van deze pagina.

:::tip[Een bestand vergelijken]
Kies in het paneel «Integriteit van bronbestand vergelijken» op deze pagina het lokale Markdown-bronbestand op het weergegeven pad en klik op «Bestand berekenen en vergelijken». Vergelijkingen via de opdrachtregel moeten dezelfde normalisatie van regeleinden gebruiken. Een afwijking kan door de versie, inhoud of het manifest komen. Een onbeschikbaar manifest of een lees- of berekeningsfout geldt niet als een geslaagde vergelijking.
:::

## 6. Verantwoordelijkheidsgrenzen en meldkanalen

1. **Gehoste instantie**: de uitgifte van officiële mail, de afzenderidentiteit en de documentverzegeling worden door het officiële exploitatieteam onderhouden;
2. **Zelfgehoste instanties**: zelfhosters stellen hun eigen bezorgkanalen en sleutels in en beschermen hun instantie zoals beschreven in [Gegevensverwerking en Beveiligingsonderhoud](/nl/mail/data-security/); officiële communicatie van een zelfgehoste instantie is de verantwoordelijkheid van de exploitant van die instantie;
3. **Meldkanalen**: om mail die zich voor de officiële identiteit uitgeeft, verificatieafwijkingen of beveiligingskwetsbaarheden te melden, contacteert u:
   - Officieel verzend- en beveiligingskanaal: `announcement@epocanvas.com`
   - Privacy- en gegevensbeschermingskanaal: `privacy@epocanvas.com`
