import { useState, useEffect } from 'react';
import { useUsuarios } from '../context/UsuariosContext';
import { useAuth } from '../context/AuthContext'; /* Se importa para obtener información de la sesión del usuario actual */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEdit, 
  faTrash, 
  faSearch, 
  faUsers,
  faUserPlus,
  faUserTie,
  faHome,
  faIdBadge
} from '@fortawesome/free-solid-svg-icons';

function Usuarios() {
  const { usuarios, getUsuarios, deleteUsuario, updateUsuario, createUsuario } = useUsuarios();
  const { user } = useAuth(); /* Se obtienen los datos de sesión del usuario actual */
  
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    unidad: '',
    rol: 'residente'
  });

  const [filtro, setFiltro] = useState('');

  /* Se valida si el usuario actual tiene permisos de administrador para ver opciones de gestión */
  /* Solo usuarios con rol 'admin' o 'super_admin' pueden ver botones de edición y eliminación */
  const esAdmin = ['admin', 'super_admin'].includes(user?.rol);

  useEffect(() => {
    getUsuarios();
  }, []);

  const roles = [
    { value: 'residente', label: 'Residente' },
    { value: 'admin', label: 'Administrador' },
    { value: 'conserje', label: 'Conserje' },
    { value: 'directiva', label: 'Directiva' },
    { value: 'super_admin', label: 'Super Admin' }
  ];

  const handleOpenCreate = () => {
    setIsEditing(false);
    setFormData({ nombre: '', email: '', password: '', unidad: '', rol: 'residente' });
    setShowModal(true);
  };

  const handleOpenEdit = (userEdit) => {
    setIsEditing(true);
    setCurrentUser(userEdit);
    setFormData({
      nombre: userEdit.nombre,
      email: userEdit.email,
      password: '',
      unidad: userEdit.unidad || '',
      rol: userEdit.rol
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateUsuario(currentUser._id, formData);
    } else {
      if (!formData.password) return alert("La contraseña es obligatoria");
      await createUsuario(formData);
    }
    setShowModal(false);
    getUsuarios();
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar usuario permanentemente?')) {
      await deleteUsuario(id);
    }
  };

  const getRolBadge = (rol) => {
    const styles = {
      'super_admin': 'bg-purple-100 text-purple-800 border-purple-200',
      'admin': 'bg-blue-100 text-blue-800 border-blue-200',
      'conserje': 'bg-orange-100 text-orange-800 border-orange-200',
      'directiva': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'residente': 'bg-green-100 text-green-800 border-green-200',
    };
    return styles[rol?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const usuariosFiltrados = usuarios.filter(u => 
    u.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    (u.unidad && u.unidad.includes(filtro))
  );

  const totalUsers = usuarios.length;
  const staffCount = usuarios.filter(u => ['admin', 'super_admin', 'conserje'].includes(u.rol)).length;
  const residentCount = usuarios.filter(u => u.rol === 'residente').length;

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Directorio de Usuarios</h1>
          <p className="text-gray-600">Administra el acceso y roles de la comunidad</p>
        </div>
        
        {/* 4. PROTECCIÓN VISUAL: Botón Nuevo Usuario */}
        {esAdmin && (
          <button 
            onClick={handleOpenCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
          >
            <FontAwesomeIcon icon={faUserPlus} /> Nuevo Usuario
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Usuarios</p>
            <p className="text-2xl font-bold text-gray-800">{totalUsers}</p>
          </div>
          <div className="p-3 bg-gray-100 rounded-full text-gray-600"><FontAwesomeIcon icon={faUsers} /></div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Staff (Admin/Conserje)</p>
            <p className="text-2xl font-bold text-blue-600">{staffCount}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-full text-blue-600"><FontAwesomeIcon icon={faIdBadge} /></div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Residentes</p>
            <p className="text-2xl font-bold text-green-600">{residentCount}</p>
          </div>
          <div className="p-3 bg-green-50 rounded-full text-green-600"><FontAwesomeIcon icon={faUserTie} /></div>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="relative max-w-md">
            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar por nombre o unidad..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={filtro}
              onChange={e => setFiltro(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3">Usuario</th>
                <th className="px-6 py-3">Rol</th>
                <th className="px-6 py-3">Unidad</th>
                <th className="px-6 py-3">Registro</th>
                {/* 5. PROTECCIÓN VISUAL: Encabezado "Acciones" */}
                {esAdmin && <th className="px-6 py-3 text-right">Acciones</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {usuariosFiltrados.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-lg">
                        {u.nombre.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{u.nombre}</div>
                        <div className="text-gray-500 text-xs">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRolBadge(u.rol)}`}>
                      {roles.find(r => r.value === u.rol)?.label || u.rol}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FontAwesomeIcon icon={faHome} className="text-gray-400" />
                      {u.unidad || '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  
                  {/* 6. PROTECCIÓN VISUAL: Botones Editar/Borrar */}
                  {esAdmin && (
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleOpenEdit(u)} className="text-blue-600 hover:text-blue-800 mx-2">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button onClick={() => handleDelete(u._id)} className="text-red-600 hover:text-red-800 mx-2">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal (Protección extra: Solo se renderiza si es Admin) */}
      {showModal && esAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
            {/* ... Contenido del modal (formulario) ... */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-bold text-gray-800">{isEditing ? 'Editar Usuario' : 'Nuevo Usuario'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Campos del formulario... */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                <input type="text" required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
                  value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              {!isEditing && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                  <input type="password" required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
                    value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unidad</label>
                  <input type="text" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
                    value={formData.unidad} onChange={e => setFormData({...formData, unidad: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                  <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                    value={formData.rol} onChange={e => setFormData({...formData, rol: e.target.value})}>
                    {roles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">Cancelar</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  {isEditing ? 'Guardar Cambios' : 'Crear Usuario'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Usuarios;