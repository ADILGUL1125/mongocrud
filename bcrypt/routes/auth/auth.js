import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
// import account from "../../modals/account/account.js";
import account from "../../modals/account/account.js";
const authroutes =express.Router();

authroutes.post("/register",async(req,res)=>{
    // register user
    try {
        let {name, age,email,password}=req.body
      

    if(!name || !age || !email || !password ){
       return res.status(400).json({
            Message:"invalid data  to create account"
        })
    }
   let finduser = await account.findOne({ email:email });
   console.log(finduser)


    if (finduser) {
      return res.status(409).json({
        message: "User with this email already exists",
      });
    }
    
    let saltround =10;
    let hashpassword = await bcrypt.hash(password,saltround);
    console.log(hashpassword)
  
    let newAccount  = new account({...req.body,password:hashpassword}) ;
    await newAccount.save()
     res.json({
        message:"accoun created sussesfully",
        data:newAccount
    })
    
    } catch (error) {
        console.log(error)
        res.json({
            message:"error tpo create accountt"
        })
    }

    
})

//login user
authroutes.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body;
    if(!email || !password){
        return res.json(
            {
                message:"cannot login with out eamil or password"
            }
        )
    }
    let finduser = await account.findOne({email});
    if(!finduser){
        return res.json({
            message:"we dont have your login credintional "
        })
    }
    console.log(finduser);
    const checkpassword = await bcrypt.compare(password,finduser.password)
    console.log(checkpassword)
    if(!checkpassword){
        return res.json({
            message:"invalid password !"
        })
    }
    res.json({
        message:"succesfully login ",
        data:finduser
    })
    } catch (error) {
        console.log(error)
        res.json({
            message:"something wrong in login "
        })
    }
    
})





export default authroutes;
