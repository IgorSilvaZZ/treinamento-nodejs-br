const Sequelize = require("sequelize");

const ICrud = require("./interfaces/interfaceCrud");

class Postgres extends ICrud {
  constructor() {
    super();
    this._driver = null;
    this._herois = null;
    this._connect();
  }

  async isConnected() {
    try {
      await this._driver.authenticate();

      return true;
    } catch (error) {
      console.log("Erro ao tentar se conectar: ", error);
      return false;
    }
  }

  create() {
    console.log("O item foi salvo em PostGres");
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

    await Herois.sync();
  }

  _connect() {
    this._driver = new Sequelize("herois", "docker", "ignite", {
      host: "localhost",
      dialect: "postgres",
      quoteIdentifiers: false,
      operatorAliases: false,
    });
  }
}

module.exports = Postgres;
