const { deepEqual } = require("assert");

const database = require("./database");

const DEFAULT_ITEM_CADASTRAR = { nome: "Flash", poder: "Speed", id: 2 };

//Criei para nao ficar com herois repetidos toda hora
const DEFAULT_ITEM_PESQUISAR = { id: 1, nome: "Batman", poder: "Milionario" };

describe("Suite de manipulaçao de Herois", () => {
  before(async function () {
    await database.cadastrar(DEFAULT_ITEM_PESQUISAR);
  });

  it("Deve pesquisar um heroi usando arquivos", async () => {
    const expected = DEFAULT_ITEM_PESQUISAR;

    const [resultado] = await database.listar(expected.id);

    deepEqual(resultado, expected);
  });

  it("Deve cadastrar um heroi, usando arquivos", async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;

    // Cadastramos o heroi com id assim modificando o arquivo original, adicionando o heroi com o id juntamente com os anteriores
    const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR);

    console.log(resultado);

    // Listamos o arquivo atualizado com o novo heroi cadastrado
    const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id);

    deepEqual(actual, expected);
  });

  it("Deve remover um heroi por id", async () => {
    const expected = true;

    const resultado = await database.removerPorId(DEFAULT_ITEM_CADASTRAR.id);

    deepEqual(resultado, expected);
  });
});
