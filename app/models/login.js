const Model = require('./model');

class Login extends Model {
  static get tableName() {
    return 'logins';
  }
}

module.exports = Login;
