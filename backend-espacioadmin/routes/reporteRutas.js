import { Router } from 'express';
import { getResumen, getMorosos } from '../controllers/reporteControlador.js'; 

const router = Router();

router.get('/reportes/resumen', getResumen);
router.get('/reportes/morosos', getMorosos); // Ahora sí funcionará

export default router;