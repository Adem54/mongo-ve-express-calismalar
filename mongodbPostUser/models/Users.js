//Model dosyalarımızn ismini büyük diğer dosyaların ismini küçük yaparak birbirinden ayırt etmekte işimizi kolaylaştırabilriz
//Burda şemamızı oluşturalım
const mongoose=require("mongoose");
const Schema=mongoose.Schema;


//Not biz eğer new Schema içerisindeki name,email password verilerini users adında obje içerisine alırsak o zaman route da nasıl alaağız
const UserSchema=new Schema({
  
name:{type:String,required:true},
email:{type:String,required:true,unique:true,sparse: true},
password:{type:String,required:true}

   
})

//Burda parantez içersiindeki ilk parametree ne yazarsak model adı o olacaktır "Users"
const Users=mongoose.model("Users",UserSchema);
module.exports=Users