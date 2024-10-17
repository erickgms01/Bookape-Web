var express = require('express');
var router = express.Router();

const { format } = require('date-fns'); 

// Função para formatar a data de publicação
function formatPublishDate(publishDate) {
    const date = new Date(publishDate);
    return format(date, 'MMM dd, yyyy'); // Formato desejado: "Jan 24, 2024"
}

/* GET detalhes do livro pelo título */
router.get('/:title', async (req, res, next) => {
  const db = req.app.locals.db; // Acessa o banco de dados conectado
  const bookTitle = req.params.title;

  try {
    // Busca o livro pelo título, ignorando maiúsculas/minúsculas
    const book = await db.collection('books').findOne({ title: { $regex: new RegExp(`^${bookTitle}$`, 'i') } });
    const formattedDate = formatPublishDate(book.publishDate);

    if (book) {
      res.render('bookDetails', { book, formattedDate }); // Renderiza a página com os detalhes do livro
    } else {
      res.status(404).send('Livro não encontrado');
    }
  } catch (error) {
    console.error('Erro ao buscar o livro:', error);
    res.status(500).json({ error: 'Erro ao buscar o livro' });
  }
});

module.exports = router;
