const User= require('../models/userSchema');

const validateUser =async (req,res,next)=>{
    const {name ,email ,password} =req.body; 

    if(!name ||!email ||!password){
        return res.status(400).json({message:"All fields are required"});
    }

    const registeringUsre =await User.findOne({email});
    if(registeringUsre){
        return res.status(400).json({message:"User already exists"});
    }

    if(password.length <6){
        return res.status(400).json({message:"password must be at least 6 characters long"});

    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }
    next();

   
};
module.exports=validateUser;