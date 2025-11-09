import mongoose from "mongoose";

// Modelo Consulta — guarda email, nota y el usuario que la envió
const consultaSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  // Usuario que envió la consulta (opcional)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  }
}, {
  timestamps: true
});

export default mongoose.model('Consulta', consultaSchema);