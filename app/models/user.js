const Model = require('./model');
const Password = require('objection-password')({
  rounds: parseInt(process.env.BCRYPT_ROUNDS, 10) || 1,
});

class User extends Password(Model) {
  /**
   *
   */
  static get tableName() {
    return 'users';
  }
}

module.exports = User;
