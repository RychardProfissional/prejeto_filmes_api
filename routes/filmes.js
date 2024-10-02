const express = require('express');
const route = express.Router({});

const controller = require('../controllers/filmes_controller.js');

route.get('/all', controller.getFilmes);
route.get('/by_id/:id', controller.getFilmeById);
route.get('/filter', controller.getFilmeByFilters);
route.post('/', controller.postFilme);
route.put('/:id', controller.putFilme);
route.delete('/:id', controller.deleteFilme);

module.exports = route;
