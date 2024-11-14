const pool = require('../config/db'); // Conexão com o banco de dados

// Listar todas as contas
exports.listarContas = async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM contas');
        res.json(resultado.rows);
    } catch (err) {
        res.status(500).send('Erro ao listar contas');
    }
};

// Detalhar uma conta específica
exports.detalharConta = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await pool.query('SELECT * FROM contas WHERE id = $1', [id]);
        res.json(resultado.rows[0]);
    } catch (err) {
        res.status(500).send('Erro ao detalhar conta');
    }
};

// Criar nova conta
exports.criarConta = async (req, res) => {
    const { nome, saldo_inicial, tipo } = req.body;
    try {
        const resultado = await pool.query(
            'INSERT INTO contas (nome, saldo_inicial, tipo) VALUES ($1, $2, $3) RETURNING *',
            [nome, saldo_inicial, tipo]
        );
        res.json(resultado.rows[0]);
    } catch (err) {
        res.status(500).send('Erro ao criar conta');
    }
};

// Atualizar uma conta
exports.atualizarConta = async (req, res) => {
    const { id } = req.params;
    const { nome, saldo_inicial, tipo, ativa } = req.body;
    try {
        const resultado = await pool.query(
            'UPDATE contas SET nome = $1, saldo_inicial = $2, tipo = $3, ativa = $4, atualizado_em = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
            [nome, saldo_inicial, tipo, ativa, id]
        );
        res.json(resultado.rows[0]);
    } catch (err) {
        res.status(500).send('Erro ao atualizar conta');
    }
};

// Deletar uma conta
exports.deletarConta = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM contas WHERE id = $1', [id]);
        res.send('Conta deletada com sucesso');
    } catch (err) {
        res.status(500).send('Erro ao deletar conta');
    }
};
