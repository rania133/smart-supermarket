const Cart = require('../models/CartSchema');
const Product = require('../models/productSchema');


exports.addProductToCart = async (req, res, next) => {
  try {
    const { userId, items } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }

    for (const item of items) { 
      const { productId, quantity } = item;

      if (!productId || !quantity) {
        return res.status(400).json({ message: "Missing productId or quantity" });
      }

      const itemIndex = cart.items.findIndex(
        (i) => i.productId.toString() === productId 
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();

    return res.status(201).json({
      message: "Products added to cart successfully",
      cart,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeCart = async (req, res, next) => {
    try {
      const deletedCart = await Cart.findByIdAndDelete(req.params.id);
  
      if (!deletedCart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      res.status(200).json({ message: "Cart deleted successfully" });
      
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

  exports.decreaseProductQuantity = async (req, res, next) => {
    try {
      const { userId, productId } = req.body;
    //   const userObjectId = new mongoose.Types.ObjectId(userId);
  
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ 
          message: "Cart not found"
        });
      }
  
      const itemIndex = cart.items.findIndex(
        (i) => i.productId.toString() === productId
      );
  
      if (itemIndex > -1) {
        if (cart.items[itemIndex].quantity > 1) {
          cart.items[itemIndex].quantity -= 1;
        } else {
          cart.items.splice(itemIndex, 1);
        }
  
        await cart.save();
  
        return res.status(200).json({
          message: "Quantity updated",
          cart,
        });
  
      } else {
        return res.status(404).json({
          message: "Product not found in cart"
        });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

  exports.removeProductFromCart = async (req, res, next) => {
    try {
        const { userId, productId } = req.body;

        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });
    
        cart.items = cart.items.filter(
          (item) => item.productId.toString() !== productId
        );

        await cart.save();

        return res.status(201).json({
          message: "Product removed successfully",
          cart,
        });

        
      
      
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };



  exports.updateCart = async(req, res ,next )=>{
    try {
        const updatedCart= await Cart.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true,runValidators:true}
        );
        if(!updatedCart){
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json({ message: "Cart updated successfully", cart: updatedCart });
      

       
    } catch (error) {
        res.status(500).json({message:error.message});
        }
 
};

exports.getCart = async(req, res ,next )=>{
    try {
        const carts =await Cart.findById(req.params.id);
        if(!carts){
            return res.status(404).json({message:"cart not found"});

        }
        res.status(200).json(carts);

    } catch (error) {
        res.status(500).json({message:error.message});
        }
 
};
  
  
