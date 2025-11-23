import mongoose from "mongoose";

/* Esquema de datos para gestionar las preguntas frecuentes y sus respuestas */
const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

export default mongoose.model('Faq', faqSchema);