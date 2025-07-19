// backend/server.js
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const authMiddleware = require('./middleware/authMiddleware');
const roleMiddleware = require('./middleware/roleMiddleware');
const { registerUser, checkEmailExists } = require('./models/userModel');

// Configuraciones
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta';

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión DB
const db = require('./db');

// Middleware local (fallback)
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: 'Token expirado o inválido' });
    req.user = user;
    next();
  });
}

// Rutas

// Registro
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  checkEmailExists(db, email, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error verificando correo' });
    if (result.length > 0) return res.status(400).json({ message: 'Correo ya registrado' });

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: 'Error al encriptar la contraseña' });

      registerUser(db, name, email, hashedPassword, 'user', (err) => {
        if (err) return res.status(500).json({ message: 'Error al registrar usuario' });
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
      });
    });
  });
});

// Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  checkEmailExists(db, email, (err, result) => {
    if (err || result.length === 0) return res.status(400).json({ message: 'Correo no registrado' });

    const user = result[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

      const token = jwt.sign({
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }, JWT_SECRET, { expiresIn: '30s' });

      res.status(200).json({ message: 'Login exitoso', token });
    });
  });
});

// Cambiar contraseña
app.post('/change-password', authMiddleware, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.userId;

  db.query('SELECT password FROM users WHERE id = ?', [userId], (err, results) => {
    if (err || !results.length) return res.status(400).json({ message: 'Usuario no encontrado' });

    bcrypt.compare(currentPassword, results[0].password, (err, isMatch) => {
      if (err || !isMatch) return res.status(400).json({ message: 'Contraseña actual incorrecta' });

      bcrypt.hash(newPassword, 10, (err, hashed) => {
        if (err) return res.status(500).json({ message: 'Error al encriptar nueva contraseña' });

        db.query('UPDATE users SET password = ? WHERE id = ?', [hashed, userId], (err) => {
          if (err) return res.status(500).json({ message: 'Error al actualizar contraseña' });
          res.json({ message: 'Contraseña actualizada exitosamente' });
        });
      });
    });
  });
});

// Perfil (ruta protegida)
app.get('/profile', authMiddleware, (req, res) => {
  const { userId, email, name, role } = req.user;
  res.status(200).json({ userId, email, name, role });
});

// Dashboard admin (ruta protegida + rol)
app.get('/admin/dashboard', authMiddleware, roleMiddleware('admin'), (req, res) => {
  res.status(200).json({ message: `Bienvenido administrador ${req.user.email}` });
});

// Start server
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = db;
