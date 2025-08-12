import {User} from "../models/user.models.js"

//get all user
export const getUser=async(req,res)=>{
    const users=await User.find();
    res.json(users);
};

//new user 
export const newUser=async(req,res)=>{
    
    const {Name,email,age}=req.body;

    const newUser=await User.create({
        Name:Name,
        email:email,
        age:age
    })
    
    newUser.save();

    res.status(201).json(newUser)

}


//update new user 
export const updateUser=async(req,res)=>{
    const { Name,age}=req.body;
    const {id}=req.params;

    const user=await User.findByIdAndUpdate(
        id,
        {
            $set:{
                Name:Name,
                age:age
            }
        },
        {new:true}

    )

    res.status(200).json(user)
}

//delete user 

export const deleteUser=async(req,res)=>{

    const {id}=req.params;

    await User.findByIdAndDelete(id);

    res.json({message:"User deleted "})
}




