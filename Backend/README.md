# Backend - API de Libros

Esta API permite a los usuarios gestionar y hacer seguimiento de libros dentro de una colección personal. Los usuarios pueden realizar operaciones CRUD (Crear, Leer, Actualizar, Borrar) en libros, autores, editoriales y sus colecciones personales. La API soporta autenticación de usuarios y control de acceso basado en roles para garantizar interacciones seguras y personalizadas.

---

## **Instalación y Ejecución Local**

Sigue estos pasos para configurar y ejecutar el servidor backend en tu entorno local.

### **1. Prerrequisitos**

Asegúrate de tener instalado el siguiente software:

* **Node.js** (versión 18.x o superior)

* **npm** o **yarn**

* **Git**

* Un servidor de base de datos **MySQL** o **MariaDB**

### **2. Configuración del Proyecto**

1. **Clona el repositorio:**

   `git clone`

2. **Instala las dependencias:**

   `npm install`

### **3. Configuración de la Base de Datos**

1. **Importa la base de datos:** El archivo SQL se encuentra en la ruta `./database/AtheneaReche_TFM.sql`. Impórtalo en tu gestor de base de datos (MySQL Workbench, DBeaver, etc.) para crear las tablas y la estructura necesarias.

2. **Crea el archivo de entorno:** En la raíz del directorio del backend, crea un archivo llamado `.env` y añade las siguientes variables con tus credenciales:

`
Configuración de la Base de Datos
DB_HOST=localhost
DB_USER=tu_usuario_de_bd
DB_PASSWORD=tu_contraseña_de_bd
DB_NAME=el_nombre_de_tu_bd

Secreto para JSON Web Token (JWT)
JWT_SECRET=una_clave_muy_secreta_y_larga
`

### **4. Ejecutar el Servidor**

Una vez configurado todo, puedes iniciar el servidor de desarrollo:

`npm run dev`


El servidor se iniciará y estará escuchando peticiones, normalmente en `http://localhost:3000`.

---

## **Características Principales**

### **Libros**:

* Ver todos los libros, buscar por autor, editorial o género.

* Realizar operaciones CRUD sobre los libros, gestionando detalles como título, portada, autor, editorial, etc.

### **Autores**:

* Obtener y gestionar información de autores, incluyendo nombre, biografía y fechas de nacimiento/fallecimiento.

* Ver todos los libros relacionados con un autor específico.

### **Editoriales**:

* Obtener y gestionar información de editoriales, incluyendo nombre y país.

* Buscar libros por editorial.

### **Colecciones**:

* Crear, actualizar y eliminar colecciones de libros personalizadas.

* Añadir o quitar libros de las colecciones, incluyendo una colección especial de "Favoritos".

### **Progreso de Lectura**:

* Marcar un libro como "empezado", actualizar su estado y registrar el progreso de lectura.

* Obtener una lista de los libros que el usuario está leyendo, junto con su progreso y estado (ej. "leyendo", "terminado", "pendiente").

---

## **Roles de Usuario**

### **Admin**:

* Tiene acceso completo para gestionar libros, autores, editoriales, colecciones y datos de usuarios.

### **User**:

* Puede gestionar sus propias colecciones de libros, registrar su progreso de lectura y acceder a su lista de lectura personal.

---

## **Autenticación y Autorización**

* La API utiliza **autenticación JWT (JSON Web Token)** para garantizar un acceso seguro.

* La autorización basada en roles asegura que solo los usuarios con los permisos adecuados puedan acceder o modificar los datos.

---

## **Endpoints de la API**

### **Endpoints Públicos**

No requieren autenticación.

* `GET /authors`: Obtiene todos los autores.

* `GET /publishers`: Obtiene todas las editoriales.

* `GET /books`: Busca libros por autor, editorial o género.

* `GET /books/:id`: Obtiene un libro por su ID.

* `GET /authors/:id`: Obtiene un autor por su ID.

* `GET /publishers/:id`: Obtiene una editorial por su ID.

### **Endpoints Privados**

Requieren autenticación JWT.

* `GET /collections`: Obtiene las colecciones personales del usuario.

* `POST /collections/add-book`: Añade un libro a una colección.

* `POST /collections/remove-book`: Elimina un libro de una colección.

* `POST /reading/start`: Empieza a leer un libro.

* `PUT /reading/update`: Actualiza el progreso de lectura.

* `GET /reading`: Obtiene la lista de lectura del usuario.

### **Endpoints Solo para Administradores**

Requieren autenticación y rol de `admin`.

* `POST /books`: Añade un nuevo libro.

* `PUT /books/:id`: Actualiza un libro existente.

* `DELETE /books/:id`: Elimina un libro.

* `POST /authors`: Añade un nuevo autor.

* `PUT /authors/:id`: Actualiza un autor.

* `DELETE /authors/:id`: Elimina un autor.

* `POST /publishers`: Añade una nueva editorial.

* `PUT /publishers/:id`: Actualiza una editorial.

* `DELETE /publishers/:id`: Elimina una editorial.

* `POST /collections`: Crea una nueva colección.

* `DELETE /collections/:id`: Elimina una colección.