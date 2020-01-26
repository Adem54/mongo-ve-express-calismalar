const express = require("express");
const router = express.Router();

const { Post } = require("../models");

//post lardan title ismi verirsek ve sonra populate dersek sadece o title da olan postu user ı ile birlikte getirecektir
router.get("/", async (req, res) => {
  try {
    const data = await Post.find()
      .populate({ path: "PostedBy", model: "Users" })
      .exec();
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});

//population ı path olarak yani property olarak PostedBy vermişstik postSchema da ve hemen yanına da biz user dan hangi properteis i istiyorsak onu yazabiliriz 
//Aynı anda iki tane populate yaparsak eğer ve ref olarak yazdığımız değerler aynı ise o zaman en son hangi populate yapmışsak onu tanıyacaktır
router.get("/name", async (req, res) => {
    try {
      const data = await Post.find({})
        .populate("PostedBy","name" ).populate("PostedBy","surname")
        .exec();
      res.json(data)
     
    } catch (error) {
      res.json(error);
    }
  });

  //Bu şekilde de user collectionundan istediğimiz verileri birden fazla olacak şekilde seçebiliriz
  router.get("/nameselect", async (req, res) => {
    try {
      const data = await Post.find({kind:"Spor"})
        .populate({path:"PostedBy",select:["name","surname"]} )
        .exec();
      res.json(data);
      
    } catch (error) {
      res.json(error);
    }
  });

////

router.get("/match", async (req, res) => {
  try {
    const data = await Post.find({}).sort({ name: 1 })
      .populate({path:"PostedBy",options: { limit: 2 }}  )
      .exec();
    res.json(data);
    
  } catch (error) {
    res.json(error);
  }
});



router.post("/", async (req, res) => {
  const post = new Post(req.body);
  try {
    const data = await post.save();
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
