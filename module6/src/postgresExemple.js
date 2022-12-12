const Sequelize = require("sequelize");

const sequelize = new Sequelize("herois", "docker", "ignite", {
  host: "localhost",
  dialect: "postgres",
  quoteIdentifiers: false,
  operatorAliases: false,
});

async function main() {
  const Herois = sequelize.define(
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

  /* await Herois.create({
    nome: "Lanterna Verde",
    poder: "Anel",
  }) */ const result = await Herois.findAll({ raw: true });

  console.log(result);
}

main();
