/* 
    #0 Obter usuario 
    #1 Preciso obter de telefone de um usuario a partir de um id
    #2 Obter endereço de usuario pelo id
*/

const util = require("util");

const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
  return new Promise(function resolverUsuario(resolve, reject) {
    setTimeout(function () {
      return resolve({
        id: 1,
        nome: "Aladin",
        dataNascimento: new Date(),
      });
    }, 1000);
  });
}

function obterTelefone(idUsuario) {
  return new Promise(function resolverTelefone(resolve, reject) {
    setTimeout(function () {
      return resolve({
        telefone: "119990394934",
        dd: 11,
      });
    }, 2000);
  });
}

function obterEndereco(idUsuario, callback) {
  setTimeout(function () {
    return callback(null, {
      rua: "Rua Josefino",
      numero: 0,
    });
  });
}

async function main() {
  try {
    console.time("medida-promise");

    const usuario = await obterUsuario();

    /* const telefone = await obterTelefone(usuario.id);

    const endereco = await obterEnderecoAsync(usuario.id); */

    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id),
    ]);

    const telefone = resultado[0];
    const endereco = resultado[1];

    console.log(`
        Nome Usuario: ${usuario.nome},
        Endereço: ${endereco.rua},
        Numero: ${endereco.numero},
        Telefone: ${telefone.telefone},
        DD: ${telefone.dd}
    `);

    console.timeEnd("medida-promise");
  } catch (error) {
    console.error("Deu ruim", error);
  }
}

main();
