//importar la configuracion de la data base
import db from "../config/db.js";
//importar sequalize
import {DataTypes} from "sequelize";

const OrderHistoryModel = db.define('order_history', {
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

export default OrderHistoryModel