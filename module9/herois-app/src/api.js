const Hapi = require("@hapi/hapi");

const Context = require("./db/strategies/base/contextStrategy");
const MongoDB = require("./db/strategies/mongodb/mongodb");
const HeroiSchema = require("./db/strategies/mongodb/schemas/heroisSchema");

const HeroRoute = require("./routes/heroRoutes");

const app = new Hapi.Server({
  port: 3333,
});

function mapRoutes(instance, methods) {
  // ['list', 'update', 'create']
  // new HeroRoute()['list']()
  // new HeroRoute()['update']()
  // new HeroRoute()['create']()

  return methods.map((method) => instance[method]());
}

async function main() {
  const connection = MongoDB.connect();
  const context = new Context(new MongoDB(connection, HeroiSchema));

  await app.start();

  app.route([...mapRoutes(new HeroRoute(context), HeroRoute.methods())]);

  console.log("Servidor rodando na porta 3333!!");

  return app;
}

module.exports = main();
