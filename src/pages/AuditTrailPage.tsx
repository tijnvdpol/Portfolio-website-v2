import AuditTrail from '../components/dossier/AuditTrail'
import SeoHead from '../components/SeoHead'

export default function AuditTrailPage() {
  return (
    <main>
      <SeoHead
        title="Audit trail — Tijn van der Pol"
        description="Mijn groei als append-only audit trail: na elke grow & show komt er een regel bij, niets wordt achteraf aangepast."
      />
      <AuditTrail asPage />
    </main>
  )
}
