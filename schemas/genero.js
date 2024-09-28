const { Sequelize } = require('sequelize');
const database = require('../db');
const Filme = require('./filme');

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


module.exports = Genero;

