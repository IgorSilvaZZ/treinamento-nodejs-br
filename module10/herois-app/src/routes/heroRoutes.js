const Joi = require("joi");
const Boom = require("boom");

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
        tags: ["api"],
        description: "Deve listar herois",
        notes: "Pode paginar resultados e filtrar por nome",
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
          return Boom.internal();
        }
      },
    };
  }

  create() {
    return {
      path: "/herois",
      method: "POST",
      options: {
        tags: ["api"],
        description: "Deve cadastras heroi",
        notes: "Pode cadastrar heroi por nome e poder",
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
          return Boom.internal();
        }
      },
    };
  }

  update() {
    return {
      path: "/herois/{id}",
      method: "PATCH",
      options: {
        tags: ["api"],
        description: "Deve atualizar um heroi",
        notes: "Pode atualizar heroi por id a partir do nome ou poder",
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
              // return "Nao foi possivel atualizar!";
              return Boom.preconditionFailed("Id não encontrado");
            }

            return {
              message: "Heroi atualizado com sucesso!",
            };
          } catch (error) {
            console.log("Deu Ruim!");
            return Boom.internal();
          }
        },
      },
    };
  }

  delete() {
    return {
      path: "/herois/{id}",
      method: "DELETE",
      options: {
        tags: ["api"],
        description: "Deve deletar heroi um heroi",
        notes: "Pode deletar heroi por id",
        validate: {
          failAction,
          params: Joi.object({
            id: Joi.string().required(),
          }),
        },
      },
      handler: async (req, reply) => {
        try {
          const { id } = req.params;

          const result = await this.db.delete(id);

          if (result.deletedCount !== 1) {
            return Boom.preconditionFailed("Id não encontrado");
          }

          return {
            message: "Heroi Removido com sucesso!",
          };
        } catch (error) {
          console.log("Deu Ruim!");
          return Boom.internal();
        }
      },
    };
  }
}

module.exports = HeroRoutes;
