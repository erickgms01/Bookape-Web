import mongoose from 'mongoose';

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
        type: String, 
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

export default Book;
