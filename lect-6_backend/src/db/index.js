import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"
import dotenv from "dotenv"
import express from "express"



dotenv.config({path:'./.env'});

const app=express();


// console.log("BHAI STRING ",process.env.MONGODB_URI);

const connectDB=async()=>{
    try{
         const connectionInstance =await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
         console.log(`\n MongoDB connnected !! DB HOST: ${connectionInstance.connection.host}`);
    }catch(error){
        console.log("MONGODB connection error ",error);
        process.exit(1)
    }
}

export default connectDB;