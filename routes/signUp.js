// routes/signUp.js
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Rota para renderizar a página de registro
router.get('/', (req, res) => {
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
    const user = await User.create(email, password); // Ajuste aqui
    res.redirect('/signin'); // Redireciona para a página
    console.log('Usuário registrado com sucesso:', user);
  } catch (error) {
    console.error('Erro ao registrar usuário:', error); // Log do erro no servidor
    res.status(400).json({ message: 'Erro ao registrar usuário', error });
  }
});

export default router;
