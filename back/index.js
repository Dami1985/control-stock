const express = require('express'); 
const { Client } = require('pg'); 
const cors = require('cors');
const app = express(); 
const puerto = 4000; 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'dami',
  password: '12345678',
  database: 'dbv1',
}); 

client.connect()
  .then(() => console.log('Conectado a la base de datos PostgreSQL'))
  .catch(err => console.error('Error al conectar a la base de datos', err.stack));

const getUsers = async (req, res) => {
  try {
    const queryGet = 'SELECT * FROM public.users';
    const result = await client.query(queryGet);
    console.log(result.rows);
    res.json(result.rows); 
  } catch (err) {
    console.error('Error al obtener usuarios', err.stack);
    res.status(500).send('Error al obtener usuarios');
  }
};

const getArticulos = async (req, res) => {
  try {
    const queryGet = 'SELECT * FROM public.articulos';
    const result = await client.query(queryGet);
    console.log(result.rows);
    res.json(result.rows); 
  } catch (err) {
    console.error('Error al obtener artículos', err.stack);
    res.status(500).send('Error al obtener artículos');
  }
};

app.get('/getusers', getUsers); 
app.get('/getarticulos', getArticulos); 

app.get('/', (req, res) => {
  res.send('funciona correctamente');
}); 

app.post('/adduser', async (req, res) => {
  console.log('Solicitud POST recibida en /adduser');
  const { username, password, email } = req.body;
  console.log('Datos del nuevo usuario:', username, password, email);
  try {
    if (!username || !password || !email) {
      throw new Error('El nombre de usuario, la contraseña y el correo electrónico son obligatorios');
    }

    const queryInsert = 'INSERT INTO public.users (username, password, email) VALUES ($1, $2, $3) RETURNING *';
    const result = await client.query(queryInsert, [username, password, email]);
    console.log('Usuario agregado:', result.rows[0]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al agregar usuario:', err.message, err.stack);
    res.status(500).send(`Error al agregar usuario: ${err.message}`);
  }
});

app.listen(puerto, () => {
  console.log(`El servidor está inicializado en el puerto ${puerto}`);
});

console.log("fun ok");