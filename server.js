require("dotenv").config(); 
const express = require("express");
const app = express();
const cors = require('cors');
const path = require('path'); 
const seedData =require('./seeds/seed.js');

app.use(express.json());

app.use(cors());
const mongoose = require("mongoose");
const error = require("./middleware/error.js");
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const userRoutes= require('./routes/userRoute.js');
const productRoutes =require('./routes/productRoute.js')  ;
const cartRoutes =require ('./routes/cartRoute.js');
const authRoutes = require('./routes/auth.js');
const paymentRoutes = require('./routes/paymentRoute.js');
const categoryRoutes = require('./routes/categoryRoute.js');

app.use('/api/auth', authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/category", categoryRoutes);


const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {   
        }); 
        console.log(" MongoDB Connected Successfully");
        // seedData();
    } catch (error) { 
        console.error(" MongoDB Connection Failed:", error);
        process.exit(1);
    }
};
connectDB();  

app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});  
 