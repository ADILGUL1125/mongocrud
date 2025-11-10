import express from "express"
import mongoose from "mongoose"
import pcmodel from "../models/product.js"
let productroutes = express.Router()


productroutes.get("/",async(req,res)=>{
 
    try {
        let product = await pcmodel.find();
        res.json({
            message:"get all product",
            data:product
        })
    } catch (error) {
        res.json({
            message:"error to get products",
            data:null
        })
    }
})
productroutes.post("/", async(req,res)=>{
    let body=req.body
    if(!body){
        return  res.json({
            message:" invalid data to put a product "
        })
       
    }
    try {
        let newproduct= await  pcmodel.insertMany(req.body)
    //console.log(newproduct)
        res.json({
            message:"add a product susccesfully",
            data:newproduct
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            message:"canaot add a product ",

            code:400
        })
    }
})


//filter 
productroutes.get("/filter",async(req,res)=>{
    // let product =await pcmodel.find({}).select('name')
    // let product = await pcmodel.countDocuments()
    // console.log(product)
    let product = await pcmodel.find({
        // price:{$gt:50000,$lt:100000}
        // category:{$in:['Dell', 'HP']}
        $or:[{category: {$size: 3}}, {category: {$size:1}}],
    }).skip(10)
    res.json({
        data:product
    })
})
 
export default productroutes