import React, { useState } from 'react';
import '../styles/income.css';
import logo from '../imgs/logo_transparent.png';
import facebook from '../imgs/facebook.png';
import twitter from '../imgs/twitter.png';
import instagram from '../imgs/instagram.png';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

function Income() {
  // Datos del producto
  const location = useLocation();
  const { product } = location.state || {};

  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    name: product.name || '',
    presentation: product.presentation || '',
    stock: product.stock || 0, // Inicializamos el stock en 0
    sale_price: product.sale_price || '',
  });

  // Estado para las unidades a ingresar
  const [unitsToAdd, setUnitsToAdd] = useState('');

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar cambios en las unidades a ingresar
  const handleUnitsChange = (e) => {
    setUnitsToAdd(e.target.value);
  };

  // Manejar el envío del formulario
  const handleSubmit = () => {
    // Sumar las unidades ingresadas al stock actual
    const updatedStock = formData.stock + parseInt(unitsToAdd);

    // Actualizar el valor del stock en el formulario
    setFormData({
      ...formData,
      stock: updatedStock,
    });

    // Realizar la solicitud al backend para actualizar el producto
    fetch('http://localhost:3001/updateProduct/' + product.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        stock: updatedStock, // Enviar el stock actualizado al servidor
      }),
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
    <div className="income-container">
      <div className="full-width-container-income">
        <div className="sidebar-income green-background-income">
          <div className="logo-container-income">
            <img src={logo} alt="Logo" className="logo-income" />
          </div>
          <div className="menu-income">
            <Link to="/homeAdmin">
              <button className="menu-button-income" type="button">
                Inicio
              </button>
            </Link>
            <Link to="/inventory">
              <button className="menu-button-income">Gestionar inventario</button>
            </Link>
            <Link to="/login">
              <button className="menu-button-last-homeAdmin">Cerrar Sesión</button>
            </Link>
          </div>
        </div>
        <div className="content-income white-background-income">
          <div className="product-form-container">
            <h1>Detalles del Producto</h1>
            <form className="product-form">
              <div className="form-group-income">
                <label>ID:</label>
                <input type="text" defaultValue={product.id} readOnly />
              </div>
              <div className="form-group-income">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group-income">
                <label>Presentación:</label>
                <input
                  type="text"
                  name="presentation"
                  value={formData.presentation}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group-income">
                <label>Stock:</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  readOnly // Hacer el campo de stock de solo lectura
                />
              </div>
              <div className="form-group-income">
                <label>Precio de Venta:</label>
                <input
                  type="number"
                  name="sale_price"
                  value={formData.sale_price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group-income">
                <label>Unidades a ingresar:</label>
                <input
                  type="number"
                  name="units"
                  value={unitsToAdd}
                  onChange={handleUnitsChange}
                />
              </div>
              <Link to="/inventory">
                <button className="income-button" type="button" onClick={handleSubmit}>
                  Ingresar
                </button>
              </Link>
            </form>
          </div>
          {/* Botones de redes sociales */}
          <div className="social-icons-income">
            <h1 className='welcome-income'>Welcome @Admin</h1>
            <button className="social-button-income">
              <img src={facebook} alt="Facebook" className="social-button-img-income" />
            </button>
            <button className="social-button-income">
              <img src={twitter} alt="Twitter" className="social-button-img-income" />
            </button>
            <button className="social-button-income">
              <img src={instagram} alt="Instagram" className="social-button-img-income" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Income;
