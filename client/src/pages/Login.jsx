import React, { useState } from 'react';
import '../styles/Login.css';
import logo from '../imgs/logo_transparent.png';
import facebook from '../imgs/facebook.png';
import twitter from '../imgs/twitter.png';
import instagram from '../imgs/instagram.png';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe y la página se recargue

    console.log('Correo Electrónico:', username);
    console.log('Contraseña:', password);

    try {
        const response = await axios.post('http://localhost:3001/api/login', {
          username,
          password,
        });
  
        if (response.status === 200) {
          // El inicio de sesión fue exitoso
          const data = response.data;
          console.log(data.message);
        } else {
          // El inicio de sesión falló
          console.error('Inicio de sesión fallido');
        }
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
      }
  };

  return (
    <div className="login-container">
      <div className="full-width-container">
        <div className="half-section white-background">
          <h2 className="section-title">Iniciar de Sesión</h2>
          <form onSubmit={handleSubmit}> {/* Agrega un formulario para manejar el evento onSubmit */}
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
              <button className="forgot-password-button" type="button">
                Olvidaste tu contraseña?
              </button>
              <button className="login-button" type="submit">
                Iniciar Sesión
              </button>
              <button className="register-button">Registrarse</button>
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
