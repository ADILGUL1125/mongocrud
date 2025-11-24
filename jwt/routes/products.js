import express from "express"
 import jwt from "jsonwebtoken"
import "dotenv/config"
import products from "../modals/account/products/product.js"
let productroutes =express.Router()


let auth = (req,res,next)=>{
  try {
    let token =req.headers.authorization.split(" ")[1]
    console.log(token);
    if(!token){
        return res.json({
            message:"token not found"
        })
    }
    let decodetoken =jwt.verify(token,process.env.JWT_SECRET)
    // console.log(decodetoken)
    req.user=decodetoken;
    next()
  } catch (error) {
    console.log(error)
    res.json({
        message:"invalid token call"
    })
  }
}


productroutes.get("/", auth,async(req,res)=>{
    console.log(req.user)
    try {
        let product = await products.find()
        console.log(product)
        res.json({
            message:"get all products",
            data:product
        })
    } catch (error) {
        console.log(error)
        res.json({
            message:"error to fetch products"
        })
    }
})
export default productroutes