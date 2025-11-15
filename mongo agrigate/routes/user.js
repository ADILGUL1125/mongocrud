import express from "express"
import mongoose from "mongoose"
import usermodel from "../models/user.js"
import pcmodel from "../models/product.js"

let userroute = express.Router()


userroute.get("/",async(req,res)=>{
        try {
        let user  = await usermodel.find()
        res.json({
            data:user,
            message:"get all users"
        })
        } catch (error) {
            
            console.log(error),
            res.json({
            data:null,
            message:" error to  get all users"
        })
        }
})

userroute.post("/",async(req,res)=>{
    let body =req.body;

    try {
        let user = new usermodel(body)
        await  user.save()
        res.json({
            data:user,
            message:"add user sussesfully"
        })
    } catch (error) {
          res.json({
            data:null,
            message:" error user"
        })
    }


})
userroute.get("/filter", async(req,res)=>{
   try {
     let userproduct =  await usermodel.aggregate([
        {
            $lookup:{
                    from:"laptops",
                    localField:"_id",
                    foreignField:"uid",
                    as:"userproducts"

            }
        }
    ]);
    res.json({
        data:userproduct,
        message:"get all user products"
    })
    
   } catch (error) {
    console.log(error)
    res.json({
        data:null,
        message:"error to get user and products"
    })
   }
    
})


export default  userroute