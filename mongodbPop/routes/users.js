var express = require('express');
var router = express.Router();
const mongoose=require("mongoose");

const db=require("../models");
const User=db.User;
const Post=db.Post;

router.post("/new",(req,res)=>{
const ahmet=new User({
  name:"Ahmet Karayel",
  email:"ahmetkarayel@gmail.com",
  password:"AhmetKarayel"
})
const kemal=new User({
  name:"Kemal Şahiner",
  email:"kemalsahiner@gmail.com",
  password:"KemalSahiner"
})
const serkan=new User({
  name:"Serken Adıgüzel",
  email:"serkanadiguzel@gmail.com",
  password:"SerkanAdiGuzel"
})

const necmettin=new User({
  name:"Necmettin Kaya",
  email:"necmettinkaya@gmail.com",
  password:"NecmettinKaya"
})

ahmet.save();
kemal.save();
serkan.save();
necmettin.save();

const post1=new Post({
  title:"AhmetPost1",
  image:"https://a.wattpad.com/cover/49503100-352-k406476.jpg",
  content:"Ahmet in 1.Postunun içeriğidir",
  userId:ahmet._id

})

const post2=new Post({
  title:"KemalPost1",
  image:"https://i.pinimg.com/originals/42/37/77/423777012b1b263d4b37fae7ab5e1b57.jpg",
  content:"Kemal in 1.Postunun içeriğidir",
  userId:kemal._id
})
const post3=new Post({
  title:"SerkanPost1",
  image:"https://i2.cnnturk.com/i/cnnturk/75/630x0/5273fc3d05066827987c7114.jpg",
  content:"Serkan ın 1.Postunun içeriğidir",
  userId:serkan._id
})
const post4=new Post({
  title:"NecmettinPost1",
  image:"https://i2.cnnturk.com/i/cnnturk/75/630x0/5273fc3d05066827987c70f0.jpg",
  content:"Necmettin in 1.Postunun içeriğidir",
  userId:necmettin._id
})

const post5=new Post({
  title:"AhmetPost2",
  image:"https://i2.cnnturk.com/i/cnnturk/75/400x0/5273fc3c05066827987c70be.jpg",
  content:"Ahmet in 2.Postunun içeriğidir",
  userId:ahmet._id
})
const post6=new Post({
  title:"KemalPost2",
  image:"https://static.nadirkitap.com/fotograf/130868/11/Efemera_20180913120724_130868_6.jpg",
  content:"Kemal in 2.Postunun içeriğidir",
  userId:kemal._id
})

const post7=new Post({
  title:"SerkanPost2",
  image:"http://gsuatolye.net/content/upload/tasarim/131103924315601625-kitap-kapagi_berke-camekan.jpg",
  content:"Serkan ın 2.Postunun içeriğidir"
})

const post8=new Post({
  userId:necmettin._id,
  title:"NecmettinPost2",
  image:"https://i2.cnnturk.com/i/cnnturk/75/630x0/5273fc3c05066827987c70c0.jpg",
  content:"Necmettin in 2.Postunun içeriğidir"
 
})

post1.save()
post2.save()
post3.save()
post4.save()
post5.save()
post6.save()
post7.save()
post8.save((err,data)=>{
  if (!err) {
    res.json(data)
  }
})


})
/* GET users listing. */
router.get('/new', (req, res, next)=> {
 Post.find({}).populate('userId').exec((error,posts)=>{
   res.json(posts)
 })

});

module.exports = router;

