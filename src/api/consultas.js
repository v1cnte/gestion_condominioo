import axios from './axios.js' // Importa el "teléfono"

// "Llamada" para OBTENER todas las consultas (para el Admin)
export const getConsultasRequest = () => axios.get('/consultas')

// "Llamada" para CREAR una consulta (para el Usuario)
export const createConsultaRequest = (consulta) => axios.post('/consultas', consulta)