const express=require("express");
const router=express.Router();
const {User,Post}=require("../models")
const mongoose=require("mongoose")
router.get("/",async (req,res)=>{
    const data=await Post.find();
    res.json(data)
})

//Burda user lardan birisinin id sini url de req.params.id ye eşit oluyor
router.post('/create/:id', async(req,res)=>{
    const {id}=req.params
    const {title,subtitle}=req.body
    const post=new Post({
        title,
        subtitle,
        user:id
    })

   const postData=await post.save() 
   //post ları kaydediyoruz burda da ve burada user ının id sini de yine url den gelecek req.params ile alacak...Daha sonra ise işlemlerimiz devam edecek   
   //User modelinde id arayacağız ve biz url ye hangi id yazdı isek  o id li user ı bul getir diyeceğiz ve dönen veri ni posts properties i boş idi en son user a veri eklediğimzde buna dikkat edelim
   const userById=await User.findById(id) 
   //Sonrasında yukarda veri req.body üzerinden veri eklediğimiz post verisini url üzerinden id yi req.params ile alıp post verilerini girerken o id ile yüklemiştik user prooperties ini şimdi de findById ile url ye yazddğımız id ye ait user verisinin posts properties  dizisine az önce verilerini kaydettğimiz post u push ediyoruz
   //Burada dikkat edilecek en önemli husus url deki req.params dan aldğımız id yi hem post modelinin user propertiesindeki ObjectId ye veriyoruz hem de User modelinden o id li user ı çağırıp onun post una yukarda eklediğjmiz post u push ediyoruz.Birde önemli bir husus url de arama yaparken id olarak bir user id si girmemiz gerekir
   const postsData=userById.posts.push(post);
   //VE son olarak da post eklediimiz user ı ekrana bas diyoruz burasıda önemli gelen user verisi artık post verisi boş değill dolu olark gelecek karşımıza ve ilk post eklediğmizde user içerisinde post un tüm bilgileri gelirken 2.posttan sonra artık user içinde postların sadece id lerini görebileceğiz ve içerisinde post id leri de gelmiş olan user larımızı tekrardan save ediyoruz aşağıda
   const userData=await userById.save()
   //res.json(userById)
   res.json(postData)

});

router.get("/",async (req,res)=>{
    try {
        const data=await Post.find({})
        res.json(data)
    } catch (error) {
        res.json(error)
    }
})
//Burda da id sini verdiğmiz post u user ı ile birlikte getiriyor ancak user ının içerisinde tüm yazıları hangileri onun la beraber getiriyor burda bu veriyi birz daha azaltailiriz buna da bakalım....
router.get("/selectUsersInfo/:id",async (req,res)=>{
    const {id}=req.params

    try {
        const data=await Post.findById(id).populate({path:"user"})
        res.json(data)    
    } catch (error) {
        res.json(data)
    }
    

})



//Burda da id sini url de  yazdığımız bir post içerisinde user verileri ile birlikte gelecek ancak user içerisinde hangi postların ona ait olduğuna dair id lerle birlikte gelecek ondan dolayı biz biraz user gelirken daha sade gelmesini istersek  bu şekilde yaparız
router.get('/populate/:id',async (req,res)=>{
    const {id}=req.params
    const userByPost=await Post.findById(id).populate({path:'user',select:["name","bio","website"]})
    res.json(userByPost);
});

module.exports=router
//Ayrıca şunu da yapalım mutlaka biz normalde callback fonksiyonu olan async anonim fonksiyonlarını başka bir sayfada tanımlayıp  ordan buraya çekerek çok daha sade temiz ve anlaşılır kod yazabiliriz bunu da yapmaya çalışalım

//İki şey yapacağız
//1)Post ları içlerinde user bilgileri daha sadeleşmiş birşekilde gelecek şekilde ayarlama meselesine bakalım
//2)Daha sade ve daha temiz kod yazmak için asyn anonim fonksiyonlarımızı farklı sayfalarda yazıp buraya çekmeyi deneyelim 