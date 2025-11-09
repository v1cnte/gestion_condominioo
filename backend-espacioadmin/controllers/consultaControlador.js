import Consulta from '../models/consultaModel.js';

// Crear consulta — guarda la nota enviada por el usuario.
// Si más adelante quieres asociarla al usuario logueado, agrega el id desde el token.
export const createConsulta = async (req, res) => {
  try {
    const { email, note } = req.body;
    const newConsulta = new Consulta({
      email,
      note,
    });
    const savedConsulta = await newConsulta.save();
    res.json(savedConsulta);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la consulta" });
  }
};

// Obtener consultas — devuelve todas las consultas y trae info del usuario si existe
// (populate en `user` para mostrar nombre/email en el front cuando aplique).
export const getConsultas = async (req, res) => {
    try {
      const consultas = await Consulta.find().populate('user', 'nombre email');
      res.json(consultas)
    } catch (error) {
      res.status(500).json({ message: "Error al obtener consultas" });
    }
  };