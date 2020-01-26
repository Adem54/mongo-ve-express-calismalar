const express=require("express");
const app=express();

const user=require("./routes/user");
const profile=require("./routes/profile");




app.use("/",user);
app.use("/",profile);

app.set("view engine","pug")
app.get("/",(req,res)=>{
    //res.send("Merhaba Hoşgeldiniz")
    res.render("index")
})

//Hata varsa hata mesajı için middleware e yönlendirmem lazım ki hata mesajnı  oradan alsın
app.use((err,req,res,next)=>{
    console.log("err:",err)
    res.status(err.status)//cevap durumu na hata durumun gönderelim hata durumu nedir 400 mü 500 mü 404 mü
    res.render("error",{
        message:err.message,
        status:err.status
    })    //err.message ve err.status u user sayfasındaki next() içerisindeki objeden alıyor
})
app.listen(3333,()=>console.log("3333 numaralı portumuz çalışıyor"))