import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación del envío de correo
    setSubmitted(true);
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h2 className="mb-4">¿Olvidaste tu contraseña?</h2>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3 text-start">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                placeholder="Introduce tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Enviar enlace de recuperación
            </button>

            <p className="mt-3 mb-0">
              <Link to="/login" className="text-light">
                Volver al login
              </Link>
            </p>
          </form>
        ) : (
          <p className="text-success">
            Si tu correo está registrado, te enviaremos un enlace para restablecer tu contraseña.
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

