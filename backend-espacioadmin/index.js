import app from './app.js'
import { connectDB } from './db.js' /* Importa la función de conexión a la base de datos */
import { iniciarMultasAutomaticas } from './utils/automatizacion.js';

const PORT = 4000

/* Se inicia el proceso automático de generación de multas por morosidad */
iniciarMultasAutomaticas();

/* Se establece la conexión con la base de datos MongoDB */
connectDB()

/* Se inicia el servidor Express en el puerto especificado */
app.listen(PORT)
console.log(`Servidor escuchando en el puerto ${PORT}`)