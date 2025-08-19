

import mongoose from "mongoose"
import connectDB from "./db/index.js"
import dotenv from "dotenv";
import express from "express"
import {app} from "./app.js"

dotenv.config({path:'./.env'});


connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is running at port :${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("mongo db connection failed !! ",err);
})


export default connectDB;






























/*
import express from "express"
const app=express()


//efffies in js so that function call immediately 
(async()=>{
    try{
         await mongoose.connect('${process.env.MONGODB_URI}/${DB_NAME}')
         app.on("error",(error)=>{
            console.log("ERR:",error);
            throw error 
         })


         app.listen(process.env.PORT,()=>{
            console.log(`app is listening on port ${process.env.PORT}`);
         })
    }
    catch(error){
       console.error("ERROR:",error)
       throw err
    }

})()

*/