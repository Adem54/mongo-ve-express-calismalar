const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const {String,Number}=mongoose.Schema.Types;

const userSchema=new Schema({
    name:String,
    surname:String,
    age:Number
})


module.exports=mongoose.model("Users",userSchema);