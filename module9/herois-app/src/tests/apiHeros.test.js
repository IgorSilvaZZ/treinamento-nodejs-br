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
      url: "/herois",
    });

    const statusCode = result.statusCode;

    const dados = JSON.parse(result.payload);

    assert.deepEqual(statusCode, 200);
    assert.ok(Array.isArray(dados));
  });
});
