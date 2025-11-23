import { createContext, useState, useContext } from "react";
import {
    createReservaRequest,
    getReservasRequest,
    deleteReservaRequest,
    updateReservaRequest /* Se importa la función para actualizar reservas existentes */
} from '../api/reservas.js';

export const ReservasContext = createContext();

export const useReservas = () => {
    const context = useContext(ReservasContext);
    if (!context) throw new Error("useReservas debe usarse dentro de ReservasProvider");
    return context;
};

export const ReservasProvider = ({ children }) => {
    const [reservas, setReservas] = useState([]);

    const getReservas = async () => {
        try {
            const res = await getReservasRequest();
            setReservas(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createReserva = async (reserva) => {
        try {
            const res = await createReservaRequest(reserva);
            setReservas(prev => [...prev, res.data]);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteReserva = async (id) => {
        try {
            const res = await deleteReservaRequest(id);
            if (res.status === 200) setReservas(prev => prev.filter(r => r._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    /* Función que permite actualizar una reserva existente */
    const updateReserva = async (id, datosActualizados) => {
        try {
            const res = await updateReservaRequest(id, datosActualizados);
            /* Se actualiza el estado local para reflejar los cambios inmediatamente sin necesidad de recargar */
            setReservas(prev => prev.map(r => (r._id === id ? res.data : r)));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ReservasContext.Provider value={{ 
            reservas, 
            getReservas, 
            createReserva, 
            deleteReserva,
            updateReserva 
        }}>
            {children}
        </ReservasContext.Provider>
    );
};