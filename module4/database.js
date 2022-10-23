const { throws } = require("assert");
const { readFile, writeFile } = require("fs");
const { promisify } = require("util");
const { randomUUID } = require("crypto");

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {
  constructor() {
    this.nomeArquivo = "herois.json";
  }

  async obterDadosArquivo() {
    const arquivo = await readFileAsync(this.nomeArquivo, "utf-8");

    return JSON.parse(arquivo.toString());
  }

  async escreverArquivo(dados) {
    await writeFileAsync(this.nomeArquivo, JSON.stringify(dados));

    return true;
  }

  async cadastrar(heroi) {
    const dados = await this.obterDadosArquivo();

    const id = heroi.id <= 2 ? heroi.id : randomUUID();

    const heroiComId = {
      id,
      ...heroi,
    };

    const dadosFinal = [...dados, heroiComId];

    const resultado = await this.escreverArquivo(dadosFinal);

    return resultado;
  }

  async listar(id) {
    const dados = await this.obterDadosArquivo();

    if (!id) {
      return dados;
    }

    const dadosFiltrados = dados.filter((item) => (id ? item.id === id : true));

    return dadosFiltrados;
  }

  async removerPorId(id) {
    if (!id) {
      // Deletando tudo do nosso arquivo
      return await this.escreverArquivo([]);
    }

    const dados = await this.obterDadosArquivo();

    const indice = dados.findIndex((item) => item.id === id);

    if (indice === -1) {
      throw Error("O heroi informado nao existe!");
    }

    dados.splice(indice, 1);

    //Cadastrando os herois sem o heroi que excluimos
    return await this.escreverArquivo(dados);
  }

  async atualizar(id, modificacoes) {
    const dados = await this.obterDadosArquivo();

    if (typeof id === "number") {
      id = parseInt(id);
    }

    const indice = dados.findIndex((item) => item.id === id);

    if (indice === -1) {
      throw Error("O heroi informado nao existe!");
    }

    const atual = dados[indice];

    dados.splice(indice, 1);

    const objetoAtualizado = {
      ...atual,
      ...modificacoes,
    };

    return await this.escreverArquivo([...dados, objetoAtualizado]);
  }
}

module.exports = new Database();
