# EspacioAdmin - Sistema para Condominios

Este proyecto corresponde al ramo de Desarrollo Web. Se trata de una aplicación para la administración integral de condominios, desarrollada con React y utilizando Vite.

## Descripción del proyecto

La aplicación permite gestionar todas las necesidades administrativas de un condominio, desde el cobro de gastos comunes hasta la reserva de espacios comunitarios. 

El proyecto inicialmente se planteó como una solución simple, pero durante el desarrollo se evidenció la complejidad inherente a un sistema de gestión inmobiliaria completo.

## Tecnologías implementadas

- **React 19.1.1** 
- **Vite**  
- **React Router DOM**  
- **Tailwind CSS** 
- **FontAwesome**  
- **Chart.js**  
- **Framer Motion** 
## Roles de usuario implementados

- **Super Administrador**: acceso completo a todas las funcionalidades del sistema
- **Administrador**: gestión de finanzas y usuarios, cubriendo la mayoría de operaciones críticas
- **Conserje**: responsable de recibir pagos y gestionar reservas cotidianas
- **Directiva**: acceso a multas y reportes con función de supervisión
- **Residente**: acceso limitado a información personal únicamente



## Funcionalidades desarrolladas

El dashboard presenta contenido dinámico según el rol del usuario autenticado, funcionalidad que demandó considerable tiempo de desarrollo. Las características principales incluyen:

- Gestión de usuarios con operaciones CRUD estándar
- Control de gastos comunes con seguimiento de estados
- Sistema de multas completamente funcional
- Gestión de reservas para espacios comunes
- Generación de reportes con visualización gráfica
- Sistema de notificaciones para eventos importantes

## Instalación y configuración

1. Clonar el repositorio desde el sistema de control de versiones
2. Navegar al directorio del proyecto
3. Instalar las dependencias requeridas:
   ```bash
   npm install
   ```
   Nota: en caso de errores de instalación, se recomienda eliminar node_modules y package-lock.json y reinstalar

## Entorno de desarrollo

```bash
npm run dev
```
Esto iniciará el servidor de desarrollo en `http://localhost:5173` (o puerto 5174 si el anterior está ocupado)

## Compilación para producción

```bash
npm run build
npm run preview
```

Para verificar la calidad del código:
```bash
npm run lint
```

## Estructura del proyecto

```
src/
├── components/           # Componentes React principales
│   ├── Dashboard.jsx    # Panel principal (desarrollo extenso)
│   ├── Login.jsx        # Sistema de autenticación
│   ├── Layout.jsx       # Estructura general con sidebar
│   ├── Usuarios.jsx     # Gestión de usuarios
│   ├── GastosComunes.jsx # Módulo gastos comunes
│   ├── Multas.jsx       # Sistema de multas
│   ├── Reservas.jsx     # Gestión de reservas
│   ├── Reportes.jsx     # Generación de reportes
│   └── componentes adicionales
├── context/             # Context API para gestión de estado
├── styles/              # Estilos globales
├── App.jsx             # Componente raíz
└── main.jsx            # Punto de entrada
```

## Dependencias principales

Bibliotecas fundamentales utilizadas:
- React Router DOM para el sistema de navegación

- FontAwesome para iconografía consistente

- Chart.js para visualización de datos 

- Framer Motion para animaciones 

- Headless UI para componentes accesibles

- React DatePicker 
