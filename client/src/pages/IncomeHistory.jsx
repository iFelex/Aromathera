import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/IncomeHistory.css';
import logo from '../imgs/logo_transparent.png';
import facebook from '../imgs/facebook.png';
import twitter from '../imgs/twitter.png';
import instagram from '../imgs/instagram.png';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { serverAddress } from '../config';


function IncomeHistory() {
  const [incomes, setincomees] = useState([]);
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
    fetch(`http://${serverAddress}:3001/allIncome`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Datos de ingresos:', data); // Agregar para depuración
        setincomees(data);
      })
      .catch((error) => console.error('Error fetching incomees:', error));

    // Realizar la solicitud GET al servidor para obtener todos los clientes
    fetch(`http://${serverAddress}:3001/allClient`)
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
    fetch(`http://${serverAddress}:3001/allProducts`)
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
    <div className="incomehistory-container">
      <div className="full-width-container-incomehistory">
        <div className="sidebar-incomehistory green-background-incomehistory">
          <div className="logo-container-incomehistory">
            <img src={logo} alt="Logo" className="logo-incomehistory" />
          </div>
          <div className="menu-incomehistory">
            <Link to="/homeAdmin">
              <button className="menu-button-incomehistory">Inicio</button>
            </Link>
            <Link to="/add">
              <button className="menu-button-incomehistory">Agregar producto</button>
            </Link>
            <Link to="/incomeHistory">
              <button className="menu-button-incomehistory">Historial de gastos</button>
            </Link>
            <Link to="/incomeHistory">
              <button className="menu-button-homeAdmin">Historial de ingresos</button>
            </Link>

            <Link to="/login">
              <button className="menu-button-last-homeAdmin">Cerrar Sesión</button>
            </Link>
          </div>
        </div>
        <div className="content-incomehistory white-background-incomehistory">
          <div className="product-table-container">
            <h1>Historial de ingresos</h1>
            <table className="product-table">
              <thead>
                <tr>
                  <th>ID de Ingreso</th>
                  <th>Cliente</th>
                  <th>Producto</th>
                  <th>Unidades Ingresadas</th>
                  <th>Fecha de Ingreso</th>
                </tr>
              </thead>
              <tbody>
                {incomes && incomes.map((income) => (
                  <tr key={income.id}>
                    <td>{income.id}</td>
                    <td>{clients[income.cliente_id]}</td>
                    <td>{products[income.producto_id]}</td>
                    <td>{income.income_units}</td>
                    <td>{income.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="social-icons-incomehistory">
            <h1 className="welcome-incomehistory">Welcome @Admin</h1>
            <button className="social-button-incomehistory">
              <img
                src={facebook}
                alt="Facebook"
                className="social-button-img-incomehistory"
              />
            </button>
            <button className="social-button-incomehistory">
              <img
                src={twitter}
                alt="Twitter"
                className="social-button-img-incomehistory"
              />
            </button>
            <button className="social-button-incomehistory">
              <img
                src={instagram}
                alt="Instagram"
                className="social-button-img-incomehistory"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomeHistory;
