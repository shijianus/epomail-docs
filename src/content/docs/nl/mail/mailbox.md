---
title: Mailboxinterface en e-maildetails
description: Mailboxinterface en e-maildetails van EpoCanvas Mail — een stap voor stap uiteenzetting van de acht weergaven, alle acties op de e-maildetailpagina, het schrijfvenster als overlay en de gespreksthreads.
---

**Bijgewerkt op: 2 november 2026 | Versie: 5.25**

Deze pagina loopt elke weergave van de hoofdinterface van de mailbox en elke actie op de e-maildetailpagina één voor één langs. De routes van de weergaven en de opbouw van de interface staan in de [Interface en routekaart](/nl/mail/interface/); het zoeken en de regels achter het ordenen staan in de [Zoek- en regelreferentie](/nl/mail/search/).

![Postvak IN van EpoCanvas Mail: driedelig gesplitst aanzicht, verificatiecodebadge en officiële verificatiemarkering (interface in vereenvoudigd Chinees)](/images/mail/nl/ui/views-guide.png)

*Figuur: de postvak IN. Lijst, leesvenster en zijbalk werken samen; de tellers worden onmiddellijk vernieuwd.*

<details>
<summary>Visuele handleiding: De inbox in één oogopslag —  de vier meestgebruikte ingangen</summary>

De vier gemarkeerde gebieden van deze panoramafoto van het postvak IN komen overeen met de vier ingangen die dagelijks het meest worden gebruikt: een nieuw bericht schrijven, belangrijke mail terugvinden, uitgestelde zaken nakijken en controleren wat er verzonden is.

1. **Schrijven (hoofdknop boven in de zijbalk)**: De enige ingang voor nieuwe mail: een klik opent het schrijfvenster als overlay (geen eigen route). Op mobiel wordt het een zwevende knop, en de diepe link `?composeTo=<address>` vult de geadresseerde alvast in. Vanuit elke weergave te gebruiken.
2. **Met ster (map in de zijbalk)**: Alle mail met een ster komt hier ongeacht de map samen: klik op het sterpictogram in een lijstrij om een bericht toe te voegen. Gebruik het voor mail die je bij de hand wilt houden; de teller in de zijbalk werkt realtime bij.
3. **Uitgesteld (map in de zijbalk)**: Een wachtruimte voor uitgestelde opvolging, met twee niveaus («dringend» en «wachtend»). Kies bij een bericht «Uitstellen» met een tijdstip; zodra die tijd aanbreekt, keert het automatisch terug bovenaan het postvak IN, zodat belangrijke zaken niet wegzakken.
4. **Verzonden (map in de zijbalk)**: Het archief van alles wat dit account heeft verzonden. Het uitgaande volume is begrensd door het dagelijkse quotum van de rol; mail binnen de site wordt rechtstreeks afgeleverd, mail naar buiten gaat via het afleverkanaal.

</details>

## 1. De acht weergaven

| Weergave | Kerngedrag |
| --- | --- |
| Postvak IN | Standaardweergave; tijdsvolgorde op- of aflopend, gepeilde incrementele invoeging van nieuwe mail, gevirtualiseerde lijst, ongelezenstipjes, gespreksgroepering |
| Alle e-mail | Geaggregeerd over de mappen heen; klikken op een zijbalklabel filtert op dat label |
| Verzonden | Mail verzonden door het account |
| Concepten | Lokale `draft`-records en `att`-bijlagen in IndexedDB; gewoon uitloggen bewaart concepten, terwijl verwijderen uit de lijst beide in één transactie wist |
| Met ster | De verzameling mail met ster |
| Uitgesteld | Niveaus «dringend» en «wachtend»; keert automatisch terug in de postvak IN wanneer het zover is |
| Spam | De geplande taak rekent vanaf de aanmaaktijd van de e-mail; standaard gaat deze na meer dan 7 dagen naar de prullenbak. Er zijn geen gegarandeerde 7 extra bewaardagen na verplaatsing naar spam |
| Prullenbak | Ook de vaste drempel van 7 dagen wordt vanaf de aanmaaktijd berekend, zodat fysieke verwijdering in dezelfde ronde als de verplaatsing vanuit spam kan plaatsvinden; bij meer dan 90% quotumgebruik kan een verwijderingshandeling ook direct fysiek wissen |

## 2. Acties op de e-maildetailpagina

