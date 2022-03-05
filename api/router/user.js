const express = require("express");
const router = express.Router();

router.get("/usertest", (req,res)=>{
    res.send("user test successfully")
})

router.post("/postUser", (req,res)=>{
    const userName = req.body.name;
    res.send("your name is "+ userName)
})

module.exports = router; 