import mongoose from "mongoose";

const doctorSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    salary:{
        type:String,
        required:true
    },
    qualification:{
         type:String,
         required:true
    },
    experienceInYear:{
      type:Number,
      default:0
    },
    WorksInHospitals:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Hospital"
        },
        //abb i want to define doctor kis hospital me kitna der kaam krte hai uske liye schema to define krna padega na bedu
    ]
},{timestamps:true});

export const Doctor =mongoose.model("Doctor",doctorSchema);