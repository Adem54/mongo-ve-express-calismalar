const mongoose=require("mongoose");
const Schema=mongoose.Schema
const ObjectId=mongoose.Types.ObjectId;

/*
const Comments = new Schema({
    title     : String
  , body      : String
  , date      : Date
});
*/
const PostSchema=new Schema({
    //commetns:[Comments],

    userId:{type:ObjectId,required:true},//Buranın ObjectId tipinde olması çok önemli çünkü mongodb verileri eklerken ObjectId tipinde id veriyor ondan dolayı biz bu userId yi buraya elle yazıyoruz ama user da ki bu id yi mongodb ObjectId olarak atıyor biz eşleştirirken tutması için burda da ObjectId yapmalıyız yoksa $lookup işleminde hata alırız
    title:{type:String,required:true,unique:true},
    image:{type:String},
    content:{type:String},    
    Date:{type:Date,default:Date.now}
})

//collection ismimiz burda model iindeki birinci parametre olan tırnak içerisnde yazılan "Posts" dur biz buraya ne yazarsak collection isminde onu görürürz ayrıca burda ismi küçük harflerle yazmalıyız zaten büyük harflerle yazsak bile collection isminde küçük harf olarak görürüz
const Posts=mongoose.model("posts",PostSchema);

module.exports=Posts

