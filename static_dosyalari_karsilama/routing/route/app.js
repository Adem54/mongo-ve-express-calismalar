const express=require("express");
const app=express();

const signIn=require("./sign/signIn");
const signUp=require("./sign/signUp");

app.use("/users",signIn) //bu şekilde yaparsak eğer biz signIn.js den dahil ettiğmiz tüm get post vs işlemlerin artık kök uzantısı users olmuş olur orda bizim yol olarak yazdığımız herşeyin başına ilk önce users koymamız gerekir
app.use("/",signUp)
app.get("/",(req,res)=>{
    res.send("Merhaba dostlar")
})

app.listen(5555,()=>console.log("5555 server çalışıyor"))