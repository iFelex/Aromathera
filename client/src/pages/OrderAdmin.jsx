import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/Order.css';
import logo from '../imgs/logo_transparent.png';
import facebook from '../imgs/facebook.png';
import twitter from '../imgs/twitter.png';
import instagram from '../imgs/instagram.png';
import { Link } from 'react-router-dom';
import { serverAddress } from '../config';

function Order() {
    const [orders, setOrders] = useState([]);
    const [expandedCarts, setExpandedCarts] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);


    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await fetch(`http://${serverAddress}:3001/allOrderClient/`);
                const data = await response.json();
                console.log(data)
                setOrders(data);

                const detailsPromises = data.map(async (order) => {
                    const cartResponse = await fetch(`http://${serverAddress}:3001/getShoppingCart/${order.cart_id}`);
                    const cartData = await cartResponse.json();
                    return { orderId: order.id, cartDetails: cartData };
                });

                const detailsData = await Promise.all(detailsPromises);
                setOrderDetails(detailsData);
                setExpandedCarts(detailsData.map(() => false));

            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }

        fetchOrders();
    }, []);

    const toggleExpand = (index) => {
        setExpandedCarts((prevExpandedCarts) =>
            prevExpandedCarts.map((expanded, i) => (i === index ? !expanded : expanded))
        );
    };


    return (
        <div className="orders-container">
            <div className="full-width-container-orders">
                <div className="sidebar-orders green-background-orders">
                    <div className="logo-container-orders">
                        <img src={logo} alt="Logo" className="logo-orders" />
                    </div>
                    <div className="menu-orders">
                        <Link to="/homeAdmin">
                            <button className="menu-button-orders" type="button">
                                Inicio
                            </button>
                        </Link>
                        <Link to="/inventory">
                            <button className="menu-button-orders">Gestionar Inventario</button>
                        </Link>
                        <Link to="/orderAdmin">
                            <button className="menu-button-add">Gestión de pedidos</button>
                        </Link>
                        <Link to="/login">
                            <button className="menu-button-last-homeAdmin">Cerrar Sesión</button>
                        </Link>
                    </div>
                </div>
                <div className="content-orders white-background-orders">
                    <div className="order_table-container">
                        <h1>Pedidos</h1>
                        <table className="order_table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Estado</th>
                                    <th>Fecha Orden</th>
                                    <th>Detalle</th>
                                    <th>Gestión</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <React.Fragment key={order.id}>
                                        <tr>
                                            <td>{order.id}</td>
                                            <td>{order.status}</td>
                                            <td>{order.createdAt}</td>
                                            <td>
                                                <button
                                                    className="show-hide-button"
                                                    onClick={() => toggleExpand(index)}
                                                >
                                                    {expandedCarts[index] ? 'Ocultar' : 'Mostrar'}
                                                </button>
                                            </td>
                                            <td>
                                                {/* Nuevos botones de acciones */}
                                                <button onClick={() => handleCancelOrder(order.id)}>Cancelar</button>
                                                <button onClick={() => handleApproveOrder(order.id)}>Aprobar</button>
                                            </td>
                                        </tr>
                                        {expandedCarts[index] && (
                                            <tr>
                                                <td colSpan="5">
                                                    <div>
                                                        <p>Nombre: {orderDetails[index].cartDetails.name}</p>
                                                        <p>Cantidad: {orderDetails[index].cartDetails.stock}</p>
                                                        <p>Precio: ${orderDetails[index].cartDetails.sale_price * orderDetails[index].cartDetails.stock}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}


                            </tbody>
                        </table>
                    </div>

                    <div className="social-icons-orders">
                        <h1 className="welcome-orders">Welcome @User</h1>
                        <button className="social-button-orders">
                            <img
                                src={facebook}
                                alt="Facebook"
                                className="social-button-img-orders"
                            />
                        </button>
                        <button className="social-button-orders">
                            <img
                                src={twitter}
                                alt="Twitter"
                                className="social-button-img-orders"
                            />
                        </button>
                        <button className="social-button-orders">
                            <img
                                src={instagram}
                                alt="Instagram"
                                className="social-button-img-orders"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;