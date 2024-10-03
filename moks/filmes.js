const database = require('../db');
const Filme = require('../schemas/filme');

const API_KEY = '357b41a4';
const TOTAL_FILMES = 200;

function gerarTituloAleatorio() {
  const vogais = ['a', 'e', 'i', 'o', 'u'];
  const consoantes = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];

  const vogal1 = vogais[Math.floor(Math.random() * vogais.length)];
  const consoante = consoantes[Math.floor(Math.random() * consoantes.length)];
  const vogal2 = vogais[Math.floor(Math.random() * vogais.length)];

  return `${vogal1}${consoante}${vogal2}`;
}

async function fetchFilmePorTitulo(titulo) {
  return await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(titulo)}`).then((response) => response.json()).catch((error) => null);
}

async function main() {
  try {
    const filmesSalvos = [];
    database.sync();

    while (filmesSalvos.length < TOTAL_FILMES) {
      const tituloAleatorio = gerarTituloAleatorio();
      console.log("antes fetchFilmePorTitulo");
      const filmeImdb = await fetchFilmePorTitulo(tituloAleatorio);
      console.log("depois fetchFilmePorTitulo");

      if (filmeImdb) {
        const imdbID = filmeImdb.imdbID;
        if (!filmesSalvos.includes(imdbID)) {
          await Filme.create({
            imdbID: imdbID,
            title: filmeImdb.Title,
            plot: filmeImdb.Plot,
            rated: parseInt(filmeImdb.Rated) || 0,
            released: filmeImdb.Released,
            runtime: filmeImdb.Runtime,
            poster: filmeImdb.Poster,
            ratings: JSON.stringify(filmeImdb.Ratings),
            language: filmeImdb.Language,
          });
          filmesSalvos.push(imdbID);
          console.log(`Filme salvo: ${filmeImdb.Title}`);
        } else {
          console.log(`Filme já existe: ${filmeImdb.Title}`);
        }
      } else {
        console.log(`Filme não encontrado: ${tituloAleatorio}`);
      }
    }

    console.log('Processo de salvamento concluído!');
  } catch (error) {
    console.error('Erro ao executar o script:', error);
  }
}

main();

