> **Disclaimer.** Dit is een studentenonderzoek (hbo Finance & Control) en **geen juridisch advies**. Het memo geeft de stand van zaken op peildatum **17 november 2026**. De voorwaarden van AI-aanbieders veranderen vaak. Controleer vóór gebruik de actuele voorwaarden en het beleid van je eigen werkgever; dat kan strenger zijn dan dit stoplicht. Het bronnenonderzoek is uitgevoerd met de onderzoeksfunctie van Claude (Anthropic).

**Kernantwoord.** Openbare en fictieve gegevens kun je in elke chatbot invoeren (**groen**). Vertrouwelijke bedrijfsgegevens zonder persoonsgegevens horen alleen in een zakelijk account met verwerkersovereenkomst, of moeten eerst echt geanonimiseerd worden (**oranje**). Herleidbare persoonsgegevens zoals salarissen, BSN's, IBAN's en gezondheidsgegevens, en koersgevoelige of M&A-informatie, voer je nooit in een algemene chatbot in (**rood**). Dat geldt ook voor een zakelijk account, tenzij je organisatie vooraf een DPIA heeft gedaan en die specifieke toepassing heeft goedgekeurd. Het verschil tussen privé en zakelijk is groot. Bij de consumentenversies (ChatGPT Free/Plus/Pro, Claude Free/Pro/Max, Copilot met een persoonlijk Microsoft-account) kan je invoer standaard voor modeltraining worden gebruikt. Bij de zakelijke versies (ChatGPT Business/Enterprise/API, Claude Team/Enterprise/API, Microsoft 365 Copilot met een werkaccount) gebeurt dat standaard niet en is de aanbieder verwerker in opdracht van je werkgever.

## Leeswijzer

Zoek je gegevenssoort op in het stoplicht en kijk naar de kleur. Twijfel je, kies dan de strengere kleur.

- **Privéaccount**: een gratis of betaald abonnement op je eigen naam (ChatGPT Free/Plus/Pro, Claude Free/Pro/Max, Copilot met een persoonlijk Microsoft-account). Ook een betaald Plus- of Pro-abonnement is privé.
- **Zakelijk account**: een account dat je werkgever heeft afgesloten, met verwerkersovereenkomst (ChatGPT Business/Enterprise/API, Claude Team/Enterprise/API, Microsoft 365 Copilot met je werkaccount).

Het interactieve stoplicht staat op [/presentaties/stoplicht-ai-chatbots.html](/presentaties/stoplicht-ai-chatbots.html).

## 1. Het stoplicht

