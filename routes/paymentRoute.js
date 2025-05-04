const express = require ('express');
const router = express.Router();
const paymentController =require('../controllers/paymentController');


router.post('/create-payment', paymentController.createStripePayment);

// 2- Confirm after payment success
router.post('/confirm-payment', paymentController.confirmPayment);

// 3- Get receipt after scan QR
router.get('/receipt/:paymentId', paymentController.getReceipt);

module.exports=router;