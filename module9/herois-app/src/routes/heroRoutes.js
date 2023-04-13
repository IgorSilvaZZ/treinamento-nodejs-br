const Joi = require("joi");

const BaseRoute = require("./base/baseRoute");

const failAction = (request, header, erro) => {
  throw erro;
};

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
          failAction,
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

  create() {
    return {
      path: "/herois",
      method: "POST",
      options: {
        validate: {
          failAction,
          payload: Joi.object({
            nome: Joi.string().required().min(3).max(100),
            poder: Joi.string().required().min(2).max(30),
          }),
        },
      },
      handler: async (req, reply) => {
        try {
          const { nome, poder } = req.payload;

          const result = await this.db.create({ nome, poder });

          return {
            message: "Heroi cadastrado com sucesso!",
            _id: result._id,
          };
        } catch (error) {
          console.log("Deu Ruim!");
          return "Internal Error!";
        }
      },
    };
  }

  update() {
    return {
      path: "/herois/{id}",
      method: "PATCH",
      options: {
        validate: {
          failAction,
          params: Joi.object({
            id: Joi.string().required(),
          }),
          payload: Joi.object({
            nome: Joi.string().min(3).max(100),
            poder: Joi.string().min(2).max(30),
          }),
        },
        handler: async (req, reply) => {
          try {
            const { id } = req.params;

            const { payload } = req;

            const dadosString = JSON.stringify(payload);

            const dados = JSON.parse(dadosString);

            const result = await this.db.update(id, dados);

            if (result.modifiedCount !== 1) {
              return "Nao foi possivel atualizar!";
            }

            return {
              message: "Heroi atualizado com sucesso!",
            };
          } catch (error) {
            console.log("Deu Ruim!");
            return "Internal Error!";
          }
        },
      },
    };
  }
}

module.exports = HeroRoutes;
