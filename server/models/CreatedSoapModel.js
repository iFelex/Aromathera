//importar la configuracion de la data base
import db from "../config/db.js";
//importar sequalize
import {DataTypes} from "sequelize";

const CreatedSoapModel = db.define('created_soaps', {
    color: { type: DataTypes.STRING },
    essence: { type: DataTypes.STRING }, 
    form: { type: DataTypes.STRING },
})

export default CreatedSoapModel