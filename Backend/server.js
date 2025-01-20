import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import emailRouter from "./routes/emailRouter.js";
import userEmailRouter from "./routes/userEmailRouter.js";
const app=express();


// loading dotenv
dotenv.config();

const PORT=process.env.PORT ||3000

//middleware initialization
app.use(express.json());
app.use(cors());

//connect db
connectDB();

//api endpoints
app.use('/api',emailRouter);
app.use('/api',userEmailRouter);

app.get("/",(req,res)=>{
    res.send("API is working fine")
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
