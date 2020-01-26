const express=require("express");
const app=express();

app.set("view engine","pug") //pug ı tanıtalım burda
app.get("/",(req,res)=>{
   // res.send("merhaba express")
    res.render("index.pug",{name:"Adem",surname:"Erbas"})//parametre olarak pug a değişken göndermek
})

app.get("/home",(req,res)=>{
    // res.send("merhaba express")
     res.render("home")//parametre olarak pug a değişken göndermek
 })
 app.get("/contact",(req,res)=>{
    // res.send("merhaba express")
     res.render("contact")//parametre olarak pug a değişken göndermek
 })
//index.pug ya da doğrudan index de yazabiliriz..
app.listen(4333,()=>console.log("Port çalışıyor..."))