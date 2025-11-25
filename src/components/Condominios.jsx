import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBuilding, 
  faPlus, 
  faMapMarkerAlt, 
  faEdit, 
  faTrash,
  faSearch,
  faPhone
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

function Condominios() {
  const { user } = useAuth();
  const canManage = ['admin', 'super_admin'].includes(user?.rol);

  const [condominios, setCondominios] = useState([
    { id: 1, nombre: 'Edificio Central', unidades: 128, ano: 2018, direccion: 'Av. Principal 123', estado: 'Activo' },
    { id: 2, nombre: 'Torre Norte', unidades: 96, ano: 2020, direccion: 'Calle Norte 45', estado: 'Activo' },
    { id: 3, nombre: 'Torre Sur', unidades: 84, ano: 2019, direccion: 'Calle Sur 88', estado: 'Mantención' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [nuevo, setNuevo] = useState({ nombre: '', direccion: '', unidades: '' });

  const handleAgregar = (e) => {
    e.preventDefault();
    if (!canManage) {
      alert('No tienes permisos para realizar esta acción');
      return;
    }
    const nuevoCondo = {
      id: Date.now(),
      ...nuevo,
      ano: new Date().getFullYear(),
      estado: 'Activo'
    };
    setCondominios([...condominios, nuevoCondo]);
    setNuevo({ nombre: '', direccion: '', unidades: '' });
    setShowModal(false);
  };

  const handleEliminar = (id) => {
    if (!canManage) {
      alert('No tienes permisos para realizar esta acción');
      return;
    }

    if(window.confirm('¿Estás seguro de eliminar este condominio?')) {
      setCondominios(condominios.filter(c => c.id !== id));
    }
  };

  const filtrados = condominios.filter(c => c.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  return (
    <div className="p-6">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Mis Condominios</h1>
          <p className="text-gray-600">Gestión de propiedades y edificios</p>
        </div>
        {canManage && (
          <button 
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-colors"
          >
            <FontAwesomeIcon icon={faPlus} /> Nuevo Condominio
          </button>
        )}
      </div>

      <div className="mb-6 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative max-w-md">
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar condominio..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtrados.map((condo) => (
          <div key={condo.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
            
            <div className="h-32 bg-gray-100 relative">
              {/* IMAGEN REPRESENTATIVA DE EDIFICIO OBTENIDA DESDE UNSPLASH */}
              <img 
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop" 
                alt="Edificio" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 text-xs font-bold rounded-full bg-white ${condo.estado === 'Activo' ? 'text-green-600' : 'text-orange-500'}`}>
                  {condo.estado}
                </span>
              </div>
            </div>

            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-800">{condo.nombre}</h3>
                {canManage && (
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-gray-400 hover:text-blue-600"><FontAwesomeIcon icon={faEdit} /></button>
                    <button onClick={() => handleEliminar(condo.id)} className="text-gray-400 hover:text-red-600"><FontAwesomeIcon icon={faTrash} /></button>
                  </div>
                )}
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-400 w-4" />
                  {condo.direccion}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FontAwesomeIcon icon={faBuilding} className="text-gray-400 w-4" />
                  {condo.unidades} Unidades • Año {condo.ano}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FontAwesomeIcon icon={faPhone} className="text-gray-400 w-4" />
                  +56 9 8765 4321
                </div>
              </div>

              {canManage && (
                <button className="w-full py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                  Administrar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Registrar Nuevo Condominio</h2>
            <form onSubmit={handleAgregar} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input required type="text" className="w-full border rounded-lg px-3 py-2" value={nuevo.nombre} onChange={e => setNuevo({...nuevo, nombre: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                <input required type="text" className="w-full border rounded-lg px-3 py-2" value={nuevo.direccion} onChange={e => setNuevo({...nuevo, direccion: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad Unidades</label>
                <input required type="number" className="w-full border rounded-lg px-3 py-2" value={nuevo.unidades} onChange={e => setNuevo({...nuevo, unidades: e.target.value})} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 border rounded-lg hover:bg-gray-50">Cancelar</button>
                <button type="submit" className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Condominios;