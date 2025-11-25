import Gasto from '../models/gastoModel.js';
import Multa from '../models/multaModel.js';
import Reserva from '../models/reservaModel.js';

/* Genera un resumen general con KPIs para las tarjetas del dashboard y reportes mensuales */
export const getResumen = async (req, res) => {
  try {
    const fechaInicio = new Date();
    fechaInicio.setDate(1); /* Se establece el inicio del mes actual */
    fechaInicio.setHours(0, 0, 0, 0);

    /* Calcula el monto total de gastos registrados en el mes actual */
    const gastosAgregados = await Gasto.aggregate([
      { 
        $match: { 
          fecha: { $gte: fechaInicio } /* Filtra gastos desde el primer día del mes */
        } 
      },
      { 
        $group: { 
          _id: null, 
          total: { $sum: "$monto" } /* Suma todos los montos de gastos */
        } 
      }
    ]);

    /* Calcula la distribución de gastos por tipo para visualización en gráfico */
    const gastosPorTipo = await Gasto.aggregate([
      { 
        $match: { 
          fecha: { $gte: fechaInicio } /* Solo gastos del mes actual */
        } 
      },
      { 
        $group: { 
          _id: "$tipo", 
          total: { $sum: "$monto" } 
        } 
      }
    ]);

    /* Cuenta el total de multas registradas en el mes actual */
    /* Nota: Si el modelo Multa utiliza createdAt, debe modificarse esta línea */
    const totalMultas = await Multa.countDocuments({ 
      fecha: { $gte: fechaInicio } 
    });

    /* Cuenta el total de reservas registradas en el mes actual */
    const totalReservas = await Reserva.countDocuments({ 
      fecha: { $gte: fechaInicio } 
    });

    /* Retorna los datos agregados al cliente */
    res.json({
      gastosMes: gastosAgregados[0]?.total || 0,
      gastosPorTipo: gastosPorTipo, /* Array con datos para visualizar en gráfico */
      multasMes: totalMultas,
      reservasMes: totalReservas
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al generar resumen" });
  }
};

/* Genera un reporte de morosidad listando unidades deudoras con sus totales de deuda */
export const getMorosos = async (req, res) => {
  try {
    /* Se define un período de gracia de 30 días antes de considerar una deuda como vencida
       Para incluir todas las deudas pendientes sin importar antigüedad, comentar el filtro de fecha */
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() - 30); 

    /* Obtiene gastos pendientes agrupados por unidad */
    const gastosMorosos = await Gasto.aggregate([
      { 
        $match: { 
          estado: 'Pendiente',
          /* fecha: { $lt: fechaLimite } - Descomenta para filtrar solo deudas antiguas */
        } 
      },
      {
        /* Agrupa los gastos pendientes por unidad para calcular el total adeudado por departamento */
        $group: {
          _id: "$unidad", /* Identificador del departamento */
          totalDeuda: { $sum: "$monto" }, /* Suma total adeudada por el departamento */
          boletasPendientes: { $sum: 1 }  /* Cantidad de comprobantes de pago pendientes */
        }
      }
    ]);

    /* Obtiene multas pendientes agrupadas por unidad */
    const multasMorosos = await Multa.aggregate([
      { 
        $match: { 
          estado: 'Pendiente'
        } 
      },
      {
        $group: {
          _id: "$unidad",
          totalDeuda: { $sum: "$monto" },
          boletasPendientes: { $sum: 1 }
        }
      }
    ]);

    /* Combina gastos y multas pendientes por unidad */
    const morososMap = new Map();

    /* Procesa gastos pendientes */
    gastosMorosos.forEach(item => {
      if (morososMap.has(item._id)) {
        const existente = morososMap.get(item._id);
        existente.totalDeuda += item.totalDeuda;
        existente.boletasPendientes += item.boletasPendientes;
      } else {
        morososMap.set(item._id, {
          _id: item._id,
          totalDeuda: item.totalDeuda,
          boletasPendientes: item.boletasPendientes
        });
      }
    });

    /* Procesa multas pendientes */
    multasMorosos.forEach(item => {
      if (morososMap.has(item._id)) {
        const existente = morososMap.get(item._id);
        existente.totalDeuda += item.totalDeuda;
        existente.boletasPendientes += item.boletasPendientes;
      } else {
        morososMap.set(item._id, {
          _id: item._id,
          totalDeuda: item.totalDeuda,
          boletasPendientes: item.boletasPendientes
        });
      }
    });

    /* Convierte el Map a array y ordena por deuda total descendente */
    const morosos = Array.from(morososMap.values()).sort((a, b) => b.totalDeuda - a.totalDeuda);

    res.json(morosos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener morosidad" });
  }
};