import mongoose from "mongoose";

/* Esquema de datos para gestionar las reservas de espacios comunes del condominio */
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
    type: String, /* La hora se almacena en formato texto (HH:MM) para mayor flexibilidad */
    required: true,
  },
  horaFin: {
    type: String, /* La hora se almacena en formato texto (HH:MM) para mayor flexibilidad */
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