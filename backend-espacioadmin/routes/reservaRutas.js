import { Router } from 'express';
import {
  getReservas,
  getReserva,
  createReserva,
  updateReserva,
  deleteReserva
} from '../controllers/reservaControlador.js';

const router = Router()

// Rutas de reservas — CRUD: listar, ver, crear, actualizar, eliminar
router.get('/reservas', getReservas);
router.get('/reservas/:id', getReserva);
router.post('/reservas', createReserva);
router.put('/reservas/:id', updateReserva);
router.delete('/reservas/:id', deleteReserva);

export default router;