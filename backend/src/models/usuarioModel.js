const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // Importando a instância do Sequelize

// Definindo o modelo 'Usuario'
const Usuario = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Garantindo que o email será único
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // Adicionando colunas de timestamps (createdAt, updatedAt)
});

module.exports = Usuario; // Exporta o modelo para ser usado no controlador
