const express=require("express");
const app=express();

app.set("view engine","pug");
app.use(express.static("public"));
//? solunda kalan harf veya parantez içindeki harfleri yazsak da yazmasak da url de sıkıntı olmadan karşılar
app.get("/il(et)?isim",(req,res)=>{
    res.send("Merhaba express")
    //app.render("index.pug")
})

// * yazdıktan sonra yıldız yazdığımız yere ne yazarsak yazalım çalıştırır
app.get("/ana*sayfa",(req,res)=>{
    res.send("Ana sayfa")
})

// + koyduğumuz yerde soldaki harf ne ise o harfin sağında aynı harften istedğimiz kadar yazalım url karşılanacaktır
app.get("/xy+z",(req,res)=>{
    res.send("XYZ")
})

//Bu şekilde de kullanabiliriz..
app.get("/contact",(req,res)=>{
    res.send("contact page get methodu")
}).post("/about",(req,res)=>{
    res.send("About page post method")
})

//all methodu ile tüm methdolar aynı anda yazmış oluyoruz aslında..hepsi de çalışacaktır get,post,put,delete
app.all("/home",(req,res)=>{
    res.send("Burası all methodu!")
})

//dinamik url ile karşılamak-get isteklerine parametre atamak
//url içerisinde : varsa o bizim dinamik bir url yapacağımızı gösterir
app.get("/users/:id",(req,res)=>{
    res.send(req.params)//Burda biz url e users dan sonra ne yazarsak onu obje içinde bize döner örneğin biz localhos:4555/users/97 girersek bize obje olarak böyle bir obje döner {id:97} 
})

app.get("/galeri/:id",(req,res)=>{
    res.send(req.params.id)//Burda da biz users dan sonra ne yazarsak onu bize dönecektir
})

app.get("/minpage/:id/:postId?",(req,res)=>{
    res.send(req.params)
    //localhost:4555/minpage/54/34 urlde bunu yazınca bize {"id": "54","postId": "34"} bu şekilde bir obje dönecektir
    //Biz burda yaptığımız 2.dinamik parametreyi postId yi zorunlu olmamasını istersek postId sonuna ? soruişareti koyarsak 2.parametreyi girmesek de url miz çalışacaktır ancak ? koymazsak 2.parametreyi de koymak zorundayız..
})
//Bu arda biz bu server oluşturma işlemlerinde serverımız n çalışabilmesi için mutlaka bir response dönmemiz gerekiyor bunu da unutmayalım res.send gibi
app.listen(4555,()=>console.log("express serverımız çalışıyor"))