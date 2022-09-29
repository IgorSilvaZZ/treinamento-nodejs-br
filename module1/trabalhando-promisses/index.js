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

const usuarioPromise = obterUsuario();

usuarioPromise
  .then(function (usuario) {
    return obterTelefone(usuario.id).then(function resolverTelefone(result) {
      return {
        usuario: {
          nome: usuario.nome,
          id: usuario.id,
        },
        telefone: result,
      };
    });
  })
  .then(function (resultado) {
    const endereco = obterEnderecoAsync(resultado.usuario.id);

    return endereco.then(function resolveEndereco(result) {
      return {
        usuario: resultado.usuario,
        telefone: resultado.telefone,
        endereco: result,
      };
    });
  })
  .then(function (resultado) {
    console.log(`
        Nome Usuario: ${resultado.usuario.nome},
        Endereço: ${resultado.endereco.rua},
        Numero: ${resultado.endereco.numero},
        Telefone: ${resultado.telefone.telefone},
        DD: ${resultado.telefone.dd}
    `);
  })
  .catch(function (error) {
    console.log("Deu ruim", error);
  });
