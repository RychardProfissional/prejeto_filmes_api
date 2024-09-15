const mokfilmes = require('../moks/filmes');

const getFilmes = (req, res) => {
  var filmes = []
  const { filter } = req.query
  switch (filter) {
    case 'recentes':
      filmes = mokfilmes.getMoks(10).sort((a, b) => new Date(b.data_lancamento) - new Date(a.data_lancamento));
    break
    case 'avaliados':
      filmes = mokfilmes.getMoks(10).sort((a, b) => b.avaliacao - a.avaliacao);
    break
    case 'classificados':
      filmes = mokfilmes.getMoks(10).sort((a, b) => b.classificacao.localeCompare(a.classificacao));
    break
    case 'populares':
      filmes = mokfilmes.getMoks(10).sort((a, b) => b.duracao.localeCompare(a.duracao));
    break
  }
  res.status(200).send(filmes);
};

const getFilmeById = (req, res) => {
  res.send('getFilme');
};

const postFilme = (req, res) => {
  res.send('postFilme');
};

const putFilme = (req, res) => {
  res.send('putFilme');
};

const deleteFilme = (req, res) => {
  res.send('deleteFilme');
};

module.exports = {
  getFilmes,
  getFilmeById,
  postFilme,
  putFilme,
  deleteFilme,
};

