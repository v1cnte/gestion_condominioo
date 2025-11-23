import mongoose from "mongoose";

const gastoSchema = new mongoose.Schema({
  unidad: { /* Campo esencial para identificar la unidad asociada al gasto */
    type: String,
    required: true, 
  },
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