var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');
var mongoose = require('mongoose'); // Adicionando mongoose para conexão

const { Book } = require('./models/Book'); // Atualizado para corresponder ao modelo

const uri = "mongodb+srv://thalitasuzyr:thalitasuzyr@clustersuzy.p8ib9.mongodb.net/databasetest";

const app = express();

// Conexão com o MongoDB usando Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conectado ao MongoDB Atlas!😎");
  })
  .catch((err) => {
    console.log("Erro ao conectar ao MongoDB Atlas!😔", err);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Para servir arquivos de upload

// Importação das rotas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signInRouter = require('./routes/signIn');
var signUpRouter = require('./routes/signUp');
var bookInfoRouter = require('./routes/bookInfo');
var bookDetailsRouter = require('./routes/bookDetails');
var magicRouter = require('./routes/magic');
var searchBooksRouter = require('./routes/searchBooks');
var addNewBookRouter = require('./routes/addNewBook');

// Definição das rotas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signIn', signInRouter);
app.use('/signUp', signUpRouter);
app.use('/bookInfo', bookInfoRouter);
app.use('/magic', magicRouter);
app.use('/searchBooks', searchBooksRouter);
app.use('/bookDetails', bookDetailsRouter); // Rota de detalhes do livro
app.use('/addNewBook', addNewBookRouter); // Rota para adicionar novos livros

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
