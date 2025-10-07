import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faEdit, 
  faTrash, 
  faSearch, 
  faUsers,
  faEnvelope,
  faPhone,
  faHome
} from '@fortawesome/free-solid-svg-icons';

function Usuarios() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  // usuarios iniciales con nombres brasileños
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nombre: 'João Silva',
      email: 'joao.silva@email.com',
      telefono: '+55 11 99999-1234',
      unidad: '304',
      rol: 'Residente',
      estado: 'Activo',
      fechaRegistro: '2024-01-15'
    },
    {
      id: 2,
      nombre: 'Ana Beatriz Santos',
      email: 'ana.santos@email.com',
      telefono: '+55 11 98888-5678',
      unidad: '205',
      rol: 'Residente',
      estado: 'Activo',
      fechaRegistro: '2024-02-20'
    },
    {
      id: 3,
      nombre: 'Rafael Oliveira',
      email: 'rafael.oliveira@email.com',
      telefono: '+55 11 97777-9012',
      unidad: '102',
      rol: 'Residente',
      estado: 'Activo',
      fechaRegistro: '2024-03-10'
    },
    {
      id: 4,
      nombre: 'Bruno Luchini',
      email: 'bruno.luchini@email.com',
      telefono: '+55 11 96666-3456',
      unidad: '408',
      rol: 'Residente',
      estado: 'Activo',
      fechaRegistro: '2024-04-05'
    },
    {
      id: 5,
      nombre: 'Carlos Mendes',
      email: 'carlos.mendes@email.com',
      telefono: '+55 11 95555-7890',
      unidad: 'Admin',
      rol: 'Administrador',
      estado: 'Activo',
      fechaRegistro: '2024-01-01'
    },
    {
      id: 6,
      nombre: 'Fernanda Costa',
      email: 'fernanda.costa@email.com',
      telefono: '+55 11 94444-2345',
      unidad: 'Conserje',
      rol: 'Conserje',
      estado: 'Activo',
      fechaRegistro: '2024-02-01'
    }
  ]);

  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    email: '',
    unidad: '',
    rol: 'Residente'
  });

  const [filtro, setFiltro] = useState('');
  const [filtroRol, setFiltroRol] = useState('');

  const roles = ['Residente', 'Administrador', 'Conserje', 'Directiva'];

  // función para agregar usuario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (nuevoUsuario.nombre && nuevoUsuario.email && nuevoUsuario.unidad) {
      const usuario = {
        id: usuarios.length + 1,
        ...nuevoUsuario,
        telefono: '+55 11 99999-0000', // teléfono por defecto
        estado: 'Activo', // estado por defecto
        fechaRegistro: new Date().toISOString().split('T')[0]
      };
      setUsuarios([...usuarios, usuario]);
      
      setNuevoUsuario({
        nombre: '',
        email: '',
        unidad: '',
        rol: 'Residente'
      });
      setShowAddForm(false);
    }
  };

  // función para editar usuario
  const handleEdit = (user) => {
    setEditingUser(user);
    setNuevoUsuario({
      nombre: user.nombre,
      email: user.email,
      unidad: user.unidad,
      rol: user.rol
    });
    setShowEditForm(true);
  };

  // función para actualizar usuario
  const handleUpdate = (e) => {
    e.preventDefault();
    if (nuevoUsuario.nombre && nuevoUsuario.email && nuevoUsuario.unidad) {
      const usuariosActualizados = usuarios.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...nuevoUsuario }
          : user
      );
      setUsuarios(usuariosActualizados);
      
      setNuevoUsuario({
        nombre: '',
        email: '',
        unidad: '',
        rol: 'Residente'
      });
      setShowEditForm(false);
      setEditingUser(null);
    }
  };

  // función para eliminar usuario
  const eliminarUsuario = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      setUsuarios(usuarios.filter(usuario => usuario.id !== id));
    }
  };

  // filtrar usuarios
  const usuariosFiltrados = usuarios.filter(usuario => {
    const coincideTexto = usuario.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      usuario.email.toLowerCase().includes(filtro.toLowerCase()) ||
      usuario.unidad.toLowerCase().includes(filtro.toLowerCase());
    
    const coincideRol = filtroRol === '' || usuario.rol === filtroRol;
    
    return coincideTexto && coincideRol;
  });

  // estadísticas
  const totalUsuarios = usuarios.length;
  const usuariosActivos = usuarios.filter(u => u.estado === 'Activo').length;
  const administradores = usuarios.filter(u => u.rol === 'Administrador').length;
  const residentes = usuarios.filter(u => u.rol === 'Residente').length;

  const getRolColor = (rol) => {
    switch (rol) {
      case 'Administrador': return 'bg-red-100 text-red-800';
      case 'Conserje': return 'bg-blue-100 text-blue-800';
      case 'Directiva': return 'bg-purple-100 text-purple-800';
      case 'Residente': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoColor = (estado) => {
    return estado === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="p-6">
      {/* header del componente */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Usuarios</h1>
            <p className="text-gray-600">Gestión de residentes y personal del condominio</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <FontAwesomeIcon icon={faPlus} />
            Agregar Usuario
          </button>
        </div>
      </div>

      {/* tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <FontAwesomeIcon icon={faUsers} className="text-blue-600" />
            <h3 className="font-semibold text-blue-800">Total Usuarios</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600">{totalUsuarios}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <h3 className="font-semibold text-green-800 mb-2">Activos</h3>
          <p className="text-2xl font-bold text-green-600">{usuariosActivos}</p>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <h3 className="font-semibold text-red-800 mb-2">Administradores</h3>
          <p className="text-2xl font-bold text-red-600">{administradores}</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <h3 className="font-semibold text-purple-800 mb-2">Residentes</h3>
          <p className="text-2xl font-bold text-purple-600">{residentes}</p>
        </div>
      </div>

      {/* modal para agregar usuario */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Agregar Nuevo Usuario</h2>
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
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  value={nuevoUsuario.nombre}
                  onChange={(e) => setNuevoUsuario({...nuevoUsuario, nombre: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="João Silva"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={nuevoUsuario.email}
                  onChange={(e) => setNuevoUsuario({...nuevoUsuario, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="joao.silva@email.com"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unidad *
                  </label>
                  <input
                    type="text"
                    value={nuevoUsuario.unidad}
                    onChange={(e) => setNuevoUsuario({...nuevoUsuario, unidad: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="304"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rol *
                  </label>
                  <select
                    value={nuevoUsuario.rol}
                    onChange={(e) => setNuevoUsuario({...nuevoUsuario, rol: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {roles.map((rol, index) => (
                      <option key={index} value={rol}>{rol}</option>
                    ))}
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
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Agregar Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* modal para editar usuario */}
      {showEditForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Editar Usuario</h2>
              <button
                onClick={() => {
                  setShowEditForm(false);
                  setEditingUser(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  value={nuevoUsuario.nombre}
                  onChange={(e) => setNuevoUsuario({...nuevoUsuario, nombre: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={nuevoUsuario.email}
                  onChange={(e) => setNuevoUsuario({...nuevoUsuario, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unidad *
                  </label>
                  <input
                    type="text"
                    value={nuevoUsuario.unidad}
                    onChange={(e) => setNuevoUsuario({...nuevoUsuario, unidad: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rol *
                  </label>
                  <select
                    value={nuevoUsuario.rol}
                    onChange={(e) => setNuevoUsuario({...nuevoUsuario, rol: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {roles.map((rol, index) => (
                      <option key={index} value={rol}>{rol}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditForm(false);
                    setEditingUser(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Actualizar Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* tabla de usuarios */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Lista de Usuarios</h2>
          
          {/* filtros */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
              <input
                type="text"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                placeholder="Buscar usuarios..."
                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={filtroRol}
              onChange={(e) => setFiltroRol(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los roles</option>
              {roles.map((rol, index) => (
                <option key={index} value={rol}>{rol}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Usuario</th>
                <th className="px-6 py-3">Contacto</th>
                <th className="px-6 py-3">Unidad</th>
                <th className="px-6 py-3">Rol</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3">Registro</th>
                <th className="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map((usuario) => (
                <tr key={usuario.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faUsers} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{usuario.nombre}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
                        <span>{usuario.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FontAwesomeIcon icon={faPhone} className="text-gray-400" />
                        <span>{usuario.telefono}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faHome} className="text-blue-600" />
                      <span className="font-medium">{usuario.unidad}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getRolColor(usuario.rol)}`}>
                      {usuario.rol}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getEstadoColor(usuario.estado)}`}>
                      {usuario.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4">{usuario.fechaRegistro}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(usuario)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="Editar usuario"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button 
                        onClick={() => eliminarUsuario(usuario.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Eliminar usuario"
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

        {usuariosFiltrados.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No se encontraron usuarios que coincidan con los filtros aplicados.
          </div>
        )}
      </div>
    </div>
  );
}

export default Usuarios;