import { Router } from 'express';
import {
  getReservas,
  getReserva,
  createReserva,
  updateReserva,
  deleteReserva
} from '../controllers/reservaControlador.js';
import { authRequired, tieneRol } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/reservas', authRequired, getReservas);
router.get('/reservas/:id', authRequired, getReserva);

// Crear: Residentes sí pueden reservar
router.post('/reservas', authRequired, tieneRol(['residente', 'conserje', 'admin', 'super_admin']), createReserva);

// Editar/Borrar: Residentes NO pueden borrar (solo Conserje/Admin)
router.put('/reservas/:id', authRequired, tieneRol(['conserje', 'admin', 'super_admin']), updateReserva);
router.delete('/reservas/:id', authRequired, tieneRol(['conserje', 'admin', 'super_admin']), deleteReserva);

export default router;