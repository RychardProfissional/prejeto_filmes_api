const { Sequelize } = require('sequelize');
const database = require('../db');

const Genero = database.define('genero', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Genero.belongsToMany(Filme, {
    through: 'FilmeGeneros',  // Mesma tabela intermediária
    foreignKey: 'generoId',   // Chave estrangeira para Genero
    otherKey: 'filmeId'       // Chave estrangeira para Filme
});

module.exports = Genero;

