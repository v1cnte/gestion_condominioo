import { Router } from 'express';
import {
  getMultas,
  getMulta,
  createMulta,
  updateMulta,
  deleteMulta
} from '../controllers/multasControlador.js';
// IMPORTANTE: Traemos al "portero"
import { authRequired, tieneRol } from '../middlewares/authMiddleware.js';

const router = Router();

// Rutas Públicas (Solo Lectura para quien tenga Token)
// "authRequired" asegura que al menos haya iniciado sesión
router.get('/multas', authRequired, getMultas);
router.get('/multas/:id', authRequired, getMulta);

// Rutas Protegidas (Solo Admin y Directiva)
// "tieneRol" asegura que sea del equipo autorizado
router.post('/multas', authRequired, tieneRol(['admin', 'directiva', 'super_admin']), createMulta);
router.put('/multas/:id', authRequired, tieneRol(['admin', 'directiva', 'super_admin']), updateMulta);
router.delete('/multas/:id', authRequired, tieneRol(['admin', 'super_admin']), deleteMulta);

export default router;