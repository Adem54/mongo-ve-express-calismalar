const express = require("express");
const router = express.Router();
const Posts = require("../models/Posts");
const mongoose=require("mongoose");
router.post("/new", (req, res) => {
  const post = new Posts({
    userId: "5e1ba04e50331d18e43164fa",
    title: "Kemal Tahir Kitabı-6",
    image:
      "https://i.pinimg.com/236x/2e/fd/ae/2efdaea5254aba01783166f39c39395c--book-cover-design-book-design.jpg",
    content: "Kemal Tahirin Altıncı Kitabının İçeriğidir"
  });

  post.save((err, data) => {
     
    if (err) console.log(err);
    res.json(data);
  });
});

router.get("/mergepostsTousers", (req, res) => {
 Posts.aggregate([

     {
         $lookup:{
             from:"users",
             localField:"userId",
             foreignField:"_id",
             as:"user"
         }
     },{
         $unwind:"$user"
     },
     {
         $project:{
             user:"$user",
             title:1,
             image:1,
             content:true

         }
     }
 ],(err,result)=>{
     res.json(result)
 })
});

module.exports = router;
