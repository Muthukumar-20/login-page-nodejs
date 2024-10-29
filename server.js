import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/dbConfig.js";
import router from "./Routers/router.js";

dotenv.config();

const app =express()

app.use(express.json())


app.use(cors());

connectDB();


app.get("/",(req,res)=>{
    res.status(200).send("welcom to our api");
});

app.use("/api/auth",router)


const port=process.env.port || 4000;

app.listen(port,()=>{
    console.log("server started");
});
