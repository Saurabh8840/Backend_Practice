import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"  //mere server se user ke browser ke under ki cookies ko access and set krr pau 



const app=express()



app.use(cors({
       origin: process.env.CORS_ORIGIN,
       credentials:true
}))


app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public")) //public assests images and other 
app.use(cookieParser());


//routes import 

import userRouter from './routes/user.route.js'

//routes declaration

// we will not write like app.get bcz we have created diffreent files 
//so we use middleware name use()


// app.use("/users",userRouter)
// stander practice
app.use("/api/v1/users",userRouter)









  

export {app} 

