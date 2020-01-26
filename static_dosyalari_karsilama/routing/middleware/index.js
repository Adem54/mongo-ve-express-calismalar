const express=require("express");
const app=express();

const user=require("./routes/user");
const profile=require("./routes/profile");


//middleware imizi yazalım req ile resp arasında sürekli yazmamak için birkere oluşturup gelen req e eğer response olmazsa dönmek istediğmiz mesajları dönmemize uyarayan bir fonksiyondur
//ÖNEMLİİİİ:Middleware biz hangi router larda geçerli olmasın istersek onları app.use("/",user) şeklinde tanımladığımız kodlardan önce onları sayfaya dahil etttiğjmiz kodlardan da sonra yazmalıyız ki bu middleware o router lar için geçerli olsun burası önemli...
app.use('/profilepage',(req,res,next)=>{ //Eğer bu bu sayfada app.use ile yazılan tüm dosyalar içinde çalışmasını istersek o zaman app.use içinde parameter olarak sadece bir tane 3 parametreli fonksiyon olmalı yeterlidir ancak biz burda sadece bir dosya için bu çalışsın dersek o zaman app.use iki paramtreli yaparız ve ilk parametrede bizim router ları dahil ederken ki app.use("profilpage",profile) şeklinde yazdğıımız ve kök için belirletidğmiz profilpage url kök parametresini yazarsak sadece profil sayfasında çalışacaktır
    isLogin=false;
    //doğru olursa ruter lar hangi sayfaya yönlendirip nasıl bir cevap dönerse o cevabı döner next() deyince ama false ise o zaman else de döndürdüğümüz res.send() ile cevap dönecektir
    if (isLogin){
        next();//Eğer isLogin true olursa burda otomatik vermesi gerekn normal cevabı verecektir yani bir sayfaya girerken şifre girmişse doğrudan sayfaya girecektir yani girilmek istenen sayfa kullanıcıya açılarak cevap verilecek next() dersek
    }else{//ancak eğer kullanıcı yanlış şifre girmşse bu şekilde bir cevap dönmek istersek burayı kullanırıız..
        res.send("Hatalı giriş yaptınız")
    }
})

app.use("/profilepage",profile);//Biz
app.use("/",user);

app.listen(5444,()=>console.log("5444 serverı çalışıyor!"))
