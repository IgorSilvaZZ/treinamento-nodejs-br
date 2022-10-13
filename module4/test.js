const { deepEqual } = require("assert");

const database = require("./database");

const DEFAULT_ITEM_CADASTRAR = { nome: "Flash", poder: "Speed", id: 1 };

describe("Suite de manipulaçao de Herois", () => {
  it("Deve pesquisar um heroi usando arquivos", async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;

    const [resultado] = await database.listar(expected.id);

    deepEqual(resultado, expected);
  });

  it("Deve cadastrar um heroi, usando arquivos", async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;

    // Cadastramos o heroi com id assim modificando o arquivo original, adicionando o heroi com o id juntamente com os anteriores
    const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR);

    // Listamos o arquivo atualizado com o novo heroi cadastrado
    const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id);

    deepEqual(actual, expected);
  });
});
