const { Op } = require('sequelize');
const database = require('../db');
const Filme = require('../schemas/filme');
const Genero = require('../schemas/genero');
const imdbID = require('../util/ImdbId');

const getFilmes = async(req, res) => {
  console.log("getFilmes")
  const filmes = await Filme.findAll({  
    include: { 
      model: Genero,
      through: { attributes: [] }
    },
  });

  res.status(200).send(filmes);
};

const getFilmeById = async(req, res) => {
  console.log("getFilmeById")
  const filme = await Filme.findByPk(req.params.id, {  
    include: { 
      model: Genero,
      through: { attributes: [] }
    },
  });
  res.status(200).send(filme);
};

const getFilmeByFilters = async(req, res) => {
  console.log("filters")
  const queryParams = req.query.filter;
  const quantity = req.query.quantity;
  console.log(queryParams)
  const { filters, include } = applyFilters(queryParams);
  const filmes = await Filme.findAll({
    where: filters,
    include,
    limit: quantity || 50, 
  });
  res.status(200).send(filmes);
};

const postFilme = async (req, res) => {
  console.log("postFilme")
  const { 
    title, 
    plot, 
    released, 
    poster, 
    runtime, 
    genres, 
    language, 
    rated
  } = req.body;

  const filme = {
    imdbID: await imdbID.newUnique(),
    title,
    plot,
    released,
    poster,
    runtime,
    language,
    rated,
    ratings: Math.floor(Math.random() * 100) + 1,
  };
  console.log(filme)
  try {
    const createdFilme = await Filme.create(filme);
    console.log(createdFilme);
    if (genres && genres.length > 0) {
      await createdFilme.setGeneros(genres);
    }
    res.status(201).send(createdFilme);
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: 'Erro ao criar o filme' });
  }
};

const putFilme = async (req, res) => {
  console.log("putFilme");
  const { id } = req.params;

  try {
    const filme = await Filme.findByPk(id, {
      include: [{ model: Genero }],
      through: { attributes: [] }
    });

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

    console.log(updatedData);

    // Atualiza os campos do filme
    await filme.update(updatedData);

    if (Array.isArray(bodyData.generos)) {
      console.log(bodyData.generos)
      await filme.setGeneros(bodyData.generos);
    } else if (bodyData.generos === undefined) {
      console.log('Gêneros não foram atualizados, pois o valor é undefined');
    }

    const updated = await Filme.findByPk(req.params.id, {  
      include: { 
        model: Genero,
        through: { attributes: [] }
      },
    });

    res.status(200).send(updated)
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: 'Não foi possível atualizar o filme' });
  }
};

const deleteFilme = async (req, res) => {
  console.log("deleteFilme")
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

function applyFilters(queryParams) {
  let filters = {}; 
  let include = []; 

  Object.keys(queryParams).forEach((field) => {
    const { operation, value } = queryParams[field];

    const sequelizeOp = Op[operation] || Op.eq;
    switch (field) {
      case "genre":
        include.push({
          model: Genero,
          where: value,
        });
        break;
      default:
        filters[field] = {
          [sequelizeOp]: value,
        };
        break;
    }
  });

  return { filters, include };
}

module.exports = {
  getFilmes,
  getFilmeById,
  getFilmeByFilters,
  postFilme,
  putFilme,
  deleteFilme,
};
