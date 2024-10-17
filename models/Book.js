

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publishDate: {
        type: Date,
        required: true,
    },
    pages: {
        type: Number,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    cover: {
        type: String, // Aqui, você pode armazenar a URL da imagem
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
