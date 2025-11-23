import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path'; 
import { fileURLToPath } from 'url';

// Importamos la función de configuración inicial (Semilla)
import { createRolesAndAdmin } from './libs/initialSetup.js';

// Importación de rutas
import authRutas from './routes/authRutas.js';
import multasRutas from './routes/multasRutas.js';
import gastoRutas from './routes/gastoRutas.js';
import reservaRutas from './routes/reservaRutas.js';
import faqRutas from './routes/faqRutas.js';           
import consultaRutas from './routes/consultaRutas.js'; 
import pagoRutas from './routes/pagoRutas.js'; 
import reporteRutas from './routes/reporteRutas.js'; 

const app = express();

// Configuración para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ejecutar la creación de roles y admin por defecto al iniciar
createRolesAndAdmin();

// Configuración de middlewares
app.use(cors({
  origin: 'http://localhost:5173', // URL del frontend
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json()); 

// Configurar carpeta uploads como pública (para ver las fotos de los comprobantes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Registro de rutas de la API
app.use('/api', authRutas);
app.use('/api', multasRutas);
app.use('/api', gastoRutas);
app.use('/api', reservaRutas);
app.use('/api', faqRutas);           
app.use('/api', consultaRutas);
app.use('/api', pagoRutas);
app.use('/api', reporteRutas);

export default app;