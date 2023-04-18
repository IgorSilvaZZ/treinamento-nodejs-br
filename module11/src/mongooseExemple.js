const Mongoose = require("mongoose");

Mongoose.connect(
  "mongodb://admin:senha@localhost:27017/herois?authSource=admin&directConnection=true"
);

const connection = Mongoose.connection;

connection.once("open", () => console.log("Database Mongo Rodando!"));

const heroisSchema = new Mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  poder: {
    type: String,
    required: true,
  },
  insertedAt: {
    type: Date,
    default: new Date(),
  },
});

const model = Mongoose.model("herois", heroisSchema);

(async () => {
  const resultCadastrar = await model.create({
    nome: "Batman",
    poder: "Dinheiro",
  });

  const litItems = await model.find();

  console.log("Items", litItems);
})();
