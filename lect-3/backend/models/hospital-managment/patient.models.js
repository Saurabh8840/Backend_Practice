import mongoose from "mongoose";

const patientSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    diagnoisedWith:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    bloodgroup:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:["male","female","0"],
        required:true,
    },
    admittedIn:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hospital",
    }
},{timestamps:true});

export const Patient =mongoose.model("Patient",patientSchema);