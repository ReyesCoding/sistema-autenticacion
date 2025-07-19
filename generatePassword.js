const bcrypt = require('bcryptjs'); // Importar bcrypt

const password = 'miNuevaContraseña123';  // La contraseña en texto plano que quieres usar

// Encriptar la contraseña
bcrypt.hash(password, 10, (err, hashedPassword) => {
  if (err) {
    console.log('Error al encriptar la contraseña:', err);
  } else {
    console.log('Contraseña encriptada:', hashedPassword);
    // Ahora puedes copiar el valor de hashedPassword y pegarlo en phpMyAdmin
  }
});
