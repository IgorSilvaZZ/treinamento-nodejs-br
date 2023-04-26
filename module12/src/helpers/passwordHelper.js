const { hash, compare } = require("bcrypt");

const SALT = parseInt(process.env.SALT_PWD);

class PasswordHelper {
  static hashPassword(pass) {
    return hash(pass, SALT);
  }

  static comparePassword(pass, hash) {
    return compare(pass, hash);
  }
}

module.exports = PasswordHelper;
