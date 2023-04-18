const Hapi = require("@hapi/hapi");
const HapiSwagger = require("hapi-swagger");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiJwt = require("hapi-auth-jwt2");

const Context = require("./db/strategies/base/contextStrategy");
const MongoDB = require("./db/strategies/mongodb/mongodb");
const HeroiSchema = require("./db/strategies/mongodb/schemas/heroisSchema");

const HeroRoute = require("./routes/heroRoutes");
const AuthRote = require("./routes/authRoutes");

const JWT_SECRET = "MEU_SEGREDO_123";

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

  const swaggerOptions = {
    swagger: "2.0",
    info: {
      title: "API Herois - #CursoNodeBR",
      version: "v1.0",
    },
  };

  await app.register([
    HapiJwt,
    Vision,
    Inert,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  app.auth.strategy("jwt", "jwt", {
    key: JWT_SECRET,
    /* options: {
      expiresIn: false,
    }, */
    validate: (dado, request) => {
      return {
        isValid: true,
      };
    },
  });

  app.auth.default("jwt");

  app.route([
    ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
    ...mapRoutes(new AuthRote(JWT_SECRET), AuthRote.methods()),
  ]);

  await app.start();

  console.log("Servidor rodando na porta 3333!!");

  return app;
}

module.exports = main();
