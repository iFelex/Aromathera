import {Sequelize} from 'sequelize'

//const db = new Sequelize('database_nombre', 'usuario', 'contraseña',{
const db = new Sequelize('aromatheratest', 'prodAromathera', 't^yC23-1F27Cp',{
    host:'rds-mysql-aromathera.caoqqp2ox8ky.us-east-1.rds.amazonaws.com',
    dialect: 'mysql'
})  

export default db