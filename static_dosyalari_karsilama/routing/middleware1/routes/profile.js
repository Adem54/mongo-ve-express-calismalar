const express=require("express");
const router=express.Router();


router.get("/profile1",(req,res)=>{
    res.send("Profile get methodudur")
})

router.post("/profile1",(req,res)=>{
    res.send("Profile post methodudur")
})

module.exports=router