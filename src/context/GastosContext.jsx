import { createContext, useState, useContext } from "react";
import {
    createGastoRequest,
    getGastosRequest,
    deleteGastoRequest
} from '../api/gastos.js';

export const GastosContext = createContext();

// Hook: devuelve el contexto y obliga su uso dentro del Provider.
export const useGastos = () => {
    const context = useContext(GastosContext);
    if (!context) throw new Error("useGastos debe usarse dentro de GastosProvider");
    return context;
};

// Provider: mantiene la lista de gastos y expone operaciones contra la API.
export const GastosProvider = ({ children }) => {
    const [gastos, setGastos] = useState([]); // lista de gastos

    // getGastos: carga todos los gastos desde la API y guarda en estado
    const getGastos = async () => {
        try {
            const res = await getGastosRequest();
            setGastos(res.data); // asigna res.data
        } catch (error) {
            console.error(error);
        }
    };

    // createGasto: crea un gasto en la API y lo añade al estado
    const createGasto = async (gasto) => {
        try {
            const res = await createGastoRequest(gasto);
            setGastos(prev => [...prev, res.data]); // añadir gasto devuelto
        } catch (error) {
            console.error(error);
        }
    };

    // deleteGasto: borra un gasto en la API y actualiza el estado
    const deleteGasto = async (id) => {
        try {
            const res = await deleteGastoRequest(id);
            if (res.status === 200) setGastos(prev => prev.filter(g => g._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <GastosContext.Provider value={{ gastos, getGastos, createGasto, deleteGasto }}>
            {children}
        </GastosContext.Provider>
    );
};