const express=require("express");
const router=express.Router();

//Eğer sadece user sayfasında kullanmak istesek önce sayfaya dahil ederiz daha sonra ise kullandığımız get methoduna 3.parametre olarak 1 ve 2. parametrenin ortasına yerleştiririz
const isLogin=require("../helper/isLogin");

router.get("/user1",isLogin,(req,res)=>{
    res.send("User get methodudur")
})

router.post("/user1",(req,res)=>{
    res.send("User post methodudur")
})

module.exports=router