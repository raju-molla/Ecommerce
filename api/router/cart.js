const express = require("express");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const Cart = require('../models/Cart')
const router = express.Router();

// CREATE CART
router.post("/", verifyToken, async(req,res) =>{
    const newCart = new Cart(req.body)
    try{
        const saveNewCart = await newCart.save();
        res.status(200).json(saveNewCart);
    }
    catch(err){
        res.status(500).json(err);
    }
})


// CART UPDATE

router.post("/:id", verifyTokenAndAuthorization, async(req,res) => {
    try{
        const cartUpdate = await Cart.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            },
            {new:true}
        )
        res.status(200).json(cartUpdate);
    }
    catch(err){
        res.status(500).json(err);
    }
})

// cart DELETE
router.delete("/:id", verifyTokenAndAuthorization, async(req,res) =>{
    try{
        await Cart.findByIdAndDelete(req.param.id);
        res.status(200).json('Cart is deleted')
    }
    catch(err){
        res.status(500).json(err);
    }
})

// GET PRODUCT
router.get("/find/:id",verifyTokenAndAuthorization, async(req,res) =>{
    try{
        const cart = await Cart.findOne(req.params.id);
        res.status(200).json(cart);
    }
    catch(err){
        res.status(500).json(err);
    }
})




// GET ALL PRODUCT
router.get('/', verifyTokenAndAdmin,async(req,res) => {
    try{
        const cart = await Cart.find();
        res.status(200).json(cart);
    }
    catch(err){
        res.status(500).json(err);
    }
})


module.exports = router; 