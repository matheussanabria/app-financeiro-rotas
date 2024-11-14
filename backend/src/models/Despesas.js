// src/models/Despesa.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const Despesa = sequelize.define('Despesa', {
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

module.exports = Despesa;
