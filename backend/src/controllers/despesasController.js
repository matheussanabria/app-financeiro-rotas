// src/controllers/despesasController.js
const pool = require('../config/db');

// Listar todas as despesas
const listarDespesas = async (req, res) => {
    try {
        console.log('Consultando as despesas...');
        const result = await pool.query('SELECT * FROM despesas');
        console.log('Resultado:', result.rows); // Mostra o que está sendo retornado
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao listar despesas:', error); // Exibe erros no console
        res.status(500).json({ message: error.message });
    }
};


// Adicionar uma nova despesa
const adicionarDespesa = async (req, res) => {
    const { descricao, valor, data } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO despesas (descricao, valor, data) VALUES ($1, $2, $3) RETURNING *',
            [descricao, valor, data]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Atualizar uma despesa
const atualizarDespesa = async (req, res) => {
    const { id } = req.params;
    const { descricao, valor, data } = req.body;
    try {
        const result = await pool.query(
            'UPDATE despesas SET descricao = $1, valor = $2, data = $3 WHERE id = $4 RETURNING *',
            [descricao, valor, data, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Despesa não encontrada' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Deletar uma despesa
const deletarDespesa = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM despesas WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Despesa não encontrada' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    listarDespesas,
    adicionarDespesa,
    atualizarDespesa,
    deletarDespesa,
};
