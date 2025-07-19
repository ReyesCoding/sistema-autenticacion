// Modelos de acceso a datos relacionados con usuarios

/**
 * Verifica si un correo electrónico ya está registrado en la base de datos.
 * @param {Pool} db - Conexión a la base de datos (MySQL Pool)
 * @param {string} email - Correo a verificar
 * @param {function} callback - Función callback con (error, resultados)
 */
const checkEmailExists = (db, email, callback) => {
  db.query('SELECT * FROM users WHERE email = ?', [email], callback);
};

/**
 * Registra un nuevo usuario en la base de datos.
 * @param {Pool} db - Conexión a la base de datos (MySQL Pool)
 * @param {string} name - Nombre del usuario
 * @param {string} email - Correo del usuario
 * @param {string} hashedPassword - Contraseña encriptada
 * @param {string} role - Rol del usuario ('user' o 'admin')
 * @param {function} callback - Función callback con (error, resultados)
 */
const registerUser = (db, name, email, hashedPassword, role, callback) => {
  db.query(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, hashedPassword, role],
    callback
  );
};

module.exports = {
  checkEmailExists,
  registerUser
};
