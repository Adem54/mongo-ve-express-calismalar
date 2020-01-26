const express=require("express");
const router=express.Router();

const isLogin=require("../helper/isLogin");


router.get("/user",isLogin,(req,res,next)=>{
    //Biz hata yönetiminde user ı bulamadığımız farzedelim
    const user=false
    if  (user){
        res.send("User sayfası")
    }else{//Eğer veritabanından user kullanıcıı bulunamadı ise bunu next olarak  yap diyoruz ve biz next içerisine obje olarak ne gönderirsek bunlar app.js deki err objesi içerisine gidiyor doğrudan ve biz bunları err.status,err.message diye alabiliriz
        next({
            status:404,
            message:"Bu kullanıcı bulunamadı",
            name:"Adem",
            surname:"Erbas"
        })
    }
    
})

router.post("/user",isLogin,(req,res)=>{
    res.send("User sayfası")
})

module.exports=router