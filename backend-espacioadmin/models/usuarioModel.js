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
    unique: true /* El correo electrónico debe ser único en el sistema */,
    },
    password: {
    type: String,
    required: true
    },
    rol: {
    type: String,
    required: true,
    /* Define los roles disponibles en el sistema */
    enum: ['super_admin', 'admin', 'conserje', 'directiva', 'residente'],
    default: 'residente'
  },
  unidad: {
    type: String
  }
}, {
  timestamps: true /* Genera automáticamente los campos createdAt y updatedAt */
})

export default mongoose.model('Usuario', usuarioSchema)