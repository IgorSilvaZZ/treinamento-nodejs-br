const { obterPessoas } = require("./service");

async function main() {
  try {
    const { results } = await obterPessoas("a");
    const names = [];

    console.time("for");
    for (let i = 0; i <= results.length - 1; i++) {
      const pessoa = results[i];

      names.push(pessoa.name);
    }
    console.timeEnd("for");

    console.log(names);

    console.time("for-in");
    for (let index in results) {
      const pessoa = results[index];

      names.push(pessoa.name);
    }

    console.timeEnd("for-in");

    console.log(names);

    console.time("for-of");
    for (let pessoa of results) {
      names.push(pessoa.name);
    }
    console.log(names);

    console.timeEnd("for-of");
  } catch (error) {
    console.log("error: ", error);
  }
}

main();
