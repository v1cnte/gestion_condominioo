import mongoose from "mongoose";

// Modelo Reserva — unidad, residente, espacio, fecha, horario y estado
const reservaSchema = new mongoose.Schema({
  unidad: {
    type: String,
    required: true,
  },
  residente: {
    type: String,
    required: true,
  },
  espacio: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
  horaInicio: {
    type: String, // Guardamos horario como string: "18:00"
    required: true,
  },
  horaFin: {
    type: String, // Guardamos horario como string: "22:00"
    required: true,
  },
  estado: {
    type: String,
    required: true,
    enum: ['Pendiente', 'Confirmada'],
    default: 'Pendiente'
  }
}, {
  timestamps: true
});

export default mongoose.model('Reserva', reservaSchema);