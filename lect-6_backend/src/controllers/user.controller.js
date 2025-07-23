import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser=asyncHandler( async (req,res)=>{
    return  res.status(200).json({
        message:"aaj ka kaam hua bhai"
    })
});


export {registerUser}