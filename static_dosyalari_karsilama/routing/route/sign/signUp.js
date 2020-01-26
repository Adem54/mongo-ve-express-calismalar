const express=require("express");
const router=express.Router();

router.get("/signUp",(req,res)=>{
    res.send("sıgnUp")
})

router.post("/signUp",(req,res)=>{
    res.send("signUp")
})

module.exports=router

