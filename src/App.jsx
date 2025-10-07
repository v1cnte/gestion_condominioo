import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { NotificacionesProvider } from './context/NotificacionesContext'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Layout from './components/Layout'
import Condominios from './components/Condominios'
import GastosComunes from './components/GastosComunes'
import Multas from './components/Multas'
import Reservas from './components/Reservas'
import Reportes from './components/Reportes'
import Usuarios from './components/Usuarios'
import Configuracion from './components/Configuracion'
import Notificaciones from './components/Notificaciones'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = (userData) => {
    setUser(userData)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setUser(null)
    setIsLoggedIn(false)
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <NotificacionesProvider>
      <Router>
        <Layout user={user} onLogout={handleLogout}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/condominios" element={<Condominios />} />
            <Route path="/gastos-comunes" element={<GastosComunes />} />
            <Route path="/multas" element={<Multas />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/configuracion" element={<Configuracion />} />
            <Route path="/notificaciones" element={<Notificaciones />} />
          </Routes>
        </Layout>
      </Router>
    </NotificacionesProvider>
  )
}

export default App
