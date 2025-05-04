// const Cart = require("../models/CartSchema");
// const Product = require("../models/productSchema");
// const Receipt = require("../models/receiptSchema");
// const User = require("../models/userSchema");
// const QRCode = require("qrcode");

// exports.createReceipt = async (req, res, next) => {
//   try {
//     const { userId, cartId, qrCode } = req.body;

//     // Validate User
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     // Validate Cart and populate product details
//     const cart = await Cart.findById(cartId).populate("items.productId");
//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found." });
//     }


//     // Calculate total price
//     const totalPrice = cart.items.reduce((sum, item) => {
//       const product = item.productId;
//       return sum + product.price  * item.quantity;
//     }, 0);


//     // Create and save the receipt
//     const newReceipt = new Receipt({
//       userId,
//       cartId,
//       totalPrice,
//       qrCode,
//       verified: false,
//     });

//     await newReceipt.save();

//     res.status(201).json({ message: "Receipt created", receipt: newReceipt });
//   } catch (err) {
//     console.error("Error creating receipt:", err);
//     res.status(500).json({ message: err.message });
//   }
// };
 

// exports.verifyReceipt = async (req, res, next) => {
//   try {
//     const { receiptId } = req.body;

//     const receipt = await Receipt.findById(receiptId);
//     if (!receipt) {
//       return res.status(404).json({ message: "Receipt not found." });
//     }
//     receipt.verified=true;

//     await receipt.save();

//     res.status(201).json({ message: "Receipt verfied correctlly", receipt });
//   } catch (err) {

//     res.status(500).json({ message: err.message });

//   }
// };


// exports.getReceipt = async (req, res, next) => {
//   try {
    

//     const receipt = await Receipt.findById(req.params.id)
//     .populate('userId')
//     .populate('cartId')

//     if (!receipt) {
//       return res.status(404).json({ message: "Receipt not found." });
//     }

//     res.status(201).json(receipt);
   
//   } catch (err) {

//     res.status(500).json({ message: err.message });

//   }
// };


 