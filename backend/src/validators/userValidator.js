// src/validators/userValidator.js
const { body } = require('express-validator');

// Regras de validação para o registro do usuário
const validateUserRegister = [
  body('nome').notEmpty().withMessage('O nome é obrigatório.'),
  body('email').isEmail().withMessage('E-mail inválido.'),
  body('senha').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres.')
];

// Regras de validação para o login do usuário
const validateUserLogin = [
  body('email').isEmail().withMessage('E-mail inválido.'),
  body('senha').notEmpty().withMessage('A senha é obrigatória.')
];

module.exports = { validateUserRegister, validateUserLogin };
