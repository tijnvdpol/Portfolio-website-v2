// Inhoud van de 'Over mij'-pagina. Pas hier teksten, vaardigheden en contactgegevens aan.

export type SkillGroup = {
  title: string
  description: string
  skills: string[]
}

export type ContactLink = {
  label: string
  value: string
  href: string
}

export const about = {
  name: 'Tijn van der Pol',
  role: 'Vierdejaars HBO-student Finance & Control',
  education: 'HBO Finance & Control',
  location: 'Nederland',
  specialization: 'Finance, data & AI',
  availability: 'Beschikbaar voor stage, afstudeeropdrachten en innovatieve finance-projecten.',

  // URL of pad (bijv. '/profielfoto.jpg' in de map public/). Leeg = monogram.
  photoUrl: '',

  intro: [
    'Hoi! Ik ben Tijn, een enthousiaste en leergierige vierdejaars HBO-student Finance & Control. Mijn passie ligt op het snijvlak van klassieke financiële beheersing en moderne technologische vernieuwing.',
    'Tijdens mijn studie heb ik een stevige basis gelegd in management accounting, financiële verslaggeving, werkkapitaalbeheer en strategische bedrijfsvoering. Waar velen finance zien als enkel achteromkijken naar historische cijfers, zie ik het juist als een sturend kompas voor de toekomst.',
    'Mijn ambitie is om organisaties te helpen niet alleen compliant en financieel gezond te blijven, maar ook om data-gedreven besluitvorming toegankelijk en vooruitstrevend te maken voor het management.',
  ],

  visionTitle: 'Waarom finance en AI?',
  vision: [
    'De financiële wereld verandert in rap tempo. Repetitieve administratieve taken, complexe data-extractie en tijdrovende reconciliaties kunnen tegenwoordig vele malen sneller en nauwkeuriger worden uitgevoerd met behulp van AI en automatisering.',
    'Door AI-tools zoals Claude, geavanceerde prompting en Python-scripts te integreren in mijn financiële workflow, ben ik in staat om sneller van ruwe data naar diepgaande strategische inzichten te komen.',
    'In mijn portfolio laat ik concrete voorbeelden zien van hoe ik AI praktisch toepas: van het geautomatiseerd ontleden van jaarrekeningen tot het simuleren van cashflowscenario’s en het screenen van duurzaamheidsrapportages.',
  ],
  visionQuote:
    'AI vervangt niet de controller, maar de controller die AI beheerst zal op termijn de controller vervangen die dat niet doet.',

  skillGroups: [
    {
      title: 'Financieel & bedrijfskundig',
      description: 'Kerncompetenties vanuit de opleiding Finance & Control',
      skills: [
        'Financiële analyse & ratio’s (DuPont)',
        'Management accounting & costing',
        'Liquiditeitsbegrotingen & cashflowplanning',
        'Planning & control-cyclus',
        'Jaarrekeninganalyse & verslaggeving',
        'Bedrijfswaardering & investeringsselectie',
      ],
    },
    {
      title: 'AI & automatisering',
      description: 'Praktische toepassing van moderne AI-technologie',
      skills: [
        'Prompt engineering voor finance & compliance',
        'AI-gestuurde document- en data-extractie',
        'Workflowautomatisering (Python / scripts)',
        'Scenario- en gevoeligheidsanalyses met LLM’s',
        'Kritische validatie van AI-output (human-in-the-loop)',
      ],
    },
    {
      title: 'Software & tools',
      description: 'Analytische en financiële softwarepakketten',
      skills: [
        'Geavanceerd Excel (modelleren, Power Query, draaitabellen)',
        'Power BI (dashboards & KPI-visualisatie)',
        'Python (Pandas, NumPy voor data-analyse)',
        'Claude, ChatGPT & Cursor',
        'ERP- & boekhoudconcepten',
      ],
    },
  ] satisfies SkillGroup[],

  interests: [
    'FinTech-innovaties',
    'CSRD / ESG-rapportages',
    'Data-analyse in finance',
    'Procesoptimalisatie & Lean',
    'Economische trends & beleggen',
    'Experimenteren met AI',
  ],

  contact: [
    { label: 'E-mail', value: 'tijnvanderpol@gmail.com', href: 'mailto:tijnvanderpol@gmail.com' },
    { label: 'GitHub', value: 'github.com/tijnvdpol', href: 'https://github.com/tijnvdpol' },
  ] satisfies ContactLink[],
}
