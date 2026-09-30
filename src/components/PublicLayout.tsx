import { Outlet } from 'react-router-dom'
import Contact from './dossier/Contact'
import DossierHeader from './dossier/DossierHeader'

// Layout van alle publieke subpagina's, in dezelfde dossierstijl als de homepage:
// dezelfde sticky header en dezelfde afsluiting (Contact = voetregel).
export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-paper font-head text-ink">
      <div className="sticky top-0 z-20 bg-paper print:hidden">
        <DossierHeader />
      </div>
      <Outlet />
      <div className="print:hidden">
        <Contact />
      </div>
    </div>
  )
}
