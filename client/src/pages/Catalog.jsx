import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/Catalog.css';
import logo from '../imgs/logo_transparent.png';
import facebook from '../imgs/facebook.png';
import twitter from '../imgs/twitter.png';
import instagram from '../imgs/instagram.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

function Catalog() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleAddToCartClick = async (product, quantity) => {
    try {
      const response = await axios.post('http://localhost:3001/createShoppingCart', {
        name: product.name,
        presentation: product.presentation,
        sale_price: product.sale_price,
        image: product.image,
        stock: quantity,
      });
      // Muestra una notificación de éxito
      Swal.fire({
        icon: 'success',
        title: 'Producto Agregado al Carrito',
        text: `${quantity} ${product.name} se ha agregado al carrito.`,
        confirmButtonColor: '#668461',
      });
      // Puedes manejar la respuesta del servidor si es necesario
      console.log(response.data);
    } catch (error) {
      // Muestra una notificación de error si ocurre un problema al agregar al carrito
      console.error('Error al agregar el producto al carrito:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al agregar el producto al carrito.',
        confirmButtonColor: '#FF0000',
      });
    }
  };

  const handleResetCatalog = async () => {
    // Restablece la lista de productos a su estado original
    try {
      const response = await axios.get('http://localhost:3001/allProducts');
      const data = response.data;
      setProducts(data);
      // Limpia la barra de búsqueda
      setSearchTerm('');
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearch = () => {
    // Validar que el término de búsqueda no contenga números o caracteres especiales
    if (/^[a-zA-Z\s]*$/.test(searchTerm)) {
      // Realiza la búsqueda en la lista de productos y actualiza el estado "products" con los resultados.
      const filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
      });

      setProducts(filteredProducts);
    } else {
      alert('Por favor, ingresa un término de búsqueda válido sin números ni caracteres especiales.');
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
            <Link to="/home">
              <button className="menu-button-catalog">Inicio</button>
            </Link>
            <Link to="/catalog">
              <button className="menu-button-catalog">Catálogo</button>
            </Link>
            <Link to="/cart">
              <button className="cart-button">
                <img src="./src/imgs/cart.png" alt="Carrito de compras" className="cart-icon" />
              </button>
            </Link>
            <Link to="/login">
              <button className="menu-button-last-catalog">Cerrar Sesión</button>
            </Link>
          </div>
        </div>
        <div className="content-catalog white-background-catalog">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <button onClick={handleSearch}>Buscar</button>
            <button onClick={handleResetCatalog}>Restablecer Catálogo</button>
          </div>
          <div className="catalog-scroll-container">
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCartClick} />
              ))}
            </div>
          </div>
          <div className="social-icons-catalog">
            <h1 className="welcome-catalog">Bienvenido! @User</h1>
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
