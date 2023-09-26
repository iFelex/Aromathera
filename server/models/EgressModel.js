//importar la configuracion de la data base
import db from "../config/db.js";
//importar sequalize
import {DataTypes} from "sequelize";

const EgressModel = db.define('egresses', {
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
    egress_units: { type: DataTypes.INTEGER}, 
})

export default EgressModel