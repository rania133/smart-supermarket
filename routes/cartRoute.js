const express =require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middleware/authMiddleware');

router.post("/add", auth ,cartController.addProductToCart);
router.patch("/decrease", auth ,cartController.decreaseProductQuantity);
router.delete("/delete", auth ,cartController.removeProductFromCart);
router.delete("/:id", auth ,cartController.removeCart);
router.put("/:id",  auth ,cartController.updateCart);
router.get("/:id",cartController.getCart);
 

module.exports= router;