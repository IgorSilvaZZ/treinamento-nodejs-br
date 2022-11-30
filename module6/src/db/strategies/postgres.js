const ICrud = require("./interfaces/interfaceCrud");

class Postgres extends ICrud {
  constructor() {
    super();
  }

  create() {
    console.log("O item foi salvo em PostGres");
  }
}

module.exports = Postgres;
