import {Sequelize} from 'sequelize'

//const db = new Sequelize('database_nombre', 'usuario', 'contraseña',{
const db = new Sequelize('aromatheratests', 'prodAroma', 'tyC23-1F27Cp',{
    host:'database-1.cuiluu2ndnpr.us-east-2.rds.amazonaws.com',
    dialect: 'mysql'
})  

export default db
