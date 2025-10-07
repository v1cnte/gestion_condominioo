import { useState } from 'react';
import { useNotificaciones } from '../context/NotificacionesContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBell, 
  faExclamationTriangle,
  faInfoCircle,
  faCheckCircle,
  faCalendarAlt,
  faDollarSign,
  faTools,
  faTrash,
  faEnvelope,
  faSearch,
  faFilter,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

function Notificaciones() {
  const { 
    notificaciones, 
    notificacionesNoLeidas,
    marcarComoLeida, 
    marcarTodasComoLeidas, 
    eliminarNotificacion 
  } = useNotificaciones();

  const [filtro, setFiltro] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroPrioridad, setFiltroPrioridad] = useState('');

  const eliminarTodasLeidas = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar todas las notificaciones leídas?')) {
      const notificacionesLeidas = notificaciones.filter(notif => notif.leida);
      notificacionesLeidas.forEach(notif => eliminarNotificacion(notif.id));
    }
  };

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

  const obtenerColorPrioridad = (prioridad) => {
    switch (prioridad) {
      case 'Alta': return 'bg-red-100 text-red-800';
      case 'Media': return 'bg-yellow-100 text-yellow-800';
      case 'Baja': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const notificacionesFiltradas = notificaciones.filter(notificacion => {
    const coincideBusqueda = notificacion.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
      notificacion.mensaje.toLowerCase().includes(filtro.toLowerCase());
    
    const coincideTipo = filtroTipo === '' || notificacion.tipo === filtroTipo;
    const coincideEstado = filtroEstado === '' || 
      (filtroEstado === 'leida' && notificacion.leida) ||
      (filtroEstado === 'no-leida' && !notificacion.leida);
    const coincidePrioridad = filtroPrioridad === '' || notificacion.prioridad === filtroPrioridad;
    
    return coincideBusqueda && coincideTipo && coincideEstado && coincidePrioridad;
  });

  const notificacionesUrgentes = notificaciones.filter(n => n.tipo === 'urgente' && !n.leida).length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Notificaciones</h1>
            <p className="text-gray-600">Centro de notificaciones y alertas del sistema</p>
          </div>
          <div className="flex items-center gap-3">
            {notificacionesNoLeidas > 0 && (
              <button
                onClick={marcarTodasComoLeidas}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <FontAwesomeIcon icon={faCheck} />
                Marcar todas como leídas
              </button>
            )}
            <button
              onClick={eliminarTodasLeidas}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FontAwesomeIcon icon={faTrash} />
              Eliminar leídas
            </button>
          </div>
        </div>
      </div>

      {/* Resumen de Notificaciones */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <FontAwesomeIcon icon={faBell} className="text-blue-600" />
            <h3 className="font-semibold text-blue-800">Total</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600">{notificaciones.length}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <FontAwesomeIcon icon={faEnvelope} className="text-yellow-600" />
            <h3 className="font-semibold text-yellow-800">Sin Leer</h3>
          </div>
          <p className="text-2xl font-bold text-yellow-600">{notificacionesNoLeidas}</p>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-600" />
            <h3 className="font-semibold text-red-800">Urgentes</h3>
          </div>
          <p className="text-2xl font-bold text-red-600">{notificacionesUrgentes}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />
            <h3 className="font-semibold text-green-800">Leídas</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">{notificaciones.length - notificacionesNoLeidas}</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-800">Filtros</h2>
          <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
              <input
                type="text"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                placeholder="Buscar notificaciones..."
                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los tipos</option>
              <option value="urgente">Urgente</option>
              <option value="reserva">Reservas</option>
              <option value="mantenimiento">Mantenimiento</option>
              <option value="pago">Pagos</option>
              <option value="multa">Multas</option>
              <option value="info">Información</option>
            </select>
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los estados</option>
              <option value="no-leida">Sin leer</option>
              <option value="leida">Leídas</option>
            </select>
            <select
              value={filtroPrioridad}
              onChange={(e) => setFiltroPrioridad(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todas las prioridades</option>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Notificaciones */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {notificacionesFiltradas.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <FontAwesomeIcon icon={faBell} className="text-4xl mb-4" />
            <h3 className="text-lg font-semibold mb-2">No hay notificaciones</h3>
            <p>No se encontraron notificaciones que coincidan con los filtros aplicados.</p>
          </div>
        ) : (
          notificacionesFiltradas.map((notificacion) => (
            <div
              key={notificacion.id}
              className={`p-6 border-b border-gray-200 last:border-b-0 border-l-4 hover:bg-gray-50 transition-colors ${
                obtenerColorTipo(notificacion.tipo)
              } ${!notificacion.leida ? 'bg-blue-50' : 'bg-white'}`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 ${notificacion.color} text-xl`}>
                  <FontAwesomeIcon icon={notificacion.icono} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <h3 className={`text-lg font-semibold ${
                        !notificacion.leida ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {notificacion.titulo}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        obtenerColorPrioridad(notificacion.prioridad)
                      }`}>
                        {notificacion.prioridad}
                      </span>
                      {!notificacion.leida && (
                        <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {!notificacion.leida && (
                        <button
                          onClick={() => marcarComoLeida(notificacion.id)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="Marcar como leída"
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                      )}
                      <button
                        onClick={() => eliminarNotificacion(notificacion.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Eliminar notificación"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                  <p className={`text-sm mb-3 ${
                    !notificacion.leida ? 'text-gray-700' : 'text-gray-600'
                  }`}>
                    {notificacion.mensaje}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{notificacion.fecha} a las {notificacion.hora}</span>
                    <span className="capitalize bg-gray-100 px-2 py-1 rounded">
                      {notificacion.tipo}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notificaciones;