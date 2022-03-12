const express = require("express");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const Order = require('../models/Order')
const router = express.Router();

// CREATE CART
router.post("/", verifyToken, async(req,res) =>{
    const newOder = new Oder(req.body)
    try{
        const saveNewOder = await newOder.save();
        res.status(200).json(saveNewOder);
    }
    catch(err){
        res.status(500).json(err);
    }
})


// CART UPDATE

router.post("/:id", verifyTokenAndAdmin, async(req,res) => {
    try{
        const orderUpdate = await Order.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            },
            {new:true}
        )
        res.status(200).json(orderUpdate);
    }
    catch(err){
        res.status(500).json(err);
    }
})

// cart DELETE
router.delete("/:id", verifyTokenAndAdmin, async(req,res) =>{
    try{
        await Order.findByIdAndDelete(req.param.id);
        res.status(200).json('Order is deleted')
    }
    catch(err){
        res.status(500).json(err);
    }
})

// GET ORDER
router.get("/find/:id",verifyTokenAndAuthorization ,async(req,res) =>{
    try{
        const orders = await Order.find(req.params.id);
        res.status(200).json(orders);
    }
    catch(err){
        res.status(500).json(err);
    }
})




// GET ALL PRODUCT
router.get('/', verifyTokenAndAdmin,async(req,res) => {
    try{
        const order = await Order.find();
        res.status(200).json(order);
    }
    catch(err){
        res.status(500).json(err);
    }
})


module.exports = router; 