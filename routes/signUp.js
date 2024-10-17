const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Rota para renderizar a página de registro
router.get('/', function(req, res, next) {
  res.render('signUp'); // Renderiza a página de registro
});

// Rota para registrar o usuário
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    // Verifica se email e senha foram fornecidos
    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    try {
        // Criação do usuário e armazenamento no banco de dados
       
    const user = await User.create(req.app.locals.db, email, password);

        res.status(201).json({ message: 'Usuário registrado com sucesso' });
        console.log('Usuário registrado com sucesso');
    } catch (error) {
        console.error('Erro ao registrar usuário:', error); // Log do erro no servidor
        res.status(400).json({ message: 'Erro ao registrar usuário', error });
    }
});

module.exports = router;
