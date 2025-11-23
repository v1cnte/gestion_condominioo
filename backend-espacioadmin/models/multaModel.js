import mongoose from "mongoose";

/* Esquema de datos para gestionar el registro de multas y sanciones de los residentes */
const multaSchema = new mongoose.Schema({
    unidad: {
    type: String,
    required: true,
    },
    residente: {
    type: String,
    required: true,
    },
    motivo: {
    type: String,
    required: true,
    },
    monto: {
    type: Number,
    required: true,
    },
    estado: {
    type: String,
    required: true,
    enum: ['Pendiente', 'Pagada'], /* Define los estados posibles de una multa en la aplicación */
    default: 'Pendiente'
    },
    fecha: {
    type: Date,
    default: Date.now
    }
}, {
    timestamps: true
});

export default mongoose.model('Multa', multaSchema);