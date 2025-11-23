import Gasto from '../models/gastoModel.js';
import Multa from '../models/multaModel.js';
import Reserva from '../models/reservaModel.js';

// 1. Resumen General (Para las tarjetas del Dashboard/Reportes)
export const getResumen = async (req, res) => {
  try {
    const fechaInicio = new Date();
    fechaInicio.setDate(1); // Día 1 del mes actual
    fechaInicio.setHours(0, 0, 0, 0);

    // A. Sumar TOTAL de gastos registrados este mes
    const gastosAgregados = await Gasto.aggregate([
      { 
        $match: { 
          fecha: { $gte: fechaInicio } // Filtra por fecha >= 1ro del mes
        } 
      },
      { 
        $group: { 
          _id: null, 
          total: { $sum: "$monto" } // Suma la columna 'monto'
        } 
      }
    ]);

    // B. NUEVO: Gastos por TIPO (Para el gráfico de barras)
    const gastosPorTipo = await Gasto.aggregate([
      { 
        $match: { 
          fecha: { $gte: fechaInicio } // Solo gastos de este mes
        } 
      },
      { 
        $group: { 
          _id: "$tipo", 
          total: { $sum: "$monto" } 
        } 
      }
    ]);

    // C. Contar multas de este mes
    // Nota: Si tu modelo Multa usa 'createdAt', cámbialo aquí. Si usa 'fecha', déjalo así.
    const totalMultas = await Multa.countDocuments({ 
      fecha: { $gte: fechaInicio } 
    });

    // D. Contar reservas de este mes
    const totalReservas = await Reserva.countDocuments({ 
      fecha: { $gte: fechaInicio } 
    });

    // Responder al frontend
    res.json({
      gastosMes: gastosAgregados[0]?.total || 0,
      gastosPorTipo: gastosPorTipo, // Array para el gráfico
      multasMes: totalMultas,
      reservasMes: totalReservas
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al generar resumen" });
  }
};

// 2. Reporte de Morosidad (Para la tabla de deudores)
export const getMorosos = async (req, res) => {
  try {
    // Definimos "vencido" (ej: hace 30 días). 
    // Si quieres ver todos los pendientes, comenta el filtro de fecha.
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() - 30); 

    const morosos = await Gasto.aggregate([
      { 
        $match: { 
          estado: 'Pendiente',
          // fecha: { $lt: fechaLimite } // Descomenta si quieres filtrar por antigüedad
        } 
      },
      {
        // Agrupar por unidad para saber cuánto debe cada depto en total
        $group: {
          _id: "$unidad", // El número de departamento
          totalDeuda: { $sum: "$monto" }, // Sumamos la deuda total
          boletasPendientes: { $sum: 1 }  // Contamos cuántos gastos deben
        }
      },
      { 
        $sort: { totalDeuda: -1 } // Ordenar: los que deben más aparecen primero
      }
    ]);

    res.json(morosos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener morosidad" });
  }
};