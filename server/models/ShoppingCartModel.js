//importar la configuracion de la data base
import db from "../config/db.js";
//importar sequalize
import {DataTypes} from "sequelize";

const ShoppingCartModel = db.define('shopping_carts', {
    id: { type: DataTypes.INTEGER, primaryKey: true},
    name: { type: DataTypes.STRING },
    presentation: { type: DataTypes.STRING }, 
    stock: { type: DataTypes.STRING }, 
    sale_price: { type: DataTypes.DOUBLE },
    image: {type: DataTypes.STRING},
    active_status: {type: DataTypes.TINYINT},
    id_user: { type: DataTypes.INTEGER }
}, {
    timestamps: false
});

export default ShoppingCartModel