import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:4000/api', // URL base de la API
  withCredentials: true // enviar cookies (necesario si el servidor usa sesiones)
})

export default instance