const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const {ObjectId}=Schema.Types

const PostSchema=new Schema({
    title:{type:String,required:'PATH is required!'},
    subtitle:{type:String},
    user:{
        type:ObjectId,
        ref:'User'
    }
    
},{
    timestamps:true
})

module.exports=mongoose.model("Post",PostSchema);