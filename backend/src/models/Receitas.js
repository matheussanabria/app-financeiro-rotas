// src/models/Receita.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const Receita = sequelize.define('Receita', {
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

module.exports = Receita;
