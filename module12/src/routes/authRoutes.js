const Joi = require("joi");
const Boom = require("boom");
const jwt = require("jsonwebtoken");

const PasswordHelper = require("../helpers/passwordHelper");

const BaseRoute = require("./base/baseRoute");

const failAction = (request, header, erro) => {
  throw erro;
};

const USER = {
  username: "xuxadasilva",
  password: "123",
};

class HeroRoutes extends BaseRoute {
  constructor(secret, db) {
    super();
    this.secret = secret;
    this.db = db;
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

        const [user] = await this.db.read({
          username: username.toLowerCase(),
        });

        if (!user) {
          return Boom.unauthorized("O usuario informado não existe!");
        }

        const passwordVerify = await PasswordHelper.comparePassword(
          password,
          user.password
        );

        if (!passwordVerify) {
          return Boom.unauthorized("O usuario ou senha invalidos!");
        }

        const token = jwt.sign(
          {
            username,
            id: user.id,
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
