const database = require('../db');
const Filme = require('../schemas/filme');
const imdbID = require('../util/ImdbId');

const getFilmes = async(req, res) => {
  const filmes = await Filme.findAll();
  res.send(filmes);
};

const getFilmeById = async(req, res) => {
  const filme = await Filme.findByPk(req.params.id);
  res.status(200).send(filme);
};

const getFilmeByName = async(req, res) => {
  const filme = await Filme.findOne({ where: { name: req.params.name } });
  res.status(200).send(filme);
};

const postFilme = async(req, res) => {
  const { 
    title, 
    year, 
    rated, 
    released, 
    runtime, 
    genre, 
    director, 
    writer, 
    actors, 
    plot, 
    language, 
    country, 
    awards, 
    poster, 
    ratings, 
    metascore, 
    imdbRating, 
    imdbVotes, 
    type, 
    dvd, 
    boxOffice, 
    production, 
    website, 
    response 
  } = req.body;

  const filme = {
    imdbID: imdbID.newUnique(),
    title,
    year,
    rated,
    released,
    runtime,
    genre,
    director,
    writer,
    actors,
    plot,
    language,
    country,
    awards,
    poster,
    ratings,
    metascore,
    imdbRating,
    imdbVotes,
    type,
    dvd,
    boxOffice,
    production,
    website,
    response
  };

  const createdFilme = await Filme.create(filme)
    .catch((e) => {
      console.error(e);
      res.status(500);
    })

  res.status(201).send(createdFilme);
};

const putFilme = async (req, res) => {
  const { id } = req.params;

  var filme = null;
  try {
    filme = await Filme.findByPk(id)
    if (!filme) {
      throw new Error('Filme não encontrado');
    }
  } catch (e) {
    console.error(e);
    res.status(404).send({ error: 'Filme Não encontrado' });
    return;
  }

  const {
    title,
    year,
    rated,
    released,
    runtime,
    genre,
    director,
    writer,
    actors,
    plot,
    language,
    country,
    awards,
    poster,
    ratings,
    metascore,
    imdbRating,
    imdbVotes,
    type,
    dvd,
    boxOffice,
    production,
    website,
    response
  } = req.body;

  const updatedFilme = await filme.update({
    title,
    year,
    rated,
    released,
    runtime,
    genre,
    director,
    writer,
    actors,
    plot,
    language,
    country,
    awards,
    poster,
    ratings,
    metascore,
    imdbRating,
    imdbVotes,
    type,
    dvd,
    boxOffice,
    production,
    website,
    response
  })
    .catch((e) => {
      console.error(e);
      res.status(500);
      return null
    });

  if (!updatedFilme) {
    res.status(500).send({ error: 'não foi possivel atualizar o filme' });
    return;
  }

  res.status(200).send(updatedFilme);
};

const deleteFilme = (req, res) => {
  res.send('deleteFilme');
};

module.exports = {
  getFilmes,
  getFilmeById,
  getFilmeByName,
  postFilme,
  putFilme,
  deleteFilme,
};

