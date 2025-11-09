import { Router } from 'express';
import {
  getMultas,
  getMulta,
  createMulta,
  updateMulta,
  deleteMulta
} from '../controllers/multasControlador.js';

const router = Router()

// Rutas de multas — listar, ver por id, crear, actualizar y eliminar
router.get('/multas', getMultas);
router.get('/multas/:id', getMulta);
router.post('/multas', createMulta);
router.put('/multas/:id', updateMulta);
router.delete('/multas/:id', deleteMulta);

export default router;