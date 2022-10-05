const { obterPessoas } = require("./service");

// Criando meu proprio Map
Array.prototype.meuMap = function (callback) {
  const novoArrayMapeado = [];

  for (let indice = 0; indice < this.length - 1; indice++) {
    const resultado = callback(this[indice], indice);
    novoArrayMapeado.push(resultado);
  }

  return novoArrayMapeado;
};

async function main() {
  try {
    const { results } = await obterPessoas("a");

    /* const names = []; */

    /* results.forEach(function (item) {
      names.push(item.name);
    }); */

    /* const names = results.map(function (pessoa) {
      return pessoa.name;
    }); */

    /* const names = results.map((pessoa) => pessoa.name); */

    // const names = results.meuMap((pessoa) => pessoa.name);

    const names = results.meuMap(function (pessoa, indice) {
      return pessoa.name;
    });

    console.log(names);
  } catch (error) {
    console.log("error: ", error);
  }
}

main();
