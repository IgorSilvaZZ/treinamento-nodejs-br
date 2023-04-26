const Sequelize = require("sequelize");

const ICrud = require("../interfaces/interfaceCrud");

class Postgres extends ICrud {
  constructor(connection, schema) {
    super();
    this._connection = connection;
    this._schema = schema;
  }

  async isConnected() {
    let connected = false;

    try {
      await this._connection.authenticate();

      connected = true;
    } catch (error) {
      console.log("Erro ao tentar se conectar: ", error);
    }

    return connected;
  }

  async create(item) {
    const { dataValues } = await this._schema.create(item);

    return dataValues;
  }

  async read(item = {}) {
    const result = await this._schema.findAll({ where: item, raw: true });

    return result;
  }

  async update(id, item, upsert = false) {
    const fn = upsert ? "upsert" : "update";

    const result = await this._schema[fn](item, { where: { id } });

    return result;
  }

  async delete(id) {
    const query = id ? { id } : {};

    return await this._schema.destroy({ where: query });
  }

  static async defineModel(connection, schema) {
    const model = connection.define(schema.name, schema.schema, schema.options);
    await model.sync();
    return model;
  }

  static async connect() {
    const connection = new Sequelize(process.env.POSTGRES_URL, {
      quoteIdentifiers: false,
      operatorAliases: false,
      logging: false,
      ssl: process.env.SSL_DB,
      dialectOptions: {
        ssl: process.env.SSL_DB,
      },
    });

    return connection;
  }
}

module.exports = Postgres;
