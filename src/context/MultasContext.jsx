import { createContext, useState, useContext } from "react";

import { 
    createMultaRequest,
    getMultasRequest,
    deleteMultaRequest,
    getMultaRequest,
    updateMultaRequest
} from '../api/multas.js';

export const MultasContext = createContext();

// Hook para usar el cerebro
export const useMultas = () => {
    const context = useContext(MultasContext);
    if (!context) {
        throw new Error("useMultas debe estar dentro de un MultasProvider");
    }
    return context;
};

// El Cerebro
export const MultasProvider = ({ children }) => {
    const [multas, setMultas] = useState([]); // ¡Aquí vivirá la lista de multas!

    // Función para "llamar" y PEDIR TODAS las multas
    const getMultas = async () => {
        try {
            const res = await getMultasRequest();
            setMultas(res.data); // Guarda las multas de la BD en el estado
        } catch (error) {
            console.error(error);
        }
    };

    // Función para "llamar" y CREAR una multa
    const createMulta = async (multa) => {
        try {
            const res = await createMultaRequest(multa);
            // Agregamos la nueva multa (que nos devuelve la BD) a la lista
            setMultas([...multas, res.data]);
        } catch (error) {
            console.error(error);
        }
    };

    // Función para "llamar" y BORRAR una multa
    const deleteMulta = async (id) => {
        try {
            const res = await deleteMultaRequest(id);
            if (res.status === 200) {
                // Filtramos la multa eliminada del estado
                setMultas(multas.filter(multa => multa._id !== id));
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
            deleteMulta
            // Aquí puedes agregar getMulta y updateMulta si los necesitas
        }}>
            {children}
        </MultasContext.Provider>
    );
};