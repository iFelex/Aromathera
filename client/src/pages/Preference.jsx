import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/Preference.css';
import epayco from '../imgs/epayco.png';
import logo from '../imgs/logo_transparent.png';
import facebook from '../imgs/facebook.png';
import twitter from '../imgs/twitter.png';
import cart from '../imgs/cart.png';
import instagram from '../imgs/instagram.png';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { serverAddress } from '../config';
import axios from 'axios';

function Preference() {
  const [preferences, setPreferences] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    async function fetchPreferences() {
      try {
        const response = await fetch(`http://${serverAddress}:3001/allPreference/`);
        const data = await response.json();
        console.log('Datos de preferencias:', data);
        setPreferences(data);

        const calculatedTotalPrice = data.reduce(
          (total, preference) => total + preference.sale_price * preference.stock,
          0
        );
        setTotalPrice(calculatedTotalPrice);
      } catch (error) {
        console.error('Error fetching preferences:', error);
      }
    }

    fetchPreferences();
  }, []);

  const handleAddCart = async () => {
    try {
      for (const preference of preferences) {
        const cartData = {
          name: preference.name,
          presentation: preference.presentation,
          stock: preference.stock,
          sale_price: preference.sale_price,
          image: preference.image,
          // Otros campos de carrito que necesites
        };

        // Envia el registro de carrito al servidor
        await axios.post(`http://${serverAddress}:3001/createShoppingCart`, cartData);

        // Borra la preferencia actual
        await axios.delete(`http://${serverAddress}:3001/deletePreference/${preference.id}`);
      }

      // Limpia el estado local de preferencias
      setPreferences([]);

      // Actualiza el precio total a 0
      setTotalPrice(0);

      // Muestra una notificación de éxito
      Swal.fire({
        icon: 'success',
        title: 'Productos Movidos al Carrito',
        text: 'Los productos han sido agregados al carrito.',
        confirmButtonColor: '#668461',
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirige al catálogo usando el componente Link
          window.location.href = '/catalog';
        }
      });
    } catch (error) {
      console.error('Error moving items to cart:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al mover los productos al carrito.',
        confirmButtonColor: '#FF0000',
      });
    }
  };

  return (
    <div className="preferences-container">
      <div className="full-width-container-preferences">
        <div className="sidebar-preferences green-background-preferences">
          <div className="logo-container-preferences">
            <img src={logo} alt="Logo" className="logo-preferences" />
          </div>
          <div className="menu-preferences">
            <Link to="/home">
              <button className="menu-button-preferences">Inicio</button>
            </Link>
            <Link to="/catalog">
              <button className="menu-button-preferences">Catálogo</button>
            </Link>
            <Link to="/cart">
              <button className="cart-button">
                <img src={cart} alt="Carrito de compras" className="cart-icon" />
              </button>
            </Link>
            <Link to="/login">
              <button className="menu-button-last-preferences">Cerrar Sesión</button>
            </Link>
          </div>
        </div>
        <div className="content-preferences white-background-preferences">
          <div className="product-table-container">
            <h1>Preferencias</h1>
            <table className="product-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Imagen</th>
                  {/* Otros campos que desees mostrar en la tabla */}
                </tr>
              </thead>
              <tbody>
                {preferences.map((preference) => (
                  <tr key={preference.id}>
                    <td>{preference.name}</td>
                    <td>{preference.stock}</td>
                    <td>${preference.sale_price}</td>
                    <td><img src={preference.image} alt="Product" width="50" /></td>
                    {/* Otros campos correspondientes a la preferencia */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="total-price-container">
            <p>Total a Pagar: ${totalPrice}</p>
          </div>

          {/* Payment Button */}
          <div className="addcart-button-container">
            <button className="addcart-button" onClick={handleAddCart}>
                  Mover al Carrito
            </button>
          </div>

          <div className="social-icons-preferences">
            <h1 className="welcome-preferences">Welcome @User</h1>
            <button className="social-button-preferences">
              <img
                src={facebook}
                alt="Facebook"
                className="social-button-img-preferences"
              />
            </button>
            <button className="social-button-preferences">
              <img
                src={twitter}
                alt="Twitter"
                className="social-button-img-preferences"
              />
            </button>
            <button className="social-button-preferences">
              <img
                src={instagram}
                alt="Instagram"
                className="social-button-img-preferences"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preference;
