import { createContext, useState, useContext } from "react";
import { loginRequest } from '../api/auth.js'; // función que hace la petición de login

export const AuthContext = createContext();

// Hook helper: devuelve el contexto y fuerza su uso dentro del Provider.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // objeto usuario (o null si no hay)
  const [isLoggedIn, setIsLoggedIn] = useState(false); // booleano de sesión
  const [errors, setErrors] = useState([]); // array de mensajes de error

  // signin: intenta hacer login y actualiza estado.
  // devuelve la respuesta del servidor o lanza el error.
  const signin = async (userData) => {
    try {
      const res = await loginRequest(userData); // llamada HTTP
      setIsLoggedIn(true);
      // opcional: setUser(res.data.user) si el backend devuelve el usuario
      return res;
    } catch (error) {
      // guardar mensaje de error para mostrar en la UI
      setErrors(error?.response?.data?.message || [error.message]);
      throw error;
    }
  };

  // signout: limpia el estado de autenticación localmente.
  const signout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setErrors([]);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, errors, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};