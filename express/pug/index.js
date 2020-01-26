//express modülünü kullanabilmemiz için öncelikle bu modülü kurmamız gerekiyor
const express=require("express");
const app=express();//Biz bu kodları yazıp express i oluşturunca otomatik olarak kendisi http sunucusunu olşturuyor bize de sadece sunucunun dinleyeceği port numarasını girmek kalıyor
app.set('view engine','pug');//pug dosyamızı tanıtıyoruz... 
app.get("/",(req,res)=>{
    //res.send("Merhaba express")doğrudan mesaj verirken kullanabilirz
    res.render('index')
})
app.listen(1421,()=>console.log("Port çalışıyor..."))

//Öncelikle biz pug dosyasını npm install ile kurarız ki bu pug dosyasını biz html yerine html in açıp kapama olayından kurtulmak ve dinamik html kullanabilmek ve pug dosyalarını birbiri içine include edip sonra onu başka bir layout a export etme gibi daha birçok kolaylığı vardır ki bununla alakalı bilgi deninmek için pug pugjs.org dan bulabiliriz..ayrıca yazılmış güzel türkçe kaynaklarda var
//Ana klasörümüz yani nodemodules lerimizn olduğu ve index.js imizin olduğu dosyalar pug klasörü altında pug dosyaları varsayılan olarak view nesnelerini views klasörü altından okur ondan dolayı views klasörü oluşturduk ve pug dosyalarımız buraya yazacağız...
//Ayrıca biz online olarak html i doğrudan pug dosyasına dönüştüren sistemler de mevcuttur