import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));

    if (requiredRole && payload.role !== requiredRole) {
      // Puedes mostrar un mensaje personalizado si deseas
      // return <div>Acceso denegado</div>;
      return <Navigate to="/profile" />;
    }

    return children;
  } catch (error) {
    console.error('Error al verificar token:', error);
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
