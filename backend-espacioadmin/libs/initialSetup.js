import Usuario from '../models/usuarioModel.js';
import bcrypt from 'bcryptjs';

export const createRolesAndAdmin = async () => {
  try {
    // 1. Verificar si ya existen usuarios
    const count = await Usuario.estimatedDocumentCount();

    // Si ya hay usuarios, no hacemos nada (retornamos)
    if (count > 0) return;

    // 2. Si no hay usuarios, creamos el Super Admin por defecto
    console.log('>> Base de datos vacía. Creando Super Admin por defecto...');

    // Encriptamos la contraseña "admin123" (o la que tú quieras)
    const passwordHash = await bcrypt.hash("admin123", 10);

    const values = await Promise.all([
      new Usuario({
        nombre: "Super Administrador",
        email: "admin@condominio.com",
        password: passwordHash,
        rol: "super_admin",
        unidad: "Administración"
      }).save(),
      
      // Opcional: Crear un residente de prueba también
      /*
      new Usuario({
        nombre: "Residente Ejemplo",
        email: "residente@condominio.com",
        password: await bcrypt.hash("123456", 10),
        rol: "residente",
        unidad: "101"
      }).save()
      */
    ]);

    console.log('>> ¡Usuario Admin creado exitosamente!');
    console.log('>> Email: admin@condominio.com');
    console.log('>> Pass: admin123');

  } catch (error) {
    console.error('Error en initialSetup:', error);
  }
};