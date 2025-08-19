import mongoose from "mongoose"

const userSchema=new mongoose.Schema({ 
        // username:String,
        // email:String,
        
        //defining object 

        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
        },
        // email:String   
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
        },
        password:{
            type:String,
            //custom messages
            required:[true,"must me 6 in length"]
        }

    },
    {timestamps:true}
)

export const User=mongoose.model("User",userSchema)

