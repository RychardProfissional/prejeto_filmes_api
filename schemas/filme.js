const { Sequelize } = require('sequelize');
const database = require('../db');

const Filme = database.define('filme', {
    imdbID: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    title: { 
        type: Sequelize.STRING,
        allowNull: false
    },
    plot: { 
        type: Sequelize.STRING
    },
    rated: { 
        type: Sequelize.INTEGER
    },
    released: { 
        type: Sequelize.STRING
    },
    runtime: { 
        type: Sequelize.STRING
    },
    poster: { 
        type: Sequelize.STRING
    },
    ratings: { 
        type: Sequelize.STRING
    },
    language: { 
        type: Sequelize.STRING
    },
});

module.exports = Filme;
