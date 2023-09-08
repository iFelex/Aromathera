import express from "express"
import cors from 'cors'
//importar la configuracion de la data base
import db from "./config/db.js";
import soapRoutes from './routes/routes.js';
//import soapRoutes from '.routes/routes.js'
const app = express();
const PORT = 3001; 

// Middleware para analizar datos JSON en las solicitudes
app.use(express.json());

// Habilita CORS para permitir solicitudes desde http://localhost:5173
app.use(cors({ origin: 'http://localhost:5173' }));
app.use('/soaps', soapRoutes)

try {
  await db.authenticate()
  console.log('Conexion a la base de datos')
} catch (error) {
  console.log(`Error de conexion: ${error}`)
}

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Imprime las credenciales en la consola
  console.log('Credenciales de inicio de sesión recibidas:');
  console.log(username, password);

  if(username == "Daniel" && password == "qwerty123"){
    console.log("acceso concedido\n");
    // Agrega un 1 a la respuesta
    res.status(200).send({ acceso: true });
  }else{
    console.log("acceso denegado\n");
    res.status(401).send({ acceso: false });
  }
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:3001`);
});
