//importar la configuracion de la data base
import db from "../config/db.js";
//importar sequalize
import {DataTypes} from "sequelize";

const OrderClientModel = db.define('order_client', {
    id_order: { type: DataTypes.INTEGER},
    cliente_id: {
        type: DataTypes.INTEGER, 
        references: {
          model: 'clients',
          key: 'id',
        },
    },
    producto_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'products',
          key: 'id',
        },
    },
    quantity: { type: DataTypes.INTEGER},
})

export default OrderClientModel