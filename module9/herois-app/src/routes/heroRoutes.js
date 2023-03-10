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
      handler: (req, reply) => {
        try {
          const { skip, limit, nome } = req.query;

          let item = {};

          if (nome) {
            item.nome = nome;
          }

          if (isNaN(skip)) {
            throw Error("O tipo do skip é incorreto");
          }

          if (isNaN(limit)) {
            throw Error("O tipo do limit é incorreto");
          }

          return this.db.read(item, Number(skip), Number(limit));
        } catch (error) {
          console.log("Deu ruim!");
          return "Erro interno no servidor!";
        }
      },
    };
  }
}

module.exports = HeroRoutes;
