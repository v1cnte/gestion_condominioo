import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartBar,
  faDollarSign,
  faExclamationTriangle,
  faCalendarCheck
} from '@fortawesome/free-solid-svg-icons';

function Reportes() {
  // datos simples para mostrar en los reportes
  const datos = {
    gastosOctubre: 590000,
    multasOctubre: 15,
    reservasOctubre: 25,
    // comparación básica
    comparacion: [
      { mes: 'Octubre 2025', gastos: 590000, multas: 15, reservas: 25 },
      { mes: 'Septiembre 2025', gastos: 530000, multas: 12, reservas: 22 },
      { mes: 'Agosto 2025', gastos: 480000, multas: 18, reservas: 28 }
    ]
  };

  return (
    <div className="p-6">
      {/* título simple */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Reportes</h1>
        <p className="text-gray-600">Datos básicos del condominio</p>
      </div>

      {/* números importantes - esto es lo que más miran */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* gastos del mes */}
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-3">
            <FontAwesomeIcon icon={faDollarSign} className="text-blue-600" />
            <h3 className="font-semibold text-blue-800">Gastos Octubre</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600">
            ${datos.gastosOctubre.toLocaleString()}
          </p>
          <p className="text-sm text-blue-700 mt-2">Total del mes actual</p>
        </div>

        {/* multas */}
        <div className="bg-red-50 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-3">
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-600" />
            <h3 className="font-semibold text-red-800">Multas</h3>
          </div>
          <p className="text-3xl font-bold text-red-600">
            {datos.multasOctubre}
          </p>
          <p className="text-sm text-red-700 mt-2">Aplicadas este mes</p>
        </div>

        {/* reservas */}
        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-3">
            <FontAwesomeIcon icon={faCalendarCheck} className="text-green-600" />
            <h3 className="font-semibold text-green-800">Reservas</h3>
          </div>
          <p className="text-3xl font-bold text-green-600">
            {datos.reservasOctubre}
          </p>
          <p className="text-sm text-green-700 mt-2">Espacios reservados</p>
        </div>
      </div>

      {/* tabla de comparación - simple y al punto */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FontAwesomeIcon icon={faChartBar} className="text-blue-600" />
          Últimos 3 Meses
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2">
                <th className="text-left py-2 px-3">Mes</th>
                <th className="text-left py-2 px-3">Gastos</th>
                <th className="text-left py-2 px-3">Multas</th>
                <th className="text-left py-2 px-3">Reservas</th>
              </tr>
            </thead>
            <tbody>
              {datos.comparacion.map((fila, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3 font-medium">{fila.mes}</td>
                  <td className="py-2 px-3 text-blue-600">${fila.gastos.toLocaleString()}</td>
                  <td className="py-2 px-3 text-red-600">{fila.multas}</td>
                  <td className="py-2 px-3 text-green-600">{fila.reservas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Reportes;