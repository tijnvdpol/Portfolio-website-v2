import { Outlet } from 'react-router-dom'
import DossierHeader, { SectionNav } from './DossierHeader'
import { FormulaProvider } from './FormulaContext'
import FormulaBar from './FormulaBar'

// Layout van alleen de homepage: sticky header (met de formulebalk eronder zodra een
// kerncijfer is aangewezen), zonder de Navbar/Footer van PublicLayout. De footer (colofon) hoort bij de Contact-sectie en zit dus in de pagina.
export default function DossierLayout() {
  return (
    <FormulaProvider>
      <div className="min-h-screen bg-paper font-head text-ink">
        <div className="sticky top-0 z-20 bg-paper print:static">
          <DossierHeader />
          <FormulaBar />
        </div>
        <SectionNav className="flex flex-wrap gap-x-6 gap-y-1 px-4 py-3 md:px-10 lg:hidden" />
        <Outlet />
      </div>
    </FormulaProvider>
  )
}
