const express = require('express');
const route = express.Router({});

const controller = require('../controllers/generos_controller.js');

route.get('/', controller.getGeneros);
route.get('/:id', controller.getGeneroById);
route.post('/', controller.postGenero);
route.put('/:id', controller.putGenero);
route.delete('/:id', controller.deleteGenero);

module.exports = route;
