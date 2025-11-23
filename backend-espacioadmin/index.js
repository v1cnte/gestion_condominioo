import app from './app.js'
import { connectDB } from './db.js' // Importamos la "llave"
import { iniciarMultasAutomaticas } from './utils/automatizacion.js';

const PORT = 4000

// Iniciar el proceso de multas automáticas
iniciarMultasAutomaticas();

// 1. Conectamos a la base de datos
connectDB()

// 2. Iniciamos el servidor
app.listen(PORT)
console.log(`Servidor escuchando en el puerto ${PORT}`)