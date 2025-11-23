import cron from 'node-cron';
import Gasto from '../models/gastoModel.js';
import Multa from '../models/multaModel.js';

/* Se ejecuta automáticamente cada día a las 00:00 (medianoche) */
export const iniciarMultasAutomaticas = () => {
    cron.schedule('0 0 * * *', async () => {
        console.log('Ejecutando revisión de gastos vencidos...');

        const hoy = new Date();
        /* Se establece el período de gracia de 30 días para los gastos pendientes de pago */
        const fechaLimite = new Date();
        fechaLimite.setDate(fechaLimite.getDate() - 30); /* 30 días de plazo antes de generar multa */

        try {
            const gastosVencidos = await Gasto.find({
                estado: 'Pendiente',
                fecha: { $lt: fechaLimite }
            });

            for (const gasto of gastosVencidos) {
                /* Se verifica si ya existe una multa para este gasto para evitar duplicados */
                const existeMulta = await Multa.findOne({
                    motivo: `Mora gasto común: ${gasto.concepto}`
                });

                if (!existeMulta) {
                    const nuevaMulta = new Multa({
                        unidad: 'Sin Unidad', /* Se requiere agregar el campo unidad al modelo Gasto */
                        residente: 'Desconocido', /* Se requiere agregar el campo residente al modelo Gasto */
                        motivo: `Mora gasto común: ${gasto.concepto}`,
                        monto: gasto.monto * 0.10, /* Se aplica una penalización del 10% del monto original */
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