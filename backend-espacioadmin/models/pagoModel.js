import mongoose from "mongoose";

const pagoSchema = new mongoose.Schema({
  unidad: {
    type: String,
    required: true,
  },
  residente: {
    type: String,
    required: true,
  },
  monto: {
    type: Number,
    required: true,
  },
  fechaPago: {
    type: Date,
    default: Date.now
  },
  metodo: {
    type: String,
    enum: ['Transferencia', 'Efectivo', 'Cheque', 'Otro'],
    default: 'Transferencia'
  },
  comprobanteUrl: {
    type: String, /* Almacena la ruta del archivo de comprobante de pago (imagen o documento PDF) */
    required: true
  },
  estado: {
    type: String,
    enum: ['Pendiente de Revisión', 'Aprobado', 'Rechazado'],
    default: 'Pendiente de Revisión'
  },
  observaciones: {
    type: String
  }
}, {
  timestamps: true
});

export default mongoose.model('Pago', pagoSchema);