const database = require('./db');
database.sync();

const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
dotenv.config();

const filmes = require('./routes/filmes');
const generos = require('./routes/generos');
const port = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/filmes', filmes);
app.use('/generos', generos);

app.get('/', (req, res) => {
  res.status(200).send('API funcionando!');
  res.end();
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Acesso em: http://localhost:${port}`);
});

