import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faHistory, faCheckCircle, faTimesCircle, faFileImage } from '@fortawesome/free-solid-svg-icons';

function Pagos() {
  const [pagos, setPagos] = useState([]);
  const [nuevoPago, setNuevoPago] = useState({
    unidad: '',
    residente: '',
    monto: '',
    metodo: 'Transferencia',
    fechaPago: new Date().toISOString().split('T')[0]
  });
  const [archivo, setArchivo] = useState(null);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    cargarPagos();
  }, []);

  const cargarPagos = async () => {
    try {
      const res = await axios.get('/pagos');
      setPagos(res.data);
    } catch (error) {
      console.error("Error cargando pagos", error);
    }
  };

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!archivo) {
      alert("Por favor adjunta el comprobante");
      return;
    }

    // Para subir archivos, usamos FormData en lugar de JSON
    const formData = new FormData();
    formData.append('unidad', nuevoPago.unidad);
    formData.append('residente', nuevoPago.residente);
    formData.append('monto', nuevoPago.monto);
    formData.append('metodo', nuevoPago.metodo);
    formData.append('fechaPago', nuevoPago.fechaPago);
    formData.append('comprobante', archivo); // El nombre 'comprobante' debe coincidir con el backend

    try {
      await axios.post('/pagos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMensaje('Pago registrado correctamente');
      setNuevoPago({ ...nuevoPago, monto: '' });
      setArchivo(null);
      // Limpiar input file visualmente es un poco más complejo en React sin useRef, pero esto resetea el estado
      cargarPagos();
      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      console.error(error);
      setMensaje('Error al subir el pago');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Pagos y Comprobantes</h1>
        <p className="text-gray-600">Sube tu comprobante de transferencia aquí</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulario de Subida */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faUpload} className="text-blue-600" />
            Registrar Pago
          </h2>

          {mensaje && (
            <div className={`p-3 rounded mb-4 text-sm ${mensaje.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {mensaje}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unidad</label>
                <input type="text" value={nuevoPago.unidad} onChange={e => setNuevoPago({...nuevoPago, unidad: e.target.value})} className="w-full px-3 py-2 border rounded focus:ring-blue-500" placeholder="Ej: 304" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monto</label>
                <input type="number" value={nuevoPago.monto} onChange={e => setNuevoPago({...nuevoPago, monto: e.target.value})} className="w-full px-3 py-2 border rounded focus:ring-blue-500" placeholder="50000" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Residente</label>
              <input type="text" value={nuevoPago.residente} onChange={e => setNuevoPago({...nuevoPago, residente: e.target.value})} className="w-full px-3 py-2 border rounded focus:ring-blue-500" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Comprobante (Imagen/PDF)</label>
              <input type="file" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" accept="image/*,.pdf" required />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
              Enviar Comprobante
            </button>
          </form>
        </div>

        {/* Historial */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faHistory} className="text-gray-600" />
            Historial de Pagos
          </h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {pagos.length === 0 ? <p className="text-gray-500 text-center">No hay pagos registrados.</p> : 
              pagos.map(pago => (
                <div key={pago._id} className="border border-gray-100 rounded-lg p-4 flex justify-between items-center hover:bg-gray-50">
                  <div>
                    <p className="font-bold text-gray-800">Unidad {pago.unidad} - ${pago.monto.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{new Date(pago.fechaPago).toLocaleDateString()} - {pago.residente}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${pago.estado === 'Aprobado' ? 'bg-green-100 text-green-800' : pago.estado === 'Rechazado' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {pago.estado}
                    </span>
                  </div>
                  <a 
                    href={`http://localhost:4000${pago.comprobanteUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                  >
                    <FontAwesomeIcon icon={faFileImage} /> Ver
                  </a>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pagos;