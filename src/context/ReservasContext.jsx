import { createContext, useState, useContext } from "react";
import {
    createReservaRequest,
    getReservasRequest,
    deleteReservaRequest
} from '../api/reservas.js';

export const ReservasContext = createContext();

// Hook: devuelve el contexto y obliga su uso dentro del Provider.
export const useReservas = () => {
    const context = useContext(ReservasContext);
    if (!context) throw new Error("useReservas debe usarse dentro de ReservasProvider");
    return context;
};

// Provider: mantiene la lista de reservas y expone operaciones contra la API.
export const ReservasProvider = ({ children }) => {
    const [reservas, setReservas] = useState([]); // lista de reservas

    // getReservas: carga todas las reservas desde la API
    const getReservas = async () => {
        try {
            const res = await getReservasRequest();
            setReservas(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    // createReserva: crea una reserva y la añade al estado
    const createReserva = async (reserva) => {
        try {
            const res = await createReservaRequest(reserva);
            setReservas(prev => [...prev, res.data]);
        } catch (error) {
            console.error(error);
        }
    };

    // deleteReserva: borra reserva en la API y actualiza estado
    const deleteReserva = async (id) => {
        try {
            const res = await deleteReservaRequest(id);
            if (res.status === 200) setReservas(prev => prev.filter(r => r._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ReservasContext.Provider value={{ reservas, getReservas, createReserva, deleteReserva }}>
            {children}
        </ReservasContext.Provider>
    );
};