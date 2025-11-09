import { Router } from 'express';
import {
  getGastos,
  getGasto,
  createGasto,
  updateGasto,
  deleteGasto
} from '../controllers/gastoControlador.js';

const router = Router()

// Rutas de gastos — CRUD: listar, ver, crear, actualizar, eliminar
router.get('/gastos', getGastos);
router.get('/gastos/:id', getGasto);
router.post('/gastos', createGasto);
router.put('/gastos/:id', updateGasto);
router.delete('/gastos/:id', deleteGasto);

export default router;