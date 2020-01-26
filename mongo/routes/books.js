const express=require("express");
const router=express.Router();

//Models
const Books=require("../models/Book");//Book modelimzi import ettik
//Bu modelimizi kullanarak mongodb ye bir veri kaydetmek istiyoruz
console.log("Books: ",Books)
//Bu verileri kaydedeceğimiz için post olarak gönderip postman dan kontrol ederiz ki her gönderdiğimiz verimiz post ile gönderdiğimiz için veritabanına kaydediliyor sürekli olarak
router.post("/new",(req,res)=>{
  //Bir tane obje olştururuz ve parametre olarak obje veririz ve içerisine bir tane veri yazarız.Sonra da bu veriyi kaydediyor olacağız.Biz burda bu şekilde veriyi kaydedince robomongo ya gidip refresh edersek orada hem veritabanımızın hem de collection ımızın geldiğini görebiliriz..
  //Mongo db nin özelliği budur eğer o collection yoksa ve biz o collection a kayıt eklmek istiyorsak biz doğrudan kayıt ekleyince o collection ı mongodb bizim yerimize oluşturur.Ayrıca monngo.db yazdğımız veriyi kaydedersek ona uniq bir id atıyor kendisi
    const book=new Books({
        title:"Udemy Node.js",
        author:"Yedinci",
        category:"Story",
        published:true, 
        comments:[{message:"Kitabı beğenmedim"},{message:"Kitabı çok beğendim"}],
        meta:{votes:109,fav:45},
        user_advices:[{advice:"Bence kitap kapağı biraz daha göze hitap etmeli"},{advice:"Bence içerik çok boğucu olmuş değişitrilmeli"}],
        
    })
    //iki parametresi var birisi hata ikincisi dönen data
    book.save((err,data)=>{
        if (err) {console.log(err)}
        //Hata yoksa da res.json(data) olarak veriyi bassın
        res.json(data)
    })
   // res.send("Book Page")
})

//find ile sorgu yapmak sorguyu get içersinde yaparız
router.get("/search",(req,res)=>{
  //import ettğimiz Book modelimizi kullanarak find işlemi ile sorgu yapabiliriz
  //filtreleme yapmış oluyoruz ve hem published false olanlar hem de author Victor olanları getir demiş oluyoruz burda
  //Ayrıca filtreleme kritlerlerini obje içine yazdıktan sonra filtrelenen verilerden de sadece collection verileri gelmesini istersem eğer o zaman find içerisinde ekstra bir parametre olarak tırnak içerisinde gelmeisni istedğimiz başlığı yazarız "comment" gibi ayrıca ekstra alanlarda eklemek istersek onu da "comments title " şeklinde yazabiliriz
  //Tüm kayıtları almak istersek eğer o  zaman da Books.find içindeki ilk parametre olan objeyi boş bırakırsak o zaman tüm kayıtları dönecektir ki tüm kayıtlar içinden de sadece bazı dokuman(satır) larım tüm kayıtlarını getirebiliriz
  Books.find({published:true,title:"Udemy Node.js"},"comments title",(err,data)=>{//iki ihtimalli bir sonuç var veritabanından ya err ya da data gelir ondan dolayı parametre olarak bu şekilde oluyor
    res.json(data)
  })//Books.find dedikten sonra obje içerisine aramak istediğimiz kritlerleri yazarım
})
//findOne ile Tekil sorgu yapmak bu şekilde mesela biz auhtor:"Lincoln" yazdık veritabanımızda author u Lincoln olan belki onlarca kayıt var ama biz böyle yazınca ilk bulduğu Lincoln kaydı bize getirecektir
router.get("/searchOne",(req,res)=>{
  Books.findOne({author:"Lincoln"},(err,data)=>{
    res.json(data)
  })
})

//_Id bazlı arama yapmak
router.get("/searchById",(req,res)=>{
  //Burda biz doğrudan findById ile arayınca gidip veritabanını arar ve o kaydı doğrudan objesini bulur bulmaz getirir bulunca armaaya devam etmez ancak eğer biz bu işlemi find ile yapsa idik ki yapabilirdik o zaman ama find ile arasa idik tüm kaydı tek tek kontrol eder kontrol ederken bulsa bile tüm collection ı bitirene kadar kontrol etmeye devam eder
  //Books.find(_id:"5e1517b5e0986d29ac8a2bbd")
  Books.findById("5e1517b5e0986d29ac8a2bbd",(err,data)=>{
    res.json(data)
  })
})

//put ile update güncelleme yapmak
//Önce obje içine hangi veriyi güncelleyeceğiz ilk parametreye obje içinde onu yazarız ikicci parametreye ise yine obje içinde değiştireceğimiz verinin yeni değeri ne olack onu yazarız.Ama şuna dikkat edelim bu şekilde sadece update ile güncelleme yappınca bu kritlerlere sahip ilk bulduğu collection ı yapar sadecce yani tüm collection ları yapmaz tüm veritabanındaki models deki colllection ları güncellemesi için ise ekstra olarak bir paramtre daha ekleriz obje içinde ve multi:true deriz o zaman ise veritabanında kaç tane collection varsa hepsini de güncelleyecektir
router.put("/update",(req,res)=>{
  Books.update({published:false},{published:true},{multi:true},(err,data)=>{
    res.json(data)
  })
})
//Eğer güncellemek istediğimiz kayıt yok ise o zaman collection a ekleme yapmasını istersek upsert:true yazarız multi true yerine ki bu bize lazım olacak....
router.put("/updateUp",(req,res)=>{
  Books.update({published:false},{published:true,title:"deneme title"},{upsert:true},(err,data)=>{
    res.json(data)
  })
})
//id bazlı güncelleme yapmak  

