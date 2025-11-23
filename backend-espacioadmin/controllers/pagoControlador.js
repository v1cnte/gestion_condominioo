import Pago from '../models/pagoModel.js';

// Registrar un nuevo pago con archivo
export const createPago = async (req, res) => {
  try {
    // req.file viene gracias a Multer (si se subió archivo)
    // req.body trae los datos de texto
    const { unidad, residente, monto, metodo, fechaPago } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Debes subir un comprobante" });
    }

    // La ruta del archivo relativa al servidor
    const comprobanteUrl = `/uploads/${req.file.filename}`;

    const nuevoPago = new Pago({
      unidad,
      residente,
      monto,
      metodo,
      fechaPago,
      comprobanteUrl
    });

    const pagoGuardado = await nuevoPago.save();
    res.json(pagoGuardado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar el pago" });
  }
};

// Listar todos los pagos (para Admin/Conserje)
export const getPagos = async (req, res) => {
  try {
    const pagos = await Pago.find().sort({ createdAt: -1 });
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener pagos" });
  }
};

// Cambiar estado del pago (Aprobar/Rechazar)
export const updateEstadoPago = async (req, res) => {
  try {
    const { estado } = req.body; // 'Aprobado' o 'Rechazado'
    const pagoActualizado = await Pago.findByIdAndUpdate(
      req.params.id, 
      { estado }, 
      { new: true }
    );
    res.json(pagoActualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar estado" });
  }
};