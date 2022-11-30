const ICrud = require("../interfaces/interfaceCrud");

// Entender o contexto do banco de dados
class ContextStrategy extends ICrud {
  constructor(strategy) {
    super();
    this._database = strategy;
  }

  isConnected() {
    this._database.isConnected();
  }

  create(item) {
    this._database.create(item);
  }

  read(item) {
    return this._database.read(item);
  }

  update(id, item) {
    return this._database.update(item);
  }

  delete(item) {
    return this._database.delete(item);
  }
}

module.exports = ContextStrategy;
