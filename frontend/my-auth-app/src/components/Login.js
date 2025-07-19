// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Todos los campos son obligatorios');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/profile');
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al intentar iniciar sesión';
      setErrorMsg(msg);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        {errorMsg && (
          <div className="error-message">{errorMsg}</div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="input-icon-group">
            <i className="bi bi-envelope-fill input-icon" />
            <input
              type="email"
              className="form-control with-icon"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="input-icon-group">
            <i className="bi bi-lock-fill input-icon" />
            <input
              type="password"
              className="form-control with-icon"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Recordarme + Olvidaste tu contraseña */}
          <div className="form-check d-flex justify-content-between align-items-center mt-2 mb-3">
            <div>
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberMe"
              />
              <label className="form-check-label ms-2" htmlFor="rememberMe">
                Recordarme
              </label>
            </div>
            <Link to="/forgot-password" className="small text-light">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary btn-login">
            Iniciar sesión
          </button>
        </form>

        {/* Registro */}
        <div className="form-text mt-3 text-center">
          <Link to="/register">¿No tienes cuenta? Regístrate</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;




