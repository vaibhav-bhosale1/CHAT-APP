import express from "express";
import dotenv from "dotenv";
import authroutes from "./routes/authroutes.js"
import messageroutes from "./routes/messageroutes.js"
import connecttomongodb from "./db/connecttomongodb.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js"


const app=express();
const PORT=process.env.PORT || 8000;

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authroutes)
app.use("/api/messages",messageroutes)
app.use("/api/users",userRoutes)


app.listen(PORT,()=>{
    connecttomongodb();
    console.log(`server started at port ${PORT}`)

});