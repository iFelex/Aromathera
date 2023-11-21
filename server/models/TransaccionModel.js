//importar la configuracion de la data base
import db from "../config/db.js";
//importar sequalize
import {DataTypes} from "sequelize";

const TransaccionModel = db.define('transaccions', {
  id_client: {
        type: DataTypes.INTEGER, 
        references: {
          model: 'clients',
          key: 'id',
        },
    },
  money: { type: DataTypes.INTEGER},
})

export default TransaccionModel