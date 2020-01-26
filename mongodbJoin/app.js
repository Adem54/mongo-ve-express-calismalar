var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const booksRouter=require("./routes/books");
//mongoose npm ile kurduktan sonra  import edelim
const mongoose=require("mongoose");


var app = express();
//express modülü üzerinden gelen fonksiyonu çalıştırdıktan sonra veritabanı bağlantısını yapalım

//Bazen mongoDB bağlanma sorunu yaşayabilliriz o durumlarda TaskManager-Services de MongoDB satırını bulup start demeliyiz
mongoose.connect("mongodb://localhost/books",{useNewUrlParser: true})
mongoose.set('useCreateIndex', true);// Yoruma aldığımız bu satır ya da bir üstteki useCreateIndex hata alırsak bu şekilde düzeltiltiği için kullandık
//mongoose.set('useUnifiedTopology', true);//Yine bir hata üzerine https://mongoosejs.com/docs/deprecations.html sitesinden bu hata çözümlerine ulaşabiliyoruz
mongoose.set("useUnifiedTopology", true);

//Birde veritabanımız bağlanıp bağlanmadığını görme adına bir event yazarız
mongoose.connection.on("open",()=>{
  console.log("MongoDB bağlandı!")
})
mongoose.connection.on("error",(err)=>{
  console.log("MongoDB Error: ",err)
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/books",booksRouter);

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
