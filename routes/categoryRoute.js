const express = require ('express');
const router = express.Router();
const categoryController =require('../controllers/categoryController');

const upload = require('../middleware/upload');
router.post('/create',upload.single('image'),categoryController.createCategory);
router.get('/:id',categoryController.getCategory);
router.put('/:id',upload.single('image'),categoryController.updateCategory);
router.delete('/:id',categoryController.removeCategory);

module.exports=router 