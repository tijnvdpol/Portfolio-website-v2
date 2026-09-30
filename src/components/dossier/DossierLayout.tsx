import { Outlet } from 'react-router-dom'
import DossierHeader from './DossierHeader'
import { FormulaProvider } from './FormulaContext'
import FormulaBar from './FormulaBar'

// Layout van alleen de homepage: sticky header (met de formulebalk eronder zodra een
// kerncijfer is aangewezen). De footer (colofon) hoort bij de Contact-sectie en zit dus in de pagina.
// De overige publieke pagina's gebruiken PublicLayout, met dezelfde header en voetregel.
export default function DossierLayout() {
  return (
    <FormulaProvider>
      <div className="min-h-screen bg-paper font-head text-ink">
        <div className="sticky top-0 z-20 bg-paper print:static">
          <DossierHeader />
          <FormulaBar />
        </div>
        <Outlet />
      </div>
    </FormulaProvider>
  )
}
