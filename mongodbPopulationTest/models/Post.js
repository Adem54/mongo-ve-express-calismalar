const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const {ObjectId}=mongoose.Types

const postSchema=new Schema({
    title:String,
    kind:String,
    like:Number,
    PostedBy:{
        type:ObjectId,
        ref:"Users"//model ismi nerden gelecekse o modelin ismi
    }
  
})


module.exports=mongoose.model("Posts",postSchema);