| Nr. | Gegevenssoort | Kleur | Waarom | Wettelijke basis | Privé of zakelijk |
|---|---|---|---|---|---|
| 1 | Gepubliceerde jaarrekening of jaarverslag | Groen | Openbaar, niets vertrouwelijks | Geen persoonsgegevens, tenzij je namen van bestuurders gaat analyseren (art. 4 lid 1 AVG) | Mag in elk account |
| 2 | Openbare marktdata, koersen, CBS-cijfers | Groen | Openbaar | Valt buiten de AVG (overweging 26 AVG) | Mag in elk account |
| 3 | Vakvragen (IFRS, RJ, btw, begrippen) | Groen | Er gaan geen gegevens mee | Art. 4 AI Act (AI-geletterdheid): de uitkomst blijft je eigen verantwoordelijkheid | Mag; check de output tegen de bron |
| 4 | Excel-, VBA- of Power BI-vragen zonder echte data | Groen | Alleen de structuur gaat mee | Minimale gegevensverwerking (art. 5 lid 1 sub c AVG) | Mag in elk account |
| 5 | Fictieve of synthetische voorbeelddata | Groen | Niet herleidbaar | Overweging 26 AVG | Mag in elk account |
| 6 | Interne budgetten en prognoses | Oranje | Bedrijfsgeheim, concurrentiegevoelig | Wet bescherming bedrijfsgeheimen, art. 1 ("redelijke maatregelen" om geheim te houden) | Privé: alleen afgerond en zonder bedrijfs- of afdelingsnaam. Zakelijk: mag |
| 7 | Kostprijzen, marges, tarieven | Oranje | Bedrijfsgeheim; klantcontracten kunnen geheimhouding eisen | Wbb; NDA | Privé: alleen geanonimiseerd en geschaald (index 100). Zakelijk: mag als de NDA dat toestaat |
| 8 | Omzet per afdeling of regio | Oranje | Vertrouwelijk; bij kleine afdelingen soms herleidbaar | Wbb; art. 4 lid 1 AVG als herleidbaar | Privé: alleen indexcijfers of percentages. Zakelijk: mag |
| 9 | Debiteurenanalyse met alleen B.V.'s en N.V.'s | Oranje | Rechtspersonen zijn geen persoonsgegevens, maar wel vertrouwelijk | Wbb; NDA. Een eenmanszaak of vof is wél een persoonsgegeven | Privé: alleen met codes ("Debiteur A"). Zakelijk: mag |
| 10 | Contractteksten zonder namen of bedragen | Oranje | Clausules kunnen vertrouwelijk zijn | Contractuele geheimhouding | Privé: alleen generieke clausules. Zakelijk: mag |
| 11 | Ongepubliceerde cijfers van een niet-beursgenoteerd bedrijf | Oranje | Bedrijfsgeheim, geen voorwetenschap | Wbb | Alleen zakelijk |
| 12 | Salarisadministratie en loonstroken met namen | Rood | Herleidbaar en gevoelig; geen grondslag om het naar een chatbot te sturen | Art. 5, 6 en 32 AVG | Privé: nooit. Zakelijk: alleen met DPIA en een goedgekeurd doel |
| 13 | BSN | Rood | Mag alleen voor een wettelijk doel, zoals de loonaangifte | Art. 87 AVG jo. art. 46 UAVG | In geen enkel account |
| 14 | IBAN, bankgegevens, inloggegevens, wachtwoorden, API-sleutels | Rood | Fraude- en beveiligingsrisico | Art. 32 AVG; art. 33 AVG (datalek melden binnen 72 uur) | In geen enkel account |
| 15 | Debiteurenlijst met consumenten of zzp'ers | Rood | Persoonsgegevens en betalingsgedrag | Art. 5 en 6 AVG; kredietscoring van particulieren is hoog-risico AI (bijlage III, punt 5b AI Act) | Privé: nooit. Zakelijk: alleen gepseudonimiseerd en met DPIA |
| 16 | Ziekteverzuim, gezondheid, vakbondslidmaatschap | Rood | Bijzondere persoonsgegevens | Art. 9 AVG (verbod, tenzij uitzondering) | In geen enkel account |
| 17 | Ongepubliceerde cijfers van een beursgenoteerd bedrijf | Rood | Voorwetenschap | MAR art. 7, 10 en 14 | In geen enkel account |
| 18 | Fusie- en overnamedossiers vóór aankondiging | Rood | Voorwetenschap of NDA; zeer concurrentiegevoelig | MAR art. 7 en 14 (bij beursnotering); Wbb; NDA | In geen enkel account, tenzij er een apart goedgekeurde dealroom-AI is |

Twee gegevenssoorten hangen af van wie erin staat. Een **debiteurenlijst** met alleen rechtspersonen is oranje; staan er eenmanszaken, zzp'ers of consumenten op, dan is hij rood. **Ongepubliceerde cijfers** zijn alleen rood vanwege de MAR als het bedrijf beursgenoteerd is. Bij een mkb-bedrijf zijn ze oranje, omdat het dan om een bedrijfsgeheim gaat.

## 2. Privé of zakelijk: drie chatbots vergeleken

| Aspect | ChatGPT privé | ChatGPT zakelijk | Claude privé | Claude zakelijk | Copilot privé | Microsoft 365 Copilot |
|---|---|---|---|---|---|---|
| Training op je invoer | Standaard aan, uit te zetten; duim omhoog of omlaag kan alsnog meetellen | Standaard niet | Eigen keuze sinds 8 oktober 2025; gemarkeerde gesprekken kunnen ook bij opt-out worden gebruikt | Standaard niet | Oude app: standaard aan. Nieuwe app (vanaf 18 augustus 2026): volgens Microsoft niet, niet officieel bevestigd | Niet voor het trainen van de taalmodellen |
| Bewaartermijn | Verwijderde chats binnen 30 dagen weg | Beheerder bepaalt; API ook zonder opslag | 30 dagen, of tot 5 jaar als training aan staat | Binnen 30 dagen na verwijderen | 18 maanden (oude app) | Volgens het beleid van de organisatie |
| Verwerkersovereenkomst (art. 28 AVG) | Nee | Ja | Nee | Ja, onderdeel van de voorwaarden | Nee | Ja |
| Opslag in de EU | Nee | Enterprise en API mogelijk; Business in uitrol | Nee | Niet gedocumenteerd, vooral VS | Nee | EU Data Boundary, maar Claude-modellen en Bing-zoeken vallen erbuiten |
| Geschikt voor oranje gegevens | Nee | Ja, als IT het heeft goedgekeurd | Nee | Ja, als IT het heeft goedgekeurd | Nee | Ja, als IT het heeft goedgekeurd |

