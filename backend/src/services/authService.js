const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuarioModel');
require('dotenv').config();

// Função para validar e-mail
const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

// Função para validar senha (mínimo 6 caracteres, pode adicionar mais regras)
const validatePassword = (senha) => {
  return senha.length >= 6;
};

// Função para registrar um novo usuário
// Registro de usuário
const registerUser = async (req, res) => {
  console.log(req.body);
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
    console.log('Usuário criado com sucesso:', novoUsuario);

    // Gerar o token de autenticação
    const token = jwt.sign({ id: novoUsuario.id }, 'your_jwt_secret', { expiresIn: '1h' });

    // Enviar a resposta com o token
    return res.status(201).json({ token });

  } catch (error) {
    console.error('Erro ao criar o usuário:', error.message);
    return res.status(500).send('Erro no servidor.');
  }
};


// Função para fazer login de um usuário
const loginUser = async (email, senha) => {
  // Validar e-mail e senha
  if (!validateEmail(email)) {
    throw new Error('E-mail inválido');
  }

  if (!validatePassword(senha)) {
    throw new Error('A senha deve ter no mínimo 6 caracteres');
  }

  try {
    // Buscar o usuário pelo e-mail
    const user = await usuarioModel.findUserByEmail(email);
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    // Verificar se a senha está correta
    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }

    // Gerar um token JWT
    const token = jwt.sign(
      { id: user.id, nome: user.nome, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return { user, token };
  } catch (err) {
    console.error('Erro no login de usuário:', err.message);
    throw new Error('Erro ao realizar login');
  }
};

module.exports = {
  registerUser,
  loginUser
};
