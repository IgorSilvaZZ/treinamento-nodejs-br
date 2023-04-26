class BaseRoute {
  static methods() {
    //getOwnPropertyNames => Retorna os nomes dos metodos do objeto passado por parametros
    return Object.getOwnPropertyNames(this.prototype).filter(
      (method) => method !== "constructor" && !method.startsWith("_")
    );
  }
}

module.exports = BaseRoute;
