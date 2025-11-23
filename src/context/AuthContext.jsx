import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest } from '../api/auth.js';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errors, setErrors] = useState([]);

  /* Al cargar la aplicación se verifica si existe una sesión guardada en el almacenamiento local del navegador */
  useEffect(() => {
    const storedUser = localStorage.getItem('user_data');
    const storedToken = localStorage.getItem('token');
    
    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (e) {
        console.error("Error recuperando sesión", e);
        /* Si falla la recuperación de sesión se limpian los datos del almacenamiento local */
        localStorage.removeItem('token');
        localStorage.removeItem('user_data');
      }
    }
  }, []);

  const signin = async (userData) => {
    try {
      const res = await loginRequest(userData);
      
      /* Se actualiza el estado global con los datos del usuario autenticado */
      setUser(res.data); 
      setIsLoggedIn(true);
      
      /* Se persisten los datos de autenticación en el almacenamiento local para mantener la sesión activa */
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user_data', JSON.stringify(res.data));
      
      return res;
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
      throw error;
    }
  };

  const signout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setErrors([]);
    localStorage.removeItem('token');
    localStorage.removeItem('user_data');
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, errors, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};