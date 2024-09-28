const dotenv = require('dotenv');
dotenv.config();

const database = require('./db');
const Genero = require('./schemas/genero');
const Filme = require('./schemas/filme');

Genero.belongsToMany(Filme, {
  through: 'FilmeGeneros',  
  foreignKey: 'generoId',   
  otherKey: 'filmeId'       
});

Filme.belongsToMany(Genero, {
  through: 'FilmeGeneros',  
  foreignKey: 'filmeId',    
  otherKey: 'generoId'      
});

database.sync()
  .then(() => console.log('Conectado ao banco de dados'))
  .catch((err) => {
    console.log(err);
  });

const express = require('express');
const cors = require('cors');

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