router.put("/updateById",(req,res)=>{
  Books.findByIdAndUpdate("5e1527e23e2c1e276871a4f9",{title:"burası değişecek","meta.votes":129},(err,data)=>{
    res.json(data)
  })
})

//Silme işlemi yapmak
//1.Yöntem önce findById ile silinecek veri bulunur ve adına data yerine book denir sonrasında da book adında gelen veri book.remove diyerek silinir

router.delete("/remove",(req,res)=>{
  Books.findById("5e1527e23e2c1e276871a4f9",(err,book)=>{
    book.remove((err,data)=>{
      res.json(data) //sildiği datayı postman e dönsün de görelim diye bunu getir diyoruz
    })
  })
})

//Silme işlemi 2.Yöntem ise üstte yaptımız önce id yi bulup sonra bulunan verinin silinme işinin birleştirilmiş halidir yani bizim burda obje içinde yazdğımız kritere uyan ilk collection ı silecektir

router.delete("/findOneAndRemove",(req,res)=>{
  Books.findOneAndRemove({published:false},(err,data)=>{
    res.json(data)
  })
})

//Silme işlemi 3.Yöntemi de remove ile yaparız
router.delete("/remove3",(req,res)=>{
  Books.remove({published:false},(err,data)=>{
    res.json(data)
  })
})

router.get("/sort",(req,res)=>{
  Books.find({},(err,data)=>{
    res.json(data)
  }).sort({"meta.votes":-1})//meta.votes sayılarını küçükten büyüğe doğru sıralam demektir 1 yazınca eğer büyükten küçüğe sıralamk istersek o zaman da 1 yerine -1 yazarız
  //Bu sıralamayı biz postmen de görürürz veritabanında değil çünkü veritabanından postmen e getiriyor sıralayarak
  //Eğer string bir veriyi A dan Z ye sırlaanmasını istersek de o string veri properties inin valuesini de 1 yazarız ama Z den A ya istersek o zamand  a yine -1 yazarız
})

router.get("/sortStr",(req,res)=>{
  Books.find({},(err,data)=>{
    res.json(data)
  }).sort({"author":-1})
})

//skip ve limit
//skip bazı kayıtları atlayıp ondan sonraki kayıtları getirmek için kullanılır
//limit ise kayıtlarımızdan limitli mesela sürekli artan kayıtlarımız var biz ise herzaman 5 tane getir demek istersek limit işlemi ile limitlemiş oluruz
router.get("/skipAndLimit",(req,res)=>{
  Books.find({},(err,data)=>{
    res.json(data)
  }).skip(1).limit(1)//kayıtlardan 1 tane atla ve 1 tanesini getir demektir
}) 

//MongoDb de Kümeleme-mathc operatörü
router.get("/aggregate1",(req,res)=>{
  Books.aggregate([{
    $match:{published:true}
  }],(err,result)=>{
    res.json(result)
  })

})//$match operetörünü kullanarak sadece published true olanları getirtiyoruz

//Gruplama-group operatörünü kullanarak hangi kategoriden kaç kitap olduğunu bulalım
//Grup yapma örneğin öğrencilerden tüm sınavlardan 60 üstü alanları süzmek istersniz örneğin gruplama yöntemi ile çok kolay yapabilirsiniz
router.get("/aggregate2",(req,res)=>{
  Books.aggregate([
    {
    $match:{
      published:true
    }
  },  
  {
  $group:{//gruplamada localdeki yani books collection ında birşey yazacaksak mutlaka _id property olmalı bu çok önemli tüm veriler _id nin altındadır
    _id:"$category",adet:{$sum:1}//neye göre gruplanacaksa id ye onu bu şekilde yazarız
     //Burda da biz kitaptan kaç adet olduğnu bulmak istedğimi için bu şekilde yaparız ve adet ismini herhangi bir isim de verilebilirdi
  }
}],(err,result)=>{
  res.json(result)
})
})//Sonuç itibariyle published true olanlardan kipta categorilerinden kaçartane var karşımıza getirecektir

//Yine bu mantıkta project operatörü ile de published true olanlardan veriler içerisinden sadece title ve author kısmı gelmesini istersek 

router.get("/aggregate3",(req,res)=>{
  Books.aggregate([
    {
    $match:{
      published:true
    }
  },
{
  $project:{//1 de yazabiliriz true da yazabiliriz ikisi de bu verileri seç ve getir demektir
    title:true,
    author:1
  }
}],(err,result)=>{
  res.json(result)
})
})

// Aggregate $sort,$skip,$limit nasıl yaparız

router.get("/aggregateSort",(req,res)=>{
  Books.aggregate([
    {
      $match:{
        published:true
      }
    },
    {
      $project:{
        title:true,
        author:1
      }
    },
    {
      $sort:{//Bu şekilde grupladıklarımız sıralanabilir tersten sıralarken -1 ama küçükten büyüğe ve A dan Z ye sıraarken 1 veririz
        author:-1
      }
    },{
      $limit:4//Bu şekilde de 2 kayıt göstereektir bize
    },{
      $skip:1//1.kayıttan sonra gösterir
    }
  ],(err,result)=>{
    res.json(result)
  })
})
module.exports=router