import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import  userRoutes  from "./router/userRoutes.js";
import cors from "cors"
dotenv.config();
const app = express();
app.use(cors())
app.use(express.json())
app.use(userRoutes)
mongoose.connect(process.env.URI, { dbName: 'mernDb', useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("connected with db")
    app.listen(process.env.PORT || 8000, (error) => {
        if (error) {
            console.log("error encontered", error)
        }
        console.log("server started at ", process.env.PORT)
    })
}).catch((error) => {
    console.log("error encontered", error)
})


