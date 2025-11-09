import Multa from '../models/multaModel.js';

// Obtener multas — trae todas las multas registradas.
export const getMultas = async (req, res) => {
  try {
    const multas = await Multa.find();
    res.json(multas)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener multas" });
  }
};

// Crear multa — guarda una nueva multa con unidad, motivo y monto.
export const createMulta = async (req, res) => {
  try {
    const { unidad, residente, motivo, monto, estado, fecha } = req.body;
    const newMulta = new Multa({
      unidad,
      residente,
      motivo,
      monto,
      estado,
      fecha
    });
    const savedMulta = await newMulta.save();
    res.json(savedMulta);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la multa" });
  }
};

// Obtener multa — devuelve una multa por su id (404 si no existe).
export const getMulta = async (req, res) => {
  try {
    const multa = await Multa.findById(req.params.id);
    if (!multa) return res.status(404).json({ message: 'Multa no encontrada' });
    res.json(multa);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la multa" });
  }
};

// Actualizar multa — aplica cambios y devuelve el registro actualizado.
export const updateMulta = async (req, res) => {
  try {
    const multa = await Multa.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!multa) return res.status(404).json({ message: 'Multa no encontrada' });
    res.json(multa);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la multa" });
  }
};

// Eliminar multa — borra por id y devuelve el objeto eliminado.
export const deleteMulta = async (req, res) => {
  try {
    const multa = await Multa.findByIdAndDelete(req.params.id);
    if (!multa) return res.status(404).json({ message: 'Multa no encontrada' });
    res.json(multa);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la multa" });
  }
};