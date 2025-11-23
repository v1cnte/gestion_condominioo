import axios from './axios.js' /* Instancia de axios preconfigurada con baseURL y opciones */

export const getReservasRequest = () => axios.get('/reservas')
export const getReservaRequest = (id) => axios.get(`/reservas/${id}`)
export const createReservaRequest = (reserva) => axios.post('/reservas', reserva)
export const updateReservaRequest = (id, reserva) => axios.put(`/reservas/${id}`, reserva)
export const deleteReservaRequest = (id) => axios.delete(`/reservas/${id}`)