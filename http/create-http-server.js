const http=require("http");
const server=http.createServer((request,response)=>{
    console.log("Bir istekte bulunuldu...")
    console.log(request.url)
    console.log("bakalım")
    //console.log(request.headers)
    //console.log(request)

    //Kullanıcı istekte bulunacak serverdan da ona bir cevap dönülecek
    //Türkçe karakter sorunu için writeHead i kullanmalıyız
    //200 istek başarılı ise demektir
    response.writeHead(200,{'content-type':'text/html; charset=utf-8'})
    if (request.method === "GET") {
        if (request.url === "/"){
            response.write("Ana sayfadasınız")
        }else if (request.url === "/iletisim"){
            response.write("İletişim sayfasındasınız")
        }else{
            response.write("Sayfa bulunamadı..")
        }
    }
    
    response.end()//Cevabı sonlandırmamız gerekiyor
    //Mesajımızı doğrudan response.end() içerisine de yazabiliriz...
})

server.listen(1453);

//Biz http server çalıştırıldğında istekte bulundğunda console a birşey yazması için console.log a birşeyler yazınca onu biz localhost:1453 adresini güncelleyince console da yazan mesajı görebiliriz...Ancak burda iki kez istek yapıldı diye yazıyor bunun bir tanesi bizim gönderdiğimiz istek birtanesi ise favicon.ico için browser ın  otomatik olarak yaptığı bizden alakasız bir istektir...
//request nesnesinden glen headers dır bu
//Bu arada biz response.write yerine index.hmtl dosyasını da cevap olarak döndürebiliriz fs modulü ile yapabiliriz onu da 