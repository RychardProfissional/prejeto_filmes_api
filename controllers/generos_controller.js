const mokfilmes = require('../moks/filmes');
const database = require('../db');
const Filme = require('../schemas/filme');

const getGeneros = async(req, res) => {
  // var filmes = []
  // const { filter } = req.query
  // switch (filter) {
  //   case 'recentes':
  //     filmes = mokfilmes.getMoks(10).sort((a, b) => new Date(b.data_lancamento) - new Date(a.data_lancamento));
  //   break
  //   case 'avaliados':
  //     filmes = mokfilmes.getMoks(10).sort((a, b) => b.avaliacao - a.avaliacao);
  //   break
  //   case 'classificados':
  //     filmes = mokfilmes.getMoks(10).sort((a, b) => b.classificacao.localeCompare(a.classificacao));
  //   break
  //   case 'populares':
  //     filmes = mokfilmes.getMoks(10).sort((a, b) => b.duracao.localeCompare(a.duracao));
  //   break
  // }
  // res.status(200).send(filmes);

  const filmes = await Filme.findAll();
  res.send(filmes);
};

const getGeneroById = async(req, res) => {
  const filme = await Filme.findByPk(req.params.id);
  res.status(200).send(filme);
// const getFilmeById = (req, res) => {
//   const { id } = req.params
//   console.log(`id: ${id}`)
//   res.status(200).send({...mokfilmes.getMok(), id});
};

const postGenero = (req, res) => {
  res.send('postFilme');
};

const putGenero = (req, res) => {
  res.send('putFilme');
};

const deleteGenero = (req, res) => {
  res.send('deleteFilme');
};

module.exports = {
  getGeneros,
  getGeneroById,
  postGenero,
  putGenero,
  deleteGenero,
};

