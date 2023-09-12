import {Sequelize} from 'sequelize'

//const db = new Sequelize('database_nombre', 'usuario', 'contraseña',{
const db = new Sequelize('aromatheratests', 'root', 'root',{
    host:'localhost',
    dialect: 'mysql'
})  

export default db