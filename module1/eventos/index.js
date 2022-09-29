const EventEmitter = require("events");

class MeuEmissor extends EventEmitter {}

const meuEmissor = new MeuEmissor();

const nomeEvento = "usuario:click";

meuEmissor.on(nomeEvento, function (click) {
  console.log("Um usuario clicou", click);
});

/* meuEmissor.emit(nomeEvento, "Clickou na bala de rolagem");
meuEmissor.emit(nomeEvento, "Clickou no ok!");

let count = 0;

setInterval(function () {
  meuEmissor.emit(nomeEvento, "No ok " + count++);
}, 1000); */

// Abrir a interação com o console
const stdin = process.openStdin();

// Adicionar interação de qualquer coisa que o usuario digitar
stdin.addListener(`data`, function (value) {
  console.log(`Você digitou ${value.toString().trim()}`);
});
