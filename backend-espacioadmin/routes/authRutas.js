import { Router } from 'express'
/* Importa los controladores de autenticación y gestión de usuarios */
import { 
    registro, 
    login, 
    getUsuarios, 
    deleteUsuario, 
    updateUsuario 
} from '../controllers/authControlador.js'

const router = Router()

/* Rutas de autenticación para registro e inicio de sesión */
router.post('/registro', registro)
router.post('/login', login)

/* Rutas para la gestión administrativa de usuarios: listar, actualizar y eliminar */
router.get('/usuarios', getUsuarios);
router.delete('/usuarios/:id', deleteUsuario);
router.put('/usuarios/:id', updateUsuario);

export default router