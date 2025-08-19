import mongoose from "mongoose";

//mini model build when it felt needy in orderItems so that to store quatity of order placed 
//it can be build in two way first was in todos where in todomodel.js me ham subtodo ko le rhe 
//either we can create new page and here we can in short 
const orderItemsSchema=new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    quantity:{
        type:Number,
        required:true
    }
   
})

const orderschema=new mongoose.Schema({
    orderPrice:{
        type:Number,
        required:true,
    },
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    orderItems:{
        type:[orderItemsSchema]

    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["PENDING","CANCELLED","DELIVERED"],
        default:"PENDING"
    }
},{timestamps:true});

export const Order=mongoose.model("Order",orderschema);