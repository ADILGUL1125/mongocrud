
import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import productroutes from "./routes/product.js";
const app= express()
let port =3500

let db_url = process.env.MONGO_URL;
app.use(express.json())
app.get("/",(req,res)=>{
    res.send({
        message:"hello world"
    })
})


mongoose.connect(db_url).then(()=>{
    console.log("mongo db is connected  sussecfully")
    app.listen(port,()=>{
        console.log(`app is listen on port ${port}`)
    })
}).catch((error)=>{
    console.log("error in to connct mogo db")
    console.log(error)
})
app.use("/product",productroutes)

