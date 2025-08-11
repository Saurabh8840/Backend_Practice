// import { User } from "../models/user.models";
// import { ApiError } from "../utils/ApiError";
// import { ApiResponse } from "../utils/ApiResponse";
// import { asyncHandler } from "../utils/asyncHandler";


// const generateAccessAndRefreshToekns=async(userId)=>{

//     try{

//         const user=await User.findOne(userId)
//         const accessToken=user.generateAccessToken()
//         const refreshToken=user.generateRefreshToken()

//         //db me bhi save
//         user.refreshToken=refreshToken
//         await user.save({validateBeforSave:false})

//         return {accessToken,refreshToken}

//     }catch{
//         throw new ApiError(500,"something went wrong while genreating refresh and access token ")
//     }
// }

// const loginuser=asyncHandler(async(req,res)=>{


//     //login data
//     const {email,password,username}=req.body;
//     //login data exists
//     if(!username&&!email){
//         throw new ApiError("400","user name and email can't be empty ")

//     }
//     //login validation
//     if([email,username].some(field=>field?.trim()==="")){
//         throw new ApiError(400,"epi error")
//     }
//     //find user
//     const user=User.findOne({
//         $or:[{email},{username}]
//     })

//     if(!user){
//         throw new ApiError(404,"user doesn't exist")
//     }
//     //password check

//     const passwordcheck=await user.isPasswordCorrect(password);

//     if(!passwordcheck){
//         throw new ApiError(401,"invalid user credentials")
//     }
//     //access and refresh token 

//     const {accessToken,refreshToken}=await  generateAccessAndRefreshToekns(user._id);
//     //send cookies in cookies me access token 

//     //return user
//     const loggedInUser=await User.findById(user._id).select("-refreshToken -password")

//     const options={
//         httpOnly:true,
//         secure:true

//     }
//     //response 
//     return res
//     .status(200)
//     .cookie("accessToken",accessToken,options)
//     .cookie("refreshToken",refreshToken,options)
//     .json(
//         new ApiResponse(
//             200,
//             {
//                    user:loggedInUser,accessToken,refreshToken
//             },
//             "user logged in successfully"
//         )
//     )

//     const optionss={
//         httpsOnly:true,
//         secure:true,
//     }

//     return res
//        .status(200)
//        .cookie("accessToken",accessToken,optionss)
//        .cookie("refreshToken",refreshToken,options)
//        .json(
//         new ApiResponse(
//             200,
//             {
//                 user:loggedInUser,accessToken,refreshToken
//             },
//             "USER logged in successfully"
//         )
//        )


// })



// const logoutUser=asyncHandler(async(req,res)=>{
//     //strategy
//     //clear cookies
//     //ye accesstoke and refresh token reset krne se logout hoo jayega

//     //find user but prblm is but findby id user kha se laau 
//     //upar me hamare paas email password user fill kiya tha but logout me form nhi dee skte naa
//     //kuch new concept padhnege 
//     //middleware concept 
//     //ex.multer , we will create a new middleware our own 

//     //routes me ham middleware lagaye the issi tarah app.js me app.use krke cookie lga paye ther req and response dono me cookie
//     //cookie ham req me bhi krr skte hai dost 
//     //we will create our own middleware 

//     //auth.middleware.js

//     User.findByIdAndUpdate(
//         req.user._id,
//         { 
//             //set ek object jo khtea kya kya update krna mai krke ata hu 
//             $set:{
//                 refreshToken:undefined
//             }
//         },
//         {new:true}
//     )

//     //cookies clear knri hai 
//     const options={
//         httpsOnly:true,
//         secure:true
//     }

//     return res
//     .status(200)
//     .clearCookie("accessToken",options)
//     .clearCookie("refreshToken",options)
//     .json(new ApiError(200,{},"User logged out"))
// })

//    export const verifyjwt=asyncHandler(async(req,res,async next=>{
      

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



// //    route file me chlo
//      Router.route("/login").post(loginuser)
//      //secured route
//      Router.route("/logout").post(verifyjwt,logoutUser)



// export {
//     registerUser,
//     loginuser,
//     logoutUser 
// }




