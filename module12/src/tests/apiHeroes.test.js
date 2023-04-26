const assert = require("assert");

const api = require("../api");

const MOCK_HEROI_CADASTRAR = {
  nome: "Chapolin",
  poder: "Marreta Bionica",
};

const MOCK_HEROI_INICIAL = {
  nome: "Gavião Negro",
  poder: "Mira",
};

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inh1eGFkYXNpbHZhIiwiaWQiOiI3Y2VjN2QwYi00YzYwLTQ2NGYtOWI0Yy1mMDgzOGVlNGI5YTMiLCJpYXQiOjE2ODE3NzczMDd9.akWToFGkjjzlqr6RgbkIEwJDpJjF6ostzKbfu5XBQBE";

const headers = {
  Authorization: TOKEN,
};

let app = {};

describe("Suite de testes na API Heros", function () {
  this.beforeAll(async () => {
    app = await api;
  });

  it("Listar /herois", async () => {
    const result = await app.inject({
      method: "GET",
      url: "/herois?skip=0&limit=10",
      headers,
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
      headers,
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
      headers,
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
    const NAME = MOCK_HEROI_CADASTRAR.nome;

    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}&nome=${NAME}`,
      headers,
    });

    const statusCode = result.statusCode;

    const dados = JSON.parse(result.payload);

    assert.deepEqual(statusCode, 200);
    assert.ok(dados[0].nome === NAME);
  });

  it("Cadastrar Herois /herois", async () => {
    const result = await app.inject({
      method: "POST",
      url: `/herois`,
      payload: JSON.stringify(MOCK_HEROI_CADASTRAR),
      headers,
    });

    const statusCode = result.statusCode;

    const { message, _id } = JSON.parse(result.payload);

    assert.ok(statusCode === 200);
    assert.notStrictEqual(_id, undefined);
    assert.deepEqual(message, "Heroi cadastrado com sucesso!");
  });

  it("Atualizar PATCH /herois/:id", async () => {
    const result = await app.inject({
      method: "POST",
      url: `/herois`,
      payload: JSON.stringify(MOCK_HEROI_INICIAL),
      headers,
    });

    const { _id } = JSON.parse(result.payload);

    const expected = {
      poder: "Super Mira",
    };

    const resultAtualizar = await app.inject({
      method: "PATCH",
      url: `/herois/${_id}`,
      payload: JSON.stringify(expected),
      headers,
    });

    const statusCode = result.statusCode;

    const dados = JSON.parse(resultAtualizar.payload);

    assert.ok(statusCode === 200);
    assert.deepEqual(dados.message, "Heroi atualizado com sucesso!");
  });

  it("Atualizar PATCH /herois/:id - Nao deve atualizar com ID incorreto", async () => {
    let _id = "63ed6a6e6ec238c45cbdeb7b";

    const payload = {
      poder: "Super Mira",
    };

    const resultAtualizar = await app.inject({
      method: "PATCH",
      url: `/herois/${_id}`,
      payload: JSON.stringify(payload),
      headers,
    });

    const expected = {
      statusCode: 412,
      error: "Precondition Failed",
      message: "Id não encontrado",
    };

    const dados = resultAtualizar;

    assert.deepEqual(dados.result, expected);
  });

  it("Remover DELETE - /herois/:id", async () => {
    const resultCriar = await app.inject({
      method: "POST",
      url: `/herois`,
      payload: JSON.stringify(MOCK_HEROI_INICIAL),
      headers,
    });

    const { _id } = JSON.parse(resultCriar.payload);

    const response = await app.inject({
      method: "DELETE",
      url: `/herois/${_id}`,
      headers,
    });

    const statusCode = response.statusCode;

    assert.ok(statusCode === 200);
    assert.deepEqual(response.result.message, "Heroi Removido com sucesso!");
  });

  it("Remover DELETE - /herois/:id - Não deve remover com ID incorreto", async () => {
    const _id = "63ed6a6e6ec238c45cbdeb7b";

    const response = await app.inject({
      method: "DELETE",
      url: `/herois/${_id}`,
      headers,
    });

    const expected = {
      statusCode: 412,
      error: "Precondition Failed",
      message: "Id não encontrado",
    };

    const dados = response;

    assert.deepEqual(dados.result, expected);
  });
});
