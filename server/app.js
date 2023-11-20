import express from "express"
import cors from 'cors'
import session from 'express-session'
import bcryptjs from 'bcryptjs'
import db from "./config/db.js"
import routes from './routes/routes.js'
import userModel from './models/UserModel.js'

const app = express();
const PORT = 3001;

app.use(express.json());

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(cors({ origin: '*' }));
app.use('/', routes)


try {
  await db.authenticate()
  console.log('Conexion a db exitosa')
} catch (error) {
  console.log('Eroor en conexion de db')
}
app.post('/api/login', async (req, res) => {
  const { username, password, rol } = req.body;
  try {
    const user = await userModel.findOne({ where: { username } });
    console.log(user)
    if (user.username == username && password == user.password) {
      console.log("acceso concedido\n");
      const userRole = user.rol;
      req.session.user = { id: user.id, username: user.username };
      console.log(req.session.user)
      return res.status(200).json({ acceso: true, rol: userRole }); // Enviar el rol en la respuesta
    }
  } catch (error) {
    console.log("acceso denegado\n");
    res.status(401).send({ acceso: false });
    console.log(error)
  }
});
//Inicia el servidor
app.listen(PORT, (req, res) => {
  console.log(`Servidor backend escuchando en http://localhost:3001`);
});