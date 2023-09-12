import React, { useState } from 'react';
import '../styles/Egress.css';
import logo from '../imgs/logo_transparent.png';
import facebook from '../imgs/facebook.png';
import twitter from '../imgs/twitter.png';
import instagram from '../imgs/instagram.png';
import { Link } from 'react-router-dom';

function Egress() {
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
            <button className="menu-button-last-egress">Cerrar Sesión</button>
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
                <input type="text" value={product.nombre} readOnly />
              </div>
              <div className="form-group">
                <label>Presentación:</label>
                <input type="text" value={product.presentacion} readOnly />
              </div>
              <div className="form-group">
                <label>Stock:</label>
                <input type="text" value={product.stock} readOnly />
              </div>
              <div className="form-group">
                <label>Precio de Venta:</label>
                <input type="text" value={product.precioVenta} readOnly />
              </div>
              <div className="form-group">
                <label>Unidades a egresar:</label>
                <input
                  type="text"
                  value={userComment}
                  onChange={handleUserCommentChange}
                />
              </div>
              <button className="egress-button" onClick={handleCommentSubmit}>
                Egresar
              </button>
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
