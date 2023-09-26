import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/Inventory.css';
import logo from '../imgs/logo_transparent.png';
import facebook from '../imgs/facebook.png';
import twitter from '../imgs/twitter.png';
import instagram from '../imgs/instagram.png';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Inventory() {
  const [products, setProducts] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownHover = (e) => {
    e.preventDefault();
  };

  const handleDeleteClick = (productId) => {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Realizar la solicitud DELETE al servidor
        fetch(`http://localhost:3001/deleteProduct/${productId}`, {
          method: 'DELETE',
        })
          .then((response) => response.json())
          .then((data) => {
            // Manejar la respuesta del servidor
            console.log('Respuesta del servidor:', data);

            // Mostrar una alerta de éxito
            showSuccessAlert();

            // Actualizar la lista de productos después de eliminar
            setProducts(products.filter((product) => product.id !== productId));
          })
          .catch((error) => {
            console.error('Error al eliminar el producto:', error);
          });
      }
    });
  };

  const showSuccessAlert = () => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'El producto ha sido eliminado con éxito',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  useEffect(() => {
    fetch('http://localhost:3001/allProducts')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="inventory-container">
      <div className="full-width-container-inventory">
        <div className="sidebar-inventory green-background-inventory">
          <div className="logo-container-inventory">
            <img src={logo} alt="Logo" className="logo-inventory" />
          </div>
          <div className="menu-inventory">
            <Link to="/homeAdmin">
              <button className="menu-button-inventory">Inicio</button>
            </Link>
            <Link to="/add">
              <button className="menu-button-inventory">Agregar producto</button>
            </Link>
            <Link to="/egressHistory">
              <button className="menu-button-inventory">Historial de gastos</button>
            </Link>
            <Link to="/incomeHistory">
              <button className="menu-button-homeAdmin">Historial de ingresos</button>
            </Link>

            <Link to="/login">
              <button className="menu-button-last-homeAdmin">Cerrar Sesión</button>
            </Link>
          </div>
        </div>
        <div className="content-inventory white-background-inventory">
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
                    <td>{product.name}</td>
                    <td>{product.presentation}</td>
                    <td>{product.stock}</td>
                    <td>{product.sale_price}</td>
                    <td>
                      <div className="dropdown">
                        <button
                          className="dropbtn"
                          onClick={toggleDropdown}
                          onMouseOver={handleDropdownHover}
                        >
                          Gestionar
                        </button>
                        {isDropdownOpen && (
                          <div className="dropdown-content">
                            <Link to="/income" state={{ product }}>
                              Ingreso
                            </Link>
                            <Link to="/egress" state={{ product }}>
                              Egreso
                            </Link>
                            <Link to="/modify" state={{ product }}>
                              Modificar
                            </Link>
                            <button
                              className="delete-button"
                              onClick={() => handleDeleteClick(product.id)}
                            >
                              Eliminar
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="social-icons-inventory">
            <h1 className="welcome-inventory">Welcome @Admin</h1>
            <button className="social-button-inventory">
              <img
                src={facebook}
                alt="Facebook"
                className="social-button-img-inventory"
              />
            </button>
            <button className="social-button-inventory">
              <img
                src={twitter}
                alt="Twitter"
                className="social-button-img-inventory"
              />
            </button>
            <button className="social-button-inventory">
              <img
                src={instagram}
                alt="Instagram"
                className="social-button-img-inventory"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
