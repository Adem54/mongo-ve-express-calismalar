const express=require("express");
const app=express();

const user=require("./routes/user");
const profile=require("./routes/profile");
/*
//Middleware ı dışardan sayfamıza dahil edip kullanmak
const isLogin=require("./helper/isLogin");
app.use(isLogin)
//Ama biz sadece bir sayfada kullanmak istersek o zaman da gidip sadece ı sayfaya dahil ederiz
*/
app.use("/profile",profile);
app.use("/user",user);



app.get("/",(req,res)=>{
    res.send("Ana sayfa get methodu")
})

app.listen("4666",()=>console.log("4666 serverı çalışıyor"))