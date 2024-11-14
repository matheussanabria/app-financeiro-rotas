// src/routes/despesas.js
const express = require('express');
const router = express.Router();
const despesasController = require('../controllers/despesasController'); // Corrigido o caminho

// Definindo as rotas para despesas
router.get('/', despesasController.listarDespesas);
router.post('/', despesasController.adicionarDespesa);
router.put('/:id', despesasController.atualizarDespesa);
router.delete('/:id', despesasController.deletarDespesa);

module.exports = router;
