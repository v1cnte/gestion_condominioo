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

/* Rutas de creación: los residentes pueden crear nuevas reservas de espacios comunes */
router.post('/reservas', authRequired, tieneRol(['residente', 'conserje', 'admin', 'super_admin']), createReserva);

/* Rutas de actualización y eliminación: solo los administradores pueden modificar o cancelar reservas */
router.put('/reservas/:id', authRequired, tieneRol(['conserje', 'admin', 'super_admin']), updateReserva);
router.delete('/reservas/:id', authRequired, tieneRol(['conserje', 'admin', 'super_admin']), deleteReserva);

export default router;