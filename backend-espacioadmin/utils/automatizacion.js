import cron from 'node-cron';
import Gasto from '../models/gastoModel.js';
import Multa from '../models/multaModel.js';

// Se ejecuta todos los días a las 00:00
export const iniciarMultasAutomaticas = () => {
    cron.schedule('0 0 * * *', async () => {
        console.log('Ejecutando revisión de gastos vencidos...');

        const hoy = new Date();
        // Buscar gastos pendientes cuya fecha ya pasó (ej. más de 30 días)
        const fechaLimite = new Date();
        fechaLimite.setDate(fechaLimite.getDate() - 30); // 30 días de gracia

        try {
            const gastosVencidos = await Gasto.find({
                estado: 'Pendiente',
                fecha: { $lt: fechaLimite }
            });

            for (const gasto of gastosVencidos) {
                // Verificar si ya existe una multa para este gasto para no duplicar
                const existeMulta = await Multa.findOne({
                    motivo: `Mora gasto común: ${gasto.concepto}`
                });

                if (!existeMulta) {
                    const nuevaMulta = new Multa({
                        unidad: 'Sin Unidad', // Deberías agregar campo 'unidad' al modelo Gasto
                        residente: 'Desconocido', // Deberías agregar 'residente' al Gasto
                        motivo: `Mora gasto común: ${gasto.concepto}`,
                        monto: gasto.monto * 0.10, // 10% de multa
                        estado: 'Pendiente'
                    });
                    await nuevaMulta.save();
                    console.log(`Multa generada para gasto: ${gasto._id}`);
                }
            }
        } catch (error) {
            console.error('Error en cron multas:', error);
        }
    });
};