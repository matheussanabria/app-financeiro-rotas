const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const receitasRoutes = require('./routes/receitas');
const despesasRoutes = require('./routes/despesas');
const contasRoutes = require('./routes/contas');
const authRoutes = require('./routes/userRoutes'); // Importa as rotas de autenticação
// No arquivo principal (ex: app.js)
// No seu arquivo principal (ex: app.js ou index.js)
const sequelize = require('./config/sequelize');
const Usuario = require('./models/usuarioModel');

// Sincronizando com o banco de dados
sequelize.sync({ force: false }) // Defina force: true apenas para testes (isso apagará as tabelas existentes)
  .then(() => console.log('Tabelas sincronizadas com sucesso'))
  .catch(err => console.error('Erro ao sincronizar tabelas:', err));


dotenv.config();

const app = express();
app.use(cors()); // Permite CORS
app.use(bodyParser.json()); // Middleware para parsear JSON

// Rotas
app.use('/api/auth', authRoutes); // Rotas de autenticação
app.use('/api/receitas', receitasRoutes);
app.use('/api/despesas', despesasRoutes);
app.use('/api/contas', contasRoutes);

// Porta de execução
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
