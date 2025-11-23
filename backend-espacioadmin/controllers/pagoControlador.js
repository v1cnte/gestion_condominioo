import Pago from '../models/pagoModel.js';

/* Registra un nuevo pago con su archivo de comprobante de transferencia */
export const createPago = async (req, res) => {
  try {
    /* El objeto req.file contiene la información del archivo subido por Multer
       El objeto req.body contiene los datos de texto del formulario */
    const { unidad, residente, monto, metodo, fechaPago } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Debes subir un comprobante" });
    }

    /* Se construye la ruta relativa del archivo almacenado en el servidor */
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

/* Obtiene y retorna la lista completa de pagos registrados, ordenados por fecha descendente */
export const getPagos = async (req, res) => {
  try {
    const pagos = await Pago.find().sort({ createdAt: -1 });
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener pagos" });
  }
};

/* Actualiza el estado de un pago a Aprobado o Rechazado */
export const updateEstadoPago = async (req, res) => {
  try {
    const { estado } = req.body; /* El nuevo estado: Aprobado o Rechazado */
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