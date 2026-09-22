-- Voorbeeldprojecten om de site direct met inhoud te kunnen bekijken.
-- Los uit te voeren na de migraties (in de Supabase SQL editor of via de CLI).

insert into public.projects
  (slug, title, summary, content, tags, category, project_date, featured, published, sort_order)
values
(
  'overnameanalyse-fictieve-overname-retailketen',
  'Overnameanalyse: fictieve overname van een retailketen',
  'Due diligence en waarderingsanalyse van een fictieve overnamekandidaat in de retailsector, inclusief synergieberekening en risicoanalyse.',
  E'## Aanleiding\n\nIn dit project is een fictieve overname van een middelgrote retailketen geanalyseerd, uitgevoerd als onderdeel van het vak Financieel Management.\n\n## Aanpak\n\n- Financiële due diligence op basis van drie jaar jaarrekeningen\n- Waardering via zowel DCF als comparable company analysis\n- Synergieberekening (kosten- en omzetsynergieën)\n- Risicoanalyse en gevoeligheidsanalyse op de belangrijkste aannames\n\n## Resultaat\n\nDe analyse resulteerde in een onderbouwd overnamebod met een bandbreedte, gepresenteerd aan een fictief investeringscomité. De belangrijkste conclusie was dat de overname alleen waarde toevoegt bij realisatie van minimaal 60% van de geraamde synergieën.',
  array['overname', 'waardering', 'dcf', 'due diligence'],
  'Overnameanalyse',
  '2025-11-10',
  true,
  true,
  10
),
(
  'financieel-model-waardering-saas-onderneming',
  'Financieel model: waardering van een SaaS-onderneming',
  'Een volledig financieel 3-statement model met DCF-waardering voor een fictieve SaaS-onderneming, opgebouwd in Excel.',
  E'## Doel\n\nHet doel van dit project was het bouwen van een volledig gekoppeld 3-statement financieel model (resultatenrekening, balans, kasstroomoverzicht) voor een fictieve SaaS-onderneming, en op basis daarvan een waardering af te leiden.\n\n## Onderdelen van het model\n\n- Omzetopbouw op basis van MRR, churn en customer acquisition cost\n- Volledig gekoppelde resultatenrekening, balans en kasstroom\n- DCF-waardering met WACC-berekening\n- Scenario-analyse (base/upside/downside case)\n\n## Leerpunten\n\nHet meest waardevolle onderdeel was het doorgronden van de aannames achter SaaS-metrics (zoals net revenue retention) en hoe gevoelig een waardering daarvoor is.',
  array['financieel model', 'excel', 'saas', 'dcf', 'waardering'],
  'Financieel model',
  '2025-09-22',
  true,
  true,
  20
),
(
  'strategische-analyse-marktpositionering-retailketen',
  'Strategische analyse: marktpositionering van een retailketen',
  'Strategische analyse (extern en intern) van de marktpositie van een retailketen met concrete aanbevelingen voor de directie.',
  E'## Context\n\nVoor het vak Strategisch Management is de marktpositionering van een bestaande retailketen geanalyseerd, met als doel concrete strategische aanbevelingen te formuleren.\n\n## Gebruikte modellen\n\n- Vijfkrachtenmodel van Porter voor de externe analyse\n- Interne analyse via de waardeketen van Porter\n- Confrontatiematrix (SWOT) als synthese\n\n## Aanbevelingen\n\nDe analyse mondde uit in drie strategische aanbevelingen gericht op differentiatie via klantervaring, met een globale inschatting van de verwachte financiële impact.',
  array['strategie', 'porter', 'swot', 'marktanalyse'],
  'Strategische analyse',
  '2025-06-15',
  false,
  true,
  30
);
