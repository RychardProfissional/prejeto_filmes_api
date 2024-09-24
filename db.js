const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('prejeto_filmes', 'admfilmesonline', 'safeps123', {
    host: 'localhost',
    dialect: 'postgres',
    options: {
        port: 5432
    }
});

module.exports = sequelize;