const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3001; 

// Middleware para analizar datos JSON en las solicitudes
app.use(express.json());

// Habilita CORS para permitir solicitudes desde http://localhost:5173
app.use(cors({ origin: 'http://localhost:5173' }));

// Ruta para el inicio de sesión
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Imprime las credenciales en la consola
  console.log('Credenciales de inicio de sesión recibidas:');
  
  if(username == "Daniel" && password == "querty123"){
    console.log("acceso concedido\n");
  }else{
    console.log("acceso denegado\n");
  }

  // Puedes realizar la lógica de autenticación aquí, por ejemplo, verificar las credenciales

  // Simulación de una respuesta exitosa
  res.status(200).json({ message: 'Inicio de sesión exitoso' });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en el puerto ${PORT}`);
});
