const express=require("express");
const router=express.Router();

router.get("/user",(req,res)=>{
    res.send("User sayfası get")
})

router.post("/user",(req,res)=>{
    res.send("User sayfası post")
})

module.exports=router
