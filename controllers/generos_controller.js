const database = require('../db');
const Genero = require('../schemas/genero');

const getGeneros = async(req, res) => {
  const generos = await Genero.findAll();
  res.status(200).send(generos);
};

const getGeneroById = async(req, res) => {
  const genero = await Genero.findByPk(req.params.id);
  res.status(200).send(genero);
};

const postGenero = (req, res) => {
  res.status(201).send('postFilme');
};

const putGenero = async (req, res) => {
  const { id } = req.params;
  
  try {
    const genero = await Genero.findByPk(id);
    if (!genero) {
      return res.status(404).send({ error: 'Genero não encontrado' });
    }

    const bodyData = req.body;

    const updatedData = Object.keys(bodyData).reduce((acc, key) => {
      if (bodyData[key] !== undefined) {
        acc[key] = bodyData[key];
      }
      return acc;
    }, {});

    await genero.update(updatedData);

    const updatedFilme = await Genero.findByPk(id);

    res.status(200).send(updatedFilme);
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: 'Não foi possível atualizar o filme' });
  }
};

const deleteGenero = (req, res) => {


  res.status(200).send(req.body);
};

module.exports = {
  getGeneros,
  getGeneroById,
  postGenero,
  putGenero,
  deleteGenero,
};

