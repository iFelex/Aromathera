import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/Catalog.css';
import logo from '../imgs/logo_transparent.png';
import facebook from '../imgs/facebook.png';
import twitter from '../imgs/twitter.png';
import instagram from '../imgs/instagram.png';
import favicon from '../imgs/preference.png';
import cart from '../imgs/cart.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { serverAddress } from '../config';
import emailjs from 'emailjs-com';

function Catalog() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(`http://${serverAddress}:3001/allProducts`);
        const data = response.data;
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  const sendEmail = async (product, userId) => {
    const emailServiceId = 'service_ug1bvkd';
    const emailTemplateId = 'template_uixx6m7';

    const emailData = {
      product: product.name,
      stock: product.stock,
      userId,
    };

    try {
      const response = await emailjs.send(emailServiceId, emailTemplateId, emailData, userId);

      if (response.status === 200) {
        console.log('Email sent successfully!');
      } else {
        console.error('Error sending email:', response.error);
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleAddToCartClick = async (product, quantity) => {
    const result = await Swal.fire({
      title: 'Confirmación',
      text: `¿Seguro que quieres agregar ${quantity} ${product.name} al carrito?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#668461',
      cancelButtonColor: '#FF0000',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    });

    if (result.isConfirmed) {
      try {
        // Actualiza el stock del producto en la tabla principal
        const response = await axios.put(`http://${serverAddress}:3001/updateProduct/${product.id}`, {
          stock: product.stock - quantity,
        });

        // Verifica si la actualización fue exitosa
        if (response.status === 200) {
          const userId = 'm6BIxvzHEsS_se6rD';

          // Send an email if the stock of the product is less than 15
          if (product.stock - quantity < 15) {
            //await sendEmail(product, userId);
          }
          // Realiza la solicitud para agregar el producto al carrito
          const cartResponse = await axios.post('http://localhost:3001/createShoppingCart', {
            name: product.name,
            presentation: product.presentation,
            sale_price: product.sale_price,
            image: product.image,
            stock: quantity,
            id_user: 12,
            active_status: 1
          });

          // Muestra una notificación de éxito
          Swal.fire({
            icon: 'success',
            title: 'Producto Agregado al Carrito',
            text: `${quantity} ${product.name} se ha agregado al carrito.`,
            confirmButtonColor: '#668461',
          });

          // Puedes manejar la respuesta del servidor si es necesario
          console.log(cartResponse.data);

          // Actualiza el estado de productos en tu componente para reflejar los cambios en el stock
          const updatedProducts = [...products];
          const productIndex = updatedProducts.findIndex((p) => p.id === product.id);
          updatedProducts[productIndex].stock -= quantity;
          setProducts(updatedProducts);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al actualizar el stock del producto.',
            confirmButtonColor: '#FF0000',
          });
        }
      } catch (error) {
        // Muestra una notificación de error si ocurre un problema al agregar al carrito o actualizar el stock
        console.error('Error al agregar el producto al carrito:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al agregar el producto al carrito.',
          confirmButtonColor: '#FF0000',
        });
      }
    }
  };

  const handleResetCatalog = async () => {
    // Restablece la lista de productos a su estado original
    try {
      const response = await axios.get(`http://${serverAddress}:3001/allProducts`);
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

      if (filteredProducts.length === 0) {
        // Muestra un mensaje de SweetAlert2 si no se encuentran coincidencias
        Swal.fire({
          icon: 'warning',
          title: 'No se encontraron productos',
          text: 'No hay productos que coincidan con tu búsqueda.',
          confirmButtonColor: '#668461',
        });
        handleResetCatalog();
      }

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
            <Link to="/createSoap">
              <button className="menu-button-home">Crea tu jabon</button>
            </Link>
            <Link to="/cart">
              <button className="cart-button">
                <img src={cart} alt="Carrito de compras" className="cart-icon" />
              </button>
            </Link>
            <Link to="/order">
              <button className="menu-button-orders">Mis pedidos</button>
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
            <Link to="/preference">
              <button className="payment-button">
                <img
                  src={favicon}
                  alt="favicon"
                  className="favicon-logo"
                  style={{ width: '20px', height: '20px' }}
                />
              </button>
            </Link>
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
