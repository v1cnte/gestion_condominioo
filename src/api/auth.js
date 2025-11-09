import axios from './axios.js' // instancia axios preconfigurada

export const registroRequest = (usuario) => axios.post(`/registro`, usuario)
export const loginRequest = (usuario) => axios.post(`/login`, usuario)

// CRUD usuarios
export const getUsuariosRequest = () => axios.get('/usuarios')
export const deleteUsuarioRequest = (id) => axios.delete(`/usuarios/${id}`)
export const updateUsuarioRequest = (id, usuario) => axios.put(`/usuarios/${id}`, usuario)