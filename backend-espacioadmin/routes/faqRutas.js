import { Router } from 'express';
import { getFaqs, createFaq, deleteFaq } from '../controllers/faqControlador.js';

const router = Router()

// Rutas de FAQs: listar, crear y eliminar (admin)
router.get('/faqs', getFaqs);
router.post('/faqs', createFaq);
router.delete('/faqs/:id', deleteFaq);

export default router;