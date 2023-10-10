//importar la configuracion de la data base
import db from "../config/db.js";
//importar sequalize
import {DataTypes} from "sequelize";

const UserModel = db.define('users', {
    username: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING }, 
    full_name: { type: DataTypes.STRING }, 
    email: { type: DataTypes.STRING },
    rol: { type: DataTypes.STRING },
})

export default UserModel