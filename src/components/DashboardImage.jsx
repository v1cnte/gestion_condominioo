import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DashboardImage = ({ src, alt, icon, title }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  // Función para determinar el color de fondo basado en el título
  const getBackgroundGradient = (title) => {
    if (title.toLowerCase().includes('dinero') || title.toLowerCase().includes('gasto')) {
      return 'from-green-50 to-green-100 border-green-200';
    }
    if (title.toLowerCase().includes('calendario') || title.toLowerCase().includes('reserva')) {
      return 'from-yellow-50 to-yellow-100 border-yellow-200';
    }
    if (title.toLowerCase().includes('condominio') || title.toLowerCase().includes('edificio')) {
      return 'from-purple-50 to-purple-100 border-purple-200';
    }
    return 'from-blue-50 to-blue-100 border-blue-200';
  };

  const getIconColor = (title) => {
    if (title.toLowerCase().includes('dinero') || title.toLowerCase().includes('gasto')) {
      return 'text-green-600';
    }
    if (title.toLowerCase().includes('calendario') || title.toLowerCase().includes('reserva')) {
      return 'text-yellow-600';
    }
    if (title.toLowerCase().includes('condominio') || title.toLowerCase().includes('edificio')) {
      return 'text-purple-600';
    }
    return 'text-blue-600';
  };

  const getTextColor = (title) => {
    if (title.toLowerCase().includes('dinero') || title.toLowerCase().includes('gasto')) {
      return 'text-green-700';
    }
    if (title.toLowerCase().includes('calendario') || title.toLowerCase().includes('reserva')) {
      return 'text-yellow-700';
    }
    if (title.toLowerCase().includes('condominio') || title.toLowerCase().includes('edificio')) {
      return 'text-purple-700';
    }
    return 'text-blue-700';
  };

  if (imageError || !src) {
    return (
      <div className={`w-full h-32 flex items-center justify-center bg-gradient-to-br ${getBackgroundGradient(title)} rounded-lg border`}>
        <div className="text-center">
          <FontAwesomeIcon icon={icon} className={`${getIconColor(title)} text-3xl mb-2`} />
          <p className={`${getTextColor(title)} text-xs font-medium`}>{title}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-32 overflow-hidden rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="w-full h-full flex items-center justify-center p-3">
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-full object-contain transition-transform duration-200 hover:scale-105"
          onError={handleImageError}
          style={{ 
            objectFit: 'contain',
            objectPosition: 'center'
          }}
        />
      </div>
    </div>
  );
};

export default DashboardImage;