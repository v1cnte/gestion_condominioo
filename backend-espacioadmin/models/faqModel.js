import mongoose from "mongoose";

// Modelo FAQ — pregunta y respuesta
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