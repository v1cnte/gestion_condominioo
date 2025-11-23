import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext'; 
import { useFaqs } from '../context/FaqContext'; 
import { useConsultas } from '../context/ConsultaContext'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faQuestionCircle,
  faPhone,
  faEnvelope,
  faChevronDown,
  faChevronUp,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

function Ayuda({ isOpen, onClose }) {
  const [openFAQ, setOpenFAQ] = useState(null);
  
  const { user } = useAuth(); 
  const { faqs, getFaqs } = useFaqs(); 
  const { createConsulta } = useConsultas(); 

  const [formData, setFormData] = useState({
    email: user ? user.email : '', 
    note: ''
  });
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (isOpen) {
      getFaqs(); 
    }
  }, [isOpen]); 

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    
    await createConsulta(formData); 
    
    setShowMessage(true);
    setFormData({ ...formData, note: '' }); 
    setTimeout(() => setShowMessage(false), 5000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
        >
        {/* Header */}
        <div className="bg-blue-700 text-white p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faQuestionCircle} className="text-2xl" />
            <h2 className="text-2xl font-bold">Ayuda y Soporte</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors text-xl"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-6">
            {/* FAQ Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Preguntas Frecuentes</h3>
              
              <div className="space-y-3">
                {faqs.map((faq) => (
                  <div key={faq._id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(faq._id)}
                      className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                    >
                      <span className="font-medium text-gray-800">{faq.question}</span>
                      <FontAwesomeIcon 
                        icon={openFAQ === faq._id ? faChevronUp : faChevronDown} 
                        className="text-gray-500"
                      />
                    </button>
                    {openFAQ === faq._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 py-3 bg-white border-t border-gray-200">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
                
                {faqs.length === 0 && (
                    <p className="text-gray-500 text-center">No hay preguntas frecuentes disponibles.</p>
                )}
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">¿Necesitas Más Ayuda?</h3>
              
              <p className="text-gray-600 mb-6">
                Si no encuentras la respuesta aquí, contacta al administrador del condominio o al soporte técnico.
              </p> {/* <-- ¡AQUÍ ESTABA EL ERROR! Ya está corregido. */}
              
              {/* Contact Info (Esto sigue siendo 'quemado', pero está bien) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <FontAwesomeIcon icon={faPhone} className="text-blue-600" />
                    <h4 className="font-semibold text-gray-800">Teléfono</h4>
                  </div>
                  <p className="text-gray-600">+56 9 XXXX XXXX</p>
                  <p className="text-sm text-gray-500">Lunes a viernes, 9:00 AM - 5:00 PM</p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <FontAwesomeIcon icon={faEnvelope} className="text-blue-600" />
                    <h4 className="font-semibold text-gray-800">Email</h4>
                  </div>
                  <p className="text-gray-600">soporte@condominio.com</p>
                  <p className="text-sm text-gray-500">Respuesta en 24-48 horas</p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Enviar Consulta</h4>
                
                {showMessage && (
                  <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-md">
                    ¡Consulta enviada exitosamente! Te responderemos pronto.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Tu correo electrónico:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ejemplo@correo.com"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                      Tu consulta o nota:
                    </label>
                    <textarea
                      id="note"
                      name="note"
                      value={formData.note}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Escribe tu consulta aquí..."
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                  >
                    Enviar Consulta
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Ayuda;