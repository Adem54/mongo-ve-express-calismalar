const mongoose=require("mongoose");
const Schema=mongoose.Schema;

//Eğer required,default,unique den birini kullanırsak o zaman veri türünden hariç bunları da girmemiz gerkeeceğinden obje kullanmamız gerekecek o zamnda da veri tipini type properteis i ile belirtmiş oluruuz
const BookSchema=new Schema({
    userId: String,//Burda string veriyorum ama veritabanı collecttion da ObjectId olarak tipi gözükür
    title:{type:String,require: true, index:true, unique:true,sparse:true,
      maxlength:[20,"{PATH} alanı (`{VALUE}`)  `{MAXLENGTH}` karkter uzunluğundan büyük olmamalıdır "]},
    //ŞEMALARDA VALİDASYON İŞLEMLERİ
    //required ve unique bir validasyon işlemidir
      //maxlength:10 bu şekilde title alanının karakter uzunluğuna sınır getirebiliriz
    //maxlength:[10,"{PATH} alanı zorunlu"] dersek {PATH} ifadesi içinde olduğu value nin properties ini verir
    //  maxlength:[10,"{PATH} alanı (`{VALUE}`)  `{MAXLENGTH}` karkter uzunluğundan büyük olmamalıdır "]} bu şekilde ise VALUE title a bizim yazdığımız değerdir MAXLENGTH ise yazdığımız karakter uzunluğudur
    //Aynı şeler minlength içinde geçerlidir
    year:{type:Number,
      max:[2030,"{PATH} alanı (`{VALUE}`)  `{MAX}`"],//iste min deki gibi tek sadece min değerini yazabiliriz istersek de bir dizi içerisinde bu verilerle yazmak istersek bu şekilde de yazabiliriz
      min:2000
    //Bu şekilde bir tarihin iki tane yıl arasında olmasını sağlayabiliriz...
    },
    publishedAt:{type:Date,default:Date.now},
    published:{type:Boolean,default:true},
    meta:{
        votes:Number,
        fav:Number
    },
    category:String,
    comments:[{message:String}]

})

module.exports=mongoose.model("book",BookSchema);

/*
Örnek Modelsler iki tane collection bir dosyada
var userSchema = new mongoose.Schema({
  local: {
    name: { type: String },
    email : { type: String, require: true, index:true, unique:true,sparse:true},
    password: { type: String, require:true },
  },
  facebook: {
    id           : { type: String },
    token        : { type: String },
    email        : { type: String },
    name         : { type: String }
  }
});

var User = mongoose.model('User',userSchema);

module.exports = User;


//Bunu da incele burda da ayrı dosyalarda collectionlar ve hepsini bir index te toplamış ve ordan router lara dağıtmış  bu da daha düzenli bir mantıık olarak düşünülebilir

https://kb.objectrocket.com/mongo-db/how-to-join-collections-using-mongoose-228

//Çok önemli bunlara dikkat edelim...

//Ayrıca biz callbackler yerine promise ile asenkron yapılar then ya da async await yapılarını kullanma ya da bakalım bu da önemliii..then ile örnek bu şekilde yapılabilir...
https://github.com/iamshaunjp/mongodb-playlist/pull/6/files

//Birde direk async await ile nasıl yaparız dersek onu da bu şekilde yapabiliriz

https://alligator.io/nodejs/crud-operations-mongoose-mongodb-atlas/

*/