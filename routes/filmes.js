const express = require('express');
const route = express.Router({});

const controller = require('../controllers/filmes_controller.js');

route.get('/', controller.getFilmes);
route.get('/:id', controller.getFilmeById);
route.get('/:name', controller.getFilmeByName);
route.post('/', controller.postFilme);
route.put('/:id', controller.putFilme);
route.delete('/:id', controller.deleteFilme);

module.exports = route;
