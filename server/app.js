import express from "express"
import cors from 'cors'
import session from 'express-session'
import bcryptjs from 'bcryptjs'
//importar la configuracion de la data base
import db from "./config/db.js"
import routes from './routes/routes.js'
import userModel from './models/UserModel.js'
//import soapRoutes from '.routes/routes.js'
const app = express();
const PORT = 3001; 

// Middleware para analizar datos JSON en las solicitudes
app.use(express.json());
//app.use(express.urlencoded({extended : false}))

// Habilita CORS para permitir solicitudes desde http://localhost:5173
app.use(cors({ origin: 'http://localhost:5173' }));
app.use('/', routes)

//const dotenv = require ('dotenv');
//dotenv.config({path: './env/.env'});


app.use(session({
  secret:'secret',
  resave: true,
  saveUninitialized: true
}));

try {
  await db.authenticate()
  console.log('Conexion a db exitosa')
} catch (error) {
  console.log('Eroor en conexion de db')
}

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  // Imprime las credenciales en la consola
  console.log('Credenciales de inicio de sesión recibidas:');
  console.log(username, password);

  //let passwordHaash = await bcryptjs.hash(password, 8);
   try {
    const user = await userModel.findOne({ where: { username } });  
    console.log(user)  
    if(user.username == username && password == user.password){
      console.log("acceso concedido\n");
      // Agrega un 1 a la respuesta
      res.status(200).send({ acceso: true });
    }else{
      console.log("acceso denegado\n");
      res.status(401).send({ acceso: false });
    }
  } catch (error) {
    console.log(error)
  }  
  
});

// Inicia el servidor
app.listen(PORT, (req, res) => {
  console.log(`Servidor backend escuchando en http://localhost:3001`);
});
