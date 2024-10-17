import express from 'express';
import Book from '../models/Book.js'; // Verifique se o caminho está correto
const router = express.Router();

router.get('/', (req, res) => {
  res.render('bookDetails');
});

// Rota para obter detalhes do livro
router.get('/:title', async (req, res) => {
  try {
    const bookTitle = req.params.title; // Pega o título do livro da URL
    const book = await Book.findOne({ title: bookTitle }); // Busca o livro pelo título

    if (!book) {
      return res.status(404).send('Livro não encontrado');
    }

    // Formatar a data para exibição
    const formattedDate = book.publishDate.toLocaleDateString('pt-BR');

    // Renderiza a página com os dados do livro
    res.render('bookDetails', { book, formattedDate });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar o livro');
  }
});

export default router;
