import mongoose from "mongoose";

const subTodoSchema=new mongoose.Schema({
    context:{
        type:String,
        required:true,
    },
    complete:{
        type:String,
        default:true
    },
    CreatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
 });

export const SubTodo = mongoose.model("SubTodo",subTodoSchema)