import Reserva from '../models/reservaModel.js';

// Obtener reservas — lista todas las reservas registradas.
export const getReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find();
    res.json(reservas)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reservas" });
  }
};

// Crear reserva — guarda una nueva reserva para un espacio.
export const createReserva = async (req, res) => {
  try {
    const { unidad, residente, espacio, fecha, horaInicio, horaFin, estado } = req.body;
    const newReserva = new Reserva({
      unidad,
      residente,
      espacio,
      fecha,
      horaInicio,
      horaFin,
      estado
    });
    const savedReserva = await newReserva.save();
    res.json(savedReserva);
  } catch (error) {
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