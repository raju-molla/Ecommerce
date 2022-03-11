const express = require("express");
const User = require('../models/User')
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const router = express.Router();


// update
router.put("/:id", verifyTokenAndAuthorization, async(req,res)=>{
    if(req.body.password){
        req.body.password=CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
    }
    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        }, {new:true})

        res.status(200).json(updateUser)
    }
    catch(err){
        res.status(401).json(err)
    }
})

// Delete

router.delete("/:id", verifyTokenAndAuthorization, async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.param.id);
        res.status(200).json("User has been deleted!");
    }
    catch(err){
        res.status(401).json(err)
    }
})

router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router; 