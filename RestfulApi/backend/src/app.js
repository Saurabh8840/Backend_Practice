import express from "express"
import userRouter from "./routes/user.route.js"



const app=express();

//middleware
app.use(express.json());


//route
//route
app.use("/api/users", userRouter)

export {app}

