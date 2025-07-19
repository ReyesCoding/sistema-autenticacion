import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get('http://localhost:5000/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        const currentUser = res.data.user || res.data;

        if (currentUser.role !== 'admin') {
          alert('Acceso denegado. No tienes permisos de administrador.');
          navigate('/profile');
        } else {
          setUser(currentUser);
        }
      })
      .catch(err => {
        if (err.response?.status === 401) {
          const msg = err.response.data?.message || 'Tu sesión ha expirado. Inicia sesión nuevamente.';
          alert(msg);
          localStorage.removeItem('token');
        } else {
          console.error('Error al obtener perfil de admin:', err);
        }
        navigate('/login');
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="admin-container">
      <div className="admin-box text-center">
        <h2>Panel de Administración</h2>
        <p className="lead mt-2 mb-4">
          Desde aquí puedes gestionar el sistema como administrador.
        </p>

        <div className="text-start mt-3 mb-4">
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Rol:</strong> {user.role}</p>
          <p><strong>ID:</strong> {user.userId}</p>
        </div>

        <div className="row mt-3">
          <div className="col-12 col-md-6 mb-2 mb-md-0">
            <Link to="/profile" className="btn btn-warning w-100">
              Volver al perfil
            </Link>
          </div>
          <div className="col-12 col-md-6">
            <button className="btn btn-danger w-100" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;



