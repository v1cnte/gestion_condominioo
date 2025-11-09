# EspacioAdmin - Sistema de Gestión de Condominios Full-Stack MERN

Este proyecto corresponde al ramo de Desarrollo Web. Es una aplicación **full-stack MERN** (MongoDB, Express, React, Node.js) para la administración integral de condominios, desarrollada con Vite en el frontend.

## Descripción del proyecto

La aplicación permite gestionar todas las necesidades administrativas de un condominio, desde el cobro de gastos comunes hasta la reserva de espacios comunitarios. El sistema cuenta con autenticación de usuarios basada en tokens (JWT) y una API RESTful para manejar todos los datos, los cuales persisten en una base de datos MongoDB.

## Tecnologías implementadas

### Frontend
- **React 19**
- **Vite** (Como entorno de desarrollo)
- **React Router DOM** (Para la navegación)
- **Tailwind CSS** (Para el diseño y la interfaz)
- **Axios** (Para la comunicación con el Backend)
- **React Context API** (Para la gestión de estado global)
- **FontAwesome** (Iconografía)
- **Framer Motion** (Animaciones)

### Backend
- **Node.js** (Entorno de ejecución)
- **Express** (Para el servidor y la API RESTful)
- **MongoDB** (Base de datos NoSQL)
- **Mongoose** (Para modelar los datos de MongoDB)
- **JSON Web Tokens (JWT)** (Para autenticación y sesiones seguras)
- **bcryptjs** (Para encriptación de contraseñas)
- **CORS** (Para la conexión entre Front y Back)

## Roles de usuario implementados

- **Super Administrador**: Acceso completo a todas las funcionalidades del sistema.
- **Administrador**: Gestión de finanzas y usuarios, cubriendo la mayoría de operaciones críticas.
- **Conserje**: Responsable de recibir pagos y gestionar reservas cotidianas.
- **Directiva**: Acceso a multas y reportes con función de supervisión.
- **Residente**: Acceso limitado a información personal únicamente.

## Funcionalidades desarrolladas

El dashboard presenta contenido dinámico según el rol del usuario autenticado. Todas las funcionalidades están conectadas a una base de datos real:

- **Autenticación Segura:** Sistema de Login y Registro con encriptación de contraseñas (bcrypt) y manejo de sesiones (JWT).
- **Gestión de Usuarios (CRUD):** Creación, visualización, edición y eliminación de usuarios (Residentes, Staff, etc.).
- **Control de Gastos Comunes (CRUD):** Sistema completo para registrar, ver y eliminar gastos comunes.
- **Sistema de Multas (CRUD):** Módulo funcional para aplicar, ver y eliminar multas.
- **Gestión de Reservas (CRUD):** Sistema para la reserva de espacios comunes.
- **Módulo de Ayuda:** Sistema para enviar consultas (que se guardan en la BD) y ver FAQs (leídas desde la BD).

## Instalación y configuración (Modo MERN)

Este es un proyecto full-stack. Requiere que **dos** servidores (backend y frontend) se ejecuten simultáneamente.

### Requisitos Previos
- **Node.js** (v18 o superior)
- **MongoDB** (Tener el servicio de MongoDB corriendo localmente, ej. MongoDB Compass).

### 1. Configurar el Backend 

1.  Abre un terminal y navega a la carpeta del backend:
    ```bash
    cd backend
    ```
2.  Instala las dependencias del backend:
    ```bash
    npm install
    ```
3.  Inicia el servidor del backend:
    ```bash
    npm run dev
    ```
    El servidor se ejecutará en `http://localhost:4000` y se conectará a MongoDB.

### 2. Configurar el Frontend 

1.  Abre un **segundo terminal** (¡deja el primero corriendo!).
2.  Navega a la carpeta raíz del proyecto (la del frontend):
    ```bash
    # (Si estás dentro de 'backend', primero sube un nivel)
    cd ..
    ```
3.  Instala las dependencias del frontend:
    ```bash
    npm install
    ```
4.  Inicia el servidor de desarrollo de Vite:
    ```bash
    npm run dev
    ```
    *La aplicación se abrirá en `http://localhost:5173`.*

## Estructura del proyecto

La estructura ahora contiene tanto el backend como el frontend:
