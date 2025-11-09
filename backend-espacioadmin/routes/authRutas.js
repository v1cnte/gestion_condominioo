import { Router } from 'express'
// Importamos controladores de auth
import { 
    registro, 
    login, 
    getUsuarios, 
    deleteUsuario, 
    updateUsuario 
} from '../controllers/authControlador.js'

const router = Router()

// Rutas de autenticación
router.post('/registro', registro)
router.post('/login', login)

// Rutas para administrar usuarios (lista, actualizar, eliminar)
router.get('/usuarios', getUsuarios);
router.delete('/usuarios/:id', deleteUsuario);
router.put('/usuarios/:id', updateUsuario);

export default router