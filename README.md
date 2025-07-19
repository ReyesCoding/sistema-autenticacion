````
# 🔐 Sistema de Autenticación de Usuarios con Roles (React + Node.js + MySQL)

Este proyecto es un sistema completo de autenticación de usuarios con roles (`user` y `admin`), desarrollado como parte de mi formación como Backend Developer. Incluye backend en Node.js + Express, base de datos MySQL y un frontend profesional con React.

---

## ✨ Funcionalidades

✅ Registro de usuarios con validación de email  
✅ Inicio de sesión con autenticación JWT  
✅ Rutas protegidas según el rol (`user` o `admin`)  
✅ Panel de perfil con opción de cambiar contraseña  
✅ Panel de administrador con acceso exclusivo  
✅ Mensajes de error personalizados y feedback visual  
✅ UI moderna, responsiva y accesible  
✅ Gestión de token expirado (alertas y manejo de sesión)  
✅ Forgot password implementado visualmente  
✅ Código limpio, modular y escalable

---

## 🛠️ Tecnologías utilizadas

### 🔙 Backend
- Node.js + Express
- MySQL (base de datos relacional)
- bcryptjs (hash de contraseñas)
- jsonwebtoken (JWT)
- dotenv (variables de entorno)
- Middleware para autenticación y autorización

### 🔛 Frontend
- React.js + React Router DOM
- Axios (consumo de la API)
- Bootstrap 5 + Bootstrap Icons
- Estilos personalizados (CSS modular)
- Navbar dinámica y responsive

---

## 🧪 Cómo ejecutar el proyecto

### 1. Clonar el repositorio
```bash
git clone https://github.com/tuusuario/sistema-autenticacion.git
cd sistema-autenticacion
````

### 2. Instalar dependencias

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

### 3. Configurar base de datos MySQL

Crea una base de datos llamada `auth_system` y ejecuta este script:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role VARCHAR(20)
);
```

Agrega un archivo `.env` en la carpeta `/backend`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=auth_system
JWT_SECRET=clave_secreta
```

---

### 4. Ejecutar la app

#### Backend

```bash
cd backend
npm start
```

#### Frontend

```bash
cd ../frontend
npm start
```

---

## 🎥 Video de demostración

🔗 https://youtu.be/7ceiU_yt4Ww

---

## 👤 Autor

**Bryan Reyes**
📧 Contacto: [reyes.codes@gmail.com]
📌 Proyecto parte de mi portafolio como Backend Developer

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

```

---
