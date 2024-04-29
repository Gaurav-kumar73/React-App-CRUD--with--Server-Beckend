import express from "express"; 
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv"
import cors from "cors"
import router from "./routes/userRoute.js"

const app = express()
app.use(bodyParser.json())
app.use(cors())
dotenv.config()

const PORT = process.env.PORT || 2500
const URL = process.env.MONGOURL

mongoose.connect(URL)
.then(()=>{
    console.log(">> DB connected successfuly")

    app.listen(PORT, ()=>{
        console.log(`>> server is running at port: ${PORT}`);
    })
})
.catch(error => console.log(error))


app.use('/', router)