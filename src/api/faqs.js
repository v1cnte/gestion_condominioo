import axios from './axios.js' // Importa el "teléfono"

// "Llamada" para OBTENER todas las FAQs
export const getFaqsRequest = () => axios.get('/faqs')

// (Opcional) "Llamada" para CREAR una FAQ (para el Admin)
export const createFaqRequest = (faq) => axios.post('/faqs', faq)

// (Opcional) "Llamada" para BORRAR una FAQ (para el Admin)
export const deleteFaqRequest = (id) => axios.delete(`/faqs/${id}`)