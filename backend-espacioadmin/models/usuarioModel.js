import mongoose from 'mongoose'

const usuarioSchema = new mongoose.Schema({
    nombre: {
    type: String,
    required: true,
    trim: true
    },
    email: {
    type: String,
    required: true,
    unique: true, // No se pueden repetir emails
    },
    password: {
    type: String,
    required: true
    },
    rol: {
    type: String,
    required: true,
    // Los roles posibles
    enum: ['super_admin', 'admin', 'conserje', 'directiva', 'residente'],
    default: 'residente'
  },
  unidad: {
    type: String
  }
}, {
  timestamps: true // Añade createdAt y updatedAt automáticamente
})

export default mongoose.model('Usuario', usuarioSchema)