| Groep | Acties |
| --- | --- |
| Beantwoorden | Beantwoorden, allen beantwoorden, doorsturen; inline beantwoorden en emoji-reacties |
| Ordenen | Ster geven, gelezen／ongelezen, verplaatsen naar (postvak IN／spam／prullenbak), archiveren, uitstellen (voorgesteld tijdstip of zelfgekozen), labelen, melden als spam／geen spam |
| AI | Volledige vertaling met informatie over de gegevensbestemming en bevestiging bij elk verzoek; OCR staat standaard uit. Automatische codeherkenning staat standaard uit en vereist een individuele keuze en een geconfigureerde dienst |
| Uitvoer | Een bericht of gesprek afdrukken, een .eml uit bestaande velden opbouwen en downloaden, en beschikbare headers bekijken; de zelfbedieningsexport bevat niet de volledige oorspronkelijke MIME die tijdelijk voor afleverherstel wordt bewaard |
| Beheer | De afzender blokkeren en vanaf hier filters aanmaken (labelen／als gelezen markeren／naar spam／naar de prullenbak) |

## 3. Het schrijfvenster als overlay

Schrijven is een overlay (geen eigen route), met drie ingangen: de knop «Schrijven» in de zijbalk, de zwevende knop op mobiel (verzendrecht vereist) en de diepe link `?composeTo=<address>` (vult de geadresseerde alvast in).

- Geadresseerden kunnen uit de contacten worden gekozen; mailboxen op de instantie krijgen de mail rechtstreeks afgeleverd, e-mail naar buiten gaat via de kanalen die de exploitant heeft geconfigureerd;
- De werkbalk voor tekstopmaak telt 17 hulpmiddelen: alinea's, tekengrootte, vet, cursief, onderstreept, doorgehaald, kleuren, uitlijning, geordende en ongeordende lijsten, citatie, scheidingslijn, koppeling, afbeelding, tabel, emoji, vertaling en broncodemodus;
- Bijlagen worden per accountrol ingeschakeld; de limiet voor één bijlage volgt de instelling van de instantie.

## 4. Gesprekken en opmaak

De berichtdetails ondersteunen gespreksthreads, gelaagde opmaak en zwevende snelle antwoorden. Getoonde headers en gedownloade .eml-bestanden blijven uit velden opgebouwd en zijn geen download van de volledige oorspronkelijke MIME; zie [Gegevensexport en opslag](/nl/mail/data/) voor de versleutelde herstelkopie en opruimtermijn. De lokale implementatie van deze ronde blokkeert standaard externe afbeeldingen, stijlen die netwerkbronnen laden en actieve inhoud. Bij gewoon lezen kunnen afbeeldingen alleen voor het huidige bericht worden toegestaan na uitleg dat laden het IP-adres en het openen van het bericht kan onthullen. Afdrukken blokkeert externe inhoud standaard en gedeeld lezen via Telegram biedt geen mogelijkheid deze te laden. Veilige inline-afbeeldingen en geverifieerde sitebijlagen zijn geen trackingbronnen van derden.

Gewoon uitloggen wist de huidige sessie, de cache van het geopende bericht en de ontvangersgeschiedenis, maar bewaart sessies van andere accounts en lokale concepten. Alle lokale sitegegevens wissen vereist afzonderlijke bevestiging via de [opruimactie op de pagina Gegevens](/nl/mail/data/). Dit beschrijft de lokale code, niet een bevestiging dat alle online instanties zijn bijgewerkt. Zie paragraaf 4.3 van het [Privacybeleid](/nl/mail/privacy-policy/) voor opslaggrenzen en [Beveiliging tegen manipulatie en normen](/nl/mail/tamper-proof/) voor officiële berichtmarkeringen.

<details>
<summary>Visuele handleiding: de mailboxweergaven en de e-maildetails in stappen</summary>

![De mailboxweergaven en de e-maildetails in stappen](/images/mail/nl/ui/views.png)

1. Na aanmelding landt u standaard in het Postvak IN (`/mail/u/0/#inbox`); de knop in de bovenbalk wisselt tussen op- en aflopende tijdsvolgorde.
2. Nieuwe e-mail wordt door de peiling automatisch bovenaan de lijst ingevoegd en met een rood stipje als ongelezen gemarkeerd; de mappenboom in de zijbalk wisselt tussen de acht weergaven.
3. Een klik op een zijbalklabel brengt de lijst naar «Alle e-mail» en filtert op dat label.
4. Een klik op een willekeurige e-mail opent de detailweergave (`#message/<hash>`): beantwoorden, ster geven, uitstellen, labelen, vertalen en .eml downloaden staan in de actiebalk op de pagina.

</details>

## 5. Verwante documenten

| Bron | Link |
| --- | --- |
| Weergaveroutes en de opbouw van de interface | [Interface en routekaart](/nl/mail/interface/) |
| Zoekoperators en filtervoorwaarden | [Zoek- en regelreferentie](/nl/mail/search/) |
| Labels en de regelbouwer | [Label- en classificatiebeheer](/nl/mail/labels/) |
| De gegevensverwerking van vertaling | [Privacybeleid](/nl/mail/privacy-policy/), sectie 6 |
