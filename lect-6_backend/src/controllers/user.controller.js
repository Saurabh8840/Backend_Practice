import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { cover } from "three/src/extras/TextureUtils.js";
import jwt from "jsonwebtoken"

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        
        if(!user){
          throw new ApiError(404, "User not found");
        }

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        //databse me bhi save krte hai baar baar na puchna pade
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
         console.error("Token generation error:", error);
        throw new ApiError(500, "something went wrong while generating referesh and access token ")
    }
}



const registerUser = asyncHandler(async (req, res) => {
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
  const { fullName, username, email, password } = req.body;

  //VALIDATION
//   if (fullName === "") {
//     throw new ApiError(400, "fullname is required");
//   }
  //aise ek ek karek bhi check krr skte hai
  //let be experta interesting method
  //     .some() JavaScript ka ek array method hai jo check karta hai:
  // ❓“Kya is array ke andar koi bhi ek item condition ko satisfy karta hai?”
  // Agar haan, toh .some() true return karta hai.
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }


  //check if already exist first we need import user from models usermodel
  // User.findOne({email})
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists ");
  }

  //images and avatar
  //
  const avatarLocalPath = req.files?.avatar[0]?.path;

//   const coverImageLocalPath = req.files?.coverImage[0]?.path;
  
  //classic way to check path what we did was advance 
  let coverImageLocalPath;
  //first in this we check files then array hai usem coverimage usem array ka lenght >0 then path do 
  if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0 ){
    coverImageLocalPath=req.files.coverImage[0].path;
  }

  //check avatar
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required ");
  }

  //now upload to cloudinary
  //that's why alrady written cloudinary code so that no problem happens
  //import krr loo
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is  accha boss required");
  }

  //create object and give entry in db
  const user =await  User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );



  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  //response dena hai
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const loginUser=asyncHandler(async(req,res)=>{
     //todos kaam kya kya krna hai 
     //req body ->data
     //username or email existed 
     //find user
     //password check 
     //access and refreshtoken 
     //send cookies in cookies me access token and refreshtoken de rhe hai



    //user details , req body->data
    const {username,email,password}=req.body;
    

    //username or email existed
    if(!username && !email){
        throw new ApiError(400,"username or password is required")
    }

    //user detail validation
    if([username,email,password].some(field=>field?.trim()==="")){
        throw new ApiError(400,"invalid detail")

    }

     
     
    //is already exist then find user name or email 
    const user=await User.findOne({
        $or: [{username},{email}]
    })



    if(!user){
        throw new ApiError(404,"user doesn't exist ");
    }
    
    //password check 
    const isPasswordValid=await user.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new ApiError(401,"INVALID user credentials")
    }

    //token generation ye kaam kai baar krna hai iss liye ise ek method me 
    //daal dete hai dost generateAccessAndRefreshToekns

     const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    

     //cookies me bejo info
     const loggedInUser=await User.findById(user._id).select("-password -refreshToken")

    //send cookies 

    const options={
        httpOnly:true,
        secure:true
    }

    return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json(
            new ApiResponse(
                200,
                {
                    user:loggedInUser,accessToken,
                    refreshToken
                },
                "user logged in successfully"
            )
        )
  



})





const logoutUser=asyncHandler(async(req,res)=>{
    
    //yha ye use nhi krr rskte hai kyu ki details nhi hai hamare paas so 
    //middleware
    // User.findById

    await User.findByIdAndUpdate(
        
        req.user._id,
        {
            $unset:{
                refreshToken:1 //this removes the field from documents
            }
        },
        {
            new:true
        }
    )
    

    const options={
        httpOnly:true,
        secure:true
    }

    return res 
        .status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .json(new ApiResponse(200,{},"User logges Out"))
})



const refreshAccessToken=asyncHandler(async(req,res)=>{

    const incomingRefreshToken=req.cookies.refreshToken||req.body.refreshToken
  

    if(!incomingRefreshToken){
      throw new ApiError(401,"unauthorized request")
    }

    try {
      const decodedToken  = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
      )
  
  
      const user=User.findById(decodedToken?._id)
  
      if(!user){
        throw new ApiError(401,"Invalid refresh token")
      }
  
      if(incomingRefreshToken!==user?.refreshToken){
        throw new ApiError(401,"refresh token is expired or used ")
      }
      
      const options={
        httpOnly:true,
        secure:true
      }
  
      const {accessToken,newrefreshToken}=await generateAccessAndRefreshTokens(user._id)
  
      return res
      .status(200)
      .cookie("accessToken",accessToken,options)
      .cookie("refreshToken",newrefreshToken,options)
      .json(
        new ApiResponse(
          200,
          {accessToken,refreshToken:newrefreshToken}
        )
      )
  
    } catch (error) {
      throw new ApiError(401,error?.message||"Invalid refresh token")
    }



})


