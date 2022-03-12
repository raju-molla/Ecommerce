const express = require("express");
const { verifyTokenAndAdmin } = require("./verifyToken");
const Product = require('../models/Product')
const router = express.Router();


// CREATE PRODUCT
router.post("/", verifyTokenAndAdmin, async(req,res)=>{
    const newProduct = new Product(req.body);
    try{
        const saveNewProduct = await newProduct.save();
        res.status(200).json(saveNewProduct);
    }
    catch(err){
        res.status(500).json(err);
    }

})
// PRODUCT UPDATE

router.post("/:id", verifyTokenAndAdmin, async(req,res) => {
    try{
        const user = await Product.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            },
            {new:true}
        )
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json(err);
    }
})

// PRODUCT DELETE
router.delete("/:id", verifyTokenAndAdmin, async(req,res) =>{
    try{
        await Product.findByIdAndDelete(req.param.id);
        res.status(200).json('Product is deleted')
    }
    catch(err){
        res.status(500).json(err);
    }
})

// GET PRODUCT
router.get("/find/:id", async(req,res) =>{
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    }
    catch(err){
        res.status(500).json(err);
    }
})


// GET ALL PRODUCT
router.get('/', async(req,res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try{
        let product;
        if(qNew){
            product = await Product.find().sort({createAt: -1}).limit(1);
        }
        else if(qCategory){
            product = await Product.find({
                categories:{
                    $in:[qCategory],
                }
            })
        }
        else{
            product = await Product.find();
        }
        res.status(200).json(product);
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router; 