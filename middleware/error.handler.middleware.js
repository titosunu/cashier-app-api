const { validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);

  let error_data = errors.array().map((error) => {
    return {
      item_name: error.param,
      message: error.msg,
    };
  });

  if (!errors.isEmpty())
    return res.status(422).json({
      errors: error_data,
    });

  next();
};

module.exports = handleValidation;
