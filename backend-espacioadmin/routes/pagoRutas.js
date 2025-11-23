import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { createPago, getPagos, updateEstadoPago } from '../controllers/pagoControlador.js';
import { authRequired } from '../middlewares/authMiddleware.js';

const router = Router();

/* Configuración de Multer para la gestión de subida de archivos de comprobantes */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    /* Se sube un nivel desde el directorio de rutas para acceder al directorio uploads del backend */
    cb(null, path.join(__dirname, '../uploads')); 
  },
  filename: function (req, file, cb) {
    /* Se genera un nombre de archivo único combinando la marca de tiempo actual con el nombre original */
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

/* Definición de rutas para la gestión de pagos */
router.post('/pagos', authRequired, upload.single('comprobante'), createPago);
router.get('/pagos', authRequired, getPagos);
router.put('/pagos/:id/estado', authRequired, updateEstadoPago);

export default router;