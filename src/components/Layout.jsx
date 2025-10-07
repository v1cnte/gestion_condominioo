import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotificaciones } from '../context/NotificacionesContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBell, 
  faQuestionCircle, 
  faBars, 
  faTimes,
  faExclamationTriangle,
  faInfoCircle,
  faCheckCircle,
  faCalendarAlt,
  faDollarSign,
  faTools,
  faTrash,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import Ayuda from './Ayuda';

function Layout({ children, user, onLogout }) {
  const navigate = useNavigate();
  const { 
    notificaciones, 
    notificacionesNoLeidas, 
    marcarComoLeida, 
    marcarTodasComoLeidas, 
    eliminarNotificacion 
  } = useNotificaciones();
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAyuda, setShowAyuda] = useState(false);

  const obtenerColorTipo = (tipo) => {
    switch (tipo) {
      case 'urgente': return 'bg-red-50 border-l-red-500';
      case 'reserva': return 'bg-blue-50 border-l-blue-500';
      case 'mantenimiento': return 'bg-orange-50 border-l-orange-500';
      case 'pago': return 'bg-green-50 border-l-green-500';
      case 'multa': return 'bg-red-50 border-l-red-500';
      case 'info': return 'bg-blue-50 border-l-blue-500';
      default: return 'bg-gray-50 border-l-gray-500';
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
        user={user} 
        onLogout={onLogout} 
      />
      
      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        {/* Header */}
        <div className="bg-white shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FontAwesomeIcon icon={faBars} className="text-gray-600" />
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors relative"
                >
                  <FontAwesomeIcon icon={faBell} />
                  <span className="hidden sm:inline">Notificaciones</span>
                  {notificacionesNoLeidas > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                      {notificacionesNoLeidas}
                    </span>
                  )}
                </button>

                {/* Panel de Notificaciones */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-96 max-w-sm bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                    >
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-800">Notificaciones</h3>
                        <div className="flex items-center gap-2">
                          {notificacionesNoLeidas > 0 && (
                            <button
                              onClick={marcarTodasComoLeidas}
                              className="text-sm text-blue-600 hover:text-blue-800"
                            >
                              Marcar todas
                            </button>
                          )}
                          <button
                            onClick={() => setShowNotifications(false)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </button>
                        </div>
                      </div>
                      {notificacionesNoLeidas > 0 && (
                        <p className="text-sm text-gray-600 mt-1">
                          Tienes {notificacionesNoLeidas} notificaciones sin leer
                        </p>
                      )}
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                      {notificaciones.length === 0 ? (
                        <div className="p-6 text-center text-gray-500">
                          <FontAwesomeIcon icon={faBell} className="text-4xl mb-2" />
                          <p>No tienes notificaciones</p>
                        </div>
                      ) : (
                        notificaciones.map((notificacion) => (
                          <div
                            key={notificacion.id}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer border-l-4 ${
                              obtenerColorTipo(notificacion.tipo)
                            } ${!notificacion.leida ? 'bg-blue-50' : 'bg-white'}`}
                            onClick={() => marcarComoLeida(notificacion.id)}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`flex-shrink-0 ${notificacion.color}`}>
                                <FontAwesomeIcon icon={notificacion.icono} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                  <h4 className={`text-sm font-medium ${
                                    !notificacion.leida ? 'text-gray-900' : 'text-gray-600'
                                  }`}>
                                    {notificacion.titulo}
                                  </h4>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      eliminarNotificacion(notificacion.id);
                                    }}
                                    className="text-gray-400 hover:text-red-500 ml-2"
                                  >
                                    <FontAwesomeIcon icon={faTrash} className="text-xs" />
                                  </button>
                                </div>
                                <p className={`text-xs mt-1 ${
                                  !notificacion.leida ? 'text-gray-700' : 'text-gray-500'
                                }`}>
                                  {notificacion.mensaje}
                                </p>
                                <div className="flex justify-between items-center mt-2">
                                  <span className="text-xs text-gray-400">
                                    {notificacion.fecha} a las {notificacion.hora}
                                  </span>
                                  {!notificacion.leida && (
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {notificaciones.length > 0 && (
                      <div className="p-3 border-t border-gray-200">
                        <button 
                          onClick={() => {
                            setShowNotifications(false);
                            navigate('/notificaciones');
                          }}
                          className="w-full text-center text-sm text-blue-600 hover:text-blue-800"
                        >
                          Ver todas las notificaciones
                        </button>
                      </div>
                    )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button 
                onClick={() => setShowAyuda(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <FontAwesomeIcon icon={faQuestionCircle} />
                <span className="hidden sm:inline">Ayuda</span>
              </button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>

      {/* Modal de Ayuda */}
      <Ayuda isOpen={showAyuda} onClose={() => setShowAyuda(false)} />
    </div>
  );
}

export default Layout;