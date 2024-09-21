const AppError = require("../AppError");

/**
 * @description returns the app error to res send
 * @param {object} err
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 */
const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      errorCode: err.errorCode,
      message: err.message,
    });
  }
  return res.status(400).send({ error: err.message });
};

module.exports = errorHandler;
