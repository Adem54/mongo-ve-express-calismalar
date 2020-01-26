const mongoose=require("mongoose");
const Schema=mongoose.Schema
const ObjectId=mongoose.Schema.Types.ObjectId;
const PostSchema=new Schema({
    userId:{
        type:ObjectId,//Burası ObjectId olmak zorunda mongoose.Schema.Type.ObjectId çünkü bu id yi user da mongo db nin atadığı id ile aynı olacak ki onun tipi de ObjectId olduğu için
        ref:"User"
    },
    title:String,
    image:String,
    content:String,
    Date:{type:Date,default:Date.now}
   
})

const Post=mongoose.model("Post",PostSchema);
module.exports=Post;