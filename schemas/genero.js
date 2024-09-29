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
    },
    description: {
        type: Sequelize.STRING
    }
});


module.exports = Genero;

