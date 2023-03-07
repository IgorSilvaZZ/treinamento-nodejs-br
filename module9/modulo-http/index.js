const http = require("http");

http
  .createServer((req, res) => {
    res.end("Hello Node!");
  })
  .listen(3333, () => console.log("O servidor esta rodando!!"));
