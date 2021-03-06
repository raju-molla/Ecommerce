const express = require("express");
const router = express.Router();
const CryptoJS = require('crypto-js');
const jwt= require('jsonwebtoken')

const User = require("../models/User")
// REGISTER

router.post("/register",async (req,res)=>{
    const newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    })
    try{
        const user = await newUser.save();
        res.status(201).json({
            user
        })
    }
    catch(err){
        res.status(500).json(err)
    }
})

// LOGIN


router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne(
            {
                userName: req.body.userName
            }
        );

        !user && res.status(401).json("Wrong User Name");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );


        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;
        
        originalPassword != inputPassword && 
            res.status(401).json("Wrong Password");

        const accessToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.SEC_KEY,
            {expiresIn:"3d"}
        );
  
        const { password, ...others } = user._doc;  
        res.status(200).json({...others, accessToken});

    }catch(err){
        res.status(500).json(err);
    }

});


module.exports = router; 