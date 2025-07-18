# Frontend - Aplicación de Libros (React)

Este es el frontend de la aplicación de gestión de libros, una Single-Page Application (SPA) construida con React y Vite. La aplicación permite a los usuarios interactuar con la API del backend para buscar libros, gestionar sus colecciones personales, registrar su progreso de lectura y valorar sus libros favoritos.

### **Tecnologías Principales**

* **React**: Biblioteca para construir la interfaz de usuario.
* **Vite**: Herramienta de desarrollo y empaquetado extremadamente rápida.
* **TypeScript**: Para un código más robusto y mantenible.
* **React Router**: Para la gestión de rutas y navegación.
* **React Testing Library + Vitest + MSW**: Para las pruebas unitarias e de integración.

---

## **Instalación y Ejecución Local**

Sigue estos pasos para configurar y ejecutar el frontend en tu entorno local.

### **1. Prerrequisitos**

Asegúrate de tener instalado el siguiente software:

* **Node.js** (versión 18.x o superior)
* **npm** o **yarn**
* **Git**

### **2. Configuración del Proyecto**

1.  **Clona el repositorio:**
    ```bash
    git clone <url-del-repositorio>
    cd ruta/a/tu/Frontend/app/
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

### **3. Conexión con el Backend**

El frontend está diseñado para comunicarse con el servidor backend.

1.  **Asegúrate de que el backend esté en ejecución**, normalmente en `http://localhost:3000`.
2.  Este proyecto utiliza un **proxy** configurado en `vite.config.ts` para redirigir las peticiones `/api` al backend durante el desarrollo, evitando problemas de CORS.

### **4. Ejecutar la Aplicación**

Una vez configurado todo, puedes iniciar el servidor de desarrollo de Vite:
```bash
npm run dev
```
La aplicación estará disponible en tu navegador, normalmente en `http://localhost:5173`.

Scripts Disponibles
En el archivo package.json encontrarás los siguientes scripts:

npm run dev: Inicia el servidor de desarrollo con Hot-Module Replacement (HMR).

npm run build: Compila y empaqueta la aplicación para producción en la carpeta dist/.

npm run lint: Ejecuta el linter de ESLint para analizar el código en busca de errores y problemas de estilo.

npm test: Ejecuta la suite de pruebas utilizando Vitest.

Estructura de Carpetas
La estructura principal del proyecto dentro de src/ es la siguiente:

components/: Componentes reutilizables de la interfaz de usuario (ej. BookCard, Loader).

contexts/: Contextos de React para la gestión del estado global (ej. UserDataProvider).

hooks/: Hooks personalizados para encapsular lógica reutilizable (ej. useUserData).

pages/: Componentes que representan las páginas principales de la aplicación (ej. DashboardPage, BooksSearchPage).

mocks/: Configuración de Mock Service Worker (MSW) para simular la API en las pruebas.

types/: Definiciones de tipos de TypeScript utilizadas en todo el proyecto.

Testing
El proyecto está configurado con un entorno de pruebas moderno para garantizar la calidad del código.

Vitest: Es el motor para ejecutar las pruebas, rápido y compatible con Vite.

React Testing Library: Para renderizar componentes y simular interacciones de usuario de una manera que se asemeja al uso real.

Mock Service Worker (MSW): Intercepta las peticiones a la API durante las pruebas y devuelve datos simulados, permitiendo probar los componentes de forma aislada sin depender del backend.

Para ejecutar todas las pruebas, utiliza el siguiente comando:

Bash

npm test
Despliegue a Producción
Para desplegar el frontend, sigue estos pasos:

Genera la build de producción:

Bash

npm run build
Este comando creará una carpeta dist/ en la raíz del proyecto con todos los archivos estáticos optimizados (HTML, CSS, JS).

Despliega los archivos estáticos:
El contenido de la carpeta dist/ se puede desplegar en cualquier servicio de hosting estático como Vercel, Netlify, GitHub Pages o en un servidor propio configurado con Nginx o Apache.