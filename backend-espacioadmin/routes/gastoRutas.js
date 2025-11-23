import { Router } from 'express';
import {
  getGastos,
  getGasto,
  createGasto,
  updateGasto,
  deleteGasto
} from '../controllers/gastoControlador.js';
import { authRequired, tieneRol } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/gastos', authRequired, getGastos);
router.get('/gastos/:id', authRequired, getGasto);

// Solo Admin y Super Admin pueden tocar el dinero
router.post('/gastos', authRequired, tieneRol(['admin', 'super_admin']), createGasto);
router.put('/gastos/:id', authRequired, tieneRol(['admin', 'super_admin']), updateGasto);
router.delete('/gastos/:id', authRequired, tieneRol(['admin', 'super_admin']), deleteGasto);

export default router;