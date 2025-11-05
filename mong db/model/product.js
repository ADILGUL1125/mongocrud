import mongoose from "mongoose"
let productschema =new mongoose.Schema({
    name:{type: String ,required: true},
    category:{type:String},
    rating:{type :Number},
    price:{type :Number ,required :true}

},{
    timestamps:true
})
const productmodel = mongoose.model("products",productschema)
export default productmodel;