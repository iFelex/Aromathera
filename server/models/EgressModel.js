//importar la configuracion de la data base
import db from "../config/db.js";
//importar sequalize
import {DataTypes} from "sequelize";

const EgressModel = db.define('egress', {
    cliente_id: {
      type: Sequelize.INTEGER, // si no sirve intentar con "DataTypes.INTEGER"
      references: {
        model: 'clients',
        key: 'id',
      },
    },
    producto_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'products',
        key: 'id',
      },
    },
    egress_units: { type: DataTypes.INTEGER}, 
    egress_date: { type: DataTypes.DATE},
})

export default EgressModel