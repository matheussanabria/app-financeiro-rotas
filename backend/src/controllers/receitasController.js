// src/controllers/receitasController.js
const pool = require('../config/db');

// Listar todas as receitas
const listarReceitas = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM receitas');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Adicionar uma nova receita
const adicionarReceita = async (req, res) => {
    const { descricao, valor, data } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO receitas (descricao, valor, data) VALUES ($1, $2, $3) RETURNING *',
            [descricao, valor, data]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Atualizar uma receita
const atualizarReceita = async (req, res) => {
    const { id } = req.params;
    const { descricao, valor, data } = req.body;
    try {
        const result = await pool.query(
            'UPDATE receitas SET descricao = $1, valor = $2, data = $3 WHERE id = $4 RETURNING *',
            [descricao, valor, data, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Receita não encontrada' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Deletar uma receita
const deletarReceita = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM receitas WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Receita não encontrada' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    listarReceitas,
    adicionarReceita,
    atualizarReceita,
    deletarReceita,
};
