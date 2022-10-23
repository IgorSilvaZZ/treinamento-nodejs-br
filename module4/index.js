const { Command } = require("commander");

const database = require("./database");
const { Heroi } = require("./Heroi");

async function main() {
  const commander = new Command();

  commander
    .version("v1")
    .option("-n, --nome [value]", "Nome do Heroi")
    .option("-p, --poder [value]", "Poder do Heroi")
    .option("-i, --id [value]", "ID do Heroi do Heroi")
    .option("-c, --cadastrar", "Cadastrar um Heroi")
    .option("-l, --listar", "Listar todos os Herois")
    .option("-a, --atualizar [value]", "Atualizar um heroi por id")
    .option("-r, --remover", "Remover um Heroi pelo id");

  commander.parse(process.argv);

  const options = commander.opts();

  const heroi = new Heroi(options);

  try {
    if (options.cadastrar) {
      delete heroi.id;
      const resultado = await database.cadastrar(heroi);

      if (!resultado) {
        console.log("Heroi nao foi cadastrado!");
        return;
      }

      console.log("Heroi cadastrado com sucesso!");
    }

    if (options.listar) {
      const resultado = await database.listar();

      console.log(resultado);

      return;
    }

    if (options.remover) {
      const resultado = await database.removerPorId(heroi.id);

      if (!resultado) {
        console.error("Não foi possivel remover o heroi");
        return;
      }

      console.log("Heroi removido com sucesso!");

      return;
    }

    if (options.atualizar) {
      const idParaAtualizar = options.atualizar;

      //Remover todas as chaves que estiverem com undefined || null
      const dado = JSON.stringify(heroi);

      const heroiAtualizar = JSON.parse(dado);

      const resultado = await database.atualizar(
        idParaAtualizar,
        heroiAtualizar
      );

      if (!resultado) {
        console.error("Não foi possivel atualizar o heroi!");
        return;
      }

      console.log("Heroi atualizado com sucesso!");

      return;
    }
  } catch (error) {
    console.error("Deu Ruim!");
  }
}

main();
