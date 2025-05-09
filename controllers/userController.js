const User = require('../models/userSchema');
const bcrypt = require('bcrypt');

exports.create = async (req, res, next) => {
    try {
        const { name, email,phone , password ,role} = req.body; 
        // Hash password securely
        const hashedPassword = await bcrypt.hash(password.trim(), 10);

        // Create new user
        const newUser = new User({ name: name.trim(),
             email: email.trim(),
             phone, 
             password: hashedPassword ,
             role:role||'user'
    });

        await newUser.save();

        return res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({message:error.message});
    }
 
};

exports.getUser = async (req,res,next) => {
    try {
        const userId =req.params.id;

        const users =await User.findById(userId);
        if(!users){
            return res.status(404).json({ message: "User not found" });

        }
        res.json(users);

       
    } catch (error) {
        res.status(500).json({message:error.message});
    }

};

exports.updateUser = async(req, res ,next )=>{
    try {
        const updatedUser= await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true,runValidators:true}
        );
        if(!updatedUser){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(201).json({message:"User updated successfully"});
      

       
    } catch (error) {
        res.status(500).json({message:error.message});
        }
 
};
exports.deleteUser = async(req, res ,next )=>{
    try {
        const deletedUser= await User.findByIdAndDelete(req.params.id)
        if(!deletedUser){
            return res.status(404).json({ message: "User not found" });
        }
       
        res.status(201).json({message:"User deleted successfully"});
      

       
    } catch (error) {
        res.status(500).json({message:error.message});
        }
 
};

exports.changeUserRole = async (req, res, next) => {
    try {
        const { id } = req.params;  
        const { role } = req.body;  

        // Ensure the role is either 'admin' or 'user'
        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role value' });
        }

        // Find the user by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's role
        user.role = role;
        await user.save();

        return res.status(200).json({ message: 'User role updated successfully', user });
    } catch (err) {
        next(err);  // Pass the error to the error-handling middleware
    }
};
