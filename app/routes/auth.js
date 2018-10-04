/**
 * Auth router
 */
const { celebrate, Joi } = require('celebrate');
const { UserService } = require('../services');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { asAsync } = require('../middlewares');
const { ERR_UNAUTHORIZED_ERROR } = require('../middlewares/errors');

/**
 * Login action
 */
const loginAction = async (email, password) => {
  const user = await UserService.findByField('email', email);

  if (!user) {
    // TODO log invalid user attempt
    return Promise.reject(ERR_UNAUTHORIZED_ERROR);
  }

  if (!await bcrypt.compare(password, user.password)) {
    // TODO: log invalid password attempt
    return Promise.reject(ERR_UNAUTHORIZED_ERROR);
  }

  // TODO: Log successful log in attempt

  return jwt.sign({
    id: user.id
  }, process.env.JWT_SECRET);
};

module.exports = (router) => {
  /**
   * Validation rules.
   */
  const validate = {
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    })
  };

  /**
   * Log in route.
   */
  router.post('/', celebrate(validate), asAsync(async (req, res) => {
    const { email, password } = req.body;
    const token = await loginAction(email, password);

    return res.status(200).json({
      token,
    });
  }));

  return router;
};
