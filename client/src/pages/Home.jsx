import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/Home.css';
import logo from '../imgs/logo_transparent.png';
import facebook from '../imgs/facebook.png';
import twitter from '../imgs/twitter.png';
import instagram from '../imgs/instagram.png';
import jabon1 from '../imgs/jabon1.jpg';
import jabon2 from '../imgs/jabon2.jpg';
import jabon3 from '../imgs/jabon3.jpg';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <div className="full-width-container-home">
        <div className="sidebar-home green-background-home">
          <div className="logo-container-home">
            <img src={logo} alt="Logo" className="logo-home" />
          </div>
          <div className="menu-home">
            <button className="menu-button-home">Inicio</button>
            <Link to="/catalog">
              <button className="menu-button-home">Catalogo</button>
            </Link>
            <Link to="/createSoap">
              <button className="menu-button-home">Crea tu jabon</button>
            </Link>
            <Link to="/order">
              <button className="menu-button-orders">Mis pedidos</button>
            </Link>
            <Link to="/login">
              <button className="menu-button-last-home">Cerrar Sesión</button>
            </Link>

          </div>
        </div>
        <div className="content-home white-background-home">
          <div className="carousel-container-home">
            <Carousel
              autoPlay
              interval={5000}
              showThumbs={false}
              showStatus={false}
              showIndicators={false}
              infiniteLoop
            >
              <div>
                <img src={jabon1} alt="Jabon 1" className="carousel-img-home" />
              </div>
              <div>
                <img src={jabon2} alt="Jabon 2" className="carousel-img-home" />
              </div>
              <div>
                <img src={jabon3} alt="Jabon 3" className="carousel-img-home" />
              </div>
            </Carousel>
          </div>
          {/* Botones de redes sociales */}
          <div className="social-icons-home">
            <h1 className='welcome-home'>Bienvenido! @Admin</h1>
            <button className="social-button-home">
              <img src={facebook} alt="Facebook" className="social-button-img-home" />
            </button>
            <button className="social-button-home">
              <img src={twitter} alt="Twitter" className="social-button-img-home" />
            </button>
            <button className="social-button-home">
              <img src={instagram} alt="Instagram" className="social-button-img-home" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
