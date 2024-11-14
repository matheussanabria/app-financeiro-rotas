require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    },
    logging: console.log, // Habilitar logs para depuração
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Conectado ao banco de dados via Sequelize');
  })
  .catch(err => {
    console.error('Erro de conexão via Sequelize:', err);
  });

module.exports = sequelize;
