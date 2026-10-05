---
title: Mailboxinterface en e-maildetails
description: Mailboxinterface en e-maildetails van EpoCanvas Mail — een stap voor stap uiteenzetting van de acht weergaven, alle acties op de e-maildetailpagina, het schrijfvenster als overlay en de gespreksthreads.
---

**Datum van inwerkingtreding: 6 oktober 2026 | Versie: 5.15**

Deze pagina loopt elke weergave van de hoofdinterface van de mailbox en elke actie op de e-maildetailpagina één voor één langs. De routes van de weergaven en de opbouw van de interface staan in de [Interface en routekaart](/nl/mail/interface/); het zoeken en de regels achter het ordenen staan in de [Zoek- en regelreferentie](/nl/mail/search/).

![Postvak IN van EpoCanvas Mail: driedelig gesplitst aanzicht, verificatiecodebadge en officiële verificatiemarkering (interface in vereenvoudigd Chinees)](/images/mail/ui/ui-inbox-zh.png)

*Figuur: de postvak IN. Lijst, leesvenster en zijbalk werken samen; de tellers worden onmiddellijk vernieuwd.*

## 1. De acht weergaven

| Weergave | Kerngedrag |
| --- | --- |
| Postvak IN | Standaardweergave; tijdsvolgorde op- of aflopend, gepeilde incrementele invoeging van nieuwe mail, gevirtualiseerde lijst, ongelezenstipjes, gespreksgroepering |
| Alle e-mail | Geaggregeerd over de mappen heen; klikken op een zijbalklabel filtert op dat label |
| Verzonden | Mail verzonden door het account |
| Concepten | Lokale concepten; zonder geadresseerde verschijnt een plaatsvervangende markering |
| Met ster | De verzameling mail met ster |
| Uitgesteld | Niveaus «dringend» en «wachtend»; keert automatisch terug in de postvak IN wanneer het zover is |
| Spam | Blijft 7 dagen in quarantaine en gaat daarna naar de prullenbak |
| Prullenbak | Zeven dagen na ontvangst fysiek gewist |

## 2. Acties op de e-maildetailpagina

| Groep | Acties |
| --- | --- |
| Beantwoorden | Beantwoorden, allen beantwoorden, doorsturen; inline beantwoorden en emoji-reacties |
| Ordenen | Ster geven, gelezen／ongelezen, verplaatsen naar (postvak IN／spam／prullenbak), archiveren, uitstellen (voorgesteld tijdstip of zelfgekozen), labelen, melden als spam／geen spam |
| AI | Volledige vertaling (behoudt de oorspronkelijke opmaak, doeltaal per e-mail te kiezen) en de verificatiecodebadge |
| Uitvoer | Een bericht of het hele gesprek afdrukken, .eml downloaden, de originele headers inzien |
| Beheer | De afzender blokkeren en vanaf hier filters aanmaken (labelen／als gelezen markeren／naar spam／naar de prullenbak) |

## 3. Het schrijfvenster als overlay

Schrijven is een overlay (geen eigen route), met drie ingangen: de knop «Schrijven» in de zijbalk, de zwevende knop op mobiel (verzendrecht vereist) en de diepe link `?composeTo=<address>` (vult de geadresseerde alvast in).

- Geadresseerden kunnen uit de contacten worden gekozen; mailboxen op de instantie krijgen de mail rechtstreeks afgeleverd, e-mail naar buiten gaat via de kanalen die de exploitant heeft geconfigureerd;
- De werkbalk voor tekstopmaak telt 17 hulpmiddelen: alinea's, tekengrootte, vet, cursief, onderstreept, doorgehaald, kleuren, uitlijning, geordende en ongeordende lijsten, citatie, scheidingslijn, koppeling, afbeelding, tabel, emoji, vertaling en broncodemodus;
- Bijlagen worden per accountrol ingeschakeld; de limiet voor één bijlage volgt de instelling van de instantie.

## 4. Gesprekken en opmaak

De e-maildetails ondersteunen gespreksgroepering in threads, gelaagde opmaak en zwevend snel beantwoorden; het inzien van de originele headers dient om afleverproblemen te onderzoeken. E-mail van officiële afzenders draagt de verificatiemarkering en een uitlegbalk, zie [Beveiliging tegen manipulatie en normen](/nl/mail/tamper-proof/).

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
