const express=require("express");
const router=express.Router();


router.get("/profile",(req,res)=>{
    res.send("Profile get methodu")
})

router.post("/profile",(req,res)=>{
    res.send("profile post methodu")
})

module.exports=router