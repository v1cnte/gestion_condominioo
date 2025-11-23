import Usuario from '../models/usuarioModel.js';
import bcrypt from 'bcryptjs';

export const createRolesAndAdmin = async () => {
  try {
    /* Se verifica si ya existen usuarios en la base de datos */
    const count = await Usuario.estimatedDocumentCount();

    /* Si la base de datos ya contiene usuarios, se interrumpe la ejecución */
    if (count > 0) return;

    /* Si la base de datos está vacía, se procede a crear el usuario Super Administrador predeterminado */
    console.log('>> Base de datos vacía. Creando Super Admin por defecto...');

    /* Se encripta la contraseña predeterminada utilizando el algoritmo bcryptjs */
    const passwordHash = await bcrypt.hash("admin123", 10);

    const values = await Promise.all([
      new Usuario({
        nombre: "Super Administrador",
        email: "admin@condominio.com",
        password: passwordHash,
        rol: "super_admin",
        unidad: "Administración"
      }).save(),
      
      /* Sección comentada: Opcionalmente, se puede crear un usuario residente de prueba
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