import { useState, useEffect } from 'react';
import { useNotificaciones } from '../context/NotificacionesContext';
import { useMultas } from '../context/MultasContext';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faTrash,
  faSearch,
  faExclamationTriangle,
  faEdit
} from '@fortawesome/free-solid-svg-icons';

function Multas() {
  const { user } = useAuth();
  const { notificarNuevaMulta } = useNotificaciones();
  const { multas, getMultas, createMulta, deleteMulta, updateMulta } = useMultas();

  const [showAddForm, setShowAddForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [nuevaMulta, setNuevaMulta] = useState({
    unidad: '',
    residente: '',
    motivo: '',
    monto: '',
    fecha: new Date().toISOString().split('T')[0],
    estado: 'Pendiente'
  });

  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    getMultas();
  }, []);

  const motivosComunes = [
    'Ruido excesivo',
    'Mascotas sin correa',
    'Estacionamiento indebido',
    'Basura fuera de horario',
    'Uso indebido de áreas comunes',
    'Otros'
  ];

  const handleOpenEdit = (multa) => {
    if (!['admin', 'super_admin'].includes(user?.rol)) {
      alert('No tienes permisos para realizar esta acción');
      return;
    }

    setIsEditing(true);
    setCurrentId(multa._id);
    const fechaFormat = new Date(multa.fecha).toISOString().split('T')[0];
    setNuevaMulta({ ...multa, fecha: fechaFormat });
    setShowAddForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de seguridad adicional
    if (!['admin', 'super_admin'].includes(user?.rol)) {
      alert('No tienes permisos para realizar esta acción');
      return;
    }

    if (nuevaMulta.unidad && nuevaMulta.residente && nuevaMulta.motivo && nuevaMulta.monto) {
      const multaParaGuardar = {
        unidad: nuevaMulta.unidad,
        residente: nuevaMulta.residente,
        motivo: nuevaMulta.motivo,
        monto: parseFloat(nuevaMulta.monto),
        fecha: nuevaMulta.fecha,
        estado: nuevaMulta.estado
      };

      try {
        if (isEditing) {
          await updateMulta(currentId, multaParaGuardar);
        } else {
          await createMulta(multaParaGuardar);
          notificarNuevaMulta(nuevaMulta.unidad, nuevaMulta.motivo);
        }

        await getMultas();
        setIsEditing(false);
        setCurrentId(null);
        setNuevaMulta({
          unidad: '',
          residente: '',
          motivo: '',
          monto: '',
          fecha: new Date().toISOString().split('T')[0],
          estado: 'Pendiente'
        });
        setShowAddForm(false);
      } catch (error) {
        console.error(error);
        alert('Ocurrió un problema al guardar la multa. Intenta nuevamente.');
      }
    }
  };

  const eliminarMulta = async (id) => {
    if (!['admin', 'super_admin'].includes(user?.rol)) {
      alert('No tienes permisos para realizar esta acción');
      return;
    }

    if (window.confirm('¿Estás seguro de que quieres eliminar esta multa?')) {
      await deleteMulta(id);
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
          {['admin', 'super_admin'].includes(user?.rol) && (
            <button
              onClick={() => {
                setIsEditing(false);
                setCurrentId(null);
                setNuevaMulta({
                  unidad: '',
                  residente: '',
                  motivo: '',
                  monto: '',
                  fecha: new Date().toISOString().split('T')[0],
                  estado: 'Pendiente'
                });
                setShowAddForm(true);
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FontAwesomeIcon icon={faPlus} />
              Agregar Multa
            </button>
          )}
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
              <h2 className="text-xl font-bold text-gray-800">{isEditing ? 'Editar Multa' : 'Agregar Nueva Multa'}</h2>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setIsEditing(false);
                  setCurrentId(null);
                }}
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
                    onChange={(e) => setNuevaMulta({ ...nuevaMulta, unidad: e.target.value })}
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
                    onChange={(e) => setNuevaMulta({ ...nuevaMulta, residente: e.target.value })}
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
                  onChange={(e) => setNuevaMulta({ ...nuevaMulta, motivo: e.target.value })}
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
                    onChange={(e) => setNuevaMulta({ ...nuevaMulta, monto: e.target.value })}
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
                    onChange={(e) => setNuevaMulta({ ...nuevaMulta, fecha: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <select
                  value={nuevaMulta.estado}
                  onChange={(e) => setNuevaMulta({ ...nuevaMulta, estado: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Pagada">Pagada</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setIsEditing(false);
                    setCurrentId(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  {isEditing ? 'Guardar Cambios' : 'Agregar Multa'}
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
                <tr key={multa._id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{multa.unidad}</td>
                  <td className="px-6 py-4">{multa.residente}</td>
                  <td className="px-6 py-4">{multa.motivo}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    ${multa.monto.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">{new Date(multa.fecha).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getEstadoColor(multa.estado)}`}>
                      {multa.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {['admin', 'super_admin'].includes(user?.rol) && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleOpenEdit(multa)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="Editar"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={() => eliminarMulta(multa._id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Eliminar"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {multasFiltradas.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No hay multas registradas en la base de datos.
          </div>
        )}
      </div>
    </div>
  );
}

export default Multas;