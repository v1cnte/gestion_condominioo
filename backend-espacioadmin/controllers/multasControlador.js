import Multa from '../models/multaModel.js';

/* Obtiene y retorna la lista completa de todas las multas registradas en el sistema */
export const getMultas = async (req, res) => {
  try {
    const multas = await Multa.find();
    res.json(multas)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener multas" });
  }
};

/* Registra una nueva multa con los datos del residente, motivo, monto y estado */
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

/* Obtiene una multa específica por su identificador único */
export const getMulta = async (req, res) => {
  try {
    const multa = await Multa.findById(req.params.id);
    if (!multa) return res.status(404).json({ message: 'Multa no encontrada' });
    res.json(multa);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la multa" });
  }
};

/* Actualiza los datos de una multa existente y retorna el registro modificado */
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

/* Elimina una multa por su identificador y retorna el registro eliminado */
export const deleteMulta = async (req, res) => {
  try {
    const multa = await Multa.findByIdAndDelete(req.params.id);
    if (!multa) return res.status(404).json({ message: 'Multa no encontrada' });
    res.json(multa);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la multa" });
  }
};