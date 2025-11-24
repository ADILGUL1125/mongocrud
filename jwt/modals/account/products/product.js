import mongoose  from "mongoose";
const productschema = new mongoose.Schema({
    name:{type:String,required:true},
    category:[{type:String,required:true}],
    rating:{type:Number,required:true},
    price:{type:Number,required:true}
},
{timestamps:true}
)

const products = mongoose.model("products",productschema)
export default products;