 EspacioAdmin - Sistema de Gestión de Condominios
EspacioAdmin es una plataforma integral basada en el stack MERN (MongoDB, Express, React, Node.js) diseñada para modernizar la administración de edificios y condominios. El sistema centraliza la gestión financiera, el control de acceso y la operatividad diaria en una interfaz moderna y responsiva.

 Características Principales
 Seguridad y Acceso
Autenticación Robusta: Login seguro con JSON Web Tokens (JWT).

Control de Roles (RBAC): Sistema de permisos granulares.

Super Admin / Admin: Acceso total (Gestión financiera, usuarios, configuración).

Conserje: Gestión operativa (Reservas, revisión de pagos).

Residente: Acceso limitado (Subir comprobantes, reservar espacios).

Protección de Rutas: Middlewares en el backend que impiden accesos no autorizados a nivel de API.

 Gestión Financiera (Caso 4)
Gastos Comunes: Registro detallado de cobros por unidad.

Pagos con Respaldo: Los residentes pueden subir comprobantes (imágenes/PDF) de sus transferencias.

Validación de Pagos: El administrador puede visualizar el comprobante y aprobar o rechazar el pago.

Control de Morosidad: Algoritmo automático que detecta unidades con deudas pendientes y calcula el total adeudado.

 Dashboard y Reportes
KPIs en Tiempo Real: Tarjetas informativas con recaudación mensual, deuda total y ocupación.

Gráficos Interactivos: Visualización de la distribución de gastos (Chart.js).

Reportes Imprimibles: Vista optimizada para impresión (CSS print) que genera informes limpios y profesionales.

 Operaciones
Gestión de Usuarios: CRUD completo de residentes y staff.

Reservas: Sistema para agendar espacios comunes (Quincho, Salón) con validación de estado.

Multas: Registro y seguimiento de infracciones.

 Tecnologías Utilizadas
Frontend
React 19 + Vite

Tailwind CSS (Estilos y Diseño Responsivo)

Axios (Comunicación HTTP e Interceptores de Token)

React Chartjs 2 (Gráficos de datos)

FontAwesome (Iconografía)

Backend
Node.js + Express

MongoDB + Mongoose (Base de datos NoSQL)

Multer (Manejo de subida de archivos/imágenes)

Bcryptjs (Encriptación de contraseñas)

JWT (Manejo de sesiones)

Morgan & Cors (Utilidades de servidor)

 Instalación y Despliegue
Este proyecto requiere ejecutar tanto el Backend como el Frontend.

Requisitos Previos
Node.js (v18 o superior)

MongoDB (Servicio corriendo localmente en mongodb://localhost:27017/GestionCondominio)

1. Configuración del Backend
Navega a la carpeta del servidor:

Bash

cd backend-espacioadmin
Instala las dependencias:

Bash

npm install
Crea la carpeta para archivos subidos (si no existe):

Bash

mkdir uploads
Inicia el servidor:

Bash

npm run dev
El servidor correrá en el puerto 4000.

Nota: Al iniciar por primera vez, el sistema ejecutará un script automático (initialSetup.js) que creará un usuario Super Admin por defecto si la base de datos está vacía.

2. Configuración del Frontend
Abre una nueva terminal y navega a la raíz del proyecto:

Bash

# Si estás en backend, retrocede: cd ..
Instala las dependencias:

Bash

npm install
Inicia la aplicación React:

Bash

npm run dev
La aplicación estará disponible en http://localhost:5173.

 Credenciales de Acceso (Demo)
Si la base de datos es nueva, el sistema generará automáticamente estas credenciales:

Email: admin@condominio.com

Contraseña: admin123

 Estructura del Proyecto
gestion_condominioo/
├── backend-espacioadmin/   # Servidor Node/Express
│   ├── config/             # Configuraciones (Mailer)
│   ├── controllers/        # Lógica de negocio
│   ├── libs/               # Scripts de inicialización (Semilla)
│   ├── middlewares/        # Seguridad (Auth, Roles)
│   ├── models/             # Esquemas de Mongoose (BD)
│   ├── routes/             # Endpoints de la API
│   ├── uploads/            # Almacenamiento de comprobantes
│   └── app.js              # Configuración de Express
│
├── src/                    # Cliente React
│   ├── api/                # Conexión con Backend (Axios)
│   ├── components/         # Componentes de UI (Vistas)
│   ├── context/            # Estado Global (Context API)
│   └── ...
└── ...