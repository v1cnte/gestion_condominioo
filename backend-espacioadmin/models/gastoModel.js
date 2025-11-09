import mongoose from "mongoose";

// Modelo Gasto — concepto, monto, fecha, tipo y estado
const gastoSchema = new mongoose.Schema({
  concepto: {
    type: String,
    required: true,
  },
  monto: {
    type: Number,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  tipo: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    required: true,
    enum: ['Pendiente', 'Pagado'],
    default: 'Pendiente'
  }
}, {
  timestamps: true
});

export default mongoose.model('Gasto', gastoSchema);