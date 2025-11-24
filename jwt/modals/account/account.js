import mongoose, { Types } from "mongoose";
const {Schema} =mongoose
const accountschema = new Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    
},
{timestamps:true})
const account =mongoose.model("accounts",accountschema);
export default account;