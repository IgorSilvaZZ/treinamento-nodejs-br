const assert = require("assert");

const Postgres = require("../db/strategies/postgres/postgres");
const HeroiSchema = require("../db/strategies/postgres/schemas/heroiSchema");
const Context = require("../db/strategies/base/contextStrategy");

let context = {};

const MOCK_HEROI_CADASTRAR = { nome: "Gaviao Negro", poder: "flexas" };
const MOCK_HEROI_ATUALIZAR = { nome: "Batman", poder: "Dinheiro" };

describe("Postgres Strategy", function () {
  this.timeout(Infinity);

  this.beforeAll(async function () {
    const connection = await Postgres.connect();
    const model = await Postgres.defineModel(connection, HeroiSchema);

    context = new Context(new Postgres(connection, model));

    await context.delete();
    await context.create(MOCK_HEROI_ATUALIZAR);
  });

  it("PostegresSQL Connection", async function () {
    const result = await context.isConnected();

    assert.equal(result, true);
  });

  it("Cadastrar Heroi", async function () {
    const result = await context.create(MOCK_HEROI_CADASTRAR);

    delete result.id;

    assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
  });

  it("Listar", async function () {
    const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome });

    delete result.id;

    assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
  });

  it("Atualizar", async function () {
    const [itemAtualizar] = await context.read({
      nome: MOCK_HEROI_ATUALIZAR.nome,
    });

    const novoItem = {
      ...MOCK_HEROI_ATUALIZAR,
      nome: "Mulher Maravilha",
    };

    const [result] = await context.update(itemAtualizar.id, novoItem);

    const [itemAtualizado] = await context.read({ id: itemAtualizar.id });

    assert.deepEqual(result, 1);
    assert.deepEqual(itemAtualizado.nome, novoItem.nome);
  });

  it("Remover por Id", async function () {
    const [item] = await context.read();

    const result = await context.delete(item.id);

    assert.deepEqual(result, 1);
  });
});
