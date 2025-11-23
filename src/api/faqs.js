import axios from './axios.js' /* Instancia de axios preconfigurada */

/* Obtiene todas las preguntas frecuentes desde el servidor */
export const getFaqsRequest = () => axios.get('/faqs')

/* Crea una nueva pregunta frecuente en el servidor para administradores */
export const createFaqRequest = (faq) => axios.post('/faqs', faq)

/* Elimina una pregunta frecuente del servidor para administradores */
export const deleteFaqRequest = (id) => axios.delete(`/faqs/${id}`)