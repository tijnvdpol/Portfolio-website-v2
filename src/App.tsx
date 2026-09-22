import { Route, Routes } from 'react-router-dom'
import PublicLayout from './components/PublicLayout'
import AdminDashboard from './pages/admin/Dashboard'
import AdminLogin from './pages/admin/Login'
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
      <Route path="/admin" element={<AdminDashboard />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
