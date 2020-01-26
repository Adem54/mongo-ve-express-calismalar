var express = require('express');
var router = express.Router();
const Users=require("../models/Users");
console.log(Users);

router.post("/new",(req,res)=>{

const user=new Users({ 
  name:"Adem Sabırsız",  
  email:"ademsabirsiz@gmail.com",
  password:"AdemSabirsiz"
})
user.save((err,data)=>{
  if (err) console.log(err)
  res.json(data)
})
} )

router.get("/mergeuserTopost",(req,res)=>{
    Users.aggregate([
      { 
        $lookup:{
          from:"posts",
          localField:"_id",
          foreignField:"userId",
          as:"posts"
        } },{
          $match:{name:"Kemal Tahir"}
        }
    ],(err,result)=>{
      res.json(result)
    })
})




router.get('/',(req, res)=> {
  console.log("req.body: ",req.body)
  Users.find({}).then((data)=>{
    res.json(data)

  }).catch((err)=>{
    res.json(err)
  })
     
});

module.exports = router;

/*
NEDEN BURDA POSTS DİZİSİ BOŞ GELİYOR BUNA BAKALIM...
router.get("/mergeuserposts",(req,res)=>{
  Users.aggregate([
    {
      $lookup:{
        from:"posts",
        localField:"_id",//ortak id nin users daki adı _id posts daki adı userId dir
        foreignField:"userId",
        as:"posts"
      }
    }
  ],(err,result)=>{
    
    res.json(result)
  })
})

*/