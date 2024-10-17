const mongoose = require('mongoose');

// Definindo o esquema do livro
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishDate: { type: Date, required: true },
    pages: { type: Number, required: true },
    gender: { type: String, required: true },
    description: { type: String, required: true },
    cover: { type: String, required: true } // Altera de File para String
});

// Criando o modelo do livro
const Book = mongoose.model('Books', bookSchema);

// Classe para operações com livros
class BookModel {
    static async createBook(bookData) {
        const book = new Book(bookData);
        await book.save();
        return book;
    }

    static async findAllBooks() {
        return await Book.find();
    }
}

module.exports = { Book, BookModel };
