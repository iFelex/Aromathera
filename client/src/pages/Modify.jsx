import React, { useState } from 'react';
import '../styles/Modify.css';
import logo from '../imgs/logo_transparent.png';
import facebook from '../imgs/facebook.png';
import twitter from '../imgs/twitter.png';
import instagram from '../imgs/instagram.png';
import { Link } from 'react-router-dom';

function Modify() {
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
            <button className="menu-button-last-modify">Cerrar Sesión</button>
          </div>
        </div>
        <div className="content-modify white-background-modify">
          <div className="product-form-container">
            <h1>Detalles del Producto</h1>
            <form className="product-form">
              <div className="form-group-modify">
                <label>ID:</label>
                <input type="text" defaultValue={product.id} />
              </div>
              <div className="form-group-modify">
                <label>Nombre:</label>
                <input type="text" defaultValue={product.nombre} />
              </div>
              <div className="form-group-modify">
                <label>Presentación:</label>
                <input type="text" defaultValue={product.presentacion} />
              </div>
              <div className="form-group-modify">
                <label>Stock:</label>
                <input type="text" defaultValue={product.stock} />
              </div>
              <div className="form-group-modify">
                <label>Precio de Venta:</label>
                <input type="text" defaultValue={product.precioVenta} />
              </div>
              <div className="form-group-modify">
              </div>
              <button className="modify-button" onClick={handleCommentSubmit}>
                Actualizar
              </button>
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
