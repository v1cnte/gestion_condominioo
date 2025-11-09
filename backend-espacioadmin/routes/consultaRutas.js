import { Router } from 'express';
import { createConsulta, getConsultas } from '../controllers/consultaControlador.js';

const router = Router()

// Rutas de consultas: crear una consulta y listar todas
router.post('/consultas', createConsulta);
router.get('/consultas', getConsultas);

export default router;