Een zakelijk account verandert de juridische rol van de aanbieder. Bij een privéaccount verwerkt de aanbieder je gegevens voor eigen doelen. Bij een zakelijk account is hij verwerker in opdracht van je werkgever, onder een verwerkersovereenkomst. Pas daardoor kan je werkgever aan art. 28 AVG voldoen.

## 3. Het wettelijk kader

### AVG

- **Art. 4 lid 1 en 5, overweging 26.** Anonieme gegevens vallen buiten de AVG. Gepseudonimiseerde gegevens (namen vervangen door codes terwijl de sleutel nog bestaat) blijven persoonsgegevens. "Debiteur A" is dus alleen anoniem als niemand de koppeling nog redelijkerwijs kan leggen.
- **Art. 5.** Doelbinding, minimale gegevensverwerking en vertrouwelijkheid. Een salarisbestand in een chatbot zetten om het even samen te vatten, past niet bij het doel waarvoor je die gegevens hebt.
- **Art. 6 en 9.** Elke verwerking heeft een grondslag nodig; gezondheidsgegevens zijn verboden tenzij een uitzondering geldt.
- **Art. 87 AVG jo. art. 46 UAVG.** Het BSN mag alleen worden gebruikt ter uitvoering van de wet die het voorschrijft.
- **Art. 28, 32, 35 en 44 e.v.** Verwerkersovereenkomst, beveiliging, DPIA bij hoog risico en doorgifte buiten de EER. OpenAI en Anthropic slaan consumentendata grotendeels in de VS op; doorgifte steunt dan op het EU-US Data Privacy Framework of op standaardcontractbepalingen.

### AI Act (stand november 2026)

- **Art. 4 (AI-geletterdheid)** geldt sinds 2 februari 2025 voor elke organisatie die AI gebruikt. De Digital Omnibus (Verordening (EU) 2026/1744, in werking sinds 27 juli 2026) heeft dit afgezwakt: organisaties moeten nu maatregelen nemen om AI-geletterdheid te ondersteunen, in plaats van een toereikend niveau te waarborgen.
- **Art. 50 (transparantie)** geldt sinds 2 augustus 2026, met een overgangstermijn tot 2 december 2026 voor het markeren van AI-content door bestaande systemen.
- **Hoog-risico (bijlage III)**, zoals AI bij werving, promotie of ontslag (punt 4) en bij kredietwaardigheid van particulieren (punt 5b), is uitgesteld van 2 augustus 2026 naar 2 december 2027. Dan gelden ook de plichten voor gebruikers uit art. 26.
- De **regels voor grote AI-modellen** (art. 53 e.v.) gelden sinds 2 augustus 2025 voor aanbieders zoals OpenAI, Anthropic en Microsoft, niet voor jou als gebruiker.

De chatbot zelf is voor een controller dus geen hoog-risicosysteem. Het risico zit in waarvoor je hem gebruikt. Bij volledig geautomatiseerde besluiten over mensen geldt daarnaast al art. 22 AVG.

### Marktmisbruik en bedrijfsgeheimen

Ongepubliceerde cijfers van een beursgenoteerd bedrijf zijn voorwetenschap (MAR art. 7). Wie die informatie deelt met een partij buiten de insiderlijst, kan het verbod op wederrechtelijke mededeling schenden (MAR art. 10 en 14). Voor andere vertrouwelijke bedrijfsinformatie geldt de Wet bescherming bedrijfsgeheimen: informatie is alleen beschermd als je redelijke maatregelen neemt om haar geheim te houden.

### Autoriteit Persoonsgegevens

- De AP waarschuwde in augustus 2024 voor meldingen van een huisartsenpraktijk (patiëntgegevens in een chatbot) en een telecombedrijf (klantenbestand met adressen): "Als daarbij persoonsgegevens zijn ingevoerd, dan is sprake van een datalek."
- Volgens het FD (december 2025, via ICT Magazine) kreeg de AP in 2024 en 2025 tientallen van zulke meldingen, in 2025 meer dan in 2024, vooral bij gratis versies.
- Het *Hulpmiddel generatieve AI en de AVG* (juli 2026) begint met de vraag of het ook zonder persoonsgegevens kan.
- Over Microsoft 365 Copilot oordeelde de AP op 13 juli 2026 dat de inzet zoals gemeente Haarlemmermeer die beschreef inbreuk zou maken op de AVG. Ook een zakelijk account heeft doelbinding, toegangsrechten, een DPIA en menselijke controle nodig.
- Het overheidsbrede standpunt van BZK (april 2025) bepaalt dat ambtenaren in beginsel geen generatieve AI onder consumentenvoorwaarden gebruiken. Dat is een bruikbare maatstaf voor het bedrijfsleven.

