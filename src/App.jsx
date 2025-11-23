import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

/* Importación de proveedores de contexto para manejo de estado global */
import { AuthProvider, useAuth } from './context/AuthContext' 
import { NotificacionesProvider } from './context/NotificacionesContext'
import { MultasProvider } from './context/MultasContext'
import { GastosProvider } from './context/GastosContext'
import { ReservasProvider } from './context/ReservasContext'
import { UsuariosProvider } from './context/UsuariosContext'
import { FaqProvider } from './context/FaqContext'
import { ConsultaProvider } from './context/ConsultaContext'

/* Importación de componentes principales de la aplicación */
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
import Pagos from './components/Pagos'
import './App.css'

function AppRoutes() {
  const { isLoggedIn, user, signout } = useAuth(); 

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <Layout user={user} onLogout={signout}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        
        {/* RUTAS PRINCIPALES DE GESTIÓN DEL CONDOMINIO */}
        <Route path="/condominios" element={<Condominios />} />
        <Route path="/gastos-comunes" element={<GastosComunes />} />
        <Route path="/pagos" element={<Pagos />} />
        <Route path="/multas" element={<Multas />} />
        <Route path="/reservas" element={<Reservas />} />
        
        {/* RUTAS DE REPORTES Y ADMINISTRACIÓN */}
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="/notificaciones" element={<Notificaciones />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider> 
      <NotificacionesProvider>
        <MultasProvider>
          <GastosProvider> 
            <ReservasProvider>
              <UsuariosProvider>
                <FaqProvider>
                  <ConsultaProvider>
                    <Router>
                      <AppRoutes />
                    </Router>
                  </ConsultaProvider>
                </FaqProvider>
              </UsuariosProvider>
            </ReservasProvider>
          </GastosProvider>
        </MultasProvider>
      </NotificacionesProvider>
    </AuthProvider>
  )
}

export default App