const changeCurrentPassword=asyncHandler(async(req,res)=>{

    const {oldPassword,newPassword}=req.body


    const user=await User.findById(req.user?._id)

    const isPasswordCorrect=await user.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect){
      throw new ApiError(400,"Invalid old password")
    }

    user.password=newPassword
     await user.save({validateBeforeSave:false})

     return res.status(200).json(new ApiResponse(200,{},"Password change successfully"))
})


const getCurrentUser=asyncHandler(async(req,res)=>{

  return res
  .status(200)
  .json(200,req.user,"current user fetched successfully")
})




const updateAccountDetails=asyncHandler(async(req,res)=>{

  const {fullName,email}=req.body

  if(!fullName ||!email){
    throw new ApiError(400,"ALL Fields are required")
  }

  const user=await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set:{
        fullName:fullName,
        email:email
      }
    },
    {new:true}
  ).select("-password")

  return res
  .status(200)
  .json(new ApiResponse(200,user,"Account details updated successfully"))
})

//files kaise update kare middleware ka dhyan rakhna hai and multer ka jo allow karega file upload krne me and 
//user jo login ho whi upload bhi krr skte hai dost 


const updateUserAvatar=asyncHandler(async(req,res)=>{

    const avatarLocalPath=req.file?.path

    if(!avatarLocalPath){
      throw new ApiError(400,"avatar file is missing ")
    }

    const avatar=await uploadOnCloudinary(avatarLocalPath)

    if(!avatar.url){
      throw new ApiError(400,"Error while uploading on avatar ")


    }

    //Todo delete old image - assignment delete old image..
    


    const user=await User.findByIdAndUpdate(
      req.user?._id,
      { $set:{
        avatar:avatar.url
      }},
      {new:true}
    ).select("-password")

    return res
    .status(200)
    .json(
      new ApiResponse(200,user,"updated avatarimage")
    )
})



const updateUserCoverImage=asyncHandler(async(req,res)=>{

    const coverImageLocalPath=req.file?.path

    if(!coverImageLocalPath){
      throw new ApiError(400,"avatar file is missing ")
    }

    const coverImage=await uploadOnCloudinary(coverImageLocalPath)

    if(!coverImage.url){
      throw new ApiError(400,"Error while uploading on cover Image ")


    }


    const user=await User.findByIdAndUpdate(
      req.user?._id,
      { $set:{
        avatar:avatar.url
      }},
      {new:true}
    ).select("-password")

    return res
    .status(200)
    .json(
      new ApiResponse(200,user,"updated coverimage")
    )
})



const getUserChannelProfile=asyncHandler(async(req,res)=>{

    const {username}=req.params

    if(!username?.trim()){
      throw new ApiError(400,"username is missing ")
    }

    const channel=await User.aggregate([
      //FIRST PIPELINE what to map 
      {
        $match:{
          username:username?.toLowerCase()
        }
      },
      {
        $lookup:{
            from:"subscription",
            localField:"_id",
            foreignField:"channel",
            as:"subscribers"
        }
      },
      {
        $lookup:{
            from:"subscription",
            localField:"_id",
            foreignField:"subscriber",
            as:"subscribedTo"
        }
      },
      //now abbove pipe line ko add to krna hai 
      {
        $addFields:{
             subscribersCount:{
              $size:"$subscribers"
             },
             channelsSubscribedToCount:{
                $size:"$subscribedTo"
             },
             isSubscribed:{
               $cond:{
                if:{$in:[req.user?._id,"$subscribers.subscriber"]},
                then:true,
                else:false
               }
             }
        }
      },
      {
        $project:{
          fullName:1,
          username:1,
          subscribersCount:1,
          channelsSubscribedToCount:1,
          isSubscribed:1,
          avatar:1,
          coverImage:1,
          email:1,


        }
      }
    ])

    if(!channel?.length){
      throw new ApiError(404,"channel does not exists")
    }

    return res
    .status(200)
    .json(
      new ApiResponse(200,channel[0],"User channel fetched successfully")
    )

})









export { registerUser ,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    getUserChannelProfile
};
