const express = require("express");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const Order = require('../models/Order')
const router = express.Router();

// CREATE order
router.post("/", verifyToken, async(req,res) =>{
    const newOder = new Order(req.body)
    try{
        const saveNewOder = await newOder.save();
        res.status(200).json(saveNewOder);
    }
    catch(err){
        res.status(500).json(err);
    }
})


// Order UPDATE

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

// order DELETE
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

// GET ALL order
router.get('/', verifyTokenAndAdmin,async(req,res) => {
    try{
        const order = await Order.find();
        res.status(200).json(order);
    }
    catch(err){
        res.status(500).json(err);
    }
})

// income
router.get('/income', verifyTokenAndAdmin, async(req,res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1));
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth()-1));
    try{
        const income = await Order.aggregate([
            { $match: {createdAt: {$gte: previousMonth}} },
            {
                $project: {
                    month: {$month: "$createdAt"},
                    sales: "$amount"
                }
            },
            {
                $group:{
                    _id:"$month",
                    total: {$sum: "$sales"}
                }
            }
        ])

        res.status(200).json(income)
    }
    catch(err){
        res.status(500).json(err);
    }
})


module.exports = router; 