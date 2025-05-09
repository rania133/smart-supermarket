const express =require ('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
require("dotenv").config(); 

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req,res)=>{
    try{


    const {name ,email , phone, password ,role}=req.body;
    if(role==='admin'){
        return res.status(403).json({message:'Unauthorized role assignment'});
    }

    const exitingUser =  await User.findOne({email});
    if(exitingUser){
       return res.status(400).json({message:"User already exists"});
    }
    const hashedPassword = await bcrypt.hash( password.trim() , 10 ); 


    const newRegister = new User({
        name,
        email,
        phone,
        password : hashedPassword,
        role: role || 'user'

    })
    await newRegister.save();

    return res.status(201).json({message:"User Created successfully"});
}catch (err){
    res.status(500).json({ message: 'Server error' });


}

});



router.post('/login', async (req,res)=>{
    try{


    const {email , password }=req.body;

    const user =  await User.findOne({email});
    if(!user){
       return res.status(400).json({message:'Invalid credentials'});
    }


    const isMatch = await bcrypt.compare(password ,user.password);
    if(!isMatch){
        return res.status(400).json({message:'Invalid credentials'});
    }
     const token = jwt.sign({id: user._id,
        role: user.role} ,
        JWT_SECRET ,
        {expiresIn : '1d'});


        res.json({
            token,
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role    
            }
          });
          

}catch (err){
    res.status(500).json({ message: 'Server error' });

}

});


module.exports=router;