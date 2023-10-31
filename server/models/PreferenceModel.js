//importar la configuracion de la data base
import db from "../config/db.js";
//importar sequalize
import {DataTypes} from "sequelize";

const PreferenceModel = db.define('preferences', {
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
    name: { type: DataTypes.STRING },
    preference_units: { type: DataTypes.INTEGER},
    presentation: { type: DataTypes.STRING },
    sale_price: { type: DataTypes.DOUBLE },
    image: {type: DataTypes.STRING},    
})

export default PreferenceModel