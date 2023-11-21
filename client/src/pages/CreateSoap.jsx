// CreateSoap.js

import React, { useState } from 'react';
import '../styles/CreateSoap.css';
import logo from '../imgs/logo_transparent.png';
import facebook from '../imgs/facebook.png';
import twitter from '../imgs/twitter.png';
import instagram from '../imgs/instagram.png';
import gato from '../imgs/gato.png';
import pastilla from '../imgs/pastilla.png';
import corazon from '../imgs/corazon.png';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { serverAddress } from '../config';

function CreateSoap() {
  const [selectedColor, setSelectedColor] = useState('#FDFF91');
  const [selectedForm, setSelectedForm] = useState('gato');
  const [selectedEsencia, setSelectedEsencia] = useState('lavanda'); // Estado para la esencia
  const [message, setMessage] = useState('');
  const soapprice = 10000;

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleFormChange = (event) => {
    setSelectedForm(event.target.value);
  };

  const handleEsenciaChange = (event) => {
    setSelectedEsencia(event.target.value);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    // Limita la longitud del mensaje a 10 caracteres
    if (value.length <= 10) {
      setMessage(value);
    }
  };

  // Función para obtener la imagen de la forma seleccionada
  const getFormImage = () => {
    switch (selectedForm) {
      case 'gato':
        return gato;
      case 'pastilla':
        return pastilla;
      case 'corazon':
        return corazon;
      default:
        return corazon;
    }
  };

  const handlePayment = async () => {
    const soapData = {
      color: selectedColor,
      esencia: selectedEsencia, // Usar la esencia seleccionada por el usuario
      forma: selectedForm,
      frase_corta: message,
    };

    console.log('Datos del jabón:', soapData);

    const createSoapResponse = await fetch(`http://${serverAddress}:3001/createCreatedSoap/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(soapData),
    });

    const createSoapData = await createSoapResponse.json();
    console.log('Respuesta al crear el jabón:', createSoapData);

    try {
      const response = await fetch(`http://${serverAddress}:3001/paymentLink/${soapprice}`, {
        method: 'POST',
      });
      const data = await response.json();
      const paymentLink = data.routeLink;

      // Muestra el enlace de pago en la consola
      console.log('Enlace de pago:', paymentLink);
      window.open(paymentLink, '_blank');
    } catch (error) {
      console.error('Error al obtener el enlace de pago:', error);
      // Muestra una notificación de error si ocurre un problema al obtener el enlace de pago.
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al obtener el enlace de pago.',
        confirmButtonColor: '#FF0000',
      });
    }
  };

  return (
    <div className="createsoap-container">
      <div className="full-width-container-createsoap">
        <div className="sidebar-createsoap green-background-createsoap">
          <div className="logo-container-createsoap">
            <img src={logo} alt="Logo" className="logo-createsoap" />
          </div>
          <div className="menu-createsoap">
            <Link to="/home">
              <button className="menu-button-createsoap">Inicio</button>
            </Link>
            <Link to="/catalog">
              <button className="menu-button-createsoap">Catalogo</button>
            </Link>
            <Link to="/order">
              <button className="menu-button-orders">Mis pedidos</button>
            </Link>
            <Link to="/creation">
              <button className="menu-button-orders">Historial de pedidos</button>
            </Link>
            <Link to="/login">
              <button className="menu-button-last-createsoap">Cerrar Sesión</button>
            </Link>
          </div>
        </div>
        <div className="content-createsoap white-background-createsoap">
          <div className="product-container-createsoap">
            <div className="product-display-container-createsoap">
              <div className="product-display-createsoap" style={{ backgroundColor: selectedColor }}>
                <img src={getFormImage()} alt="Producto" className="product-img-small-createsoap" />
                {/* Nuevo elemento para mostrar el mensaje */}
                <div className="message-container">{message}</div>
              </div>
            </div>
            <div className="color-palette-and-options-container">
              <div className="color-palette-container-createsoap">
                <h2>Elige un color:</h2>
                <div className="color-options-createsoap">
                  <button
                    className="color-option-createsoap"
                    style={{ backgroundColor: '#FDFF91' }}
                    onClick={() => handleColorChange('#FDFF91')}
                  ></button>
                  <button
                    className="color-option-createsoap"
                    style={{ backgroundColor: '#91F7FF' }}
                    onClick={() => handleColorChange('#91F7FF')}
                  ></button>
                  <button
                    className="color-option-createsoap"
                    style={{ backgroundColor: '#FF9191' }}
                    onClick={() => handleColorChange('#FF9191')}
                  ></button>
                </div>
              </div>
              <div className="extra-options-createsoap">
                <label htmlFor="option1">Elige una forma:</label>
                <select id="option1" onChange={handleFormChange} value={selectedForm}>
                  <option value="gato">Gato</option>
                  <option value="pastilla">Pastilla</option>
                  <option value="corazon">Corazon</option>
                </select>
                <label htmlFor="option2">Elige una esencia:</label>
                <select id="option2" onChange={handleEsenciaChange} value={selectedEsencia}>
                  <option value="lavanda">Lavanda</option>
                  <option value="citricos">Citricos</option>
                  <option value="vainilla">Vainilla</option>
                </select>
                <label htmlFor="textInput">Agrega un mensaje:</label>
                <input
                  type="text"
                  id="textInput"
                  value={message}
                  maxLength={10}
                  onChange={handleInputChange}
                />
                <div className="payment-container">
                  {/* Contenido de pago, mensajes, etc. */}
                  <button className="payment-button" onClick={handlePayment}>Comprar</button>
                </div>
              </div>
            </div>
          </div>
          <div className="social-icons-createsoap">
            <h1 className="welcome-createsoap">Bienvenido! @Admin</h1>
            <button className="social-button-createsoap">
              <img src={facebook} alt="Facebook" className="social-button-img-createsoap" />
            </button>
            <button className="social-button-createsoap">
              <img src={twitter} alt="Twitter" className="social-button-img-createsoap" />
            </button>
            <button className="social-button-createsoap">
              <img src={instagram} alt="Instagram" className="social-button-img-createsoap" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateSoap;
