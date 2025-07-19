// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginTime, setLoginTime] = useState('');
  const navigate = useNavigate();

  // Obtener perfil y hora de login
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
        setUser(res.data.user || res.data);
        const now = new Date();
        const formattedTime = now.toLocaleString('es-DO', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
        setLoginTime(formattedTime);
      })
      .catch(err => {
        if (err.response?.status === 401) {
          const msg = err.response.data?.message || 'Tu sesión ha expirado. Inicia sesión nuevamente.';
          alert(msg);
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          console.error('Error al obtener perfil:', err);
          navigate('/login');
        }
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const token = localStorage.getItem('token');

    axios.post(
      'http://localhost:5000/change-password',
      { currentPassword: oldPassword, newPassword },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(res => {
        alert(res.data.message);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setShowChangePassword(false);
      })
      .catch(err => {
        const msg = err.response?.data?.message || 'Error al cambiar la contraseña';
        alert(msg);
      });
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h2>Bienvenido a tu perfil</h2>

        {user ? (
          <>
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Rol:</strong> {user.role}</p>
            <p><strong>ID:</strong> {user.userId}</p>
            <p><strong>Hora de acceso:</strong> {loginTime}</p>

            <div className="row mb-4">
              {user.role === 'admin' ? (
                <>
                  <div className="col-12 col-md-6 mb-2 mb-md-0">
                    <Link to="/admin" className="btn btn-warning w-100">
                      Ir al Panel de Admin
                    </Link>
                  </div>
                  <div className="col-12 col-md-6">
                    <button className="btn btn-danger w-100" onClick={handleLogout}>
                      Cerrar sesión
                    </button>
                  </div>
                </>
              ) : (
                <div className="col-12">
                  <button className="btn btn-danger w-100" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>

            <button
              className="btn btn-secondary btn-sm mb-3"
              onClick={() => setShowChangePassword(!showChangePassword)}
            >
              {showChangePassword ? 'Ocultar cambio de contraseña' : 'Cambiar contraseña'}
            </button>

            {showChangePassword && (
              <form className="change-password-form" onSubmit={handleChangePassword}>
                <div className="form-group mt-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña actual"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mt-2">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Nueva contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mt-2">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Repetir nueva contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button className="btn btn-primary mt-3 btn-block" type="submit">
                  Confirmar cambio
                </button>
              </form>
            )}
          </>
        ) : (
          <p>Cargando perfil...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
