const { Sequelize } = require('sequelize');
const database = require('../db');

const Filme = database.define('filme', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    year: {
        type: Sequelize.INTEGER
    },
    rated: {
        type: Sequelize.STRING
    },
    released: {
        type: Sequelize.STRING
    },
    runtime: {
        type: Sequelize.STRING
    },
    director: {
        type: Sequelize.STRING
    },
    writer: {
        type: Sequelize.STRING
    },
    actors: {
        type: Sequelize.STRING
    },
    plot: {
        type: Sequelize.STRING
    },
    language: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING
    },
    awards: {
        type: Sequelize.STRING
    },
    poster: {
        type: Sequelize.STRING
    },
    ratings: {
        type: Sequelize.STRING
    },
    metascore: {
        type: Sequelize.STRING
    },
    imdbRating: {
        type: Sequelize.STRING
    },
    imdbVotes: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    },
    dvd: {
        type: Sequelize.STRING
    },
    boxOffice: {
        type: Sequelize.STRING
    },
    production: {
        type: Sequelize.STRING
    },
    website: {
        type: Sequelize.STRING
    },
    response: {
        type: Sequelize.STRING
    }
});

module.exports = Filme;
