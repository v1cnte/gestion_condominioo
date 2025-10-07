// importando las librerías necesarias para los iconos de fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBuilding,           // icono de edificio para unidades
  faWallet,            // icono de billetera para pagos y gastos
  faCalendarCheck,     // icono de calendario para reservas
  faExclamationTriangle, // icono de alerta para multas
  faChartBar,          // icono de gráfico para reportes
  faUsers,             // icono de usuarios para gestión de personas
  faHammer,            // icono de martillo para mantenimiento
  faFileAlt,           // icono de archivo para documentos
  faBell,              // icono de campana para notificaciones
  faKey,               // icono de llave para acceso restringido
  faHome               // icono de casa para residentes
} from '@fortawesome/free-solid-svg-icons';

// importando componente personalizado que creé para el manejo de imágenes
import DashboardImage from './DashboardImage';

// componente principal del dashboard - recibe la información del usuario logueado
function Dashboard({ user }) {

  // función clave: esta función define qué puede ver cada tipo de usuario
  // es como un "filtro" que cambia el contenido según el rol
  const getAccessByRole = (userRole) => {
    // uso switch para manejar los diferentes casos de usuarios
    switch(userRole) {
      case 'super_admin':
        // super admin: puede ver todo - usuarios, gastos totales, reportes
        return [
          {
            title: 'Usuarios',
            value: '45',
            description: 'Gestión completa',
            icon: faUsers,
            color: 'red',
            image: '/condominio_.jpeg'
          },
          {
            title: 'Gastos Comunes',
            value: '$ 2.500.000',
            description: 'Total mensual',
            icon: faWallet,
            color: 'green',
            image: '/dinero.jpg'
          },
          {
            title: 'Reportes',
            value: '12',
            description: 'Reportes generados',
            icon: faChartBar,
            color: 'purple',
            image: '/calendario.png'
          }
        ];
      
      case 'admin':
        // administrador: maneja unidades, gastos y multas del condominio
        return [
          {
            title: 'Unidades',
            value: '128',
            description: 'Total de unidades',
            icon: faBuilding,
            color: 'blue',
            image: '/condominio_.jpeg'
          },
          {
            title: 'Gastos Comunes',
            value: '$ 600.000',
            description: 'Recaudación del mes',
            icon: faWallet,
            color: 'green',
            image: '/dinero.jpg'
          },
          {
            title: 'Multas',
            value: '8',
            description: 'Multas pendientes',
            icon: faExclamationTriangle,
            color: 'red',
            image: '/calendario.png'
          }
        ];
      
      case 'conserje':
        // conserje: trabajo operativo - pagos diarios, reservas y mantenimiento
        return [
          {
            title: 'Pagos',
            value: '$ 450.000',
            description: 'Recibidos hoy',
            icon: faWallet,
            color: 'green',
            image: '/dinero.jpg'
          },
          {
            title: 'Reservas',
            value: '12',
            description: 'Reservas activas',
            icon: faCalendarCheck,
            color: 'purple',
            image: '/calendario.png'
          },
          {
            title: 'Mantenimiento',
            value: '3',
            description: 'Pendientes',
            icon: faHammer,
            color: 'blue',
            image: '/condominio_.jpeg'
          }
        ];
      
      case 'directiva':
        // directiva: supervisión - multas, reportes y documentos legales
        return [
          {
            title: 'Multas',
            value: '15',
            description: 'Total del mes',
            icon: faExclamationTriangle,
            color: 'red',
            image: '/calendario.png'
          },
          {
            title: 'Reportes',
            value: '7',
            description: 'Reportes disponibles',
            icon: faChartBar,
            color: 'purple',
            image: '/dinero.jpg'
          },
          {
            title: 'Documentos',
            value: '23',
            description: 'Documentos legales',
            icon: faFileAlt,
            color: 'blue',
            image: '/condominio_.jpeg'
          }
        ];
      
      case 'residente':
        // residente: solo ve su información personal - su unidad, sus gastos, sus reservas
        return [
          {
            title: 'Mi Unidad',
            value: 'Unidad 304',
            description: 'Estado: Al día',
            icon: faHome,
            color: 'green',
            image: '/condominio_.jpeg'
          },
          {
            title: 'Gastos',
            value: '$ 85.000',
            description: 'Gastos comunes',
            icon: faWallet,
            color: 'blue',
            image: '/dinero.jpg'
          },
          {
            title: 'Reservas',
            value: '2',
            description: 'Mis reservas',
            icon: faCalendarCheck,
            color: 'purple',
            image: '/calendario.png'
          }
        ];
      
      default:
        // si el rol no existe o hay error, mostrar acceso limitado
        return [
          {
            title: 'Acceso',
            value: 'Limitado',
            description: 'Contacte al admin',
            icon: faKey,
            color: 'gray',
            image: '/condominio_.jpeg'
          }
        ];
    }
  };

  // punto clave: aquí se ejecuta la función y se obtienen las tarjetas específicas del usuario
  // el "?" es para evitar errores si user es null (seguridad)
  const dashboardCards = getAccessByRole(user?.userRole);

  // función auxiliar: define los colores de las tarjetas según el tipo
  const getColorClasses = (color) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-100',
      green: 'text-green-600 bg-green-100',
      purple: 'text-purple-600 bg-purple-100'
    };
    return colors[color] || 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="p-6">
      {/* header del dashboard: título y saludo personalizado */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Bienvenido, {user?.userName || 'Usuario'}</p>
      </div>

      {/* grid de tarjetas: se adapta a diferentes tamaños de pantalla */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* mapeo de tarjetas: por cada tarjeta del rol, crear un elemento visual */}
        {dashboardCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
                {/* icono con colores: cada tarjeta tiene su propio color según el tipo */}
                <div className={`p-3 rounded-full ${getColorClasses(card.color)}`}>
                  <FontAwesomeIcon icon={card.icon} className="text-xl" />
                </div>
              </div>
              
              {/* imagen representativa: componente personalizado para mostrar imagen */}
              <div className="mb-4">
                <DashboardImage
                  src={card.image}
                  alt={card.title}
                  icon={card.icon}
                  title={card.title}
                />
              </div>
              
              {/* valor principal: el número o dato más importante */}
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {card.value}
              </div>
              
              {/* descripción: texto explicativo del dato mostrado */}
              <p className="text-gray-600 text-sm">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>

          {/* sección adicional: información complementaria del dashboard */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* actividad reciente: lista de acciones realizadas */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Actividad Reciente</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Pago recibido - Unidad 304</p>
                    <p className="text-xs text-gray-600">Hace 2 horas</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Nueva reserva - Salón de eventos</p>
                    <p className="text-xs text-gray-600">Hace 5 horas</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Multa generada - Unidad 102</p>
                    <p className="text-xs text-gray-600">Hace 1 día</p>
                  </div>
                </div>
              </div>
            </div>

            {/* estadísticas: gráficos y porcentajes del mes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Estadísticas del Mes</h3>
              <div className="space-y-4">
                {/* barra de progreso: porcentaje de pagos completados */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pagos completados</span>
                  <span className="font-semibold text-green-600">87%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '87%'}}></div>
                </div>
                
                {/* barra de progreso: porcentaje de ocupación */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ocupación</span>
                  <span className="font-semibold text-blue-600">94%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '94%'}}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Reservas utilizadas</span>
                  <span className="font-semibold text-purple-600">73%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{width: '73%'}}></div>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }

// exportación: hacer disponible el componente para usar en otras partes de la app
export default Dashboard;