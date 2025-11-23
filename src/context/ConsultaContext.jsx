import { createContext, useState, useContext } from "react";
import { createConsultaRequest } from '../api/consultas.js';

export const ConsultaContext = createContext();

export const useConsultas = () => {
    const context = useContext(ConsultaContext);
    if (!context) {
        throw new Error("useConsultas debe estar dentro de un ConsultaProvider");
    }
    return context;
};

export const ConsultaProvider = ({ children }) => {
    
    /* Función asincrónica que envía una consulta al servidor */
    const createConsulta = async (consulta) => {
        try {
            const res = await createConsultaRequest(consulta);
            console.log("Consulta enviada:", res.data);
            return res.data; /* Retorna los datos de la consulta creada */
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ConsultaContext.Provider value={{
            createConsulta
            /* Funciones adicionales getConsultas pueden implementarse en futuro para administradores */
        }}>
            {children}
        </ConsultaContext.Provider>
    );
};