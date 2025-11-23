import { Router } from 'express';
import { getFaqs, createFaq, deleteFaq } from '../controllers/faqControlador.js';

const router = Router()

/* Rutas para la gestión de preguntas frecuentes: listar, crear y eliminar */
router.get('/faqs', getFaqs);
router.post('/faqs', createFaq);
router.delete('/faqs/:id', deleteFaq);

export default router;