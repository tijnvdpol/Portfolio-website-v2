// "Bijlagen · buiten het dossier": foto's van vrije tijd, als polaroids op de homepage.
// Bestanden staan in public/bijlagen/.
//
// LET OP (beeldrechten): A, C, D en E komen van internet. Vervang ze vóór publicatie door
// eigen of rechtenvrije foto's (bijv. Unsplash/Pexels). B (Harrie) is een eigen foto.

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
    alt: 'Halterschijven en dumbbells op de vloer van de sportschool',
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
    alt: 'Blauwe Keij Legend kamado in een tuin',
    caption: 'Ik maak er van alles op, het is allemaal even lekker.',
    tilt: -1.5,
    offset: 6,
  },
  {
    letter: 'D',
    account: "8400 AUTO'S",
    image: '/bijlagen/bijlage-d-porsche.jpg',
    alt: 'Grijze klassieke Porsche 911 aan de kust',
    caption: 'Waar techniek en design samenkomen.',
    tilt: 2.5,
    offset: 34,
  },
  {
    letter: 'E',
    account: '8500 MUZIEK',
    image: '/bijlagen/bijlage-e-muziek.jpg',
    alt: 'Oordopjes naast een telefoon met Spotify',
    caption: 'Mijn playlist gaat alle kanten op, dit is morgen weer anders.',
    tilt: -2,
    offset: 10,
  },
]
