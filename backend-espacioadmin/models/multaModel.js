import mongoose from "mongoose";

// Modelo Multa — unidad, residente, motivo, monto, estado y fecha
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
    enum: ['Pendiente', 'Pagada'], // Estados usados en el front
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