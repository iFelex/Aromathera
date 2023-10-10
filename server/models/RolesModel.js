//importar la configuracion de la data base
import db from "../config/db.js";
//importar sequalize
import {DataTypes} from "sequelize";

const RolesModel = db.define('roles', {
    rolename: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING }, 
})

export default RolesModel