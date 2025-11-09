import { createContext, useState, useContext } from "react";
import { getFaqsRequest } from '../api/faqs.js';

export const FaqContext = createContext();

export const useFaqs = () => {
    const context = useContext(FaqContext);
    if (!context) {
        throw new Error("useFaqs debe estar dentro de un FaqProvider");
    }
    return context;
};

export const FaqProvider = ({ children }) => {
    const [faqs, setFaqs] = useState([]);

    const getFaqs = async () => {
        try {
            const res = await getFaqsRequest();
            setFaqs(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <FaqContext.Provider value={{
            faqs,
            getFaqs
            // (Aquí puedes añadir createFaq, deleteFaq para el Admin)
        }}>
            {children}
        </FaqContext.Provider>
    );
};