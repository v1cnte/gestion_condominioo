import axios from './axios.js' /* Instancia de axios preconfigurada con los parámetros base */

export const registroRequest = (usuario) => axios.post(`/registro`, usuario)
export const loginRequest = (usuario) => axios.post(`/login`, usuario)

/* Funciones para operaciones CRUD de usuarios */
export const getUsuariosRequest = () => axios.get('/usuarios')
export const deleteUsuarioRequest = (id) => axios.delete(`/usuarios/${id}`)
export const updateUsuarioRequest = (id, usuario) => axios.put(`/usuarios/${id}`, usuario)