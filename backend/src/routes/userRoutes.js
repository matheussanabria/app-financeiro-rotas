// src/routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { validateUserRegister, validateUserLogin } = require('../validators/userValidator');
const { validarCampos } = require('../middleware/validate');

const router = express.Router();

// Rota de registro de usuário com validação
router.post('/register', validateUserRegister, validarCampos, registerUser);

// Rota de login de usuário com validação
router.post('/login', validateUserLogin, validarCampos, loginUser);

module.exports = router;
