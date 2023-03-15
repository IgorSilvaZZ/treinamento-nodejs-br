const Joi = require("joi");

const BaseRoute = require("./base/baseRoute");

class HeroRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }

  list() {
    return {
      path: "/herois",
      method: "GET",
      options: {
        validate: {
          failAction: (req, header, erro) => {
            throw erro;
          },
          query: Joi.object({
            skip: Joi.number().integer().default(0),
            limit: Joi.number().integer().default(10),
            nome: Joi.string().min(3).max(100),
          }),
        },
      },
      handler: (req, reply) => {
        try {
          const { skip, limit, nome } = req.query;

          let item = nome ? { nome: { $regex: `.*${nome}*.` } } : {};

          return this.db.read(item, skip, limit);
        } catch (error) {
          console.log("Deu ruim!");
          return "Erro interno no servidor!";
        }
      },
    };
  }
}

module.exports = HeroRoutes;
