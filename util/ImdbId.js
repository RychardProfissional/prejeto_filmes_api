const Filme = require('../schemas/filme');

function New() {
  const randomNumber = Math.floor(Math.random() * 90000000) + 10000000; // Gera um número com 8 dígitos
  return `tt${randomNumber}`;
}

async function newUnique() {
  let uniqueId = generateId();
  
  while (await Filme.findByPk(uniqueId)) {
    uniqueId = generateId();
  }
  
  return uniqueId;
}

function has(imdbId) {
  const regex = /^tt\d{8}$/;
  return regex.test(imdbId);
}

module.exports = {
  newUnique,
  has,
}
