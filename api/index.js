const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const user = require('./router/user');
const auth = require('./router/auth');
const product = require('./router/product');
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=> console.log("DB Connection successfully")).catch((err)=>{
    console.log(err);
})
app.use(express.json());
app.use("/api/users",user);
app.use("/api/auth",auth);
app.use("/api/product",product);

app.listen(process.env.PORT || 5000, ()=>{
    console.log("backend server is running");
})