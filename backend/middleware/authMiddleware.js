const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  const token = authHeader.split(' ')[1];
  const JWT_SECRET = process.env.JWT_SECRET || 'mi_secreto_super_secreto';

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      const errorMessage = err.name === 'TokenExpiredError'
        ? 'Token expirado. Por favor inicia sesión nuevamente.'
        : 'Token inválido.';
      return res.status(401).json({ message: errorMessage });
    }

    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
