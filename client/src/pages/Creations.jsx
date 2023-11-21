import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/Creations.css';
import epayco from '../imgs/epayco.png';
import logo from '../imgs/logo_transparent.png';
import facebook from '../imgs/facebook.png';
import twitter from '../imgs/twitter.png';
import instagram from '../imgs/instagram.png';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { serverAddress } from '../config';
import axios from 'axios';

function Creation() {
  const [creations, setCreations] = useState([]);

  useEffect(() => {
    async function fetchCreations() {
      try {
        const response = await fetch(`http://${serverAddress}:3001/allCreatedSoap/`);
        const data = await response.json();
        console.log('Datos de creaciones:', data);
        setCreations(data);

      } catch (error) {
        console.error('Error fetching creations:', error);
      }
    }

    fetchCreations();
  }, []);

  return (
    <div className="creations-container">
      <div className="full-width-container-creations">
        <div className="sidebar-creations green-background-creations">
          <div className="logo-container-creations">
            <img src={logo} alt="Logo" className="logo-creations" />
          </div>
          <div className="menu-creations">
            <Link to="/home">
              <button className="menu-button-creations">Inicio</button>
            </Link>
            <Link to="/catalog">
              <button className="menu-button-creations">Catálogo</button>
            </Link>
            <Link to="/createSoap">
              <button className="menu-button-home">Crea tu jabon</button>
            </Link>
            <Link to="/cart">
              <button className="cart-button">
                <img src="./src/imgs/cart.png" alt="Carrito de compras" className="cart-icon" />
              </button>
            </Link>
            <Link to="/login">
              <button className="menu-button-last-creations">Cerrar Sesión</button>
            </Link>
          </div>
        </div>
        <div className="content-creations white-background-creations">
          <div className="product-table-container">
            <h1>Tus Creaciones</h1>
            <table className="product-table">
              <thead>
                <tr>
                  <th>Fecha de Creación</th>
                  <th>Color</th>
                  <th>Esencia</th>
                  <th>Forma</th>
                  <th>Mensaje</th>
                  {/* Otros campos que desees mostrar en la tabla */}
                </tr>
              </thead>
              <tbody>
                {creations.map((creation) => (
                  <tr key={creation.id}>
                    <td>{creation.createdAt}</td>
                    <td>{creation.color}</td>
                    <td>{creation.esencia}</td>
                    <td>{creation.forma}</td>
                    <td>{creation.frase_corta}</td>
                    {/* Otros campos correspondientes a la creación */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="social-icons-creations">
            <h1 className="welcome-creations">Welcome @User</h1>
            <button className="social-button-creations">
              <img
                src={facebook}
                alt="Facebook"
                className="social-button-img-creations"
              />
            </button>
            <button className="social-button-creations">
              <img
                src={twitter}
                alt="Twitter"
                className="social-button-img-creations"
              />
            </button>
            <button className="social-button-creations">
              <img
                src={instagram}
                alt="Instagram"
                className="social-button-img-creations"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Creation;
