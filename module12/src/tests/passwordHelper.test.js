const assert = require("assert");

const PasswordHelper = require("../helpers/passwordHelper");

const PASSWORD = "Igor@2023";
const HASH = "$2b$04$Kdzy3.1Qwqbjqj3oH7kR.efJRXD4rhAtLCmJC8FKZVvrLgdHvCq7y";

describe("UserHelper test suite", function () {
  it("Deve gerar um hash a partir de uma PASSWORD", async () => {
    const result = await PasswordHelper.hashPassword(PASSWORD);

    assert.ok(result.length > 10);
  });

  it("Deve comparar uma senha e seu hash", async () => {
    const result = await PasswordHelper.comparePassword(PASSWORD, HASH);

    assert.ok(result === true);
  });
});
