const Sequelize = require("sequelize");

const ICrud = require("./interfaces/interfaceCrud");

class Postgres extends ICrud {
  constructor() {
    super();
    this._driver = null;
    this._herois = null;
  }

  async isConnected() {
    let connected = false;

    try {
      await this._driver.authenticate();

      connected = true;
    } catch (error) {
      console.log("Erro ao tentar se conectar: ", error);
    }

    return connected;
  }

  async create(item) {
    const { dataValues } = await this._herois.create(item);

    return dataValues;
  }

  async read(item = {}) {
    const result = await this._herois.findAll({ where: item, raw: true });

    return result;
  }

  async defineModel() {
    this._herois = this._driver.define(
      "herois",
      {
        id: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true,
        },
        nome: {
          type: Sequelize.STRING,
          required: true,
        },
        poder: {
          type: Sequelize.STRING,
          required: true,
        },
      },
      {
        tableName: "TB_HEROIS",
        freezeTableName: false,
        timestamps: false,
      }
    );

    await this._herois.sync();
  }

  async connect() {
    this._driver = new Sequelize("herois", "docker", "ignite", {
      host: "localhost",
      dialect: "postgres",
      quoteIdentifiers: false,
      operatorAliases: false,
    });
    await this.defineModel();
  }
}

module.exports = Postgres;
