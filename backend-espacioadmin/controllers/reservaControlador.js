import Reserva from '../models/reservaModel.js';

// Obtener reservas — lista todas las reservas registradas.
export const getReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find();
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reservas" });
  }
};

// Crear reserva — guarda una nueva reserva con validación de disponibilidad.
export const createReserva = async (req, res) => {
  try {
    const { unidad, residente, espacio, fecha, horaInicio, horaFin } = req.body;

    // 1. VALIDACIÓN: Verificar si ya existe reserva en ese horario
    // Buscamos reservas que coincidan en espacio, fecha y se solapen en hora.
    // Lógica de solapamiento: (InicioExistente < FinNuevo) Y (FinExistente > InicioNuevo)
    const conflicto = await Reserva.findOne({
      espacio,
      fecha,
      estado: 'Confirmada', // Solo nos importa chocar con las confirmadas
      $and: [
        { horaInicio: { $lt: horaFin } },
        { horaFin: { $gt: horaInicio } }
      ]
    });

    if (conflicto) {
      return res.status(400).json({ message: ["El espacio ya está ocupado en ese horario"] });
    }

    // 2. Si no hay conflicto, creamos la reserva
    const newReserva = new Reserva({
      unidad,
      residente,
      espacio,
      fecha,
      horaInicio,
      horaFin,
      estado: 'Pendiente' // Por defecto Confirmada, o 'Pendiente' si implementas pagos
    });

    const savedReserva = await newReserva.save();
    res.json(savedReserva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la reserva" });
  }
};

// Obtener reserva — busca por id y devuelve la reserva (404 si no existe).
export const getReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id);
    if (!reserva) return res.status(404).json({ message: 'Reserva no encontrada' });
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la reserva" });
  }
};

// Actualizar reserva — aplica los cambios y devuelve el registro actualizado.
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

// Eliminar reserva — borra por id y devuelve el objeto eliminado.
export const deleteReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndDelete(req.params.id);
    if (!reserva) return res.status(404).json({ message: 'Reserva no encontrada' });
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la reserva" });
  }
};