const express=require("express");
const router=express.Router();
//burda router değişkenine önceden app değişkeni olarak yaparak hemen hemen aynı şeyi yapıyorduk burda sadece express.Router diyoruz ve biz bunları neden yapıyoruz bizim yüzlerce get post isteklerini karşılamak için yazdğımız dosyalar ı tek bir dosyada birleştirebilmek için bu rotuer işlemlerini yapmaamız gerklidir
router.get("/signIn",(req,res)=>{
    res.send("signIn sayfası")
})

router.post("/signIn",(req,res)=>{
    res.send("signIn sayfası")
})

module.exports=router