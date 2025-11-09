import { createContext, useState, useContext } from "react";
import {
    getUsuariosRequest,
    deleteUsuarioRequest,
    updateUsuarioRequest
} from '../api/auth.js';

export const UsuariosContext = createContext();

// Hook: devuelve el contexto y obliga su uso dentro del Provider.
export const useUsuarios = () => {
    const context = useContext(UsuariosContext);
    if (!context) throw new Error("useUsuarios debe usarse dentro de UsuariosProvider");
    return context;
};

// Provider: mantiene lista de usuarios y expone funciones para la API.
export const UsuariosProvider = ({ children }) => {
    const [usuarios, setUsuarios] = useState([]); // lista de usuarios

    // getUsuarios: carga usuarios desde la API
    const getUsuarios = async () => {
        try {
            const res = await getUsuariosRequest();
            setUsuarios(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    // deleteUsuario: borra usuario en la API y actualiza estado
    const deleteUsuario = async (id) => {
        try {
            const res = await deleteUsuarioRequest(id);
            if (res.status === 200) setUsuarios(prev => prev.filter(u => u._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    // updateUsuario: actualiza usuario en la API y en el estado local
    const updateUsuario = async (id, usuario) => {
        try {
            const res = await updateUsuarioRequest(id, usuario);
            if (res.status === 200) setUsuarios(prev => prev.map(u => (u._id === id ? res.data : u)));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <UsuariosContext.Provider value={{ usuarios, getUsuarios, deleteUsuario, updateUsuario }}>
            {children}
        </UsuariosContext.Provider>
    );
};