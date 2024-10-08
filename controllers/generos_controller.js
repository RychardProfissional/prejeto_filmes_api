const Genero = require('../schemas/genero');

const getGeneros = async(req, res) => {
  const generos = await Genero.findAll();
  res.status(200).send(generos);
};

const getGeneroById = async(req, res) => {
  const { id } = req.params;
  const genero = await Genero.findByPk(id);
  res.status(200).send(genero);
};

const postGenero = async (req, res) => {
  const { name, description } = req.body;

  const genero = {
    name,
    description
  };

  if (!name) {
    res.status(400).send({
      message: 'O campo nome é obrigatório',
    });
    return;
  }

  if (!description) {
    res.status(400).send({
      message: 'O campo descrição é obrigatório',
    });
    return;
  }

  await Genero.create(genero)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Algum erro aconteceu',
      });
    });
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

const deleteGenero = async (req, res) => {
  const { id } = req.params;

  try {
    const genero = await Genero.findByPk(id);
    if (!genero) {
      res.status(404).send({ error: 'Genero não encontrado' });
      return 
    }

    await genero.destroy();

    res.status(200).send({ message: 'Genero deletado com sucesso' });
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: 'Não foi possível deletar o genero' });
  }
};

module.exports = {
  getGeneros,
  getGeneroById,
  postGenero,
  putGenero,
  deleteGenero,
};

