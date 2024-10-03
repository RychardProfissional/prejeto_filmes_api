const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('projeto_filmes', 'admfilmesonline', 'safeps123', {
    host: 'localhost',
    dialect: 'postgres',
    options: {
        port: 5432
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Conectado ao banco de dados');
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    });

module.exports = sequelize;