import React, { useState } from 'react';
import '../styles/Add.css';
import logo from '../imgs/logo_transparent.png';
import facebook from '../imgs/facebook.png';
import twitter from '../imgs/twitter.png';
import instagram from '../imgs/instagram.png';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Add() {
  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    name: '',
    presentation: '',
    stock: '',
    sale_price: '',
  });

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validar que solo se ingresen letras en el campo de nombre
    if (name === 'name' && !/^[A-Za-z\s]+$/.test(value)) {
      return;
    }

    // Validar que solo se ingresen números en los campos de stock y precio
    if ((name === 'stock' || name === 'sale_price') && !/^\d+(\.\d{0,2})?$/.test(value)) {
      return;
    }

    // Validar que no haya punto decimal en el campo de stock
    if (name === 'stock' && value.includes('.')) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = () => {
    // Validar que los campos de stock y precio de venta sean números positivos
    if (isNaN(formData.stock) || parseFloat(formData.stock) < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingrese un stock válido.',
      });
      return;
    }

    if (isNaN(formData.sale_price) || parseFloat(formData.sale_price) < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingrese un precio de venta válido.',
      });
      return;
    }

    // Realizar la solicitud al backend para crear el producto
    fetch('http://localhost:3001/createProduct/', {
      method: 'POST',
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

        // Limpiar el formulario después de crear el producto
        setFormData({
          name: '',
          presentation: '',
          stock: '',
          sale_price: '',
        });
      })
      .catch((error) => {
        console.error('Error al crear el producto:', error);
      });
  };

  const showSuccessAlert = () => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Se ha creado el producto',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="add-container">
      <div className="full-width-container-add">
        <div className="sidebar-add green-background-add">
          <div className="logo-container-add">
            <img src={logo} alt="Logo" className="logo-add" />
          </div>
          <div className="menu-add">
            <Link to="/homeAdmin">
              <button className="menu-button-add" type="button">
                Inicio
              </button>
            </Link>
            <button className="menu-button-add">Agregar producto</button>
            <Link to="/inventory">
              <button className="menu-button-add">Gestionar inventario</button>

            </Link>

            <Link to="/login">
              <button className="menu-button-last-homeAdmin">Cerrar Sesión</button>
            </Link>
          </div>
        </div>
        <div className="content-add white-background-add">
          <div className="product-form-container">
            <h1>Detalles del Producto</h1>
            <form className="product-form">
              <div className="form-group-add">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group-add">
                <label>Presentación:</label>
                <input
                  type="text"
                  name="presentation"
                  value={formData.presentation}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group-add">
                <label>Stock:</label>
                <input
                  type="text"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group-add">
                <label>Precio de Venta:</label>
                <input
                  type="text"
                  name="sale_price"
                  value={formData.sale_price}
                  onChange={handleInputChange}
                />
              </div>
              <Link to="/inventory">
                <button className="add-button" type="button" onClick={handleSubmit}>
                  Aceptar
                </button>
              </Link>

            </form>
          </div>
          {/* Botones de redes sociales */}
          <div className="social-icons-add">
            <h1 className="welcome-add">Welcome @Admin</h1>
            <button className="social-button-add">
              <img
                src={facebook}
                alt="Facebook"
                className="social-button-img-add"
              />
            </button>
            <button className="social-button-add">
              <img
                src={twitter}
                alt="Twitter"
                className="social-button-img-add"
              />
            </button>
            <button className="social-button-add">
              <img
                src={instagram}
                alt="Instagram"
                className="social-button-img-add"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;
