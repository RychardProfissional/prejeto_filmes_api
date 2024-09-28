const database = require('../db');
const Filme = require('../schemas/filme');
const Genero = require('../schemas/genero');
const imdbID = require('../util/ImdbId');

const getFilmes = async(req, res) => {
  const filmes = await Filme.findAll({  
    include: { 
      model: Genero,
      through: { attributes: [] }
    },
  });

  res.status(200).send(filmes);
};

const getFilmeById = async(req, res) => {
  const filme = await Filme.findByPk(req.params.id);
  res.status(200).send(filme);
};

const getFilmeByName = async(req, res) => {
  const filme = await Filme.findOne({ where: { name: req.params.name } });
  res.status(200).send(filme);
};

const postFilme = async (req, res) => {
  const { 
    title, 
    plot, 
    released, 
    poster, 
    categorias, // Campo para as categorias selecionadas
    runtime, 
    genres, // Campo para os gêneros selecionados
    language, 
    ratings, 
  } = req.body;

  const filme = {
    imdbID: await imdbID.newUnique(), // Se necessário, mantenha ou remova
    title,
    plot,
    released,
    poster,
    categorias, // Se necessário
    runtime,
    genres, // Se necessário
    language,
    ratings,
  };

  try {
    const createdFilme = await Filme.create(filme);
    console.log(createdFilme);
    res.status(201).send(createdFilme);
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: 'Erro ao criar o filme' });
  }
};

const putFilme = async (req, res) => {
  const { id } = req.params;

  try {
    const filme = await Filme.findByPk(id);
    if (!filme) {
      return res.status(404).send({ error: 'Filme não encontrado' });
    }

    const bodyData = req.body;

    const updatedData = Object.keys(bodyData).reduce((acc, key) => {
      if (bodyData[key] !== undefined) {
        acc[key] = bodyData[key];
      }
      return acc;
    }, {});

    await filme.update(updatedData);

    const updatedFilme = await Filme.findByPk(id);

    res.status(200).send(updatedFilme);
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: 'Não foi possível atualizar o filme' });
  }
};

const deleteFilme = async (req, res) => {
  const { id } = req.params;

  try {
    const filme = await Filme.findByPk(id);
    if (!filme) {
      res.status(404).send({ error: 'Filme não encontrado' });
      return 
    }

    await filme.destroy();

    res.status(200).send({ message: 'Filme deletado com sucesso' });
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: 'Não foi possível deletar o filme' });
  }
};

module.exports = {
  getFilmes,
  getFilmeById,
  getFilmeByName,
  postFilme,
  putFilme,
  deleteFilme,
};
