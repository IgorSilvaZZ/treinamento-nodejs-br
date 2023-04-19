const { hash, compare } = require("bcrypt");

const SALT = 3;

class PasswordHelper {
  static hashPassword(pass) {
    return hash(pass, SALT);
  }

  static comparePassword(pass, hash) {
    return compare(pass, hash);
  }
}

module.exports = PasswordHelper;
