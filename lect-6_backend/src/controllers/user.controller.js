import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser=asyncHandler( async (req,res)=>{
    //get user details from frontend
    //validation - not empty
    //user already exists: username,email
    //check for images,check for avatar
    // upload them to cloudinary ,avatar
    //create user object - creation entry in db
    //remove password and refresh token field from response
    //check for user creation 
    //return response 


    //user details req.body se 
    const {fullName ,username,email,password}=req.body
    
    //VALIDATION
    if(fullName===""){
        throw new ApiError(400,"fullname is required")
    }
    //aise ek ek karek bhi check krr skte hai 
    //let be experta interesting method
    if(
        [fullName,email,username,password].some((field)=>field?.trim()==="")
    
    ){
        throw new ApiError(400,"All fields are required")


    }

    //check if already exist first we need import user from models usermodel
    // User.findOne({email})
    const existedUser=await User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"User with email or username already exists ")
        
    }

    //images and avatar
    //
    const avatarLocalPath=req.files?.avatar[0]?.path;

    const coverImageLocalPath=req.files?.coverImage[0]?.path;

    //check avatar
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required ")
    }

    //now upload to cloudinary
    //that's why alrady written cloudinary code so that no problem happens 
    //import krr loo
    const avatar=await uploadOnCloudinary(avatarLocalPath)
    const coverImage=await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }
    

    //create object and give entry in db
    const user= User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url||"",
        email,
        password,
        username:username.toLowerCase()
    })

    const createdUser= await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }
    

    //response dena hai
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered Successfully")
    )
    
    
});


export {registerUser}