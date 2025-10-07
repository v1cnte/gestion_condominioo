import { createContext, useContext, useState } from 'react';
import { 
  faExclamationTriangle,
  faInfoCircle,
  faCheckCircle,
  faCalendarAlt,
  faDollarSign,
  faTools,
  faUserPlus,
  faEdit
} from '@fortawesome/free-solid-svg-icons';

const NotificacionesContext = createContext();

export const useNotificaciones = () => {
  const context = useContext(NotificacionesContext);
  if (!context) {
    throw new Error('useNotificaciones debe usarse dentro de NotificacionesProvider');
  }
  return context;
};

export const NotificacionesProvider = ({ children }) => {
  const [notificaciones, setNotificaciones] = useState([
    {
      id: 1,
      tipo: 'urgente',
      titulo: 'Pago de Gastos Comunes Vencido',
      mensaje: 'La unidad 304 tiene gastos comunes pendientes desde hace 15 días.',
      fecha: '2025-10-04',
      hora: '14:30',
      leida: false,
      icono: faExclamationTriangle,
      color: 'text-red-500',
      prioridad: 'Alta'
    },
    {
      id: 2,
      tipo: 'reserva',
      titulo: 'Nueva Reserva Pendiente',
      mensaje: 'María González ha solicitado reservar el Quincho para el 12 de octubre.',
      fecha: '2025-10-04',
      hora: '12:15',
      leida: false,
      icono: faCalendarAlt,
      color: 'text-blue-500',
      prioridad: 'Media'
    },
    {
      id: 3,
      tipo: 'mantenimiento',
      titulo: 'Mantenimiento Programado',
      mensaje: 'El ascensor principal estará en mantenimiento mañana de 9:00 a 12:00.',
      fecha: '2025-10-04',
      hora: '10:00',
      leida: false,
      icono: faTools,
      color: 'text-orange-500',
      prioridad: 'Media'
    }
  ]);

  const agregarNotificacion = (notificacion) => {
    const nuevaNotificacion = {
      id: Date.now(),
      fecha: new Date().toISOString().split('T')[0],
      hora: new Date().toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      leida: false,
      prioridad: 'Media',
      ...notificacion
    };

    setNotificaciones(prev => [nuevaNotificacion, ...prev]);
    return nuevaNotificacion.id;
  };

  const marcarComoLeida = (id) => {
    setNotificaciones(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, leida: true } : notif
      )
    );
  };

  const marcarTodasComoLeidas = () => {
    setNotificaciones(prev => 
      prev.map(notif => ({ ...notif, leida: true }))
    );
  };

  const eliminarNotificacion = (id) => {
    setNotificaciones(prev => 
      prev.filter(notif => notif.id !== id)
    );
  };

  const notificacionesNoLeidas = notificaciones.filter(n => !n.leida).length;

  // Funciones helper para crear notificaciones específicas
  const notificarNuevoGasto = (descripcion, monto) => {
    return agregarNotificacion({
      tipo: 'pago',
      titulo: 'Nuevo Gasto Común Registrado',
      mensaje: `Se ha registrado un nuevo gasto: ${descripcion} por $${monto.toLocaleString()}`,
      icono: faDollarSign,
      color: 'text-green-500',
      prioridad: 'Baja'
    });
  };

  const notificarNuevaMulta = (unidad, motivo) => {
    return agregarNotificacion({
      tipo: 'multa',
      titulo: 'Nueva Multa Aplicada',
      mensaje: `Se ha aplicado una multa a la unidad ${unidad} por: ${motivo}`,
      icono: faExclamationTriangle,
      color: 'text-red-500',
      prioridad: 'Media'
    });
  };

  const notificarNuevaReserva = (residente, espacio, fecha) => {
    return agregarNotificacion({
      tipo: 'reserva',
      titulo: 'Nueva Reserva Solicitada',
      mensaje: `${residente} ha solicitado reservar ${espacio} para el ${fecha}`,
      icono: faCalendarAlt,
      color: 'text-blue-500',
      prioridad: 'Media'
    });
  };

  const notificarCambioEstado = (tipo, descripcion) => {
    return agregarNotificacion({
      tipo: 'info',
      titulo: 'Cambio de Estado',
      mensaje: descripcion,
      icono: faEdit,
      color: 'text-blue-500',
      prioridad: 'Baja'
    });
  };

  const value = {
    notificaciones,
    notificacionesNoLeidas,
    agregarNotificacion,
    marcarComoLeida,
    marcarTodasComoLeidas,
    eliminarNotificacion,
    setNotificaciones,
    // Helper functions
    notificarNuevoGasto,
    notificarNuevaMulta,
    notificarNuevaReserva,
    notificarCambioEstado
  };

  return (
    <NotificacionesContext.Provider value={value}>
      {children}
    </NotificacionesContext.Provider>
  );
};