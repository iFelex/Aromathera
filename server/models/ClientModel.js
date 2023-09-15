//importar la configuracion de la data base
import db from "../config/db.js";
//importar sequalize
import {DataTypes} from "sequelize";

const ClientModel = db.define('clients', {
    username: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING }, 
    full_name: { type: DataTypes.STRING, allowNull: true }, 
    email: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING},
    phone_number: {type: DataTypes.STRING},
})

export default ClientModel