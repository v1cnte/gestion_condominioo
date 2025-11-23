import { createContext, useState, useContext } from "react";
import {
    createGastoRequest,
    getGastosRequest,
    deleteGastoRequest,
    updateGastoRequest // <--- Importamos esto (asegúrate de que exista en api/gastos.js)
} from '../api/gastos.js';

export const GastosContext = createContext();

export const useGastos = () => {
    const context = useContext(GastosContext);
    if (!context) throw new Error("useGastos debe usarse dentro de GastosProvider");
    return context;
};

export const GastosProvider = ({ children }) => {
    const [gastos, setGastos] = useState([]);

    const getGastos = async () => {
        try {
            const res = await getGastosRequest();
            setGastos(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createGasto = async (gasto) => {
        try {
            const res = await createGastoRequest(gasto);
            setGastos(prev => [...prev, res.data]);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteGasto = async (id) => {
        try {
            const res = await deleteGastoRequest(id);
            if (res.status === 200) setGastos(prev => prev.filter(g => g._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    // --- NUEVA FUNCIÓN: Actualizar Gasto ---
    const updateGasto = async (id, gastoActualizado) => {
        try {
            const res = await updateGastoRequest(id, gastoActualizado);
            if (res.status === 200) {
                setGastos(prev => prev.map(g => (g._id === id ? res.data : g)));
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <GastosContext.Provider value={{ 
            gastos, 
            getGastos, 
            createGasto, 
            deleteGasto, 
            updateGasto // <--- Exportamos la función
        }}>
            {children}
        </GastosContext.Provider>
    );
};