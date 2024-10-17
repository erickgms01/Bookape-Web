import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import createError from 'http-errors';
import mongoose from 'mongoose';
import Book from './models/Book.js';

const uri = "mongodb+srv://thalitasuzyr:thalitasuzyr@clustersuzy.p8ib9.mongodb.net/database";

const app = express();

// Conexão com o banco de dados
(async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Conectado ao MongoDB Atlas!😎");
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB Atlas!😔", err);
  }
})();

// view engine setup
app.set('views', path.join(path.resolve(), 'views')); // path.resolve() para ES modules
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(), 'public')));
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads'))); // Para servir arquivos de upload

// Importação das rotas (agora com ES modules)
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import signInRouter from './routes/signIn.js';
import signUpRouter from './routes/signUp.js';
import bookInfoRouter from './routes/bookInfo.js';
import bookDetailsRouter from './routes/bookDetails.js';
import magicRouter from './routes/magic.js';
import searchBooksRouter from './routes/searchBooks.js';
import addNewBookRouter from './routes/addNewBook.js';

// Definição das rotas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signIn', signInRouter);
app.use('/signUp', signUpRouter);
app.use('/bookInfo', bookInfoRouter);
app.use('/magic', magicRouter);
app.use('/searchBooks', searchBooksRouter);
app.use('/bookDetails', bookDetailsRouter);
app.use('/addNewBook', addNewBookRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

export default app;
