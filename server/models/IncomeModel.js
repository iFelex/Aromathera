//importar la configuracion de la data base
import db from "../config/db.js";
//importar sequalize
import {DataTypes} from "sequelize";

const IncomeModel = db.define('incomes', {
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
    
    income_units: { type: DataTypes.INTEGER}, 
})

export default IncomeModel