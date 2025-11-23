import { createContext, useState, useContext } from "react";
import {
    getUsuariosRequest,
    deleteUsuarioRequest,
    updateUsuarioRequest,
    registroRequest /* Se importa la función de registro para crear usuarios desde el admin */
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

    /* Función que permite crear un nuevo usuario desde el panel de administración */
    const createUsuario = async (usuario) => {
        try {
            /* Se utiliza el endpoint de registro para crear el usuario */
            const res = await registroRequest(usuario);
            /* Se agrega el nuevo usuario a la lista local si la operación es exitosa */
            /* El servidor retorna el objeto con id, nombre, email y otros campos */
            /* Se estructura el objeto para que coincida con el modelo de datos local */
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