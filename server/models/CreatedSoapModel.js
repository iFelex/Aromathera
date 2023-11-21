//importar la configuracion de la data base
import db from "../config/db.js";
//importar sequalize
import {DataTypes} from "sequelize";

const CreatedSoapModel = db.define('created_soaps', {
    color: { type: DataTypes.STRING },
    esencia: { type: DataTypes.STRING }, 
    forma: { type: DataTypes.STRING },
    frase_corta: { type: DataTypes.STRING },
})

export default CreatedSoapModel