import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faCrown, faUserTie, faKey, faUsers, faHome, faBuilding } from '@fortawesome/free-solid-svg-icons';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    userRole: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
  };

  const quickLogin = (userName, userRoleDisplay, userRole) => {
    onLogin({ userName, userRoleDisplay, userRole });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative mb-4">
            <img 
              src="/condominio_.jpeg" 
              alt="Logo EspacioAdmin" 
              className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-gray-200"
              onError={(e) => {
                console.log('Error cargando imagen del logo:', e.target.src);
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
              onLoad={() => console.log('Imagen del logo cargada correctamente')}
            />
            <div className="w-20 h-20 mx-auto rounded-full bg-blue-100 border-2 border-blue-200 hidden items-center justify-center">
              <FontAwesomeIcon icon={faBuilding} className="text-blue-600 text-2xl" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">EspacioAdmin</h1>
          <p className="text-gray-600">Gestión de Condominios</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ingrese su usuario"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>

          <div>
            <label htmlFor="userRole" className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Usuario
            </label>
            <select
              id="userRole"
              value={formData.userRole}
              onChange={(e) => setFormData({...formData, userRole: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Seleccionar rol</option>
              <option value="super_admin">Super Administrador</option>
              <option value="admin">Administrador del Condominio</option>
              <option value="conserje">Conserje</option>
              <option value="directiva">Directiva</option>
              <option value="residente">Residente</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faSignInAlt} />
            Iniciar Sesión
          </button>
        </form>

        {/* Quick Login Section */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Acceso Rápido
          </h3>
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => quickLogin('Super Admin', 'Control total', 'super_admin')}
              className="flex items-center gap-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faCrown} className="text-purple-600" />
              <div className="text-left">
                <div className="font-medium text-gray-800">Super Admin</div>
                <div className="text-sm text-gray-600">Control total</div>
              </div>
            </button>

            <button
              onClick={() => quickLogin('Administrador', 'Gestión completa', 'admin')}
              className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faUserTie} className="text-blue-600" />
              <div className="text-left">
                <div className="font-medium text-gray-800">Administrador</div>
                <div className="text-sm text-gray-600">Gestión completa</div>
              </div>
            </button>

            <button
              onClick={() => quickLogin('Conserje', 'Pagos y reservas', 'conserje')}
              className="flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faKey} className="text-green-600" />
              <div className="text-left">
                <div className="font-medium text-gray-800">Conserje</div>
                <div className="text-sm text-gray-600">Pagos y reservas</div>
              </div>
            </button>

            <button
              onClick={() => quickLogin('Directiva', 'Multas y reportes', 'directiva')}
              className="flex items-center gap-3 p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faUsers} className="text-yellow-600" />
              <div className="text-left">
                <div className="font-medium text-gray-800">Directiva</div>
                <div className="text-sm text-gray-600">Multas y reportes</div>
              </div>
            </button>

            <button
              onClick={() => quickLogin('Residente', 'Consultas y pagos', 'residente')}
              className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faHome} className="text-gray-600" />
              <div className="text-left">
                <div className="font-medium text-gray-800">Residente</div>
                <div className="text-sm text-gray-600">Consultas y pagos</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;