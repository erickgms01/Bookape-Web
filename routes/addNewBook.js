const express = require('express');
const router = express.Router();
const { BookModel } = require('../models/Book');
const multer = require('multer');
const path = require('path');


// Configuração do Multer para fazer upload da imagem
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/'); // Define o diretório de destino
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Define o nome do arquivo
    }
});

const upload = multer({ storage: storage });

// Rota GET para exibir o formulário de adicionar livro
router.get('/', (req, res) => {
    res.render('addNewBook'); 
});

// Rota POST com upload da imagem
router.post('/', upload.single('book_cover'), async (req, res) => {
    try {
        const { book_title, book_autor, book_publish_date, book_pages, book_gender, book_description } = req.body;

        // Cria o objeto de dados do livro
        const newBook = {
            title: book_title,
            author: book_autor,
            publishDate: new Date(book_publish_date),
            pages: book_pages,
            gender: book_gender,
            description: book_description,
            cover: req.file ? `/uploads/${req.file.filename}` : '' // Caminho da capa do livro
        };

        // Salva no banco de dados
        await BookModel.createBook(newBook);

        // Redireciona ou envia uma resposta de sucesso
        res.redirect('/bookDetails'); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao adicionar o livro.');
    }
});

module.exports = router;
