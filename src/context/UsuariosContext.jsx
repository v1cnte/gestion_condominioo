import { createContext, useState, useContext } from "react";
import {
    getUsuariosRequest,
    deleteUsuarioRequest,
    updateUsuarioRequest,
    registroRequest // <--- Importamos el registro (usaremos el mismo endpoint)
} from '../api/auth.js';

export const UsuariosContext = createContext();

export const useUsuarios = () => {
    const context = useContext(UsuariosContext);
    if (!context) throw new Error("useUsuarios debe usarse dentro de UsuariosProvider");
    return context;
};

export const UsuariosProvider = ({ children }) => {
    const [usuarios, setUsuarios] = useState([]);

    const getUsuarios = async () => {
        try {
            const res = await getUsuariosRequest();
            setUsuarios(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteUsuario = async (id) => {
        try {
            const res = await deleteUsuarioRequest(id);
            if (res.status === 200) setUsuarios(prev => prev.filter(u => u._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const updateUsuario = async (id, usuario) => {
        try {
            const res = await updateUsuarioRequest(id, usuario);
            if (res.status === 200) setUsuarios(prev => prev.map(u => (u._id === id ? res.data : u)));
        } catch (error) {
            console.error(error);
        }
    };

    // --- NUEVA FUNCIÓN: Crear Usuario desde el Admin ---
    const createUsuario = async (usuario) => {
        try {
            // Usamos el mismo endpoint de registro
            const res = await registroRequest(usuario);
            // Si tiene éxito, lo agregamos a la lista local (res.data devuelve el usuario creado)
            // Nota: El endpoint de registro devuelve { id, nombre, email, token... }
            // Adaptamos el objeto para que coincida con la lista
            const nuevoUsuario = { ...usuario, _id: res.data.id, createdAt: new Date() }; 
            setUsuarios(prev => [...prev, nuevoUsuario]);
            return { success: true };
        } catch (error) {
            console.error(error);
            return { success: false, error: error.response?.data?.message || "Error al crear" };
        }
    };

    return (
        <UsuariosContext.Provider value={{ usuarios, getUsuarios, deleteUsuario, updateUsuario, createUsuario }}>
            {children}
        </UsuariosContext.Provider>
    );
};