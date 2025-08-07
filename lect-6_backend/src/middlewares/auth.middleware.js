//it will verify is user exist or not



import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken || 
      req.header("Authorization")?.replace("Bearer ", "");


    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user=await User.findById(decodedToken?._id).select("-password -refreshToken");

    if (!user) {
      //next vedio discuss about frontend
      throw new ApiError(401, "Invalid Acess Token");
    }

    req.user = user;
    next();
  } catch(error){
    throw new ApiError(401,error?.message||"Invalid access token")
  }
});





// import { ApiError } from "../utils/ApiError";
// import { asyncHandler } from "../utils/asyncHandler";
// import {User} from "../models/user.models";
// import jwt from "jsonwebtoken";

// export const verifyJWT=asyncHandler(async(req,res,async next=>{
      

//       try {
//         //token ka access kaise lenge 
//         //cookie pareser se 
//         //yha pe yaa to cookies se yaa header me hooo req.header se mila aur phir js ke replace method se 
//         // jha bearer aur space ho usko empty krr do "" bss kaam hoo gya 
//         const token =req.cookies?.accessToken ||req.header("Authorization")?.replace("Bearer ","")
//         //ya cookie se ya header se cookie ka acces aa gya nhi hai to error 
//         if(!token){
//           throw new ApiError(401,"Unauthoried request")
//         }
        
//         //token ke ander kafi info hoti hai usko decode krne ke liye jwt chaihiye
//         //import jwt
//         const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
  
//         //add verify ho gya
  
//         const user =await User.findById(decodedToken?._id).select("-password -refreshToken")
  
//         if(!user){
//           //discuss about frontend 
//           throw new ApiError(401,"invalid access token")
//         }
  
//         req.user=user;
//         next()
//       } catch (error) {
//            throw new ApiError(401,error?.message||"Invalid access token")
//       }

//    }))