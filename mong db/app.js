
import express from "express"

import mongoose  from 'mongoose';
import dotenv from "dotenv";
import productroutes from "./routes/product.js"
import 'dotenv/config'
const app = express()
const port = 3000
app.use(express.json())
app.use(express.text())
app.use("/product",productroutes)
// console.log("All env:", process.env);

let db_url = process.env.MONGO_URL;
// console.log(db_url);

app.get('/', (req, res) => {
  res.send('Hello World!')
})
mongoose.connect(db_url).then(()=>{
    console.log("mongodb is connected sussesfully ")
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
}).catch((error)=>{

 console.log("error in mongodb connection")
    console.error(error)
})

