const ICrud = require("../interfaces/interfaceCrud");

// Entender o contexto do banco de dados
class ContextStrategy extends ICrud {
  constructor(strategy) {
    super();
    this._database = strategy;
  }

  async isConnected() {
    return this._database.isConnected();
  }

  create(item) {
    return this._database.create(item);
  }

  read(item, skip, limit) {
    return this._database.read(item, skip, limit);
  }

  update(id, item, upsert = false) {
    return this._database.update(id, item, upsert);
  }

  delete(id) {
    return this._database.delete(id);
  }

  static connect() {
    return this._database.connect();
  }
}

module.exports = ContextStrategy;
