import type { DossierStamp } from '../types/database.types'

// Eigen stempels voor dossiers die in de database (dossier_stamp) nog geen stempel hebben,
// op slug. Een stempel uit de database gaat hier altijd voor. Zonder stempel hier of in de
// database wordt er een afgeleid uit de bewijslast (zie lib/dossiers.ts).
export const stampOverrides: Record<string, DossierStamp> = {
  dagboekje: { label: 'BEVEILIGING', value: 'RLS ACTIEF', detail: 'EIGEN DATABASE', tilt: -4 },
  'datacamp-claude-101': { label: 'CERTIFICAAT', value: 'BEHAALD', detail: 'DATACAMP', tilt: -5 },
  'ai-kloon': { label: 'ARCHITECTUUR', value: 'RAG + BRONNEN', detail: 'LIVE', tilt: -3 },
  'supermarkt-hisar': { label: 'OPDRACHT', value: 'LIVE', detail: 'FAMILIEBEDRIJF', tilt: 4 },
  'onderzoek-juridische-grenzen-folderscanner': {
    label: 'ADVIES',
    value: 'MAG, MET GRENZEN',
    detail: 'SUPERUNIE',
    tilt: -4,
  },
  'pet-your-dog': { label: 'FASE', value: '3 VAN 5', detail: 'LIVE', tilt: 4 },
  'pi-simulator': { label: 'TESTS', value: '51 TESTBESTANDEN', detail: 'LIVE', tilt: -3 },
  'onderzoek-vragen-werkgevers-om-ai': {
    label: 'UITKOMST',
    value: '13 VAN 75 NOEMEN AI',
    detail: '17%',
    tilt: -4,
  },
  'digitaal-dagboek': { label: 'MIJLPAAL', value: 'EERSTE WEBAPP', detail: 'LIVE', tilt: 3 },
}
