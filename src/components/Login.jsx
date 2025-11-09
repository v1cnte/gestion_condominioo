// Componente Login: formulario simple que usa react-hook-form y el contexto Auth
// Nota: `signin(data)` devuelve una promesa; maneja errores si necesitas feedback.
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'

function Login() {
  const { signin, errors: loginErrors } = useAuth();
  const { register, handleSubmit } = useForm();

  // onSubmit pasa los datos al contexto de auth.
  // Si quieres mostrar carga o errores, envuelve signin en try/catch.
  const onSubmit = handleSubmit(async (data) => {
    try {
      await signin(data)
    } catch (e) {
      // signin ya guarda errores en el contexto; aquí solo opcionalmente puedes
      // hacer logging o mostrar mensajes locales.
      console.error('Login falló:', e)
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">

          
          <div className="w-20 h-20 mx-auto rounded-full border-2 border-blue-200 overflow-hidden">
            <img 
              src="/condominio_.jpeg" 
              alt="Logo EspacioAdmin" 
              className="w-full h-full object-cover" 
            />
          </div>
          {/* Fin del cambio */}

          <h1 className="text-3xl font-bold text-gray-800 mb-2 mt-4">EspacioAdmin</h1>
          <p className="text-gray-600">Gestión de Condominios</p>
        </div>

        {/* Mensajes de error del backend (si existen) */}
        {loginErrors.length > 0 && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
            {loginErrors.map((error, i) => (
              <p key={i}>{error}</p>
            ))}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={onSubmit} className="space-y-6 mb-8">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="vicente@admin.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tu contraseña"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faSignInAlt} />
            Iniciar Sesión
          </button>
        </form>
        
      </div>
    </div>
  );
}

export default Login;