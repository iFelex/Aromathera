import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import '../styles/Catalog.css';
import logo from '../imgs/logo_transparent.png';
import facebook from '../imgs/facebook.png';
import twitter from '../imgs/twitter.png';
import instagram from '../imgs/instagram.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Catalog() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Definir una función asincrónica para obtener productos
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3001/allProducts');
        const data = response.data;
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    // Llamar a la función para obtener productos
    fetchProducts();
  }, []);

  return (
    <div className="catalog-container">
      <div className="full-width-container-catalog">
        <div className="sidebar-catalog green-background-catalog">
          <div className="logo-container-catalog">
            <img src={logo} alt="Logo" className="logo-catalog" />
          </div>
          <div className="menu-catalog">
            <button className="menu-button-catalog">Inicio</button>
            <Link to="/inventory">
              <button className="menu-button-catalog">Gestionar inventario</button>
            </Link>
            <Link to="/egressHistory">
              <button className="menu-button-catalog">Historial de gastos</button>
            </Link>
            <Link to="/incomeHistory">
              <button className="menu-button-catalog">Historial de ingresos</button>
            </Link>
            <Link to="/catalog">
              <button className="menu-button-catalog">Catalogo</button>
            </Link>
            <Link to="/login">
              <button className="menu-button-last-catalog">Cerrar Sesión</button>
            </Link>
          </div>
        </div>
        <div className="content-catalog white-background-catalog">
          <div className="catalog-scroll-container">
            <div className="product-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">{product.price}</p>
                  <button className="add-to-cart-button">Agregar al carrito</button>
                </div>
              ))}
            </div>
          </div>
          <div className="social-icons-catalog">
            <h1 className='welcome-catalog'>Bienvenido! @Admin</h1>
            <button className="social-button-catalog">
              <img src={facebook} alt="Facebook" className="social-button-img-catalog" />
            </button>
            <button className="social-button-catalog">
              <img src={twitter} alt="Twitter" className="social-button-img-catalog" />
            </button>
            <button className="social-button-catalog">
              <img src={instagram} alt="Instagram" className="social-button-img-catalog" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Catalog;
