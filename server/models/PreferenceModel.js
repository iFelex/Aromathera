//importar la configuracion de la data base
import db from "../config/db.js";
//importar sequalize
import {DataTypes} from "sequelize";

const PreferenceModel = db.define('preferences', {

    name: { type: DataTypes.STRING },
    presentation: { type: DataTypes.STRING },
    stock: { type: DataTypes.INTEGER},
    sale_price: { type: DataTypes.DOUBLE },
    image: {type: DataTypes.STRING},    
},{
  timestamps: false
});

export default PreferenceModel