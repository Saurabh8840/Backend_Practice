import express from "expresss"
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


  

export {app}