## 4. Waar bronnen elkaar tegenspreken

- **Anthropic.** Blogs noemen training bij Claude "standaard aan". Anthropic spreekt zelf van een keuze, met 30 dagen bewaren als je niet meedoet en tot 5 jaar als je wel meedoet. De deadline voor die keuze schoof van 28 september naar 8 oktober 2025, en de update van de privacypolicy ging in op 8 juli 2026, niet op 7 juli zoals sommige sites melden.
- **Microsoft (privé).** De Privacy FAQ met "training standaard aan, 18 maanden bewaren" geldt volgens Microsoft alleen nog voor de oude Copilot-app. Dat de nieuwe app niet traint, melden alleen derden. Gebruik voor werk dus hoe dan ook geen persoonlijk Microsoft-account.
- **OpenAI.** De algemene bewaarplicht door de rechtszaak van The New York Times eindigde op 26 september 2025. Oudere blogs melden nog "onbeperkt bewaren"; dat klopt niet meer.
- **Microsoft 365 Copilot.** Microsoft noemt het een EU Data Boundary-dienst, maar volgens een secundaire bron vallen de Claude-modellen binnen Copilot en Bing-zoeken erbuiten.

## 5. Aanbevelingen

1. **Privacy: anonimiseer in drie stappen.** (a) Kan het zonder echte data? Gebruik dan fictieve data. (b) Haal namen, BSN's, IBAN's en personeelsnummers weg, rond bedragen af of zet ze op index 100, en vervang namen door codes. Houd de sleutel buiten de chatbot. (c) Controleer of het nog herleidbaar is, bijvoorbeeld bij een team van minder dan vijf mensen. Gebruik voor oranje gegevens alleen het account dat IT heeft goedgekeurd. Gaat het toch mis, meld het dan direct bij de privacy officer: de organisatie heeft 72 uur om het bij de AP te melden.
2. **Bias en betrouwbaarheid: controleer de uitkomst tegen de bron.** Leg elk getal, elke IFRS- of RJ-verwijzing en elke berekening naast het grootboek, de jaarrekening of de standaard. Laat AI nooit alleen beslissen over mensen, zoals beoordeling, ontslag of krediet aan particulieren. Vraag naar de aannames en kijk of groepen (leeftijd, deeltijd, locatie) systematisch anders uitkomen.
3. **Transparantie: zeg wanneer je AI hebt gebruikt.** Zet in rapportages en memo's een vaste regel: "Bij het opstellen is [tool, zakelijk account] gebruikt voor [doel]. De cijfers zijn gecontroleerd door [naam]." Informeer medewerkers vooraf als hun gegevens met AI worden geanalyseerd (art. 13 en 14 AVG) en leg het gebruik vast in het verwerkingsregister.
4. **AI-geletterdheid.** Volg de interne training en leg vast welke tools je gebruikt (art. 4 AI Act). Gebruik dit stoplicht als werkinstructie, en laat bedrijfsbeleid voorgaan als dat strenger is.

## 6. Kritische reflectie

### Grenzen van dit onderzoek

- Ik ben student en geen jurist; dit memo is geen juridisch advies.
- Voorwaarden veranderen vaak. Anthropic paste zijn beleid in 2025 en 2026 meerdere keren aan en Microsoft bracht in augustus 2026 een nieuwe consumentenapp uit. Alles geldt per 17 november 2026.
- Een aantal details over aanbieders, zoals EU-opslag bij Claude en het trainingsbeleid van de nieuwe Copilot-app, komt deels uit secundaire bronnen en is niet volledig op officiële pagina's bevestigd.
- Het stoplicht beoordeelt het **invoeren** van gegevens. Het zegt niets over de juistheid van de uitkomst of over auteursrecht op gegenereerde tekst.

### Juridisch toegestaan, ethisch twijfelachtig

**Het geanonimiseerde ontslagmodel.** Een controller zet in een zakelijk account met verwerkersovereenkomst gepseudonimiseerde salaris-, verzuim- en productiviteitsdata om inefficiënte functies te vinden. Formeel lijkt dat in orde: er is een verwerker, er staan geen namen in en er is nog geen volledig geautomatiseerd besluit. Toch kan het model historische bias overnemen tegen deeltijders of mensen met verzuim door zwangerschap of chronische ziekte. Werknemers weten niet dat hun data zo wordt gebruikt, en in kleine teams is de uitkomst gewoon herleidbaar. Vanaf 2 december 2027 valt zo'n toepassing onder hoog-risico (bijlage III, punt 4). Het uitstel maakt het nu niet ethischer.

