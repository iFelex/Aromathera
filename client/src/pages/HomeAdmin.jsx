import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/HomeAdmin.css';
import logo from '../imgs/logo_transparent.png';
import facebook from '../imgs/facebook.png';
import twitter from '../imgs/twitter.png';
import instagram from '../imgs/instagram.png';
import jabon1 from '../imgs/jabon1.jpg';
import jabon2 from '../imgs/jabon2.jpg';
import jabon3 from '../imgs/jabon3.jpg';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomeAdmin() {
  return (
    <div className="homeAdmin-container">
      <div className="full-width-container-homeAdmin">
        <div className="sidebar-homeAdmin green-background-homeAdmin">
          <div className="logo-container-homeAdmin">
            <img src={logo} alt="Logo" className="logo-homeAdmin" />
          </div>
          <div className="menu-homeAdmin">
            <button className="menu-button-homeAdmin">Inicio</button>
            <Link to="/inventory">
              <button className="menu-button-homeAdmin">Gestionar inventario</button>
            </Link>
            <Link to="/egressHistory">
              <button className="menu-button-homeAdmin">Historial de gastos</button>
            </Link>
            <Link to="/incomeHistory">
              <button className="menu-button-homeAdmin">Historial de ingresos</button>
            </Link>

            <Link to="/login">
              <button className="menu-button-last-homeAdmin">Cerrar Sesión</button>
            </Link>

          </div>
        </div>
        <div className="content-homeAdmin white-background-homeAdmin">
          <div className="carousel-container-homeAdmin">
            <Carousel
              autoPlay
              interval={5000}
              showThumbs={false}
              showStatus={false}
              showIndicators={false}
              infiniteLoop
            >
              <div>
                <img src={jabon1} alt="Jabon 1" className="carousel-img-homeAdmin" />
              </div>
              <div>
                <img src={jabon2} alt="Jabon 2" className="carousel-img-homeAdmin" />
              </div>
              <div>
                <img src={jabon3} alt="Jabon 3" className="carousel-img-homeAdmin" />
              </div>
            </Carousel>
          </div>
          {/* Botones de redes sociales */}
          <div className="social-icons-homeAdmin">
            <h1 className='welcome-homeAdmin'>Bienvenido! @Admin</h1>
            <button className="social-button-homeAdmin">
              <img src={facebook} alt="Facebook" className="social-button-img-homeAdmin" />
            </button>
            <button className="social-button-homeAdmin">
              <img src={twitter} alt="Twitter" className="social-button-img-homeAdmin" />
            </button>
            <button className="social-button-homeAdmin">
              <img src={instagram} alt="Instagram" className="social-button-img-homeAdmin" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeAdmin;
