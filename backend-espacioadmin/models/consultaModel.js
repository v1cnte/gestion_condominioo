import mongoose from "mongoose";

/* Esquema de datos para gestionar las consultas y solicitudes enviadas por los usuarios */
const consultaSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  /* Referencia al usuario que realizó la consulta (opcional) */
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  }
}, {
  timestamps: true
});

export default mongoose.model('Consulta', consultaSchema);