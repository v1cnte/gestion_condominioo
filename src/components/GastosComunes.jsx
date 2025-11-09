// Componente GastosComunes: lista, crea y borra gastos usando el contexto.
// Importar hooks y contextos necesarios.
import { useState, useEffect } from 'react';
import { useNotificaciones } from '../context/NotificacionesContext';
import { useGastos } from '../context/GastosContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faTrash, 
  faSearch, 
  faDollarSign
} from '@fortawesome/free-solid-svg-icons';

function GastosComunes() {
  const { notificarNuevoGasto } = useNotificaciones();
  
  // Cargar datos y funciones desde el contexto de gastos
  const { gastos, getGastos, createGasto, deleteGasto } = useGastos();

  const [showAddForm, setShowAddForm] = useState(false);
  
  // Estado local para el formulario de nuevo gasto

  const [nuevoGasto, setNuevoGasto] = useState({
    concepto: '',
    monto: '',
    fecha: new Date().toISOString().split('T')[0],
    tipo: '',
    estado: 'Pendiente'
  });

  const [filtro, setFiltro] = useState('');

  // useEffect: cargar gastos al montar el componente
  useEffect(() => { getGastos(); }, []);

  const tiposGasto = [
    'Mantenimiento',
    'Servicios',
    'Limpieza',
    'Seguridad',
    'Suministros',
    'Otros'
  ];

  // handleSubmit: valida y crea un gasto via createGasto
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nuevoGasto.concepto && nuevoGasto.monto && nuevoGasto.tipo) {
      
      const gastoParaGuardar = {
        ...nuevoGasto,
        monto: parseFloat(nuevoGasto.monto)
      };

  // llamar al contexto para persistir el gasto
  await createGasto(gastoParaGuardar);
      
      notificarNuevoGasto(nuevoGasto.concepto, nuevoGasto.monto);
      
      setNuevoGasto({
        concepto: '',
        monto: '',
        fecha: new Date().toISOString().split('T')[0],
        tipo: '',
        estado: 'Pendiente'
      });
      setShowAddForm(false);
    }
  };

  // eliminarGasto: confirma y borra usando deleteGasto del contexto
  const eliminarGasto = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este gasto?')) {
      await deleteGasto(id);
    }
  };

  // Filtrado y cálculo de métricas (presentación)

  const gastosFiltrados = gastos.filter(gasto => {
    return gasto.concepto.toLowerCase().includes(filtro.toLowerCase()) ||
      gasto.tipo.toLowerCase().includes(filtro.toLowerCase());
  });

  const totalGastos = gastos.reduce((sum, gasto) => sum + gasto.monto, 0);
  const gastosPendientes = gastos.filter(gasto => gasto.estado === 'Pendiente').length;
  const gastosPagados = gastos.filter(gasto => gasto.estado === 'Pagado').length;

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'Pagado': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Gastos Comunes</h1>
            <p className="text-gray-600">Gestión de gastos del condominio</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <FontAwesomeIcon icon={faPlus} />
            Agregar Gasto
          </button>
        </div>
      </div>

  {/* Resumen: totales y conteos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <FontAwesomeIcon icon={faDollarSign} className="text-blue-600" />
            <h3 className="font-semibold text-blue-800">Total Gastos</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600">${totalGastos.toLocaleString()}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">Pendientes</h3>
          <p className="text-2xl font-bold text-yellow-600">{gastosPendientes}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <h3 className="font-semibold text-green-800 mb-2">Pagados</h3>
          <p className="text-2xl font-bold text-green-600">{gastosPagados}</p>
        </div>
      </div>

  {/* Modal: formulario nuevo gasto */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Agregar Nuevo Gasto</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Concepto *
                </label>
                <input
                  type="text"
                  value={nuevoGasto.concepto}
                  onChange={(e) => setNuevoGasto({...nuevoGasto, concepto: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ej: Mantenimiento Ascensores"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Monto *
                  </label>
                  <input
                    type="number"
                    value={nuevoGasto.monto}
                    onChange={(e) => setNuevoGasto({...nuevoGasto, monto: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="150000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha *
                  </label>
                  <input
                    type="date"
                    value={nuevoGasto.fecha}
                    onChange={(e) => setNuevoGasto({...nuevoGasto, fecha: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo *
                  </label>
                  <select
                    value={nuevoGasto.tipo}
                    onChange={(e) => setNuevoGasto({...nuevoGasto, tipo: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Seleccionar tipo</option>
                    {tiposGasto.map((tipo, index) => (
                      <option key={index} value={tipo}>{tipo}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado
                  </label>
                  <select
                    value={nuevoGasto.estado}
                    onChange={(e) => setNuevoGasto({...nuevoGasto, estado: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Pagado">Pagado</option>
                  </select>
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
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Agregar Gasto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

  {/* Tabla de gastos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Lista de Gastos</h2>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            <input
              type="text"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              placeholder="Buscar gastos..."
              className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Concepto</th>
                <th className="px-6 py-3">Tipo</th>
                <th className="px-6 py-3">Monto</th>
                <th className="px-6 py-3">Fecha</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* Lista de gastos obtenida desde el contexto/API */}
              {gastosFiltrados.map((gasto) => (
                <tr key={gasto._id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{gasto.concepto}</td>
                  <td className="px-6 py-4">{gasto.tipo}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    ${gasto.monto.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">{new Date(gasto.fecha).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getEstadoColor(gasto.estado)}`}>
                      {gasto.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => eliminarGasto(gasto._id)} // usa _id del documento
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

        {gastosFiltrados.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {/* Mensaje: sin resultados */}
            No hay gastos registrados en la base de datos.
          </div>
        )}
      </div>
    </div>
  );
}

export default GastosComunes;