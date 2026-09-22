import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import PublicLayout from './components/PublicLayout'
import AdminDashboard from './pages/admin/Dashboard'
import AdminLogin from './pages/admin/Login'
import AdminProjectForm from './pages/admin/ProjectForm'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProjectDetail from './pages/ProjectDetail'
import Projects from './pages/Projects'

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projecten" element={<Projects />} />
        <Route path="/projecten/:slug" element={<ProjectDetail />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/projecten/nieuw" element={<AdminProjectForm />} />
        <Route path="/admin/projecten/:id/bewerken" element={<AdminProjectForm />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
