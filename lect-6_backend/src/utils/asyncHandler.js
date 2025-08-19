// asynchandler ek method hai aur vo export karega dost
//asyncHandler ek higher-order function hai jo kisi bhi async 
// function ko wrap karta hai taaki agar uske andar koi 
// error aaye to wo automatically next(error) ke through
//  Express ke error-handling middleware tak pahunch jaaye 
// — bina try/catch likhe.


//app-1 approach-1 using promise

const asyncHandler=(requrestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requrestHandler(req,res,next)).catch((err)=>next(err))
    }

}



export {asyncHandler}


// appp-2 try and catch



// const asynchandler =()=>{}
// const asyncHandler=(fun)=>()=>{}
// const asyncHandler=(fun)=>async()=>{}

// const asyncHandler =(fn) => async(req,res,next)=>{
//     try{
//         await fn(req,res,next)

//     }catch(error){
//         res.status(error.code||500).json({
//             success:false,
//             message:error.message
//         })
//     }
// }



