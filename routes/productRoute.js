const express = require ('express');
const router = express.Router();
const productController =require('../controllers/productController');

const upload = require('../middleware/upload')

router.post('/create', upload.single('image'),productController.createProduct);
router.get('/:id',productController.getProduct);
router.delete('/:id',productController.removeProduct);
router.put('/:id', upload.single('image'),productController.updateProduct);

module.exports=router; 