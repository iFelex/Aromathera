//importar la configuracion de la data base
import db from "../config/db.js";
//importar sequalize
import {DataTypes} from "sequelize";

const SoapModel = db.define('soaps', {
    color: { type: DataTypes.STRING },
    form: { type: DataTypes.STRING },
})

export default SoapModel