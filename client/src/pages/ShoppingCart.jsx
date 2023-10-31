import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/ShoppingCart.css';
import epayco from '../imgs/epayco.png';
import logo from '../imgs/logo_transparent.png';
import facebook from '../imgs/facebook.png';
import twitter from '../imgs/twitter.png';
import instagram from '../imgs/instagram.png';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import serverAddress from '../config';

function ShoppingCart() {
  const [shoppingCarts, setShoppingCarts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    async function fetchShoppingCarts() {
      try {
        const response = await fetch(`http://${serverAddress}:3001/allShoppingCarts/`);
        const data = await response.json();
        console.log('Datos de carritos de compra:', data);
        setShoppingCarts(data);

        const calculatedTotalPrice = data.reduce(
          (total, cart) => total + cart.sale_price * cart.stock,
          0
        );
        setTotalPrice(calculatedTotalPrice);
      } catch (error) {
        console.error('Error fetching shopping carts:', error);
      }
    }

    fetchShoppingCarts();
  }, []);

  const handleDeleteCartItem = async (cartId, salePrice, stock) => {
    try {
      // Realiza la solicitud DELETE al servidor para eliminar el carrito con el ID especificado.
      await fetch(`http://${serverAddress}:3001/deleteShoppingCart/${cartId}`, {
        method: 'DELETE',
      });

      // Actualiza la interfaz eliminando el carrito correspondiente.
      setShoppingCarts((prevShoppingCarts) =>
        prevShoppingCarts.filter((cart) => cart.id !== cartId)
      );

      // Calcula el precio total restando el producto eliminado.
      setTotalPrice((prevTotalPrice) => prevTotalPrice - salePrice * stock);

      // Muestra una notificación de éxito.
      Swal.fire({
        icon: 'success',
        title: 'Producto Eliminado del Carrito',
        text: `El producto ha sido eliminado del carrito.`,
        confirmButtonColor: '#668461',
      });
    } catch (error) {
      console.error('Error deleting shopping cart item:', error);
      // Muestra una notificación de error si ocurre un problema al eliminar.
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al eliminar el producto del carrito.',
        confirmButtonColor: '#FF0000',
      });
    }
  };

  const handlePayment = () => {
    // Add your payment processing logic here
    // This is a placeholder function for handling payments
    // You should integrate with a payment gateway like Stripe or PayPal
    // and implement the payment flow here.
  };

  return (
    <div className="shoppingcarts-container">
      <div className="full-width-container-shoppingcarts">
        <div className="sidebar-shoppingcarts green-background-shoppingcarts">
          <div className="logo-container-shoppingcarts">
            <img src={logo} alt="Logo" className="logo-shoppingcarts" />
          </div>
          <div className="menu-shoppingcarts">
            <Link to="/home">
              <button className="menu-button-shoppingcarts">Inicio</button>
            </Link>
            <Link to="/catalog">
              <button className="menu-button-shoppingcarts">Catálogo</button>
            </Link>
            <Link to="/login">
              <button className="menu-button-last-shoppingcarts">Cerrar Sesión</button>
            </Link>
          </div>
        </div>
        <div className="content-shoppingcarts white-background-shoppingcarts">
          <div className="product-table-container">
            <h1>Carrito de Compra</h1>
            <table className="product-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {shoppingCarts.map((cart) => (
                  <tr key={cart.id}>
                    <td>{cart.name}</td>
                    <td>{cart.stock}</td>
                    <td>${cart.sale_price}</td>
                    <td>
                      <button
                        className='delete-button'
                        onClick={() => handleDeleteCartItem(cart.id, cart.sale_price, cart.stock)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="total-price-container">
            <p>Total a Pagar: ${totalPrice}</p>
          </div>

          {/* Payment Button */}
          <div className="payment-button-container">
            <button className="payment-button" onClick={handlePayment}>
              <img
                src={epayco}
                alt="Epayco"
                className="epayco-logo"
                style={{ width: '60px', height: '20px' }}
              />
            </button>
          </div>

          <div className="social-icons-shoppingcarts">
            <h1 className="welcome-shoppingcarts">Welcome @User</h1>
            <button className="social-button-shoppingcarts">
              <img
                src={facebook}
                alt="Facebook"
                className="social-button-img-shoppingcarts"
              />
            </button>
            <button className="social-button-shoppingcarts">
              <img
                src={twitter}
                alt="Twitter"
                className="social-button-img-shoppingcarts"
              />
            </button>
            <button className="social-button-shoppingcarts">
              <img
                src={instagram}
                alt="Instagram"
                className="social-button-img-shoppingcarts"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
