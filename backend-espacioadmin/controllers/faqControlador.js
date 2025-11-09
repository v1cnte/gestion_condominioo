import Faq from '../models/faqModel.js';

// Obtener todas las FAQs — público, devuelve preguntas y respuestas.
export const getFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.json(faqs)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener FAQs" });
  }
};

// Crear FAQ — endpoint pensado para admin: guarda pregunta y respuesta.
export const createFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newFaq = new Faq({
      question,
      answer
    });
    const savedFaq = await newFaq.save();
    res.json(savedFaq);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la FAQ" });
  }
};

// Eliminar FAQ — borra por id y devuelve el documento eliminado.
export const deleteFaq = async (req, res) => {
  try {
    const faq = await Faq.findByIdAndDelete(req.params.id);
    if (!faq) return res.status(404).json({ message: 'FAQ no encontrada' });
    res.json(faq);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la FAQ" });
  }
};