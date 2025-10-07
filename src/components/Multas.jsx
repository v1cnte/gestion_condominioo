import { useState } from 'react';
import { useNotificaciones } from '../context/NotificacionesContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faTrash, 
  faSearch, 
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

function Multas() {
  const { notificarNuevaMulta } = useNotificaciones();
  const [showAddForm, setShowAddForm] = useState(false);
  const [multas, setMultas] = useState([
    {
      id: 1,
      unidad: '304',
      residente: 'João Silva',
      motivo: 'Ruido excesivo',
      monto: 25000,
      fecha: '2025-10-01',
      estado: 'Pendiente'
    },
    {
      id: 2,
      unidad: '205',
      residente: 'Ana Beatriz Santos',
      motivo: 'Mascotas sin correa',
      monto: 15000,
      fecha: '2025-10-02',
      estado: 'Pagada'
    },
    {
      id: 3,
      unidad: '102',
      residente: 'Rafael Oliveira',
      motivo: 'Estacionamiento indebido',
      monto: 35000,
      fecha: '2025-09-28',
      estado: 'Pendiente'
    },
    {
      id: 4,
      unidad: '408',
      residente: 'Bruno Luchini',
      motivo: 'Basura fuera de horario',
      monto: 20000,
      fecha: '2025-10-03',
      estado: 'Pendiente'
    }
  ]);

  const [nuevaMulta, setNuevaMulta] = useState({
    unidad: '',
    residente: '',
    motivo: '',
    monto: '',
    fecha: new Date().toISOString().split('T')[0],
    estado: 'Pendiente'
  });

  const [filtro, setFiltro] = useState('');

  const motivosComunes = [
    'Ruido excesivo',
    'Mascotas sin correa',
    'Estacionamiento indebido',
    'Basura fuera de horario',
    'Uso indebido de áreas comunes',
    'Otros'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nuevaMulta.unidad && nuevaMulta.residente && nuevaMulta.motivo && nuevaMulta.monto) {
      const multa = {
        id: multas.length + 1,
        ...nuevaMulta,
        monto: parseFloat(nuevaMulta.monto)
      };
      setMultas([...multas, multa]);
      
      // Generar notificación
      notificarNuevaMulta(nuevaMulta.unidad, nuevaMulta.motivo);
      
      setNuevaMulta({
        unidad: '',
        residente: '',
        motivo: '',
        monto: '',
        fecha: new Date().toISOString().split('T')[0],
        estado: 'Pendiente'
      });
      setShowAddForm(false);
    }
  };

  const eliminarMulta = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta multa?')) {
      setMultas(multas.filter(multa => multa.id !== id));
    }
  };

  const multasFiltradas = multas.filter(multa => {
    return multa.unidad.includes(filtro) ||
      multa.residente.toLowerCase().includes(filtro.toLowerCase()) ||
      multa.motivo.toLowerCase().includes(filtro.toLowerCase());
  });

  const totalMultas = multas.length;
  const multasPendientes = multas.filter(multa => multa.estado === 'Pendiente').length;
  const multasPagadas = multas.filter(multa => multa.estado === 'Pagada').length;

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'Pagada': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Multas</h1>
            <p className="text-gray-600">Gestión de infracciones y sanciones</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <FontAwesomeIcon icon={faPlus} />
            Agregar Multa
          </button>
        </div>
      </div>

      {/* Resumen simple */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-600" />
            <h3 className="font-semibold text-red-800">Total Multas</h3>
          </div>
          <p className="text-2xl font-bold text-red-600">{totalMultas}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">Pendientes</h3>
          <p className="text-2xl font-bold text-yellow-600">{multasPendientes}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <h3 className="font-semibold text-green-800 mb-2">Pagadas</h3>
          <p className="text-2xl font-bold text-green-600">{multasPagadas}</p>
        </div>
      </div>

      {/* Modal para Agregar Multa */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Agregar Nueva Multa</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unidad *
                  </label>
                  <input
                    type="text"
                    value={nuevaMulta.unidad}
                    onChange={(e) => setNuevaMulta({...nuevaMulta, unidad: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Ej: 304"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Residente *
                  </label>
                  <input
                    type="text"
                    value={nuevaMulta.residente}
                    onChange={(e) => setNuevaMulta({...nuevaMulta, residente: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Nombre del residente"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Motivo *
                </label>
                <select
                  value={nuevaMulta.motivo}
                  onChange={(e) => setNuevaMulta({...nuevaMulta, motivo: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                >
                  <option value="">Seleccionar motivo</option>
                  {motivosComunes.map((motivo, index) => (
                    <option key={index} value={motivo}>{motivo}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Monto *
                  </label>
                  <input
                    type="number"
                    value={nuevaMulta.monto}
                    onChange={(e) => setNuevaMulta({...nuevaMulta, monto: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="25000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha
                  </label>
                  <input
                    type="date"
                    value={nuevaMulta.fecha}
                    onChange={(e) => setNuevaMulta({...nuevaMulta, fecha: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Agregar Multa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filtros y Tabla de Multas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Lista de Multas</h2>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            <input
              type="text"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              placeholder="Buscar multas..."
              className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Unidad</th>
                <th className="px-6 py-3">Residente</th>
                <th className="px-6 py-3">Motivo</th>
                <th className="px-6 py-3">Monto</th>
                <th className="px-6 py-3">Fecha</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {multasFiltradas.map((multa) => (
                <tr key={multa.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{multa.unidad}</td>
                  <td className="px-6 py-4">{multa.residente}</td>
                  <td className="px-6 py-4">{multa.motivo}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    ${multa.monto.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">{multa.fecha}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getEstadoColor(multa.estado)}`}>
                      {multa.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => eliminarMulta(multa.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {multasFiltradas.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No se encontraron multas que coincidan con los filtros aplicados.
          </div>
        )}
      </div>
    </div>
  );
}

export default Multas;