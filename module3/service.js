const axios = require("axios");

const URL = `https://swapi.dev/api/people`;

async function obterPessoas(nome) {
  const url = `${URL}/?search=${nome}&format=json`;

  console.log(url);

  const response = await axios.get(url);

  return response.data.results.map(mapearPessoas);
}

function mapearPessoas(item) {
  return {
    nome: item.name,
    peso: item.height,
  };
}

module.exports = { obterPessoas };
