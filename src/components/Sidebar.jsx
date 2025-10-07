import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome,
  faBuilding,
  faWallet,
  faExclamationTriangle,
  faCalendarCheck,
  faChartBar,
  faUsers,
  faCog,
  faSignOutAlt,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

function Sidebar({ isOpen, onToggle, user, onLogout }) {
  const location = useLocation();
  
  const menuItems = [
    { icon: faHome, label: 'Dashboard', path: '/dashboard' },
    { icon: faBuilding, label: 'Condominios', path: '/condominios' },
    { icon: faWallet, label: 'Gastos Comunes', path: '/gastos-comunes' },
    { icon: faExclamationTriangle, label: 'Multas', path: '/multas' },
    { icon: faCalendarCheck, label: 'Reservas', path: '/reservas' },
    { icon: faChartBar, label: 'Reportes', path: '/reportes' },
    { icon: faUsers, label: 'Usuarios', path: '/usuarios' },
    { icon: faCog, label: 'Configuración', path: '/configuracion' },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-white shadow-lg border-r border-gray-200 transition-all duration-300 z-50 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <img
            src="/condominio_.jpeg"
            alt="Logo"
            className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
          />
          {isOpen && (
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-gray-800 truncate">Administración</h2>
            </div>
          )}
        </div>
      </div>

      {/* User Info */}
      {isOpen && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
              <FontAwesomeIcon icon={faUserCircle} className="text-gray-600 text-xl" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 truncate">{user?.userName || 'Usuario'}</p>
              <p className="text-sm text-gray-600 truncate">{user?.userRoleDisplay || 'Rol'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <div className="space-y-1">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FontAwesomeIcon 
                  icon={item.icon} 
                  className={`text-lg flex-shrink-0 ${isActive ? 'text-blue-700' : 'text-gray-500'}`} 
                />
                {isOpen && (
                  <span className="font-medium truncate">{item.label}</span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="text-lg flex-shrink-0" />
          {isOpen && (
            <span className="font-medium truncate">Cerrar Sesión</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;