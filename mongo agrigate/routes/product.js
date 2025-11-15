import express from "express"
import mongoose from "mongoose"
import pcmodel from "../models/product.js"
let productroutes = express.Router()





//filter 
productroutes.get("/filter",async(req,res)=>{
   try {
        let products = await pcmodel.aggregate([
            {  // for query we use match
                $match:{
                rating:4.7,
                price:{$gt:220000}
                }
            },
            // {
            //     $group:{  //for grouping
            //         _id:"$price",
            //         totalsum:{$sum:1}
            //     }
            // },
            {
                $addFields:{
                        conutcategory:{$size:"$category"}
                }
            },
            {
                $project:{
                   
                    _id:1,
                    price:1

                }
            }
            
        ])
        res.json({
            data:products,
            message:"fetch all products"
        })

   } catch (error) {
    
    console.log(error)
    res.json({
        data:null,
        messaage:"error to fetch products"
    })
   }
    
})
 
export default productroutes