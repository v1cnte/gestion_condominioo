import { useState, useEffect } from 'react';
import { useNotificaciones } from '../context/NotificacionesContext';
import { useReservas } from '../context/ReservasContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faTrash, 
  faSearch, 
  faCalendarCheck,
  faMapMarkerAlt,
  faCheck // <--- Importamos el icono de check
} from '@fortawesome/free-solid-svg-icons';

function Reservas() {
  const { notificarNuevaReserva, notificarCambioEstado } = useNotificaciones();
  
  // Traemos updateReserva del contexto
  const { reservas, getReservas, createReserva, deleteReserva, updateReserva } = useReservas();

  const [showAddForm, setShowAddForm] = useState(false);
  
  const [nuevaReserva, setNuevaReserva] = useState({
    unidad: '',
    residente: '',
    espacio: '',
    fecha: '',
    horaInicio: '',
    horaFin: '',
    estado: 'Pendiente'
  });

  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    getReservas();
  }, []);

  const espaciosDisponibles = [
    'Salón de Eventos',
    'Quincho',
    'Sala de Reuniones',
    'Terraza',
    'Piscina'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nuevaReserva.unidad && nuevaReserva.residente && nuevaReserva.espacio && 
        nuevaReserva.fecha && nuevaReserva.horaInicio && nuevaReserva.horaFin) {
      
      await createReserva(nuevaReserva);
      notificarNuevaReserva(nuevaReserva.unidad, nuevaReserva.espacio);
      
      setNuevaReserva({
        unidad: '',
        residente: '',
        espacio: '',
        fecha: '',
        horaInicio: '',
        horaFin: '',
        estado: 'Pendiente'
      });
      setShowAddForm(false);
    }
  };

  // --- NUEVA FUNCIÓN: Confirmar Reserva ---
  const confirmarReserva = async (reserva) => {
    if (window.confirm(`¿Desea confirmar la reserva de ${reserva.espacio} para la unidad ${reserva.unidad}?`)) {
      // Enviamos el objeto con el estado cambiado a "Confirmada"
      await updateReserva(reserva._id, { ...reserva, estado: 'Confirmada' });
      
      // Opcional: Notificación visual
      if (notificarCambioEstado) {
        notificarCambioEstado('info', `Reserva confirmada para la unidad ${reserva.unidad}`);
      }
    }
  };

  const eliminarReserva = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta reserva?')) {
      await deleteReserva(id);
    }
  };

  const reservasFiltradas = reservas.filter(reserva => {
    return reserva.unidad.includes(filtro) ||
      reserva.residente.toLowerCase().includes(filtro.toLowerCase()) ||
      reserva.espacio.toLowerCase().includes(filtro.toLowerCase());
  });

  const totalReservas = reservas.length;
  const reservasPendientes = reservas.filter(reserva => reserva.estado === 'Pendiente').length;
  const reservasConfirmadas = reservas.filter(reserva => reserva.estado === 'Confirmada').length;

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'Confirmada': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Reservas</h1>
            <p className="text-gray-600">Gestión de espacios comunes</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <FontAwesomeIcon icon={faPlus} />
            Agregar Reserva
          </button>
        </div>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <FontAwesomeIcon icon={faCalendarCheck} className="text-blue-600" />
            <h3 className="font-semibold text-blue-800">Total Reservas</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600">{totalReservas}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">Pendientes</h3>
          <p className="text-2xl font-bold text-yellow-600">{reservasPendientes}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <h3 className="font-semibold text-green-800 mb-2">Confirmadas</h3>
          <p className="text-2xl font-bold text-green-600">{reservasConfirmadas}</p>
        </div>
      </div>

      {/* Modal Agregar */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Agregar Nueva Reserva</h2>
              <button onClick={() => setShowAddForm(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unidad *</label>
                  <input type="text" value={nuevaReserva.unidad} onChange={(e) => setNuevaReserva({...nuevaReserva, unidad: e.target.value})} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Ej: 304" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Residente *</label>
                  <input type="text" value={nuevaReserva.residente} onChange={(e) => setNuevaReserva({...nuevaReserva, residente: e.target.value})} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Nombre del residente" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Espacio *</label>
                <select value={nuevaReserva.espacio} onChange={(e) => setNuevaReserva({...nuevaReserva, espacio: e.target.value})} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" required>
                  <option value="">Seleccionar espacio</option>
                  {espaciosDisponibles.map((espacio, index) => (
                    <option key={index} value={espacio}>{espacio}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha *</label>
                  <input type="date" value={nuevaReserva.fecha} onChange={(e) => setNuevaReserva({...nuevaReserva, fecha: e.target.value})} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hora Inicio *</label>
                  <input type="time" value={nuevaReserva.horaInicio} onChange={(e) => setNuevaReserva({...nuevaReserva, horaInicio: e.target.value})} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hora Fin *</label>
                  <input type="time" value={nuevaReserva.horaFin} onChange={(e) => setNuevaReserva({...nuevaReserva, horaFin: e.target.value})} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancelar</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Agregar Reserva</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Lista de Reservas</h2>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            <input type="text" value={filtro} onChange={(e) => setFiltro(e.target.value)} placeholder="Buscar reservas..." className="px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Unidad</th>
                <th className="px-6 py-3">Residente</th>
                <th className="px-6 py-3">Espacio</th>
                <th className="px-6 py-3">Fecha</th>
                <th className="px-6 py-3">Horario</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservasFiltradas.map((reserva) => (
                <tr key={reserva._id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{reserva.unidad}</td>
                  <td className="px-6 py-4">{reserva.residente}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-600" />
                      {reserva.espacio}
                    </div>
                  </td>
                  <td className="px-6 py-4">{new Date(reserva.fecha).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{reserva.horaInicio} - {reserva.horaFin}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getEstadoColor(reserva.estado)}`}>
                      {reserva.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {/* Botón de Confirmar (Solo si está pendiente) */}
                      {reserva.estado === 'Pendiente' && (
                        <button 
                          onClick={() => confirmarReserva(reserva)}
                          className="text-green-600 hover:text-green-800 transition-colors"
                          title="Confirmar Reserva"
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                      )}
                      
                      {/* Botón Eliminar */}
                      <button 
                        onClick={() => eliminarReserva(reserva._id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Eliminar"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {reservasFiltradas.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No hay reservas registradas.
          </div>
        )}
      </div>
    </div>
  );
}

export default Reservas;