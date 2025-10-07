import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSave, 
  faBuilding,
  faClock,
  faBell,
  faCheck
} from '@fortawesome/free-solid-svg-icons';

function Configuracion() {
  // configuraciones básicas - mantuve solo lo importante
  const [config, setConfig] = useState({
    nombreCondominio: 'Condominio Vista Hermosa',
    administrador: 'Carlos Mendes',
    telefono: '+55 11 3333-4444',
    email: 'admin@vistahermosa.com.br',
    
    // horarios simples
    horarioPorteria: '06:00 - 22:00',
    horarioAreas: '08:00 - 20:00',
    
    // notificaciones básicas
    emailActivo: true,
    recordatoriosActivos: true,
    
    // configuración de pagos
    diaVencimiento: 10,
    interesMora: 2.5
  });

  const [mensaje, setMensaje] = useState('');
  const [guardando, setGuardando] = useState(false);

  // función simple para cambiar valores
  const cambiarValor = (campo, valor) => {
    setConfig(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  // guardar configuración
  const guardarConfig = async () => {
    setGuardando(true);
    // simulo que se guarda
    setTimeout(() => {
      setMensaje('Configuración guardada correctamente!');
      setGuardando(false);
      setTimeout(() => setMensaje(''), 3000);
    }, 1000);
  };

  return (
    <div className="p-6">
      {/* título */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Configuración</h1>
        <p className="text-gray-600">Configuraciones básicas del sistema</p>
        
        {/* botón guardar */}
        <button
          onClick={guardarConfig}
          disabled={guardando}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faSave} />
          {guardando ? 'Guardando...' : 'Guardar'}
        </button>

        {/* mensaje */}
        {mensaje && (
          <div className="mt-3 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <FontAwesomeIcon icon={faCheck} className="mr-2" />
            {mensaje}
          </div>
        )}
      </div>

      {/* información básica del condominio */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <FontAwesomeIcon icon={faBuilding} className="text-blue-600" />
          <h2 className="text-xl font-semibold">Información del Condominio</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre del Condominio</label>
            <input
              type="text"
              value={config.nombreCondominio}
              onChange={(e) => cambiarValor('nombreCondominio', e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Administrador</label>
            <input
              type="text"
              value={config.administrador}
              onChange={(e) => cambiarValor('administrador', e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Teléfono</label>
            <input
              type="tel"
              value={config.telefono}
              onChange={(e) => cambiarValor('telefono', e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={config.email}
              onChange={(e) => cambiarValor('email', e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* horarios */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <FontAwesomeIcon icon={faClock} className="text-green-600" />
          <h2 className="text-xl font-semibold">Horarios</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Horario Portería</label>
            <input
              type="text"
              value={config.horarioPorteria}
              onChange={(e) => cambiarValor('horarioPorteria', e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Ej: 06:00 - 22:00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Horario Áreas Comunes</label>
            <input
              type="text"
              value={config.horarioAreas}
              onChange={(e) => cambiarValor('horarioAreas', e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Ej: 08:00 - 20:00"
            />
          </div>
        </div>
      </div>

      {/* notificaciones simples */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <FontAwesomeIcon icon={faBell} className="text-purple-600" />
          <h2 className="text-xl font-semibold">Notificaciones</h2>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span>Enviar emails</span>
            <input
              type="checkbox"
              checked={config.emailActivo}
              onChange={(e) => cambiarValor('emailActivo', e.target.checked)}
              className="w-4 h-4"
            />
          </div>

          <div className="flex items-center justify-between">
            <span>Recordatorios automáticos</span>
            <input
              type="checkbox"
              checked={config.recordatoriosActivos}
              onChange={(e) => cambiarValor('recordatoriosActivos', e.target.checked)}
              className="w-4 h-4"
            />
          </div>
        </div>
      </div>

      {/* configuración de pagos básica */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Configuración de Pagos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Día de vencimiento (1-28)</label>
            <input
              type="number"
              min="1"
              max="28"
              value={config.diaVencimiento}
              onChange={(e) => cambiarValor('diaVencimiento', parseInt(e.target.value))}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Interés por mora (%)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={config.interesMora}
              onChange={(e) => cambiarValor('interesMora', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Configuracion;