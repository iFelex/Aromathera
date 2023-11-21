// Transaction.js

import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/Transaction.css';
import epayco from '../imgs/epayco.png';
import logo from '../imgs/logo_transparent.png';
import facebook from '../imgs/facebook.png';
import twitter from '../imgs/twitter.png';
import instagram from '../imgs/instagram.png';
import { Link } from 'react-router-dom';
import { serverAddress } from '../config';

function Transaction() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch(`http://${serverAddress}:3001/allTransaccion/`);
        const data = await response.json();
        console.log('Datos de transacciones:', data);
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    }

    fetchTransactions();
  }, []);

  return (
    <div className="transactions-container">
      <div className="full-width-container-transactions">
        <div className="sidebar-transactions green-background-transactions">
          <div className="logo-container-transactions">
            <img src={logo} alt="Logo" className="logo-transactions" />
          </div>
          <div className="menu-transactions">
            <Link to="/homeAdmin">
              <button className="menu-button-transactions">Inicio</button>
            </Link>
            <Link to="/inventory">
              <button className="menu-button-transactions">Gestionar inventario</button>
            </Link>
            <Link to="/egressHistory">
              <button className="menu-button-transactions">Historial de gastos</button>
            </Link>
            <Link to="/incomeHistory">
              <button className="menu-button-transactions">Historial de ingresos</button>
            </Link>
            <Link to="/orderAdmin">
              <button className="menu-button-transactions">Gestión de pedidos</button>
            </Link>
            <Link to="/transaction">
              <button className="menu-button-add">Historial de transacciones</button>
            </Link>
            <Link to="/login"></Link>
            <Link to="/login">
              <button className="menu-button-last-transactions">Cerrar Sesión</button>
            </Link>

          </div>
        </div>
        <div className="content-transactions white-background-transactions">
          <div className="product-table-container">
            <h1>Historial de Transacciones</h1>
            <table className="product-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ID Cliente</th>
                  <th>Monto</th>
                  <th>Fecha de Creación</th>
                  {/* Otros campos que desees mostrar en la tabla */}
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>{transaction.id_client}</td>
                    <td>{transaction.money}</td>
                    <td>{transaction.createdAt}</td>
                    {/* Otros campos correspondientes a la transacción */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="social-icons-transactions">
            <h1 className="welcome-transactions">Welcome @User</h1>
            <button className="social-button-transactions">
              <img
                src={facebook}
                alt="Facebook"
                className="social-button-img-transactions"
              />
            </button>
            <button className="social-button-transactions">
              <img
                src={twitter}
                alt="Twitter"
                className="social-button-img-transactions"
              />
            </button>
            <button className="social-button-transactions">
              <img
                src={instagram}
                alt="Instagram"
                className="social-button-img-transactions"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transaction;
