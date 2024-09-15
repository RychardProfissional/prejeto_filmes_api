const {faker} = require('@faker-js/faker');

const getMoks = (quantidade) => {
  const filmes = [];

  for (let i = 0; i < quantidade; i++) {
    filmes.push({
      id: i + 1,
      name: faker.lorem.words(3),
      descricao: faker.lorem.paragraph(),
      data_lancamento: `${faker.date.past().toISOString().slice(0, 10)}`,
      data_lancamento_site: `${faker.date.recent().toISOString().slice(0, 10)}`,
      imagem: faker.image.url(640, 480, 'movie', true),
      link: faker.internet.url(),
      categorias: [faker.lorem.word(), faker.lorem.word()],
      duracao: `${faker.number.int({min: 1, max: 3})}h ${faker.number.int({min: 0, max: 59})}min`,
      generos: [faker.lorem.word(), faker.lorem.word()],
      idiomas: [faker.lorem.word(), faker.lorem.word()],
      avaliacao: faker.number.int({min: 10, max: 50}) / 10,
      classificacao: (['L', '10', '12', '14', '16', '18'][faker.number.int({min: 0, max: 5})]), 
      sinopse: faker.lorem.paragraph(),
    });
  }

  return filmes;
};

module.exports = {
  getMoks,
};

