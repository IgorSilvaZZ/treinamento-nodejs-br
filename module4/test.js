const { deepEqual } = require("assert");

const database = require("./database");

const DEFAULT_ITEM_CADASTRAR = { nome: "Flash", poder: "Speed", id: 2 };

//Criei para nao ficar com herois repetidos toda hora
const DEFAULT_ITEM_PESQUISAR = { id: 1, nome: "Batman", poder: "Milionario" };

const DEFAULT_ITEM_ATUALIZAR = {
  id: 2,
  nome: "Laterna Verde",
  poder: "Energia do Anel",
};

describe("Suite de manipulaçao de Herois", () => {
  before(async function () {
    await database.cadastrar(DEFAULT_ITEM_PESQUISAR);
    await database.cadastrar(DEFAULT_ITEM_ATUALIZAR);
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

  it("Deve atualizar um heroroi por id", async () => {
    const expected = {
      ...DEFAULT_ITEM_ATUALIZAR,
      nome: "Batman",
      poder: "Dinheiro",
    };

    const novosDados = {
      nome: "Batman",
      poder: "Dinheiro",
    };

    await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novosDados);

    const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id);

    deepEqual(resultado, expected);
  });
});
