import { useState, useEffect } from 'react';
import { useNotificaciones } from '../context/NotificacionesContext';
import { useGastos } from '../context/GastosContext';
import { useAuth } from '../context/AuthContext'; /* Se importa para validar el rol del usuario */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faTrash, 
  faSearch, 
  faDollarSign,
  faEdit,
  faCheckCircle,
  faTimesCircle,
  faFilter
} from '@fortawesome/free-solid-svg-icons';

function GastosComunes() {
  const { notificarNuevoGasto } = useNotificaciones();
  const { gastos, getGastos, createGasto, deleteGasto, updateGasto } = useGastos();
  const { user } = useAuth();

  /* Se valida si el usuario tiene permiso para crear, editar y eliminar gastos */
  const esAdmin = ['admin', 'super_admin'].includes(user?.rol);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); /* Indicador para saber si se está creando o editando */
  const [currentId, setCurrentId] = useState(null);

  const [formGasto, setFormGasto] = useState({
    unidad: '', 
    concepto: '',
    monto: '',
    fecha: new Date().toISOString().split('T')[0],
    tipo: '',
    estado: 'Pendiente'
  });

  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todos'); /* Nuevo filtro por estado de pago */

  useEffect(() => { getGastos(); }, []);

  const tiposGasto = ['Mantenimiento', 'Servicios', 'Limpieza', 'Seguridad', 'Suministros', 'Otros'];

  /* Funciones para operaciones CRUD de gastos comunes */

  const handleOpenCreate = () => {
    setIsEditing(false);
    setFormGasto({ unidad: '', concepto: '', monto: '', fecha: new Date().toISOString().split('T')[0], tipo: '', estado: 'Pendiente' });
    setShowModal(true);
  };

  const handleOpenEdit = (gasto) => {
    setIsEditing(true);
    setCurrentId(gasto._id);
    /* Se formatea la fecha al formato requerido por el input date (YYYY-MM-DD) */
    const fechaFormat = new Date(gasto.fecha).toISOString().split('T')[0];
    setFormGasto({ ...gasto, fecha: fechaFormat });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const gastoData = { ...formGasto, monto: parseFloat(formGasto.monto) };

    if (isEditing) {
      await updateGasto(currentId, gastoData);
    } else {
      await createGasto(gastoData);
      notificarNuevoGasto(gastoData.concepto, gastoData.monto);
    }
    setShowModal(false);
  };

  const eliminarGasto = async (id) => {
    if (window.confirm('¿Eliminar este gasto permanentemente?')) {
      await deleteGasto(id);
    }
  };

  /* Función que permite cambiar rápidamente el estado de pago de un gasto solo para administradores */
  const toggleEstado = async (gasto) => {
    const nuevoEstado = gasto.estado === 'Pendiente' ? 'Pagado' : 'Pendiente';
    await updateGasto(gasto._id, { ...gasto, estado: nuevoEstado });
  };

  /* Lógica de filtrado de gastos por texto y estado */
  const gastosFiltrados = gastos.filter(gasto => {
    const matchTexto = gasto.concepto.toLowerCase().includes(busqueda.toLowerCase()) ||
                       (gasto.unidad && gasto.unidad.toLowerCase().includes(busqueda.toLowerCase()));
    
    const matchEstado = filtroEstado === 'Todos' || gasto.estado === filtroEstado;

    return matchTexto && matchEstado;
  });

  /* Cálculo de totales y estadísticas de gastos */
  const totalMonto = gastos.reduce((sum, g) => sum + g.monto, 0);
  const pendientes = gastos.filter(g => g.estado === 'Pendiente').length;
  const pagados = gastos.filter(g => g.estado === 'Pagado').length;

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Gastos Comunes</h1>
          <p className="text-gray-600">Gestión y seguimiento de cobros</p>
        </div>
        
        {/* SOLO ADMINISTRADORES VEN EL BOTÓN PARA CREAR NUEVOS GASTOS */}
        {esAdmin && (
          <button onClick={handleOpenCreate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-colors">
            <FontAwesomeIcon icon={faPlus} /> Nuevo Cobro
          </button>
        )}
      </div>

      {/* Tarjetas de Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Total Facturado</p>
            <p className="text-2xl font-bold text-blue-600">${totalMonto.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-full text-blue-600"><FontAwesomeIcon icon={faDollarSign} /></div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Boletas Pendientes</p>
            <p className="text-2xl font-bold text-yellow-600">{pendientes}</p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-full text-yellow-600"><FontAwesomeIcon icon={faTimesCircle} /></div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Boletas Pagadas</p>
            <p className="text-2xl font-bold text-green-600">{pagados}</p>
          </div>
          <div className="p-3 bg-green-50 rounded-full text-green-600"><FontAwesomeIcon icon={faCheckCircle} /></div>
        </div>
      </div>

      {/* Barra de Filtros */}
      <div className="bg-white p-4 rounded-t-xl border-b border-gray-200 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm">
        <div className="relative w-full md:w-96">
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar por unidad o concepto..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <FontAwesomeIcon icon={faFilter} className="text-gray-500" />
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
            value={filtroEstado}
            onChange={e => setFiltroEstado(e.target.value)}
          >
            <option value="Todos">Todos los estados</option>
            <option value="Pendiente">Pendientes</option>
            <option value="Pagado">Pagados</option>
          </select>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-b-xl shadow-sm border border-t-0 border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3">Unidad</th>
                <th className="px-6 py-3">Concepto</th>
                <th className="px-6 py-3">Monto</th>
                <th className="px-6 py-3">Fecha</th>
                <th className="px-6 py-3">Estado</th>
                {esAdmin && <th className="px-6 py-3 text-right">Acciones</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {gastosFiltrados.map((gasto) => (
                <tr key={gasto._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-800">{gasto.unidad}</td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{gasto.concepto}</p>
                    <p className="text-xs text-gray-500">{gasto.tipo}</p>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">${gasto.monto.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-500">{new Date(gasto.fecha).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => esAdmin && toggleEstado(gasto)} // Solo admin cambia estado con clic
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        gasto.estado === 'Pagado' 
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                      } ${esAdmin ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
                      title={esAdmin ? "Clic para cambiar estado" : ""}
                    >
                      {gasto.estado}
                    </button>
                  </td>
                  
                  {/* Solo Admin ve botones de editar/borrar */}
                  {esAdmin && (
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleOpenEdit(gasto)} className="text-blue-600 hover:text-blue-800 mx-2" title="Editar">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button onClick={() => eliminarGasto(gasto._id)} className="text-red-600 hover:text-red-800 mx-2" title="Eliminar">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {gastosFiltrados.length === 0 && (
          <div className="p-8 text-center text-gray-500 bg-gray-50">
            No se encontraron gastos con los filtros aplicados.
          </div>
        )}
      </div>

      {/* Modal Crear/Editar */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-bold text-gray-800">{isEditing ? 'Editar Gasto' : 'Nuevo Gasto'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unidad</label>
                  <input type="text" required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={formGasto.unidad} onChange={e => setFormGasto({...formGasto, unidad: e.target.value})} placeholder="Ej: 304" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monto</label>
                  <input type="number" required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={formGasto.monto} onChange={e => setFormGasto({...formGasto, monto: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Concepto</label>
                <input type="text" required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={formGasto.concepto} onChange={e => setFormGasto({...formGasto, concepto: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                  <input type="date" required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={formGasto.fecha} onChange={e => setFormGasto({...formGasto, fecha: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                  <select required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                    value={formGasto.tipo} onChange={e => setFormGasto({...formGasto, tipo: e.target.value})}>
                    <option value="">Seleccionar...</option>
                    {tiposGasto.map((t, i) => <option key={i} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado Inicial</label>
                <div className="flex gap-4 mt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="estado" value="Pendiente" checked={formGasto.estado === 'Pendiente'} onChange={e => setFormGasto({...formGasto, estado: e.target.value})} />
                    <span className="text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded text-sm">Pendiente</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="estado" value="Pagado" checked={formGasto.estado === 'Pagado'} onChange={e => setFormGasto({...formGasto, estado: e.target.value})} />
                    <span className="text-green-700 bg-green-100 px-2 py-0.5 rounded text-sm">Pagado</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">Cancelar</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  {isEditing ? 'Guardar Cambios' : 'Registrar Cobro'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default GastosComunes;