import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faWallet, 
  faExclamationCircle, 
  faCheckCircle, 
  faUsers,
  faArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import axios from '../api/axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

/* Se registran los componentes necesarios de Chart.js para la representación de gráficos */
ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard({ user }) {
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({
    gastosMes: 0,
    multasMes: 0,
    reservasMes: 0,
    morosidadTotal: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [resResumen, resMorosos] = await Promise.all([
          axios.get('/reportes/resumen'),
          axios.get('/reportes/morosos')
        ]);

        const totalDeuda = resMorosos.data.reduce((acc, curr) => acc + curr.totalDeuda, 0);

        setStats({
          ...resResumen.data,
          morosidadTotal: totalDeuda
        });
        setLoading(false);
      } catch (error) {
        console.error("Error cargando dashboard:", error);
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

  const dataGrafico = {
    labels: ['Recaudado (Est.)', 'Por Cobrar (Morosidad)'],
    datasets: [
      {
        data: [stats.gastosMes, stats.morosidadTotal],
        backgroundColor: ['#3B82F6', '#EF4444'],
        hoverBackgroundColor: ['#2563EB', '#DC2626'],
        borderWidth: 0,
      },
    ],
  };

  if (loading) return <div className="p-6">Cargando panel...</div>;

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Hola, {user?.nombre || 'Usuario'} </h1>
        <p className="text-gray-600">Aquí tienes el resumen de lo que pasa en tu condominio.</p>
      </div>

      {/* TARJETAS CON ESTADÍSTICAS PRINCIPALES DEL CONDOMINIO */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 font-medium">Gastos del Mes</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-2">${stats.gastosMes.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600"><FontAwesomeIcon icon={faWallet} /></div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <FontAwesomeIcon icon={faArrowUp} className="mr-1" /><span>Activos</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 font-medium">Deuda Total</p>
              <h3 className="text-2xl font-bold text-red-600 mt-2">${stats.morosidadTotal.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-red-50 rounded-lg text-red-600"><FontAwesomeIcon icon={faExclamationCircle} /></div>
          </div>
          <div className="mt-4 flex items-center text-sm text-red-600"><span>Acción requerida</span></div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 font-medium">Reservas Activas</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-2">{stats.reservasMes}</h3>
            </div>
            <div className="p-3 bg-green-50 rounded-lg text-green-600"><FontAwesomeIcon icon={faCheckCircle} /></div>
          </div>
          <div className="mt-4 text-sm text-gray-500">Espacios comunes</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 font-medium">Multas Cursadas</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-2">{stats.multasMes}</h3>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg text-yellow-600"><FontAwesomeIcon icon={faUsers} /></div>
          </div>
          <div className="mt-4 text-sm text-gray-500">Este mes</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Gráfico */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 col-span-2">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Datos financieros</h3>
          <div className="h-64 flex items-center justify-center">
            {stats.gastosMes === 0 && stats.morosidadTotal === 0 ? (
              <p className="text-gray-400">No hay datos financieros suficientes aún.</p>
            ) : (
              <Doughnut data={dataGrafico} options={{ maintainAspectRatio: false }} />
            )}
          </div>
        </div>

        {/* ACCESOS RÁPIDOS A FUNCIONALIDADES FRECUENTES */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Accesos Rápidos</h3>
          <div className="space-y-3">
            
            <button 
              onClick={() => navigate('/pagos')} 
              className="w-full py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-left flex items-center gap-3 transition-colors text-gray-700 cursor-pointer"
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Registrar Pago
            </button>

            <button 
              onClick={() => navigate('/reservas')}
              className="w-full py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-left flex items-center gap-3 transition-colors text-gray-700 cursor-pointer"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Nueva Reserva
            </button>

            
            <button 
              onClick={() => navigate('/gastos-comunes')}
              className="w-full py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-left flex items-center gap-3 transition-colors text-gray-700 cursor-pointer"
            >
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Ver Gastos Comunes
            </button>

          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h4 className="text-sm font-semibold text-gray-500 mb-3">ESTADO DEL SISTEMA</h4>
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              En línea y sincronizado
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;