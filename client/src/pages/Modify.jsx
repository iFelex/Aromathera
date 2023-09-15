import React, { useState } from 'react';
import '../styles/Modify.css';
import logo from '../imgs/logo_transparent.png';
import facebook from '../imgs/facebook.png';
import twitter from '../imgs/twitter.png';
import instagram from '../imgs/instagram.png';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

function Modify() {
  // Datos del producto
  const location = useLocation();
  const { product } = location.state || {};

  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    name: product.name || '',
    presentation: product.presentation || '',
    stock: product.stock.toString() || '',
    sale_price: product.sale_price.toString() || '',
  });

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validar que solo se ingresen números y puntos en los campos de precio y stock
    if ((name === "stock" || name === "sale_price") && !/^\d*\.?\d*$/.test(value)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingrese un valor numérico válido.',
      });
      return;
    }

    // Validar que el valor no sea negativo para el campo de "Precio de Venta"
    if (name === "sale_price" && parseFloat(value) < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El precio de venta no puede ser negativo.',
      });
      return;
    }

    // Validar que no haya punto decimal en el campo de stock
    if (name === 'stock' && value.includes('.')) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El campo de stock no debe contener un punto decimal.',
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = () => {
    // Realizar la solicitud al backend para actualizar el producto
    fetch('http://localhost:3001/updateProduct/' + product.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
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

  const showSuccessAlert = () => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Se ha actualizado el producto',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="modify-container">
      <div className="full-width-container-modify">
        <div className="sidebar-modify green-background-modify">
          <div className="logo-container-modify">
            <img src={logo} alt="Logo" className="logo-modify" />
          </div>
          <div className="menu-modify">
            <Link to="/homeAdmin">
              <button className="menu-button-modify" type="button">
                Inicio
              </button>
            </Link>
            <Link to="/inventory">
              <button className="menu-button-modify">Gestionar inventario</button>
            </Link>
            <Link to="/login">
              <button className="menu-button-last-homeAdmin">Cerrar Sesión</button>
            </Link>
          </div>
        </div>
        <div className="content-modify white-background-modify">
          <div className="product-form-container">
            <h1>Detalles del Producto</h1>
            <form className="product-form">
              <div className="form-group-modify">
                <label>ID:</label>
                <input type="text" defaultValue={product.id} readOnly />
              </div>
              <div className="form-group-modify">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group-modify">
                <label>Presentación:</label>
                <input
                  type="text"
                  name="presentation"
                  value={formData.presentation}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group-modify">
                <label>Stock:</label>
                <input
                  type="text"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group-modify">
                <label>Precio de Venta:</label>
                <input
                  type="text"
                  name="sale_price"
                  value={formData.sale_price}
                  onChange={handleInputChange}
                />
              </div>
              <Link to="/inventory">
                <button className="modify-button" type="button" onClick={handleSubmit}>
                  Actualizar
                </button>
              </Link>
            </form>
          </div>
          {/* Botones de redes sociales */}
          <div className="social-icons-modify">
            <h1 className='welcome-modify'>Welcome @Admin</h1>
            <button className="social-button-modify">
              <img src={facebook} alt="Facebook" className="social-button-img-modify" />
            </button>
            <button className="social-button-modify">
              <img src={twitter} alt="Twitter" className="social-button-img-modify" />
            </button>
            <button className="social-button-modify">
              <img src={instagram} alt="Instagram" className="social-button-img-modify" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modify;
