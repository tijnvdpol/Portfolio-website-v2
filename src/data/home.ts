// Teksten van de homepage ("Controledossier"). Pas hier teksten aan; de componenten in
// src/components/dossier/ bevatten zelf geen inhoud.
import { about } from './about'

export const home = {
  seo: {
    title: 'Tijn van der Pol — Controledossier',
    description:
      'Portfolio van Tijn van der Pol, student Finance & Control: finance-software met interne beheersing op databaseniveau, en onderzoek naar AI en de controller van 2030.',
  },

  // Navigatie met grootboekrekeningnummers. Padden (/…) zijn pagina's; #contact is de voetregel.
  nav: [
    { number: '0000', label: 'Home', href: '/' },
    { number: '1000', label: 'Audit trail', href: '/audit-trail' },
    { number: '2000', label: 'Dossiers', href: '/projecten' },
    { number: '3000', label: 'Over mij', href: '/over-mij' },
    { number: '4000', label: 'Contact', href: '#contact' },
  ],

  hero: {
    eyebrow: 'DOSSIER · T. VAN DER POL · FINANCE & CONTROL · HBO, JAAR 4',
    headline: 'Een knop verbergen is geen beheersmaatregel.',
    headlineAccent: 'Een weigering in de database wel.',
    note: 'belangrijkste les uit D-01',
    intro:
      'Ik ben Tijn, vierdejaars student Finance & Control. Ik bouw finance-software waarin de interne beheersing zit waar hij hoort: op het laagste niveau. En ik onderzoek wat AI betekent voor de controller van 2030.',
    primaryCta: { label: 'Open de dossiers', href: '#dossiers' },
    secondaryCta: { label: 'Maak kennis', href: '#contact' },
  },

  // Interactieve demo in de hero (puur client-side).
  demo: {
    title: 'PROBEER HET ZELF',
    subtitle: 'VOORBEELDFACTUUR',
    invoice: [
      { label: 'LEVERANCIER', value: 'Voorbeeld Leverancier B.V.', kind: 'text' },
      { label: 'FACTUURNUMMER', value: 'VB-2026-0417', kind: 'mono' },
      { label: 'BEDRAG INCL. BTW', value: '€ 4.850,00', kind: 'amount' },
      { label: 'IBAN', value: 'NL91 ABNA 0417 1643 00', kind: 'mono' },
      { label: 'INGEVOERD DOOR', value: 'Jij (invoerder)', kind: 'text' },
    ] as { label: string; value: string; kind: 'text' | 'mono' | 'amount' }[],
    signalLabel: 'SIGNAAL',
    signal: 'NIEUWE LEVERANCIER',
    approve: 'Keur deze factuur goed',
    hint: 'Wat gebeurt er als je je eigen invoer goedkeurt?',
    refusedTitle: 'GEWEIGERD · FUNCTIESCHEIDING',
    refusedText:
      'Je kunt geen factuur goedkeuren die je zelf hebt ingevoerd. De database weigert dit, ook als de knop in de interface gewoon zichtbaar is.',
    colleague: 'Laat een collega goedkeuren',
    reset: 'Opnieuw',
    approvedStamp: 'GOEDGEKEURD',
    approvedText: 'Door een collega met de rol goedkeurder, binnen de goedkeuringslimiet.',
    retry: 'Opnieuw proberen',
    logTitle: 'AUDIT TRAIL · ALLEEN TOEVOEGEN',
    initialLog: [
      { time: '09:14', who: 'jij', what: 'factuur ingevoerd', result: 'OK', tone: 'neutral' },
      {
        time: '09:14',
        who: 'systeem',
        what: 'signaal: nieuwe leverancier',
        result: 'SIGNAAL',
        tone: 'signal',
      },
    ] as DemoLogEntry[],
  },

  keyFigures: {
    title: 'KERNCIJFERS 2026',
    hint: 'Elk cijfer heeft een bron: wijs het aan en kijk in de formulebalk',
    legendTitle: 'LEGENDA',
    auditLink: { label: 'Bekijk de audit trail', to: '/audit-trail' },
  },

  dossiers: {
    label: '2000 · DOSSIERS',
    title: 'Geselecteerd werk, met bewijslast.',
    allLink: { label: 'Alle dossiers', to: '/projecten' },
    evidenceTitle: 'ONDERBOUWING',
    signedTitle: 'GEZIEN EN GEPARAFEERD',
    signedBy: 'T. VAN DER POL',
  },

  audit: {
    label: '1000 · AUDIT TRAIL',
    title: 'Mijn groei, onveranderbaar vastgelegd.',
    intro:
      'Na elke grow & show komt er een regel bij. Niets wordt achteraf aangepast of verwijderd, net als de audit log in de Factuurscanner.',
  },

  about: {
    label: '3000 · OVER MIJ',
    title: 'Geef me een opdracht en ik regel het.',
    paragraphs: [
      'Ik ben Tijn: een rustige maar gezellige jongen, en vierdejaars student Finance & Control. Cijfers hebben me altijd getrokken, en economie was op school al het vak waar ik het meest in opging. Die interesse is gebleven, maar mijn blik erop veranderde toen ik ontdekte hoeveel er met AI mogelijk is, en hoe weinig voorkennis je eigenlijk nodig hebt om er echt iets mee te bouwen. Sindsdien werk ik aan projecten waarin finance en AI samenkomen.',
      'Wie met mij samenwerkt, kent me als de harde werker. Dat zie je ook buiten school terug: ik train zes keer per week, en wat me daaraan trekt is hetzelfde als wat me in mijn vak drijft: stap voor stap sterker worden en zien dat het werkt. Over een paar jaar hoop ik die werelden samen te brengen, als controller bij een bedrijf dat dicht bij mijn interesses ligt, zoals een sportvoedings- of autobedrijf.',
    ],
    profileLink: { label: 'Volledig profiel en vaardigheden →', to: '/over-mij' },
    // Eigen foto (4:5): zet het bestand in public/ en vul het pad in `about.photoUrl`.
    photoAlt: 'Portret van Tijn van der Pol',
    photoPlaceholder: '[JOUW FOTO · 4:5]',
    now: {
      title: 'NU',
      items: [
        'Minor Futureproof met AI',
        'Grow & show om de twee weken',
        'Naast school: bijbaan in de supermarkt',
      ],
      working: 'Werkt aan: de Factuurscanner uitbreiden',
    },
    attachments: {
      title: 'BIJLAGEN · BUITEN HET DOSSIER',
      note: 'rekeningschema vrije tijd',
    },
  },

  contact: {
    label: '4000 · CONTACT',
    title: 'Beschikbaar voor stage, afstuderen en finance-projecten met AI.',
    // E-mail, GitHub en LinkedIn komen uit about.contact zodat ze op één plek staan.
    links: about.contact,
    aboutLink: { label: 'Over mij', to: '/over-mij' },
    colophon: '© 2026 TIJN VAN DER POL · COLOFON: REACT, TYPESCRIPT, TAILWIND CSS, VERCEL',
    end: 'EINDE DOSSIER · LAATST GEWIJZIGD',
  },
}

export type DemoLogEntry = {
  time: string
  who: string
  what: string
  result: string
  tone: 'neutral' | 'signal' | 'danger' | 'accent'
}
