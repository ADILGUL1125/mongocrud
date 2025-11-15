import mongoose  from "mongoose";
const userschema = new mongoose.Schema({
    name:{type:String,required:true},
    age:{type:String,required:true},
    email:{type:String,required:true},
    city:{type:String,required:true}
},

{timestamps:true}
)

const usermodel = mongoose.model("users" ,userschema)
export default usermodel;