**Even snel via je eigen Plus-account.** Een medewerker gebruikt privé ChatGPT Plus met training uitgezet, voor budgetten zonder namen. Juridisch is dat dun te verdedigen, want het gaat niet om persoonsgegevens. Toch omzeilt het de IT-afspraken (shadow AI), en een feedbackknop of een veiligheidscontrole kan de opt-out alsnog doorbreken.

## Bronnen (APA 7)

Websites geraadpleegd op 17 november 2026.

- Anthropic. (2025, 28 augustus). *Updates to consumer terms and privacy policy*. https://www.anthropic.com/news/updates-to-our-consumer-terms
- Anthropic. (z.d.-a). *Covered models*. Claude Help Center. https://support.claude.com/en/articles/15425695-covered-models
- Anthropic. (z.d.-b). *Is my data used for model training?* Privacy Center. https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training
- Anthropic. (z.d.-c). *Updates to our privacy policy*. Privacy Center. https://privacy.anthropic.com/en/articles/10301952-updates-to-our-privacy-policy
- Autoriteit Persoonsgegevens. (2024, 6 augustus). *Let op: gebruik AI-chatbot kan leiden tot datalekken*. https://www.autoriteitpersoonsgegevens.nl
- Autoriteit Persoonsgegevens. (2026a, maart). *Rapportage AI- & Algoritmerisico's Nederland* (editie 6). https://www.autoriteitpersoonsgegevens.nl
- Autoriteit Persoonsgegevens. (2026b, 13 juli). *Advies voorafgaande raadpleging Microsoft 365 Copilot, gemeente Haarlemmermeer* (zaak 2025-018225). https://www.autoriteitpersoonsgegevens.nl
- Autoriteit Persoonsgegevens. (2026c, 13 juli). *Hulpmiddel generatieve AI en de AVG*. https://www.autoriteitpersoonsgegevens.nl/documenten/hulpmiddel-generatieve-ai-en-de-avg-vr
- European Data Protection Board. (2024, 23 mei). *Report of the work undertaken by the ChatGPT Taskforce*. https://www.edpb.europa.eu
- Het Financieele Dagblad. (2025, 29 december). [Artikel over meldingen van datalekken via AI-chatbots bij de AP]. Aangehaald in ICT Magazine.
- Microsoft. (2026a). *Data, privacy, and security for Microsoft 365 Copilot*. Microsoft Learn. https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-privacy
- Microsoft. (2026b, 3 november). *Privacy FAQ for Microsoft Copilot*. https://support.microsoft.com/en-us/microsoft-copilot/privacy-faq-for-microsoft-copilot
- Ministerie van Binnenlandse Zaken en Koninkrijksrelaties. (2025, 22 april). *Overheidsbreed standpunt voor de inzet van generatieve AI*. Rijksoverheid.
- OpenAI. (2025). *How we're responding to The New York Times' data demands*. https://openai.com/index/response-to-nyt-data-demands/
- OpenAI. (z.d.-a). *How OpenAI handles data in consumer services*. https://help.openai.com/en/articles/7039943-how-openai-handles-data-in-consumer-services
- OpenAI. (z.d.-b). *How your data is used to improve model performance*. https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance
- Uitvoeringswet Algemene verordening gegevensbescherming. (2018). https://wetten.overheid.nl/BWBR0040940
- Verordening (EU) 2016/679 (Algemene verordening gegevensbescherming). (2016). https://eur-lex.europa.eu/eli/reg/2016/679/oj
- Verordening (EU) 2024/1689 tot vaststelling van geharmoniseerde regels betreffende artificiële intelligentie. (2024). https://eur-lex.europa.eu/eli/reg/2024/1689/oj
- Verordening (EU) 2026/1744 (Digital Omnibus on AI). (2026). https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng
- Verordening (EU) nr. 596/2014 (Verordening marktmisbruik). (2014). https://eur-lex.europa.eu/eli/reg/2014/596/oj
- Werken met AI. (z.d.). *Welke AI-tools houden je bedrijfsdata in de EU?* https://werkenmetai.nl/blog/welke-ai-tools-houden-je-bedrijfsdata-in-de-eu
- Wet bescherming bedrijfsgeheimen. (2018). https://wetten.overheid.nl
