/* 
    #0 Obter usuario 
    #1 Preciso obter de telefone de um usuario a partir de um id
    #2 Obter endereço de usuario pelo id
*/

function obterUsuario(callback) {
  setTimeout(function () {
    return callback(null, {
      id: 1,
      nome: "Aladin",
      dataNascimento: new Date(),
    });
  }, 1000);
}

function obterTelefone(idUsuario, callback) {
  setTimeout(function () {
    return callback(null, {
      telefone: "119990394934",
      dd: 11,
    });
  }, 2000);
}

function obterEndereco(idUsuario, callback) {
  setTimeout(function () {
    return callback(null, {
      rua: "Rua Josefino",
      numero: 0,
    });
  });
}

obterUsuario(function resolverUsuario(err, usuario) {
  // null || "" || 0 === false
  if (err) {
    console.log("Deu ruim!", err);
    return;
  }

  obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
    if (error1) {
      console.log("Deu ruim Telefone", error1);
      return;
    }

    obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
      if (error2) {
        console.log("Deu ruim Endereço", error2);
        return;
      }

      console.log(`
            Nome Usuario: ${usuario.nome},
            Endereço: ${endereco.rua},
            Numero: ${endereco.numero},
            Telefone: ${telefone.telefone},
            DD: ${telefone.dd}
        `);
    });
  });
});

// const telefone = obterTelefone(usuario.id);
//console.log(telefone);
