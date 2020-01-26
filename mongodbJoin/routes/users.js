var express = require('express');
var router = express.Router();

//Models i import ederiz
const Users=require("../models/Users");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Sonra da post ile verileri girer ve save ederek kaydettğimiz veriyi döneriz
router.post("/new",(req,res)=>{
  const user=new Users({
    fullName:"Ramazan Sevilen",
    age:26
  })

  user.save((err,data)=>{
    if (err) console.log(err)
    res.json(data)
  })
  
})


module.exports = router;
