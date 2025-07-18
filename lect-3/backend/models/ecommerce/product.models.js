import mongoose from "mongoose"

const productSchema=new mongoose.Schema({
    description:{
        required:true,
        type:String,
    },
    name:{
        required:true,
        type:String,
    },
    productImage:{
        //image store krna ke liye link store karenge aur image ko claudinary pe daal ke link le lenge 
        type:String
    },
    price:{
        type:Number,
        default:0
    },
    stock:{
        default:0,
        type:Number
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        

    }
},{timestamps:true});

export const Product=mongoose.model("Product",productSchema);