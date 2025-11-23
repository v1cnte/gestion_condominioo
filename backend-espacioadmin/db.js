import mongoose from 'mongoose'

/* Cadena de conexión a la base de datos MongoDB local */
const MONGODB_URI = "mongodb://localhost:27017/GestionCondominio"

export const connectDB = async () => {
    try {
    await mongoose.connect(MONGODB_URI)
    /* Se confirma la conexión exitosa a la base de datos */
    console.log(">> BD conectada exitosamente")
    } catch(error) {
    console.log("Error al conectar a la BD:", error)
    }
}