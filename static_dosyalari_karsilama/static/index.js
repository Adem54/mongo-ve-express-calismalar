const express=require("express");
const app=express();

app.set("view engine","pug")
app.use(express.static('public'))
app.use(express.static("other-public"))
//static dosya klasörü adınız yazariz bu şekilde yazınca node.js artık doğrudan statik dosya klasörünü bulacağı için biz style.css i pug dosyasında yazarken doğrudan style.css yazarız önüne hangi klasörde olduğunu vs yazmamıza gerek kalmaz

app.get("/",(req,res)=>{

    //res.send("Merhaba")
    res.render("index.pug")//pug dosyası yazılır .pug uzantısı olmasa da olur
})



app.listen(4445,()=>console.log("Port çalışıyor"))