/* 

[
    {
        "_id": "5e1f035f4ca9ea2d2c5c3b4f",
        "title": "KemalPost1",
        "image": "https://i.pinimg.com/originals/42/37/77/423777012b1b263d4b37fae7ab5e1b57.jpg",
        "content": "Kemal in 1.Postunun içeriğidir",
        "userId": {
            "_id": "5e1f035f4ca9ea2d2c5c3b4b",
            "name": "Kemal Şahiner",
            "email": "kemalsahiner@gmail.com",
            "password": "KemalSahiner",
            "__v": 0
        },
        "Date": "2020-01-15T12:19:43.355Z",
        "PostedBy": [],
        "__v": 0
    },
    {
        "_id": "5e1f035f4ca9ea2d2c5c3b50",
        "title": "SerkanPost1",
        "image": "https://i2.cnnturk.com/i/cnnturk/75/630x0/5273fc3d05066827987c7114.jpg",
        "content": "Serkan ın 1.Postunun içeriğidir",
        "userId": {
            "_id": "5e1f035f4ca9ea2d2c5c3b4c",
            "name": "Serken Adıgüzel",
            "email": "serkanadiguzel@gmail.com",
            "password": "SerkanAdiGuzel",
            "__v": 0
        },
        "Date": "2020-01-15T12:19:43.356Z",
        "PostedBy": [],
        "__v": 0
    },
    {
        "_id": "5e1f035f4ca9ea2d2c5c3b51",
        "title": "NecmettinPost1",
        "image": "https://i2.cnnturk.com/i/cnnturk/75/630x0/5273fc3d05066827987c70f0.jpg",
        "content": "Necmettin in 1.Postunun içeriğidir",
        "userId": {
            "_id": "5e1f035f4ca9ea2d2c5c3b4d",
            "name": "Necmettin Kaya",
            "email": "necmettinkaya@gmail.com",
            "password": "NecmettinKaya",
            "__v": 0
        },
        "Date": "2020-01-15T12:19:43.357Z",
        "PostedBy": [],
        "__v": 0
    },
    {
        "_id": "5e1f035f4ca9ea2d2c5c3b52",
        "title": "AhmetPost2",
        "image": "https://i2.cnnturk.com/i/cnnturk/75/400x0/5273fc3c05066827987c70be.jpg",
        "content": "Ahmet in 2.Postunun içeriğidir",
        "userId": {
            "_id": "5e1f035f4ca9ea2d2c5c3b4a",
            "name": "Ahmet Karayel",
            "email": "ahmetkarayel@gmail.com",
            "password": "AhmetKarayel",
            "__v": 0
        },
        "Date": "2020-01-15T12:19:43.357Z",
        "PostedBy": [],
        "__v": 0
    },
    {
        "_id": "5e1f035f4ca9ea2d2c5c3b53",
        "title": "KemalPost2",
        "image": "https://static.nadirkitap.com/fotograf/130868/11/Efemera_20180913120724_130868_6.jpg",
        "content": "Kemal in 2.Postunun içeriğidir",
        "userId": {
            "_id": "5e1f035f4ca9ea2d2c5c3b4b",
            "name": "Kemal Şahiner",
            "email": "kemalsahiner@gmail.com",
            "password": "KemalSahiner",
            "__v": 0
        },
        "Date": "2020-01-15T12:19:43.358Z",
        "PostedBy": [],
        "__v": 0
    },
    {/??????????????????????????????????????????????????????????????????????????????????????????????
        "_id": "5e1f035f4ca9ea2d2c5c3b54",
        "title": "SerkanPost2",
        "image": "http://gsuatolye.net/content/upload/tasarim/131103924315601625-kitap-kapagi_berke-camekan.jpg",
        "content": "Serkan ın 2.Postunun içeriğidir",
        "Date": "2020-01-15T12:19:43.358Z",
        "PostedBy": [],
        "__v": 0
    },
    {
        "_id": "5e1f035f4ca9ea2d2c5c3b55",
        "title": "NecmettinPost2",
        "image": "https://i2.cnnturk.com/i/cnnturk/75/630x0/5273fc3c05066827987c70c0.jpg",
        "content": "Necmettin in 2.Postunun içeriğidir",
        "userId": {
            "_id": "5e1f035f4ca9ea2d2c5c3b4d",
            "name": "Necmettin Kaya",
            "email": "necmettinkaya@gmail.com",
            "password": "NecmettinKaya",
            "__v": 0
        },
        "Date": "2020-01-15T12:19:43.359Z",
        "PostedBy": [],
        "__v": 0
    },
    {
        "_id": "5e1f035f4ca9ea2d2c5c3b4e",
        "title": "AhmetPost1",
        "image": "https://a.wattpad.com/cover/49503100-352-k406476.jpg",
        "content": "Ahmet in 1.Postunun içeriğidir",
        "userId": {
            "_id": "5e1f035f4ca9ea2d2c5c3b4a",
            "name": "Ahmet Karayel",
            "email": "ahmetkarayel@gmail.com",
            "password": "AhmetKarayel",
            "__v": 0
        },
        "Date": "2020-01-15T12:19:43.351Z",
        "PostedBy": [],
        "__v": 0
    }
]



*/