import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import LoadingState from './components/LoadingState'
import ProtectedRoute from './components/ProtectedRoute'
import PublicLayout from './components/PublicLayout'
import About from './pages/About'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProjectDetail from './pages/ProjectDetail'
import Projects from './pages/Projects'

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
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projecten" element={<Projects />} />
          <Route path="/projecten/:slug" element={<ProjectDetail />} />
          <Route path="/over-mij" element={<About />} />
          <Route path="/rapporten/:slug" element={<ReportReader />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/projecten/nieuw" element={<AdminProjectForm />} />
          <Route path="/admin/projecten/:id/bewerken" element={<AdminProjectForm />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
