import axios from './axios.js' // instancia axios con baseURL y opciones

export const getMultasRequest = () => axios.get('/multas')
export const getMultaRequest = (id) => axios.get(`/multas/${id}`)
export const createMultaRequest = (multa) => axios.post('/multas', multa)
export const updateMultaRequest = (id, multa) => axios.put(`/multas/${id}`, multa)
export const deleteMultaRequest = (id) => axios.delete(`/multas/${id}`)