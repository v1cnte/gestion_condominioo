import { createContext, useState, useContext } from "react";

import { 
    createMultaRequest,
    getMultasRequest,
    deleteMultaRequest,
    getMultaRequest,
    updateMultaRequest
} from '../api/multas.js';

export const MultasContext = createContext();

/* Hook personalizado que proporciona acceso al contexto de multas en cualquier componente */
export const useMultas = () => {
    const context = useContext(MultasContext);
    if (!context) {
        throw new Error("useMultas debe estar dentro de un MultasProvider");
    }
    return context;
};

/* Proveedor de contexto que gestiona el estado global de multas y proporciona funciones para manipular estos datos */
export const MultasProvider = ({ children }) => {
    const [multas, setMultas] = useState([]); /* Estado que almacena la lista de multas obtenidas de la base de datos */

    /* Función asincrónica que obtiene todas las multas desde el servidor y actualiza el estado */
    const getMultas = async () => {
        try {
            const res = await getMultasRequest();
            setMultas(res.data); /* Actualiza el estado con las multas obtenidas de la base de datos */
        } catch (error) {
            console.error(error);
        }
    };

    /* Función asincrónica que crea una nueva multa y la agrega al estado local */
    const createMulta = async (multa) => {
        try {
            const res = await createMultaRequest(multa);
            /* Agrega la nueva multa retornada por el servidor a la lista local de multas */
            setMultas([...multas, res.data]);
        } catch (error) {
            console.error(error);
        }
    };

    /* Función asincrónica que elimina una multa del servidor y actualiza el estado */
    const deleteMulta = async (id) => {
        try {
            const res = await deleteMultaRequest(id);
            if (res.status === 200) {
                /* Filtra la multa eliminada del estado local */
                setMultas(multas.filter(multa => multa._id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    };

    /* Función asincrónica que actualiza una multa existente en el servidor y en el estado */
    const updateMulta = async (id, multaActualizada) => {
        try {
            const res = await updateMultaRequest(id, multaActualizada);
            if (res.status === 200) {
                setMultas(prev => prev.map(m => (m._id === id ? res.data : m)));
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <MultasContext.Provider value={{
            multas,
            getMultas,
            createMulta,
            deleteMulta,
            updateMulta
        }}>
            {children}
        </MultasContext.Provider>
    );
};