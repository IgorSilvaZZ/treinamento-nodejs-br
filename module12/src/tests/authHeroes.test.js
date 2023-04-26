const assert = require("assert");

const api = require("../api");

const Context = require("../db/strategies/base/contextStrategy");
const Postgres = require("../db/strategies/postgres/postgres");
const UserSchema = require("../db/strategies/postgres/schemas/userSchema");

const USER = {
  username: "xuxadasilva",
  password: "123",
};

const USER_DB = {
  ...USER,
  password: "$2b$04$JRSGogs25NZi3qdwNPmdCuaJWR9k68SldkRVXeuXbZdThGIZTF/Vi",
};

describe("Auth tests suite", function () {
  this.beforeAll(async () => {
    app = await api;

    const connectionPostgres = await Postgres.connect();
    const model = await Postgres.defineModel(connectionPostgres, UserSchema);
    const postgresContext = new Context(
      new Postgres(connectionPostgres, model)
    );
    await postgresContext.update(null, USER_DB, true);
  });

  it("Deve obter um token", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/login",
      payload: USER,
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.deepEqual(statusCode, 200);
    assert.ok(dados.token.length > 10);
  });

  it.only("Deve retornar não autorizado ao tentar ober um login errado!", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/login",
      payload: {
        username: "igorsilva",
        password: "123",
      },
    });

    const statusCode = response.statusCode;

    assert.deepEqual(statusCode, 401);
    assert.deepEqual(response.result.error, "Unauthorized");
  });
});
