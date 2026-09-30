import AboutSection from '../components/dossier/AboutSection'
import AuditTrail from '../components/dossier/AuditTrail'
import Contact from '../components/dossier/Contact'
import Dossiers from '../components/dossier/Dossiers'
import Hero from '../components/dossier/Hero'
import KeyFigures from '../components/dossier/KeyFigures'
import SeoHead from '../components/SeoHead'
import { home } from '../data/home'

// Homepage "Controledossier". Header, formulebalk en sticky gedrag zitten in DossierLayout;
// de secties staan hier in volgorde van boven naar beneden. De Contact-sectie is tegelijk
// de voetregel van de pagina en staat daarom buiten <main>.
export default function Home() {
  return (
    <>
      <SeoHead title={home.seo.title} description={home.seo.description} />
      <main>
        <Hero />
        <KeyFigures />
        <Dossiers />
        <AuditTrail />
        <AboutSection />
      </main>
      <Contact />
    </>
  )
}
