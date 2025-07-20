
require('dotenv').config({path:'./env'})

import mongoose from "mongoose"
import { DB_NAME } from "./constants.js"
import connectDB from "./db/index.js"
        import express from 'express';



connectDB();




































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