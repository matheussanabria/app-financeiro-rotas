const express = require('express');
const router = express.Router();
const contasController = require('../controllers/contasController');

// Rotas
router.get('/', contasController.listarContas); // Listar todas as contas
router.get('/:id', contasController.detalharConta); // Detalhar uma conta específica
router.post('/', contasController.criarConta); // Criar nova conta
router.put('/:id', contasController.atualizarConta); // Atualizar uma conta existente
router.delete('/:id', contasController.deletarConta); // Deletar uma conta

module.exports = router;
