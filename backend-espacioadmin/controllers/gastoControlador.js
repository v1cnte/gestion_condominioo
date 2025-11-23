import Gasto from '../models/gastoModel.js';

// Obtener gastos — lista todos los gastos registrados.
export const getGastos = async (req, res) => {
  try {
    const gastos = await Gasto.find();
    res.json(gastos)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener gastos" });
  }
};

// Crear gasto — guarda un gasto nuevo con concepto, monto y fecha.
export const createGasto = async (req, res) => {
  try {
    const { unidad, concepto, monto, fecha, tipo, estado } = req.body;
    const newGasto = new Gasto({
      unidad,
      concepto,
      monto,
      fecha,
      tipo,
      estado
    });
    const savedGasto = await newGasto.save();
    res.json(savedGasto);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el gasto" });
  }
};

// Obtener un gasto — busca por id y lo devuelve (404 si no existe).
export const getGasto = async (req, res) => {
  try {
    const gasto = await Gasto.findById(req.params.id);
    if (!gasto) return res.status(404).json({ message: 'Gasto no encontrado' });
    res.json(gasto);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el gasto" });
  }
};

// Actualizar gasto — aplica los cambios y devuelve el documento actualizado.
export const updateGasto = async (req, res) => {
  try {
    const gasto = await Gasto.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!gasto) return res.status(404).json({ message: 'Gasto no encontrado' });
    res.json(gasto);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el gasto" });
  }
};

// Eliminar gasto — borra por id y devuelve el objeto eliminado.
export const deleteGasto = async (req, res) => {
  try {
    const gasto = await Gasto.findByIdAndDelete(req.params.id);
    if (!gasto) return res.status(404).json({ message: 'Gasto no encontrado' });
    res.json(gasto);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el gasto" });
  }
};