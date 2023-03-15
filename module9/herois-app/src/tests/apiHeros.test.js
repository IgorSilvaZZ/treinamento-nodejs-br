const assert = require("assert");

const api = require("../api");

let app = {};

describe("Suite de testes na API Heros", function () {
  this.beforeAll(async () => {
    app = await api;
  });

  it("Listar /herois", async () => {
    const result = await app.inject({
      method: "GET",
      url: "/herois?skip=0&limit=10",
    });

    const statusCode = result.statusCode;

    const dados = JSON.parse(result.payload);

    assert.deepEqual(statusCode, 200);
    assert.ok(Array.isArray(dados));
  });

  it("Listar /herois - deve retornar 10 registros", async () => {
    const TAMANHO_LIMITE = 3;

    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`,
    });

    const statusCode = result.statusCode;

    const dados = JSON.parse(result.payload);

    assert.deepEqual(statusCode, 200);
    assert.ok(dados.length === TAMANHO_LIMITE);
  });

  it("Listar /herois - deve retornar um erro limit incorreto", async () => {
    const TAMANHO_LIMITE = "AEEE";

    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`,
    });

    const errorResult = {
      statusCode: 400,
      error: "Bad Request",
      message: '"limit" must be a number',
      validation: { source: "query", keys: ["limit"] },
    };

    assert.deepEqual(result.statusCode, 400);
    assert.deepEqual(result.payload, JSON.stringify(errorResult));
  });

  it("Listar /herois - deve filtrar um item", async () => {
    const TAMANHO_LIMITE = 1000;
    const NAME = "Homem Aranha - 1676507888432";

    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}&nome=${NAME}`,
    });

    const statusCode = result.statusCode;

    const dados = JSON.parse(result.payload);

    assert.deepEqual(statusCode, 200);
    assert.ok(dados[0].nome === NAME);
  });
});
