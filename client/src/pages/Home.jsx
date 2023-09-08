import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/Home.css';
import logo from '../imgs/logo_transparent.png';
import facebook from '../imgs/facebook.png';
import twitter from '../imgs/twitter.png';
import instagram from '../imgs/instagram.png';
import axios from 'axios';

function Home() {
  return (
    <div className="home-container">
      <div className="full-width-container">
        <div className="sidebar green-background">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <div className="menu">
            <button className="menu-button">Inicio</button>
            <button className="menu-button">Catálogo</button>
            <button className="menu-button">Crea tu propio jabón</button>
            <button className="menu-button">Historial</button>
            <button className="menu-button">Nosotros</button>
            <button className="menu-button">Cerrar Sesión</button>
          </div>
        </div>
        <div className="content white-background">
          <div className="carousel-container">
            <Carousel>
              <div>
                <img src="../imgs/jabon1.jpg" alt="Jabon 1" />
                <p className="legend">Jabon 1</p>
              </div>
              <div>
                <img src="../imgs/jabon2.jpg" alt="IJabon 2" />
                <p className="legend">Jabon 2</p>
              </div>
              <div>
                <img src="../imgs/jabon3.jpg" alt="Jabon 3" />
                <p className="legend">Jabon 3</p>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
