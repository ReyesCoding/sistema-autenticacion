// index.js - Punto de entrada principal
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Estilos globales (Bootstrap + iconos)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Iconos Bootstrap

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Para medir rendimiento, puedes usar reportWebVitals
// Aprende más: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
