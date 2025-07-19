// Middleware para verificar el rol del usuario
// Uso: app.get('/ruta-protegida', authMiddleware, roleMiddleware('admin'), handler)

module.exports = (requiredRole) => {
  return (req, res, next) => {
    if (req.user && req.user.role === requiredRole) {
      next();
    } else {
      return res.status(403).json({ message: 'Acceso denegado. Rol insuficiente.' });
    }
  };
};
