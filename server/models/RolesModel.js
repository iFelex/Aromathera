//importar la configuracion de la data base
import db from "../config/db.js";
//importar sequalize
import {DataTypes} from "sequelize";

const UserModel = db.define('soaps', {
    rolename: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING }, 
})

export default SoapModel