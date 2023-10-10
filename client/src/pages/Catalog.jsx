import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/Catalog.css';
import logo from '../imgs/logo_transparent.png';
import ProductPopup from '../components/ProductPopup';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Catalog() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3001/allProducts');
        const data = response.data;
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  const handleAddToCartClick = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="catalog-container">
      <div className="full-width-container-catalog">
        <div className="sidebar-catalog green-background-catalog">
          <div className="logo-container-catalog">
            <img src={logo} alt="Logo" className="logo-catalog" />
          </div>
          <div className="menu-catalog">
            <button className="menu-button-catalog">Inicio</button>
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
                  <button
                    className="add-to-cart-button"
                    onClick={() => handleAddToCartClick(product)}
                  >
                    Agregar al carrito
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="social-icons-catalog">
            {/* Resto del contenido de los botones sociales */}
          </div>
        </div>
      </div>
      {selectedProduct && (
        <div className="product-popup">
          <div className="product-popup-content">
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <h3>{selectedProduct.name}</h3>
            <p>{selectedProduct.price}</p>
            <div className="product-quantity">
              <button onClick={handleDecrement}>-</button>
              <span>{quantity}</span>
              <button onClick={handleIncrement}>+</button>
            </div>
            <button className="add-to-cart-button" onClick={() => setSelectedProduct(null)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Catalog;
