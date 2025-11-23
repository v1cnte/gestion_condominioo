import Reserva from '../models/reservaModel.js';

/* Obtiene y retorna la lista completa de todas las reservas registradas en el sistema */
export const getReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find();
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reservas" });
  }
};

/* Crea una nueva reserva con validación automática de disponibilidad del espacio y horario */
export const createReserva = async (req, res) => {
  try {
    const { unidad, residente, espacio, fecha, horaInicio, horaFin } = req.body;

    /* Se verifica que no exista una reserva confirmada en el mismo espacio, fecha y horario
       Algoritmo de solapamiento: (InicioExistente < FinNuevo) Y (FinExistente > InicioNuevo) */
    /* Solo se validan conflictos con reservas confirmadas, ignorando las pendientes */
    const conflicto = await Reserva.findOne({
      espacio,
      fecha,
      estado: 'Confirmada',
      $and: [
        { horaInicio: { $lt: horaFin } },
        { horaFin: { $gt: horaInicio } }
      ]
    });

    if (conflicto) {
      return res.status(400).json({ message: ["El espacio ya está ocupado en ese horario"] });
    }

    /* Se procede a crear la reserva con el estado inicial de Pendiente */
    const newReserva = new Reserva({
      unidad,
      residente,
      espacio,
      fecha,
      horaInicio,
      horaFin,
      estado: 'Pendiente' /* Estado por defecto hasta confirmación o pago */
    });

    const savedReserva = await newReserva.save();
    res.json(savedReserva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la reserva" });
  }
};

/* Obtiene una reserva específica por su identificador único */
export const getReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id);
    if (!reserva) return res.status(404).json({ message: 'Reserva no encontrada' });
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la reserva" });
  }
};

/* Actualiza los datos de una reserva existente y retorna el registro modificado */
export const updateReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!reserva) return res.status(404).json({ message: 'Reserva no encontrada' });
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la reserva" });
  }
};

/* Elimina una reserva por su identificador y retorna el registro eliminado */
export const deleteReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndDelete(req.params.id);
    if (!reserva) return res.status(404).json({ message: 'Reserva no encontrada' });
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la reserva" });
  }
};