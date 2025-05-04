 const mongoose =require('mongoose');
const Product = require('./productSchema');

 const virtualCartSchema =new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    items:[{
        
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true, min: 1 }
        
 }], 
 

 },{timestamps:true});

 const Cart= mongoose.model("Cart",virtualCartSchema)
 module.exports=Cart;
 