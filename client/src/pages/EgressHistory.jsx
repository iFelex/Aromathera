import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/egresshistory.css';
import logo from '../imgs/logo_transparent.png';
import facebook from '../imgs/facebook.png';
import twitter from '../imgs/twitter.png';
import instagram from '../imgs/instagram.png';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function EgressHistory() {
  const [egresses, setEgresses] = useState([]);
  const [clients, setClients] = useState({});
  const [products, setProducts] = useState({});

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
    // Realizar la solicitud GET al servidor para obtener los egresos
    fetch('http://localhost:3001/allEgress')
      .then((response) => response.json())
      .then((data) => {
        console.log('Datos de egresos:', data); // Agregar para depuración
        setEgresses(data);
      })
      .catch((error) => console.error('Error fetching egresses:', error));

    // Realizar la solicitud GET al servidor para obtener todos los clientes
    fetch('http://localhost:3001/allClient')
      .then((response) => response.json())
      .then((data) => {
        console.log('Datos de clientes:', data); // Agregar para depuración
        const clientsData = {};
        data.forEach((client) => {
          clientsData[client.id] = client.full_name;
        });
        setClients(clientsData);
      })
      .catch((error) => console.error('Error fetching clients:', error));

    // Realizar la solicitud GET al servidor para obtener todos los productos
    fetch('http://localhost:3001/allProducts')
      .then((response) => response.json())
      .then((data) => {
        console.log('Datos de productos:', data); // Agregar para depuración
        const productsData = {};
        data.forEach((product) => {
          productsData[product.id] = product.name;
        });
        setProducts(productsData);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="egresshistory-container">
      <div className="full-width-container-egresshistory">
        <div className="sidebar-egresshistory green-background-egresshistory">
          <div className="logo-container-egresshistory">
            <img src={logo} alt="Logo" className="logo-egresshistory" />
          </div>
          <div className="menu-egresshistory">
            <Link to="/homeAdmin">
              <button className="menu-button-egresshistory">Inicio</button>
            </Link>
            <Link to="/add">
              <button className="menu-button-egresshistory">Agregar producto</button>
            </Link>
            <Link to="/egressHistory">
              <button className="menu-button-egresshistory">Historial de gastos</button>
            </Link>

            <Link to="/login">
              <button className="menu-button-last-homeAdmin">Cerrar Sesión</button>
            </Link>
          </div>
        </div>
        <div className="content-egresshistory white-background-egresshistory">
          <div className="product-table-container">
            <h1>Historial de gastos</h1>
            <table className="product-table">
              <thead>
                <tr>
                  <th>ID de Egreso</th>
                  <th>Cliente</th>
                  <th>Producto</th>
                  <th>Unidades Solicitadas</th>
                  <th>Fecha de Uso</th>
                </tr>
              </thead>
              <tbody>
                {egresses && egresses.map((egress) => (
                  <tr key={egress.id}>
                    <td>{egress.id}</td>
                    <td>{clients[egress.cliente_id]}</td>
                    <td>{products[egress.producto_id]}</td>
                    <td>{egress.egress_units}</td>
                    <td>{egress.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="social-icons-egresshistory">
            <h1 className="welcome-egresshistory">Welcome @Admin</h1>
            <button className="social-button-egresshistory">
              <img
                src={facebook}
                alt="Facebook"
                className="social-button-img-egresshistory"
              />
            </button>
            <button className="social-button-egresshistory">
              <img
                src={twitter}
                alt="Twitter"
                className="social-button-img-egresshistory"
              />
            </button>
            <button className="social-button-egresshistory">
              <img
                src={instagram}
                alt="Instagram"
                className="social-button-img-egresshistory"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgressHistory;
