// "Bijlagen · buiten het dossier": foto's van vrije tijd, als polaroids op de homepage.
// Bestanden staan in public/bijlagen/.
//
// Beeldrechten: A, C, D en E zijn rechtenvrije foto's, B (Harrie) is een eigen foto.
// De foto's zijn vierkant bijgesneden (900×900).

export type Bijlage = {
  letter: string
  account: string // rekeningnummer uit het "rekeningschema vrije tijd"
  image: string
  alt: string
  caption: string
  tilt: number // graden
  offset: number // px verspringing van boven af (desktop)
}

export const bijlagen: Bijlage[] = [
  {
    letter: 'A',
    account: '8100 KRACHTTRAINING',
    image: '/bijlagen/bijlage-a-krachttraining.jpg',
    alt: 'Donkere sportschool met rijen dumbbells en verstelbare banken',
    caption: 'Zes keer per week. Muziek op, ruisonderdrukking aan.',
    tilt: -3,
    offset: 0,
  },
  {
    letter: 'B',
    account: '8200 HARRIE',
    image: '/bijlagen/bijlage-b-harrie.jpg',
    alt: 'Harrie, een chocoladebruine labrador, in het zonlicht',
    caption: 'Chocoladebruine labrador en vaste wandelpartner.',
    tilt: 2,
    offset: 28,
  },
  {
    letter: 'C',
    account: '8300 KAMADO',
    image: '/bijlagen/bijlage-c-kamado.jpg',
    alt: 'Twee stukken vlees op de barbecue boven open vuur, met een tang',
    caption: 'Ik maak er van alles op, het is allemaal even lekker.',
    tilt: -1.5,
    offset: 6,
  },
  {
    letter: 'D',
    account: "8400 AUTO'S",
    image: '/bijlagen/bijlage-d-porsche.jpg',
    alt: 'Witte klassieke Porsche 911 voor een garage',
    caption: 'Waar techniek en design samenkomen.',
    tilt: 2.5,
    offset: 34,
  },
  {
    letter: 'E',
    account: '8500 MUZIEK',
    image: '/bijlagen/bijlage-e-muziek.jpg',
    alt: 'Stapel vinylplaten met een koptelefoon ernaast',
    caption: 'Mijn playlist gaat alle kanten op, dit is morgen weer anders.',
    tilt: -2,
    offset: 10,
  },
]
