var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const books=require("./routes/books");
//mongoose ile mongo db ye node.js ile bağlanma
/* 
Öncelikle express generator ü global olarak kurarak sonrasında bir express projesi oluştururuz daha sonra npm install deyip bağımlııkları kurarız ve npm start diyerek projeyi ayağa kaldırırız ayrıca package.json da scripts içerisinde start ın karşısına nodemon ./bin/www olarak yazarız ki sürekli tekrar tekrar çalışıtırmak zorunda kalmayalım node ile 
Sonra npm install mongoose --save ile mongoose modülünü yükleriz
mongoose u require ile app.js e dahil ederiz 
Sonra gidip robomongo da veritabanlarımı içeeriisnde tutan klasöre sağa tıklayıp create database diyerek udemy adında bir veritabanı oluştururuz 
Sonra bağlanmak içimn mongoose.connect() parantezi içerisine mongodb:// dedikten sonra biz hangi klasör içerisine veritabanlarımızı koydu isek o klasör ve hangi veritabanımıza bağlanacaksak o veritabanını yolunu yazarız ve bu bir asenkron yapı olduğu için biz doğrudan promise olarak veri dönecği için then ile devam ederek bağlanıp bağlanmama durumuna göre mesaj alabiliriz...
//Biz mongodb bağlantısının çek etme işini then ile yapmamız aslında istenen birşey değil ondan dolayı biz veritabanı bağlantısının çalışıp çalışmadığını anlamak için
*/
var mongoose=require("mongoose");

var app = express();
/*
mongoose.connect("mongodb://localhost/udemy",{ useNewUrlParser: true }).then(()=>{
  console.log("MOngoDb çalıştı")
}).catch((err)=>{
  console.log("Mongo db bağlantı hatası")
}) */
mongoose.connect("mongodb://localhost/udemy",{ useNewUrlParser: true,useCreateIndex: true  })
mongoose.set('useCreateIndex', true);// Yoruma aldığımız bu satır ya da bir üstteki useCreateIndex hata alırsak bu şekilde düzeltiltiği için kullandık

mongoose.connection.on("open",()=>{
  console.log("MongoDB Bağlantı kuruludu")
}) //Çalıştığını kontrol etmek için  "open" parametresi verdik hata kontrolü içinde "error" parametresi verdik
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
app.use('/books',books);
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

//Mongoose Şema oluşturma kayıt ekleme 
//Şemalaraımızı mongo klasörümüzün altına models klasörü açarak veritabanı şemalarını tutacağm javascript dosyalarını burda tutacağız.
//Şema dosyası oluştururken başharfi büyük yazmamız daha iyi çünkü başharfi büyük olunca onun model dosyası olduğnu anlamış oluruz