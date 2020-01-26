var express = require("express");
var router = express.Router();

const { User } = require("../models");

router.get("/", async (req,res)=>{

  try {
    const data=await User.find({})
    res.json(data)  
  } catch (error) {
    res.json(error)
  }
  
})

router.post("/", async (req, res) => {
  const user = new User(req.body);

  try {
    const data = await user.save();
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
