import React, { useState } from 'react';
import '../styles/Income.css';
import logo from '../imgs/logo_transparent.png';
import facebook from '../imgs/facebook.png';
import twitter from '../imgs/twitter.png';
import instagram from '../imgs/instagram.png';
import { Link } from 'react-router-dom';

function Income() {
  // Datos del producto
  const product = {
    id: 1,
    nombre: 'Producto 1',
    presentacion: 'Presentación 1',
    stock: 10,
    precioVenta: 20.0,
  };

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
            <button className="menu-button-last-income">Cerrar Sesión</button>
          </div>
        </div>
        <div className="content-income white-background-income">
          <div className="product-form-container">
            <h1>Detalles del Producto</h1>
            <form className="product-form">
              <div className="form-group-income">
                <label>ID:</label>
                <input type="text" value={product.id} readOnly />
              </div>
              <div className="form-group-income">
                <label>Nombre:</label>
                <input type="text" value={product.nombre} readOnly />
              </div>
              <div className="form-group-income">
                <label>Presentación:</label>
                <input type="text" value={product.presentacion} readOnly />
              </div>
              <div className="form-group-income">
                <label>Stock:</label>
                <input type="text" value={product.stock} readOnly />
              </div>
              <div className="form-group-income">
                <label>Precio de Venta:</label>
                <input type="text" value={product.precioVenta} readOnly />
              </div>
              <div className="form-group-income">
                <label>Unidades a ingresar:</label>
                <input
                  type="text"
                  value={userComment}
                  onChange={handleUserCommentChange}
                />
              </div>
              <button className="income-button" onClick={handleCommentSubmit}>
                Ingresar
              </button>
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
