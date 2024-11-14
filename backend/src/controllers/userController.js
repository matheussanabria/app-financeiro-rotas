// src/controllers/userController.js
const Usuario = require('../models/usuarioModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registro de usuário
const registerUser = async (req, res) => {
  const { nome, email, senha } = req.body;

  // Validar dados de entrada
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Verificar se o email já existe
    const userExists = await Usuario.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ msg: 'Usuário já existe.' });
    }

    // Criptografar a senha antes de salvar
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    // Criar o usuário
    const novoUsuario = await Usuario.create({ nome, email, senha: hashedPassword });

    // Gerar o token de autenticação
    const token = jwt.sign({ id: novoUsuario.id }, 'your_jwt_secret', { expiresIn: '1h' });

    // Enviar a resposta com o token
    return res.status(201).json({ token });

  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Erro no servidor.');
  }
};

// Login de usuário
const loginUser = async (req, res) => {
  const { email, senha } = req.body;

  // Validar dados de entrada
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Buscar usuário pelo email
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(400).json({ msg: 'Usuário não encontrado.' });
    }

    // Verificar a senha
    const isMatch = await bcrypt.compare(senha, usuario.senha);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Senha inválida.' });
    }

    // Gerar o token de autenticação
    const token = jwt.sign({ id: usuario.id }, 'your_jwt_secret', { expiresIn: '1h' });

    return res.json({ token });

  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Erro no servidor.');
  }
};

module.exports = { registerUser, loginUser };
