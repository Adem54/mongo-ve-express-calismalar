var express = require('express');
var router = express.Router();

const {User,Post}=require("../models");

// user routes
router.post('/create',async (req,res)=>{//İlk önce postmen den veri ekleyip user a name,bio ve website verilerini ekleriz ve mongodb kendisi herbir user a bir id ataması yapar ve biz bu şekilde kaç tane user ımız olacaksa ekleriz ve şuraya dikkat edelim ilk başta user eklerken user modelinin posts properties i boş gelir
  const {name,bio,website}=req.body
  const user= new User({
    name,//name:name demektir
    bio,
    website
  })
   const data=await user.save() 
   res.json(data)
});
//Burda tüm user ları içerisinde post id leri olacak şekilde görürüz
router.get('/getUsers',async (req,res)=>{
  const user=await User.find()
  res.json(user)
} );

//id sini url de aradığımız bir user ı tüm post bilgileri ile beraber getiriyoruz burada
router.get('/postsByUser/:id', async (req,res)=>{
  const {id}=req.params
  const postsByUser=await User.findById(id).populate('posts');
  res.json(postsByUser)
});

/////////////////////////////////////7
//BURASI BİZE İD SİNİ VERDİĞMİZ HERHANGİ BİR USER IN POSTS LARINI VERİYOR ÇÜNKÜ SIRA İLE HER BİR POSTUN İD Sİ GELİYOR ADINA DA ELEMENT DİYORUZ VE ONUNLA O İD Lİ POST UN DETAYLARINI ALIYORUZ HER DÖNGÜDE SIRA İLE HER POSTUN DETAYLARINI ALIRIZ
router.get('/forEachTest/:id', async (req,res)=>{
  const {id}=req.params
  const user=await User.findById(id)
  user.posts.forEach(async element=>{
    const post=await Post.findById(element);
    console.log(post);
    //res.json(post)
  })
})


/////////////////////////////////////////////7
//Tüm user ları post ları ile beraber alırız bura da da işte mantıklı olacak şekilde amacımıza bura da ulaşabildik sonunda :)

router.get('/find/posts', async (req,res)=>{
  
  const usersByPosts=await User.find().populate('posts');
  res.json(usersByPosts)
});



/*
Şuna dikkat edelim aslında  notice that
 const user = await User.findById(id).populate('posts') kısmı aşağıdaki forEach yöntemi ile aynı işlevdedir

 user.posts.forEach(async element => {
           const post = await Post.findById(element);
              console.log(post);
        });
       
        
*/

module.exports = router;

//Aslında burda bir manada amaca ulaşılmış gibi gözüküyor ancak bu normalde mantığa ters olmuş çünkü normalde önce user lar yazarlar eklenir daha sonra onların  yazıları eklenir ki burda tam tersi olmuş önce yazılar eklenmiş daha sonra onların yazarları eklenmiş