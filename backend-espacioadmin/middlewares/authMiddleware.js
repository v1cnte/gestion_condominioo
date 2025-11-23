import jwt from 'jsonwebtoken';
import Usuario from '../models/usuarioModel.js';

const TOKEN_SECRET = 'mi_llave_secreta_123'; // Misma clave que en authControlador.js

// 1. Verifica que el usuario esté logueado (tenga token válido)
export const authRequired = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: "No autorizado: Falta token" });

    jwt.verify(token, TOKEN_SECRET, async (err, userDecoded) => {
      if (err) return res.status(403).json({ message: "Token inválido" });

      const usuario = await Usuario.findById(userDecoded.id);
      if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

      req.user = usuario; // Guardamos el usuario para usarlo después
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 2. Verifica que el usuario tenga el ROL correcto
export const tieneRol = (rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.user) return res.status(500).json({ message: "Error de servidor" });

    if (!rolesPermitidos.includes(req.user.rol)) {
      return res.status(403).json({ 
        message: `Acceso denegado. Se requiere rol: ${rolesPermitidos.join(', ')}` 
      });
    }
    next();
  };
};