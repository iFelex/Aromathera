import React, { useState } from 'react';
import '../styles/Egress.css';
import logo from '../imgs/logo_transparent.png';
import facebook from '../imgs/facebook.png';
import twitter from '../imgs/twitter.png';
import instagram from '../imgs/instagram.png';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

function Egress() {
  // Datos del producto
  const location = useLocation();
  const { product } = location.state || {};

  // Estado para el campo de texto editable
  const [userComment, setUserComment] = useState('');

  // Manejar cambios en el campo de texto
  const handleUserCommentChange = (e) => {
    setUserComment(e.target.value);
  };

  // Manejar el envío del comentario
  const handleCommentSubmit = () => {
    // Aquí puedes realizar alguna acción con el comentario del usuario, como enviarlo a un servidor, etc.
    console.log('Comentario del usuario:', userComment);
  };

  // Función para mostrar una alerta de éxito
  const showSuccessAlert = () => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Se han egresado las unidades',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  // Manejar el envío del formulario (egresar unidades)
  const handleEgressSubmit = () => {
    // Validar que las unidades a egresar sean un número positivo
    const unitsToEgress = parseInt(userComment);

    if (isNaN(unitsToEgress) || unitsToEgress <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingrese una cantidad válida de unidades a egresar.',
      });
      return;
    }

    // Restar las unidades ingresadas al stock actual
    const updatedStock = product.stock - unitsToEgress;

    if (updatedStock < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No hay suficientes unidades en stock para egresar.',
      });
      return;
    }

    // Crear un nuevo objeto de producto sin los campos que deseas omitir
    const updatedProduct = {
      name: product.name,
      presentation: product.presentation,
      sale_price: product.sale_price,
      stock: updatedStock, // Actualizar el stock
    };

    // Realizar la solicitud al backend para actualizar el producto
    fetch('http://localhost:3001/updateProduct/' + product.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct), // Enviar el producto actualizado al servidor
    })
      .then((response) => response.json())
      .then((data) => {
        // Manejar la respuesta del servidor
        console.log('Respuesta del servidor:', data);

        // Mostrar una alerta de éxito
        showSuccessAlert();
      })
      .catch((error) => {
        console.error('Error al actualizar el producto:', error);
      });
  };

  // Manejar el envío del formulario (comentario y egreso)
  const handleBothSubmit = () => {
    handleCommentSubmit();
    handleEgressSubmit();
  };

  return (
    <div className="egress-container">
      <div className="full-width-container-egress">
        <div className="sidebar-egress green-background-egress">
          <div className="logo-container-egress">
            <img src={logo} alt="Logo" className="logo-egress" />
          </div>
          <div className="menu-egress">
            <Link to="/homeAdmin">
              <button className="menu-button-egress" type="button">
                Inicio
              </button>
            </Link>
            <Link to="/inventory">
              <button className="menu-button-egress">Gestionar Inventario</button>
            </Link>
            <Link to="/login">
              <button className="menu-button-last-homeAdmin">Cerrar Sesión</button>
            </Link>
          </div>
        </div>
        <div className="content-egress white-background-egress">
          <div className="product-form-container">
            <h1>Detalles del Producto</h1>
            <form className="product-form">
              <div className="form-group">
                <label>ID:</label>
                <input type="text" value={product.id} readOnly />
              </div>
              <div className="form-group">
                <label>Nombre:</label>
                <input type="text" value={product.name} readOnly />
              </div>
              <div className="form-group">
                <label>Presentación:</label>
                <input type="text" value={product.presentation} readOnly />
              </div>
              <div className="form-group">
                <label>Stock:</label>
                <input type="text" value={product.stock} readOnly />
              </div>
              <div className="form-group">
                <label>Precio de Venta:</label>
                <input type="text" value={product.sale_price} readOnly />
              </div>
              <div className="form-group">
                <label>Unidades a egresar:</label>
                <input
                  type="text"
                  value={userComment}
                  onChange={handleUserCommentChange}
                />
              </div>

              <Link to="/inventory">
                <button className="egress-button" onClick={handleBothSubmit}>
                  Egresar
                </button>
              </Link>
            </form>
          </div>
          {/* Botones de redes sociales */}
          <div className="social-icons-egress">
            <h1 className='welcome-egress'>Welcome @Admin</h1>
            <button className="social-button-egress">
              <img src={facebook} alt="Facebook" className="social-button-img-egress" />
            </button>
            <button className="social-button-egress">
              <img src={twitter} alt="Twitter" className="social-button-img-egress" />
            </button>
            <button className="social-button-egress">
              <img src={instagram} alt="Instagram" className="social-button-img-egress" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Egress;
