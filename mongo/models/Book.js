const mongoose=require("mongoose");
const Schema=mongoose.Schema;//mongoose altında schema nesnesini kullanarak şemamızı olşturmaya başlarız
//Type,Default,required,unique keywordlerini Nerde KUllanabiliriz?
//Type-Default:bazen biz doğrudan kullanacağımız veri içeerisinde doğrudan veri tipini yazmayız da default bir veri tipi oluşturmak isteriz eğer o veri girilmezse default değer gelmesini isteriz sürekli olarak ki bu msql de de var olan bir durumdu.Onu nasıl yaparız hemen bakalım eğer biz router tarafında isPurchosed:true yani defaulttan farklı bir veri girersek o zaman router da yazdığımız veriyi alırız sunucu da ama router da isPurchosed ile ilgili hiçbirşey girmezssek o zaman da default olarak ne belirtmişsek o gelecektir değer olarak
//Başka örnek olarak da örneğin bir şeyin tarihini girmek istiyorsak yayınlanma tarihini type olarak Date belirleriz ama default olarak ise Date.now dersek eğer router da biz bu properties ile alkalı veri girmezsek o zaman default olarak o anda hangi tarih ise girilirken o ototatik gelir ki zaten bu durumlarda router tarafında ekstra dan yazmaaya gerek kalmaz
//Required: required true ise eğer biz model içerisinde oluşturduğumzu herhangi bir veri router tarafında mutlaka girilmesi gerekiyor ise işte onu burda model içinde belirtmeliyiz zaten eğer burdas required true belirlenir ve router tarafında veri girilmezse o zamn hata alırız
//Unique:Bu genelde email adresinde gerekir email adresini benzersiz girilmeli ki başkası ile karşımasın eğer bir veri ile ilgili uniqure true dedi isek o veriyi bir kere eklenince ikinci kez eklenmek istenirse uyarı veryor 
const BookSchema=new Schema({  
    //title adında bir alanımız olacak bunun taşıdığı veri string tipinde olacak
    title:String,
    author:{type:String,required:true,unique:true},
    category:String,

    published:Boolean,
    publishedAt:{type:Date,default:Date.now},
    comments:[{message:String}],//Ayrıca her dizi içerisine olşturduğumuz her bir objeye bir id ataması yapıyor mongodb 
    meta:{
        votes:Number,
        fav:Number
    },
    user_advices:[{advice:String}],
    isPurchosed:{
        type:Boolean,
        default:false
    }
});
//Şemada belirttiğimiz herşeyi illaki kullanmamız şart değil 
//Hazırladığımız modeli dışa aktaracağız.Mongoose un model methodu ile bunu dışarı aktarabiliriz..
//Model gönderdiğimiz için model methodu ile dışarı aktarıyoruz
//Kullanmak istemedeğimiz şema başlıklarını silebiliriz istersek mesela metayı kullanmak istemezsek sileriz
module.exports=mongoose.model("book",BookSchema)

//Model imizi oluşturduktan sonra hangi root a bunu ekleyeceksek gidip oraya önce import ederiz

 //ŞEMALARDA VALİDASYON İŞLEMLERİ
    //required ve unique bir validasyon işlemidir
      //maxlength:10 bu şekilde title alanının karakter uzunluğuna sınır getirebiliriz
    //maxlength:[10,"{PATH} alanı zorunlu"] dersek {PATH} ifadesi içinde olduğu value nin properties ini verir
    //  maxlength:[10,"{PATH} alanı (`{VALUE}`)  `{MAXLENGTH}` karkter uzunluğundan büyük olmamalıdır "]} bu şekilde ise VALUE title a bizim yazdığımız değerdir MAXLENGTH ise yazdığımız karakter uzunluğudur
    //Aynı şeler minlength içinde geçerlidir
// year:{type:Number,
//max:[2030,"{PATH} alanı (`{VALUE}`)  `{MAX}`"],//iste min deki gibi tek sadece min değerini yazabiliriz istersek de bir dizi içerisinde bu verilerle yazmak istersek bu şekilde de yazabiliriz
//min:2000
//Bu şekilde bir tarihin iki tane yıl arasında olmasını sağlayabiliriz...
