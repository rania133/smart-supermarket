const User = require('../models/userSchema');
const bcrypt = require('bcrypt');

exports.create = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        // Hash password securely
        const hashedPassword = await bcrypt.hash(password.trim(), 10);

        // Create new user
        const newUser = new User({ name: name.trim(), email: email.trim(), password: hashedPassword });
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
 
}
