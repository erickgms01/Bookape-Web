const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Rota para renderizar a página de login
router.get('/', function(req, res) {
  res.render('signIn');
});

// Rota para realizar o login
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Busca usuário por email
        const user = await User.findByEmail(req.app.locals.db, email);
        if (!user) {
            return res.status(401).json({ message: 'Email ou senha inválidos' });
        }

        // Compara a senha usando bcrypt
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Email ou senha inválidos' });
        }

        // Criação do token JWT
        const token = jwt.sign({ email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });

        // Enviar o token e uma resposta de sucesso
        res.status(200).json({ token, message: 'Login bem-sucedido!' });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro no login', error });
    }
});

module.exports = router;
