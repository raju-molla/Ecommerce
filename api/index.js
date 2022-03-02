const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://ecommerce:01703634507@cluster0.66f2j.mongodb.net/shop?retryWrites=true&w=majority").then(()=> console.log("DB Connection successfully")).catch((err)=>{
    console.log(err);
})


app.listen(5000, ()=>{
    console.log("backend server si running");
})