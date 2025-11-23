import { Router } from 'express';
import {
  getMultas,
  getMulta,
  createMulta,
  updateMulta,
  deleteMulta
} from '../controllers/multasControlador.js';
/* Importa los middlewares de autenticación y autorización requeridos para proteger las rutas */
import { authRequired, tieneRol } from '../middlewares/authMiddleware.js';

const router = Router();

/* Rutas de lectura públicas que requieren autenticación válida */
/* El middleware authRequired verifica que el usuario posea un token JWT válido */
router.get('/multas', authRequired, getMultas);
router.get('/multas/:id', authRequired, getMulta);

/* Rutas protegidas restringidas a usuarios con roles de administración */
/* El middleware tieneRol verifica que el usuario posea los permisos necesarios para realizar la operación */
router.post('/multas', authRequired, tieneRol(['admin', 'directiva', 'super_admin']), createMulta);
router.put('/multas/:id', authRequired, tieneRol(['admin', 'directiva', 'super_admin']), updateMulta);
router.delete('/multas/:id', authRequired, tieneRol(['admin', 'super_admin']), deleteMulta);

export default router;