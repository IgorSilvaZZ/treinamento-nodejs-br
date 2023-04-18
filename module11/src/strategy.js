// Arquivo apenas para historico de consulta e como ficaria se nao tivesse a separação de arquivos
class NotImplementedException extends Error {
  constructor() {
    super("Not Implemented Exception");
  }
}

// Simulação de uma interface no Javascript
class ICrud {
  create(item) {
    throw new NotImplementedException();
  }

  read(query) {
    throw new NotImplementedException();
  }

  update(id, item) {
    throw new NotImplementedException();
  }

  delete(id) {
    throw new NotImplementedException();
  }
}

class MongoDB extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log("O Item foi salve em MongoDB");
  }
}

class Postgres extends ICrud {
  constructor() {
    super();
  }

  create() {
    console.log("O item foi salvo em PostGres");
  }
}

// Entender o contexto do banco de dados
class ContextStrategy {
  constructor(strategy) {
    this._database = strategy;
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

const contextMongo = new ContextStrategy(new MongoDB());

contextMongo.create();

const contextPostGres = new ContextStrategy(new Postgres());

contextPostGres.create();
