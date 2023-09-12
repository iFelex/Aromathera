import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/Inventory.css';
import logo from '../imgs/logo_transparent.png';
import facebook from '../imgs/facebook.png';
import twitter from '../imgs/twitter.png';
import instagram from '../imgs/instagram.png';

function Inventory() {
  // Define un estado para almacenar los datos de los productos
  const [products, setProducts] = useState([
    { id: 1, nombre: 'Producto 1', presentacion: 'Presentación 1', stock: 10, precioVenta: 20.0 },
    { id: 2, nombre: 'Producto 2', presentacion: 'Presentación 2', stock: 15, precioVenta: 25.0 },
    // Agrega más productos si es necesario
  ]);

  // Define un estado para controlar si el menú desplegable está abierto
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Función para abrir o cerrar el menú desplegable
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Evitar que el menú desplegable se abra al pasar el mouse
  const handleDropdownHover = (e) => {
    e.preventDefault();
  };

  return (
    <div className="inventory-container">
      <div className="full-width-container-inventory">
        <div className="sidebar-inventory green-background-inventory">
          <div className="logo-container-inventory">
            <img src={logo} alt="Logo" className="logo-inventory" />
          </div>
          <div className="menu-inventory">
            <button className="menu-button-inventory">Inicio</button>
            <button className="menu-button-inventory">Agregar producto</button>
            <button className="menu-button-inventory">Historial</button>
            <button className="menu-button-last-inventory">Cerrar Sesión</button>
          </div>
        </div>
        <div className="content-inventory white-background-inventory">
          {/* Tabla de productos */}
          <div className="product-table-container">
            <h1>Lista de Productos</h1>
            <table className="product-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Presentación</th>
                  <th>Stock</th>
                  <th>Precio de Venta</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.nombre}</td>
                    <td>{product.presentacion}</td>
                    <td>{product.stock}</td>
                    <td>{product.precioVenta}</td>
                    <td>
                      <div className="dropdown">
                        <button
                          className="dropbtn"
                          onClick={toggleDropdown}
                          onMouseOver={handleDropdownHover} // Evitar que se abra al pasar el mouse
                        >
                          Gestionar
                        </button>
                        {isDropdownOpen && (
                          <div className="dropdown-content">
                            <a href="/income">Ingreso</a>
                            <a href="/egress">Egreso</a>
                            <a href="https://www.youtube.com/watch?v=2DITDrh0FL4">Modificar</a>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Botones de redes sociales */}
          <div className="social-icons-inventory">
            <h1 className='welcome-inventory'>Welcome @Admin</h1>
            <button className="social-button-inventory">
              <img src={facebook} alt="Facebook" className="social-button-img-inventory" />
            </button>
            <button className="social-button-inventory">
              <img src={twitter} alt="Twitter" className="social-button-img-inventory" />
            </button>
            <button className="social-button-inventory">
              <img src={instagram} alt="Instagram" className="social-button-img-inventory" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
