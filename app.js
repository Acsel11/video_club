const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { expressjwt } = require('express-jwt');
const mongoose = require('mongoose');

const JwtKey = '8b5ebce86dd0f21f849c7d010b56e8ce';


//importamos archivos de rutas de toda la aplicacion 
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const directorsRouter = require('./routes/directors');
const moviesRouter = require('./routes/movies');
const actorsRouter = require('./routes/actors');
const genresRouter = require('./routes/genres');
const membersRouter = require('./routes/members');
const copiesRouter = require('./routes/copies');
const listsRouter = require('./routes/lists');
const loansRouter = require('./routes/loans');




const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressjw({secret:JwtKey, algorithms: ['HS256']})
   .unless({path:["/login"]}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/directors', directorsRouter);
app.use('/movies', moviesRouter);
app.use('/actors', actorsRouter);
app.use('/genres', genresRouter);
app.use('/members', membersRouter);
app.use('/copies', copiesRouter);
app.use('/await', listsRouter);
app.use('/loans', loansRouter);



const url = "mongodb://localhost:27017/video-club";

mongoose.connect(url);

const db = mongoose.connection;

db.on('open', () => {
  console.log("conect ok")
});

db.on('error', () => {
  console.log("error al conectar")
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
