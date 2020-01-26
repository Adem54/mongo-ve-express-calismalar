const express=require("express");
const router=express.Router();


router.get("/profile",(req,res)=>{
    res.send("Profile Side")
})

module.exports=router