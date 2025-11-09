import Usuario from '../models/usuarioModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const TOKEN_SECRET = 'mi_llave_secreta_123'

// Registro de usuario — guarda al usuario y devuelve un token
// Nota: la contraseña se encripta antes de guardarla.
export const registro = async (req, res) => {
  const { nombre, email, password, rol, unidad } = req.body
  try {
    const passwordHash = await bcrypt.hash(password, 10)
    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password: passwordHash,
      rol,
      unidad
    })
    const usuarioGuardado = await nuevoUsuario.save() 
    const token = jwt.sign({ id: usuarioGuardado._id }, TOKEN_SECRET);
    res.json({
      id: usuarioGuardado._id,
      nombre: usuarioGuardado.nombre,
      email: usuarioGuardado.email,
      rol: usuarioGuardado.rol,
      token: token
    })
  } catch (error) {
    if (error.code === 11000) {
        return res.status(400).json({ message: ["El email ya está en uso"] });
    }
    res.status(500).json({ message: "Error al registrar usuario", error })
  }
}

// Login de usuario — valida email y contraseña y devuelve token
// Si falla, devolvemos mensajes amigables para mostrarlos en el front.
export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const usuarioEncontrado = await Usuario.findOne({ email });
    if (!usuarioEncontrado) {
      return res.status(400).json({ message: ["Email no encontrado"] });
    }
    const esCorrecta = await bcrypt.compare(
      password,
      usuarioEncontrado.password
    );
    if (!esCorrecta) {
      return res.status(400).json({ message: ["Contraseña incorrecta"] });
    }
    const token = jwt.sign({ id: usuarioEncontrado._id }, TOKEN_SECRET);
    res.json({
      id: usuarioEncontrado._id,
      nombre: usuarioEncontrado.nombre,
      email: usuarioEncontrado.email,
      rol: usuarioEncontrado.rol,
      token: token
    })
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error })
  }
}

// Obtener todos los usuarios — devuelve la lista sin las contraseñas
// Útil para pantallas de administración. No incluye el campo `password`.
export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-password');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
};

// Eliminar usuario — borra por id y devuelve el documento eliminado
// Nota: usa este endpoint con precaución (solo admin debería poder usarlo).
export const deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario", error });
  }
};

// Actualizar usuario — permite cambiar nombre, email, rol y unidad
// Importante: no se actualiza la contraseña desde este endpoint.
export const updateUsuario = async (req, res) => {
  try {
    const { nombre, email, rol, unidad } = req.body;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      { nombre, email, rol, unidad },
      { new: true }
    ).select('-password');

    if (!usuarioActualizado) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario", error });
  }
};