import { Router } from 'express';
import { createConsulta, getConsultas } from '../controllers/consultaControlador.js';

const router = Router()

/* Rutas para la gestión de consultas: crear nuevas consultas y listar todas las registradas */
router.post('/consultas', createConsulta);
router.get('/consultas', getConsultas);

export default router;