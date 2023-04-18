const Joi = require("joi");
const Boom = require("boom");
const jwt = require("jsonwebtoken");
const { randomUUID } = require("node:crypto");

const BaseRoute = require("./base/baseRoute");

const failAction = (request, header, erro) => {
  throw erro;
};

const USER = {
  username: "xuxadasilva",
  password: "123",
};

class HeroRoutes extends BaseRoute {
  constructor(secret) {
    super();
    this.secret = secret;
  }

  login() {
    return {
      path: "/login",
      method: "POST",
      options: {
        auth: false,
        tags: ["api"],
        description: "Obter token",
        notes: "Faz login com username e senha do banco",
        validate: {
          failAction,
          payload: Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
          }),
        },
      },
      handler: async (req, reply) => {
        const { username, password } = req.payload;

        if (
          username.toLowerCase() !== USER.username ||
          password.toLowerCase() !== USER.password
        ) {
          return Boom.unauthorized();
        }

        const token = jwt.sign(
          {
            username,
            id: randomUUID(),
          },
          this.secret
        );

        return {
          token,
        };
      },
    };
  }
}

module.exports = HeroRoutes;
