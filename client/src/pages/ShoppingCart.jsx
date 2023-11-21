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
import { serverAddress } from '../config';
import axios from 'axios';

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

  const handlePayment = async () => {
    try {
      const response = await fetch(`http://${serverAddress}:3001/paymentLink/${totalPrice}`, {
        method: 'POST',
      });
      const data = await response.json();
      const paymentLink = data.routeLink;

      // Muestra el enlace de pago en la consola
      console.log('Enlace de pago:', paymentLink);

      //window.location.href = paymentLink;

      // Limpia el estado local
      setShoppingCarts([]);
      setTotalPrice(0);

    } catch (error) {
      console.error('Error al obtener el enlace de pago:', error);
      // Muestra una notificación de error si ocurre un problema al obtener el enlace de pago.
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al obtener el enlace de pago.',
        confirmButtonColor: '#FF0000',
      });
    }
  };

  const handleMoveToPreferences = async () => {
    try {
      for (const cart of shoppingCarts) {
        const preferenceData = {
          name: cart.name,
          presentation: cart.presentation,
          stock: cart.stock,
          sale_price: cart.sale_price,
          image: cart.image
        };

        const response = await axios.post(`http://${serverAddress}:3001/createPreference`, preferenceData);

        if (response.status === 200) {
          console.log("Actualización carrito " + cart.id)
          await axios.patch(`http://${serverAddress}:3001/updateShoppingCart/${cart.id}`);
        }
      }

      // Muestra una notificación de éxito
      await Swal.fire({
        icon: 'success',
        title: 'Productos Correctamente Facturados',
        text: 'Gracias por su compra!',
        confirmButtonColor: '#668461',
      });

      window.location.href = '/catalog';
    } catch (error) {
      console.error('Error moving items to preferences:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al mover los productos a tus preferencias.',
        confirmButtonColor: '#FF0000',
      });
    }
  };

  const handleAddOrder = async () => {
    try {
      for (const cart of shoppingCarts) {
        console.log("Ciclo");
        const orderClientData = {
          cart_id: cart.id,
          status: "Pendiente"
        };

        const res = await axios.post(`http://${serverAddress}:3001/createOrderClient`, orderClientData);
        console.log(res)
      }

    } catch (error) {
      console.error('Error moving items to OrderClient:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al crear la orden.',
        confirmButtonColor: '#FF0000',
      });
    }
  };

  const handleAddTransaction = async () => {
    try {
      for (const cart of shoppingCarts) {
        console.log("Cicloaa");
        const transactionData = {
          id_client: 12,
          money: totalPrice
        };

        const res = await axios.post(`http://${serverAddress}:3001/createTransaccion`, transactionData);
        console.log(res)
      }

    } catch (error) {
      console.error('Error moving items to OrderClient:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al crear la orden.',
        confirmButtonColor: '#FF0000',
      });
    }
  };


  const handlePaymentAndMoveToPreferences = async () => {
    await handleAddOrder();
    await handleMoveToPreferences();
    await handleAddTransaction();
    await handlePayment();
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
            <Link to="/createSoap">
              <button className="menu-button-home">Crea tu jabon</button>
            </Link>
            <Link to="/order">
              <button className="menu-button-shoppingcarts">Mis Pedidos</button>
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
            <button className="payment-button" onClick={handlePaymentAndMoveToPreferences}>
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
