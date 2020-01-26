const express=require("express");
const router=express.Router();

const mongoose=require("mongoose");
let Books=require("../models/Books");


router.get("/",(req,res)=>{
    res.send("Books sayfası")
})
 
router.post("/new",(req,res)=>{
    const book=new Books({ //Bir obje oluşturuyoruz ve içerisine veri atıp onu book değişkenine atıp onu da collectiona kaydediyoruz.Bizim collectionımız Books dur unutmayalım ondan dolayı filtreleme işlemlerinde Books.search vs gibi herşeyi orda ararız
       userId:"5e1960e02ea42c02f883955dcba",
      title:"Birinci Pembemsi",
      year:2040,
        meta:{votes:3,fav:4},
        category:"History",
        comments:[{message:"Birinci Kitap yorumu"},{message:"Bu da 1.kitabın 2.yorumudur"}]
 })
 book.save((err,data)=>{
    if (err) console.log(err)
     res.json(data);
 })
})

//Bu işlem bize şunu yaptı benim books collectionlarımın herbirisinin içerisine user objesini eklemiş oldu diyebiliriz ki bu şekilde biz iki collection ı birleştirmiş  olduk aslında
router.get("/aggregate-lookup",(req,res)=>{
    Books.aggregate([{
        $lookup:{
            from:"users",//hangi collection ile join ilişki kuracağız users
            localField:"userId",//kendi lokal collectionundaki hangi alanı eşleştireceksin yani sendeki ortak alan ne diğer collection ile
            foreignField:"_id",//Burası da eşleştirilecek collection da hangi veri ile eşleştirilecek o verini properties ini yazarız
            as:"author"//son olark veriler getirildiğinde bu değerler in atanacağı obje hangi isimde gelsin
}//Ayrıca biz id leri çakıştırarak author adında obje olarak kitabın yazarını books collection ı içerisinde getirdikten sonra books collectiondan sadece title alsın ve author objesini almasını istersek  o zaman
    },{
        $unwind:"$author"//author değişkenini almamız lazım önce onu burda yapıyoruz kki daha sonra aşağıda ki işlemleri yapabilelim
    },{
        $project:{//title gelsin diyoruz ve author adında auhtor objesi gelsin diyoruz
            title:1,
           // author:"$author", author objesi zaten title ile ard arda geliyor ancak biz author objesinin fullName propertiesinin title ile ard ardda gelmesini istersek o zaman da fullName adını yazar ve value olarak "$author.fullName" dersek  o zaman amacımıza ulaşmış oluruz
            fullName:"$author.fullName"//fullName i ayrıca almak istersek bu şekilde alabiliriz
        }
    }
],(err,result)=>{
        res.json(result)
    })

})

//Peki ben kitaplardan herhangi bir tanesinin sadece o id li kitabu getirmek istiyorum yani match ile kümeleme yapıyoruz yani collection içinde şartı kolaylıkla yapabiliyorduk

router.get("/aggregate-match",(req,res)=>{
    Books.aggregate([
        {
        $match:{//books id leri ObjectId tipinde tutulduğu için sorgularken buna dikkat etmeliyiz önce mongoose u bu sayfaya import ederiz sonra da 
            _id:mongoose.Types.ObjectId("5e17c7da05c9f42c70d12a6d")
        }
    },{
        $lookup:{
            from:"users",
            localField:"userId",
            foreignField:"_id",
            as:"author"
        }
    },
    {
        $unwind:"$author"//yukarda as ile adlandırdığımız objenin içeriğini project içinde kullanabilmemiz için burda belirtmeliyiz
    },
    {
        $project:{//Collectiondan hangi başlıklar gelsin onu burda belirttik
            title:1,
            fullName:"$author.fullName"
        }
    }
],(err,result)=>{
        res.json(result)
    })
})

router.get("/exists",(req,res)=>{
    Books.find(
        {
            category:{//$exit:true dersek collection içinde category si olanlar gelmesin demiş oluyoruz burda ama $exits:false dersek o zaman  da category si ollmayanları getir deriz
                $exists:false
            }
        }
    ,"title comments category",(err,data)=>{
        res.json(data)
    })
})
module.exports=router;