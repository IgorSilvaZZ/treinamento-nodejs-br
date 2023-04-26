const Mongoose = require("mongoose");

const ICrud = require("../interfaces/interfaceCrud");

const STATUS = {
  0: "Disconectado",
  1: "Conectado",
  2: "Conectando",
  3: "Disconectando",
};

class MongoDB extends ICrud {
  constructor(connection, schema) {
    super();
    this._connection = connection;
    this._collection = schema;
  }

  async isConnected() {
    const state = STATUS[this._connection.readyState];

    if (state === "Conectado") return state;
    if (state !== "Conectando") return state;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return STATUS[this._connection.readyState];
  }

  static connect() {
    Mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const connection = Mongoose.connection;

    connection.once("open", () => console.log("Database Mongo Rodando!"));

    return connection;
  }

  async create(item) {
    return await this._collection.create(item);
  }

  async read(item, skip = 0, limit = 10) {
    return await this._collection.find(item).skip(skip).limit(limit);
  }

  async update(id, item) {
    return await this._collection.updateOne({ _id: id }, { $set: item });
  }

  async delete(id) {
    return await this._collection.deleteOne({ _id: id });
  }
}

module.exports = MongoDB;
