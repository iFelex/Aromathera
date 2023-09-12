//importar la configuracion de la data base
import db from "../config/db.js";
//importar sequalize
import {DataTypes} from "sequelize";

const ProductModel = db.define('products', {
    name: { type: DataTypes.STRING },
    presentation: { type: DataTypes.STRING }, 
    stock: { type: DataTypes.STRING }, 
    salePrice: { type: DataTypes.DOUBLE },
})

export default ProductModel