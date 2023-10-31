import React, { useState } from 'react';
import '../styles/Login.css';
import logo from '../imgs/logo_transparent.png';
import facebook from '../imgs/facebook.png';
import twitter from '../imgs/twitter.png';
import instagram from '../imgs/instagram.png';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import serverAddress from '../config';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToHomeAdmin, setRedirectToHomeAdmin] = useState(false);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`http://${serverAddress}:3001/api/login`, {
        username,
        password,
      });

      console.log('Valor de rol en respuesta:', response.data.rol);

      if (response.status === 200 && response.data.acceso) {
        Swal.fire({
          icon: 'success',
          title: 'Inicio de Sesión Exitoso',
          text: 'Tus credenciales son correctas.',
          confirmButtonColor: '#668461',
        });

        if (response.data.rol === 'admin') {
          console.log('Usuario es admin, redireccionando a /homeAdmin');
          setRedirectToHomeAdmin(true);
        } else {
          console.log('Usuario no es admin, redireccionando a /home');
          setRedirectToHome(true);
        }
      }
    } catch (error) {
      setError('Credenciales incorrectas');
      Swal.fire({
        icon: 'error',
        title: 'Inicio de Sesión Fallido',
        text: 'Tus credenciales son incorrectas.',
        confirmButtonColor: '#668461',
      });
      console.log('Credenciales incorrectas');
      console.error('Error al enviar la solicitud:', error);
    }
  };

  if (redirectToHomeAdmin) {
    return <Navigate to="/homeAdmin" />;
  } else if (redirectToHome) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="login-container">
      <div className="full-width-container">
        <div className="half-section white-background">
          <h2 className="section-title">Iniciar de Sesión</h2>
          <form onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}
            <div className="input-group">
              <input
                type="text"
                placeholder="Email"
                value={username}
                onChange={handleUsernameChange}
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={handlePasswordChange}
              />

              <button className="login-button" type="submit">
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
        <div className="half-section green-background">
          <img src={logo} alt="Logo" className="logo" />
          <div className="social-icons">
            <button className="social-button">
              <img src={facebook} alt="Facebook" />
            </button>
            <button className="social-button">
              <img src={twitter} alt="Twitter" />
            </button>
            <button className="social-button">
              <img src={instagram} alt="Instagram" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
