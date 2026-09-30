import Contact from '../components/dossier/Contact'
import Dossiers from '../components/dossier/Dossiers'
import Hero from '../components/dossier/Hero'
import KeyFigures from '../components/dossier/KeyFigures'
import SeoHead from '../components/SeoHead'
import { home } from '../data/home'

// Homepage "Controledossier": hero, kerncijfers en de uitgelichte dossiers. Audit trail,
// Over mij en alle dossiers hebben een eigen pagina (zie de header). Header, formulebalk en
// sticky gedrag zitten in DossierLayout. De Contact-sectie is tegelijk de voetregel van de
// pagina en staat daarom buiten <main>.
export default function Home() {
  return (
    <>
      <SeoHead title={home.seo.title} description={home.seo.description} />
      <main>
        <Hero />
        <KeyFigures />
        <Dossiers />
      </main>
      <Contact />
    </>
  )
}
