import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import joi from "joi";
import jwt from "jsonwebtoken";
import "dotenv/config";
import account from "../../modals/account/account.js";

const authroutes = express.Router();

let registerschema = joi.object({
  name: joi.string().required().min(3),
  age: joi.number().required().positive().min(18),
  email: joi.string().required().email(),
  password: joi
    .string()
    .required()
    .pattern(new RegExp(/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/)),
});
let loginschema = joi.object({
  email: joi.string().required().email(),
  password: joi
    .string()
    .required()
    .pattern(new RegExp(/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/)),
});

authroutes.post("/register", async (req, res) => {
  // register user
  try {
    let { name, age, email, password } = req.body;

    let { error, value } = registerschema.validate(req.body);
    if (error) {
      throw new Error(error);
    }
    let finduser = await account.findOne({ email: email });
    // console.log(finduser);

    if (finduser) {
      return res.status(409).json({
        message: "User with this email already exists",
      });
    }

    let saltround = 10;
    let hashpassword = await bcrypt.hash(password, saltround);
    // console.log(hashpassword);

    let newAccount = new account({ ...req.body, password: hashpassword });
    await newAccount.save();
    let createdtoken = jwt.sign(
      {
        name: name,
        age: age,
        email: email,
      },
      process.env.JWT_SECRET
    );
    // console.log(createdtoken);
    res.json({
      message: "accoun created sussesfully",
      data: {
        name: name,
        age: age,
        email: email,
      },
      tocken: createdtoken,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "error tpo create accountt",
    });
  }
});

//login user
authroutes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let {error,value}=loginschema.validate(req.body)
    if(error){
        throw new Error(error)
    };
    let finduser = await account.findOne({ email });
    if (!finduser) {
      return res.json({
        message: "we dont have your login credintional ",
      });
    }
    console.log(finduser);

    //to check password in db 
    const checkpassword = await bcrypt.compare(password,finduser.password);
    console.log(checkpassword);
    if (!checkpassword) {
      return res.json({
        message: "invalid password !",
      });
    }
    let createlogintoken=jwt.sign({
        name:finduser.name,
        age:finduser.age,
        email:email

    },
    process.env.JWT_SECRET,{expiresIn:"1h"})
    console.log(createlogintoken)
    res.json({
      message: "succesfully login ",
      data: {
        email:email
      },
      token:createlogintoken
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "something wrong in login ",
    });
  }
});

export default authroutes;
