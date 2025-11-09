import mongoose from 'mongoose'

// Conexión a MongoDB 
const MONGODB_URI = "mongodb://localhost:27017/GestionCondominio"

export const connectDB = async () => {
    try {
    await mongoose.connect(MONGODB_URI)
    // Listo: la BD está conectada
    console.log(">> BD conectada exitosamente")
    } catch(error) {
    console.log("Error al conectar a la BD:", error)
    }
}