import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotificaciones } from '../context/NotificacionesContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faQuestionCircle, faBars, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import Ayuda from './Ayuda';

function Layout({ children, user, onLogout }) {
  const navigate = useNavigate();
  const { notificaciones, notificacionesNoLeidas, marcarComoLeida, marcarTodasComoLeidas, eliminarNotificacion } = useNotificaciones();
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAyuda, setShowAyuda] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} user={user} onLogout={onLogout} />
      
      {/* AGREGADO: 'print:ml-0' elimina el margen izquierdo al imprimir */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} print:ml-0`}>
        
        {/* AGREGADO: 'print:hidden' oculta la barra superior al imprimir */}
        <div className="bg-white shadow-sm border-b p-4 print:hidden">
          <div className="flex items-center justify-between">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100">
              <FontAwesomeIcon icon={faBars} className="text-gray-600" />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <button onClick={() => setShowNotifications(!showNotifications)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 relative">
                  <FontAwesomeIcon icon={faBell} />
                  <span className="hidden sm:inline">Notificaciones</span>
                  {notificacionesNoLeidas > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                      {notificacionesNoLeidas}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border z-50">
                      <div className="p-4 border-b flex justify-between">
                        <h3 className="font-semibold">Notificaciones</h3>
                        <button onClick={() => setShowNotifications(false)}><FontAwesomeIcon icon={faTimes} /></button>
                      </div>
                      <div className="max-h-64 overflow-y-auto p-2">
                        {notificaciones.length === 0 ? <p className="text-center text-gray-500 p-4">Sin notificaciones</p> : 
                          notificaciones.map(n => (
                            <div key={n.id} onClick={() => marcarComoLeida(n.id)} className={`p-3 border-b cursor-pointer ${!n.leida ? 'bg-blue-50' : 'bg-white'}`}>
                              <p className="text-sm font-medium">{n.titulo}</p>
                              <p className="text-xs text-gray-500">{n.mensaje}</p>
                            </div>
                          ))
                        }
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button onClick={() => setShowAyuda(true)} className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                <FontAwesomeIcon icon={faQuestionCircle} /> <span className="hidden sm:inline">Ayuda</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>

      <Ayuda isOpen={showAyuda} onClose={() => setShowAyuda(false)} />
    </div>
  );
}

export default Layout;