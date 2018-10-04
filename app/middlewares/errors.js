/**
 * Error handler.
 */

/**
 * These are exported errors.
 * User `throw new Error(__ERROR__);`
 *
 * The error handler will match the __ERROR__ with the appropriate message and status
 */
const ERR_UNAUTHORIZED_ERROR = '@error/auth/UnauthorizedError';

const messages = {
  [ERR_UNAUTHORIZED_ERROR]: {
    text: 'Unauthorized error',
    status: 401,
  }
};

/**
 * Return the name of the error message.  Will check if `err.name` is defined and
 * use that as first prio.
 *
 * @param {mixed} err
 */
const getErrorName = (err) => {
  if (Object.hasOwnProperty.call(err, 'name')) {
    return err.name;
  }

  return err;
};

/**
 * Express error handler.
 *
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const errorHandler = (err, req, res, next) => {
  // Some libs set the err.name key. If that is present use it first.
  errorName = getErrorName(err);

  // Attempt to try find the error, if it does not exist pass this error on to
  // a 500 error handler.
  if (Object.hasOwnProperty.call(messages, errorName)) {
    // Known error spit it out
    const { text, status } = messages[errorName];

    return res.status(status).json({
      error: {
        message: text,
        status,
      }
    });
  }

  // This is an unknown error pass it along
  return next(err);
};

module.exports = {
  ERR_UNAUTHORIZED_ERROR,
  errorHandler,
}
