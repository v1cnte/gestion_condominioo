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
    
    // Esta función "llama" al cocinero para CREAR una consulta
    const createConsulta = async (consulta) => {
        try {
            const res = await createConsultaRequest(consulta);
            console.log("Consulta enviada:", res.data);
            return res.data; // Devuelve éxito
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ConsultaContext.Provider value={{
            createConsulta
            // (Aquí puedes añadir getConsultas para el Admin)
        }}>
            {children}
        </ConsultaContext.Provider>
    );
};