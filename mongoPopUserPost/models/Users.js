const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const {ObjectId,String}=mongoose.Schema.Types;//Types objesinden tipleri alıyoruz biz ondan dolayı destructions ile alabiliriz bu şekilde tek tek almak zorunda değiliz ondan dolayı

const UserSchema=new Schema({
    name:{type:String,required:'{PATH} is required'},//hata kodu için yazdık bunu
    bio:{type:String},
    website:{type:String},
    posts:[{
            type:ObjectId,
            ref:"Post"
    }]

},{
    timestamps:true
})

module.exports=mongoose.model("User",UserSchema);