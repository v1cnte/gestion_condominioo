import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartPie, 
  faDollarSign, 
  faExclamationTriangle, 
  faCalendarCheck, 
  faUsersSlash,
  faPrint
} from '@fortawesome/free-solid-svg-icons';
import axios from '../api/axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Registrar componentes de gráficos
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Reportes() {
  const [resumen, setResumen] = useState({ 
    gastosMes: 0, 
    multasMes: 0, 
    reservasMes: 0,
    gastosPorTipo: [] 
  });
  const [morosos, setMorosos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [resResumen, resMorosos] = await Promise.all([
          axios.get('/reportes/resumen'),
          axios.get('/reportes/morosos')
        ]);
        setResumen(resResumen.data);
        setMorosos(resMorosos.data);
        setCargando(false);
      } catch (error) {
        console.error("Error:", error);
        setCargando(false);
      }
    };
    cargarDatos();
  }, []);

  // Función para imprimir reporte
  const handlePrint = () => {
    window.print();
  };

  // Configuración del Gráfico
  const dataGrafico = {
    labels: resumen.gastosPorTipo?.map(item => item._id) || [],
    datasets: [
      {
        label: 'Monto Gastado ($)',
        data: resumen.gastosPorTipo?.map(item => item.total) || [],
        backgroundColor: 'rgba(59, 130, 246, 0.6)', // Azul bonito
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const opcionesGrafico = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Desglose de Gastos por Tipo' },
    },
  };

  if (cargando) return <div className="p-6">Cargando datos...</div>;

  return (
    <div className="p-6">
      {/* Header con botón de imprimir */}
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Reportes Financieros</h1>
          <p className="text-gray-600">Estado actual del condominio - {new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</p>
        </div>
        <button 
          onClick={handlePrint}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 print:hidden"
        >
          <FontAwesomeIcon icon={faPrint} /> Imprimir Reporte
        </button>
      </div>

      {/* Tarjetas de Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 print:grid-cols-3">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 font-medium">Gastos Totales</p>
              <h3 className="text-2xl font-bold text-blue-600 mt-1">${resumen.gastosMes.toLocaleString()}</h3>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <FontAwesomeIcon icon={faDollarSign} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 font-medium">Multas del Mes</p>
              <h3 className="text-2xl font-bold text-red-600 mt-1">{resumen.multasMes}</h3>
            </div>
            <div className="p-2 bg-red-50 rounded-lg text-red-600">
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 font-medium">Reservas Activas</p>
              <h3 className="text-2xl font-bold text-green-600 mt-1">{resumen.reservasMes}</h3>
            </div>
            <div className="p-2 bg-green-50 rounded-lg text-green-600">
              <FontAwesomeIcon icon={faCalendarCheck} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Gráfico de Barras (NUEVO) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 lg:col-span-1">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faChartPie} className="text-blue-600" />
            Distribución de Gastos
          </h3>
          <div className="h-64 flex items-center justify-center">
            {resumen.gastosPorTipo?.length > 0 ? (
              <Bar data={dataGrafico} options={opcionesGrafico} />
            ) : (
              <p className="text-gray-400 text-sm">Sin gastos registrados este mes</p>
            )}
          </div>
        </div>

        {/* Tabla de Morosos (MEJORADA) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-2">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faUsersSlash} className="text-red-600" />
            Informe de Morosidad
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3">Unidad</th>
                  <th className="px-4 py-3">Deuda Total</th>
                  <th className="px-4 py-3">Boletas</th>
                  <th className="px-4 py-3">Estado</th>
                </tr>
              </thead>
              <tbody>
                {morosos.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-green-600 bg-green-50 rounded-b-lg">
                      <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                      ¡Excelente! No hay deuda pendiente.
                    </td>
                  </tr>
                ) : (
                  morosos.map((moroso) => (
                    <tr key={moroso._id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-bold text-gray-900">
                        {moroso._id || 'Sin Asignar'}
                      </td>
                      <td className="px-4 py-3 text-red-600 font-bold">
                        ${moroso.totalDeuda.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        {moroso.boletasPendientes} pendientes
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded border border-red-200">
                          Moroso
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reportes;