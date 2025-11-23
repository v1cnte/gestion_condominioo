import axios from './axios.js' /* Instancia de axios preconfigurada con baseURL y opciones */

export const getGastosRequest = () => axios.get('/gastos')
export const getGastoRequest = (id) => axios.get(`/gastos/${id}`)
export const createGastoRequest = (gasto) => axios.post('/gastos', gasto)
export const updateGastoRequest = (id, gasto) => axios.put(`/gastos/${id}`, gasto)
export const deleteGastoRequest = (id) => axios.delete(`/gastos/${id}`)