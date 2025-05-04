const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateUser= require('../middleware/validateUser');

router.post('/create', validateUser,userController.create);
router.get('/:id',userController.getUser);
router.put('/:id',userController.updateUser);
router.delete('/:id',)

module.exports = router;
