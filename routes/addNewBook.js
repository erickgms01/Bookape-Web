// routes/addNewBook.js
const express = require('express');
const multer = require('multer');
const Book = require('../models/Book');
const path = require('path');

const router = express.Router();

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Diretório onde os arquivos serão armazenados
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Renomeia o arquivo para evitar conflitos
    },
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
    res.render('addNewBook');
});
router.post('/', upload.single('book_cover'), async (req, res) => {
    try {
        const { book_title, book_autor, book_publish_date, book_pages, book_gender, book_description } = req.body;

        // Cria uma nova instância do modelo Book
        const newBook = new Book({
            title: book_title,
            author: book_autor,
            publishDate: book_publish_date,
            pages: book_pages,
            genre: book_gender,
            cover: req.file.path, // Armazena o caminho do arquivo
            description: book_description,
        });

        // Salva o livro no banco de dados
        await newBook.save();
        res.status(201).redirect('/'); // Redireciona para a página inicial após a adição
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao adicionar o livro.');
    }
});

module.exports = router;
