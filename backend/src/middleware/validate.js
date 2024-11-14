// src/middleware/validate.js
const { validationResult } = require('express-validator');

// Middleware para capturar erros de validação e retorná-los
const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        param: err.param,
        message: err.msg
      })),
    });
  }
  next();
};

module.exports = { validarCampos };
