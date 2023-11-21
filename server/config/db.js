import {Sequelize} from 'sequelize'

//const db = new Sequelize('database_nombre', 'usuario', 'contraseña',{
const db = new Sequelize('aromatheratests', 'tu_usuario', 'tu_contraseña',{
    host:'localhost',
    dialect: 'mysql'
})  

export default db