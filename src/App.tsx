import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from './components/admin/AdminLayout'
import DossierLayout from './components/dossier/DossierLayout'
import LoadingState from './components/LoadingState'
import ProtectedRoute from './components/ProtectedRoute'
import PublicLayout from './components/PublicLayout'
import ScrollManager from './components/ScrollManager'
import About from './pages/About'
import AuditTrailPage from './pages/AuditTrailPage'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProjectDetail from './pages/ProjectDetail'
import Projects from './pages/Projects'

const DocumentReader = lazy(() => import('./pages/DocumentReader'))
const ReportReader = lazy(() => import('./pages/ReportReader'))
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))
const AdminLogin = lazy(() => import('./pages/admin/Login'))
const AdminProjectForm = lazy(() => import('./pages/admin/ProjectForm'))

export default function App() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-5xl px-4 py-16">
          <LoadingState />
        </main>
      }
    >
      <ScrollManager />
      <Routes>
        <Route element={<DossierLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<PublicLayout />}>
          <Route path="/projecten" element={<Projects />} />
          <Route path="/projecten/:slug" element={<ProjectDetail />} />
          <Route path="/audit-trail" element={<AuditTrailPage />} />
          <Route path="/over-mij" element={<About />} />
          <Route path="/rapporten/:slug" element={<ReportReader />} />
          <Route path="/documenten/:slug" element={<DocumentReader />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/projecten/nieuw" element={<AdminProjectForm />} />
            <Route path="/admin/projecten/:id/bewerken" element={<AdminProjectForm />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}
