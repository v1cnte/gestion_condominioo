import axios from './axios.js' /* Instancia de axios preconfigurada */

/* Obtiene todas las consultas desde el servidor para consulta administrativa */
export const getConsultasRequest = () => axios.get('/consultas')

/* Envía una consulta al servidor para que sea procesada */
export const createConsultaRequest = (consulta) => axios.post('/consultas', consulta)