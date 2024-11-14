// src/routes/receitas.js
const express = require('express');
const router = express.Router();
const receitasController = require('../controllers/receitasController');

router.get('/', receitasController.listarReceitas);
router.post('/', receitasController.adicionarReceita);
router.put('/:id', receitasController.atualizarReceita);
router.delete('/:id', receitasController.deletarReceita);

module.exports = router;
