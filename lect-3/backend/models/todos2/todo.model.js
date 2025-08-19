import mongoose from "mongoose"

const todoSchema=new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    complete:{
        type:String,
        default:false
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    SubTodo:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"SubTodo"
        }
    ]
    

},{timestanmps:true});

export const Todo=mongoose.model("Todo",todoSchema);
