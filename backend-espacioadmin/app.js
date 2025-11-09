import express from 'express'
import morgan from 'morgan' // logger de solicitudes http
import cors from 'cors'     // middleware para habilitar cors

// importación de rutas
import authRutas from './routes/authRutas.js'
import multasRutas from './routes/multasRutas.js'
import gastoRutas from './routes/gastoRutas.js'
import reservaRutas from './routes/reservaRutas.js'
import faqRutas from './routes/faqRutas.js'           
import consultaRutas from './routes/consultaRutas.js' 

const app = express()

// configuración de middlewares
app.use(cors({
  origin: 'http://localhost:5173', // url del frontend
  credentials: true
}))
app.use(morgan('dev'))
app.use(express.json()) // parser para solicitudes json

// registro de rutas de la api
// todas las rutas comenzarán con /api
app.use('/api', authRutas)
app.use('/api', multasRutas)
app.use('/api', gastoRutas)
app.use('/api', reservaRutas)
app.use('/api', faqRutas)           
app.use('/api', consultaRutas) 

export default app