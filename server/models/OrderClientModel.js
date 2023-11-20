//importar la configuracion de la data base
import db from "../config/db.js";
//importar sequalize
import {DataTypes} from "sequelize";

const OrderClientModel = db.define('order_clients', {
    cart_id: {
        type: DataTypes.INTEGER, 
        references: {
          model: 'shopping_carts',
          key: 'id',
        },
    },
    status: { type: DataTypes.STRING(30) }
})

export default OrderClientModel