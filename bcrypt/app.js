import express from "express"
import  Mongoose  from "mongoose"
import "dotenv/config"
import authroutes from "./routes/auth/auth.js";
const app = express()

app.use(express.json());

const port = 3000
const dburl =process.env.MONGO_URL
app.get('/', (req, res) => {
  res.send('Hello i am adil gul !')
})
Mongoose.connect(dburl).then(()=>{
    console.log("mongodb is connectd")
    app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
}).catch((error)=>{
    console.log("cannot connect mongodb !")
    console.log(error)
})

app.use("/auth",authroutes)


