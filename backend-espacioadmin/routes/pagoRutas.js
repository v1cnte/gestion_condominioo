import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { createPago, getPagos, updateEstadoPago } from '../controllers/pagoControlador.js';
import { authRequired } from '../middlewares/authMiddleware.js';

const router = Router();

// --- Configuración de Multer (Subida de archivos) ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // CORREGIDO: Solo subimos un nivel (../) para llegar a la raíz del backend
    cb(null, path.join(__dirname, '../uploads')); 
  },
  filename: function (req, file, cb) {
    // Nombre único: tiempo-nombreoriginal
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// --- Rutas ---
router.post('/pagos', authRequired, upload.single('comprobante'), createPago);
router.get('/pagos', authRequired, getPagos);
router.put('/pagos/:id/estado', authRequired, updateEstadoPago);

export default router;