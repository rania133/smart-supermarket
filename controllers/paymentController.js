require('dotenv').config(); 

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/paymentSchema');
const QRCode = require('qrcode');
const Product = require('../models/productSchema');

// 1- Create Stripe PaymentIntent and Payment record
exports.createStripePayment = async (req, res) => {
    try {
      const { userId, products } = req.body;
  
      if (!userId || !products || products.length === 0) {
        return res.status(400).json({ message: 'Missing payment details' });
      }
  
      // 1. Calculate totalAmount
      let totalAmount = 0;
      const detailedProducts = [];    
  
      // Loop through each product and fetch from database
      for (const item of products) {
        const productId = item.productId;
  
        if (!productId) {
          return res.status(400).json({ message: 'Product ID is missing in the request body' });
        }
  
        const product = await Product.findById(productId);
  
        if (!product) {
          return res.status(404).json({ message: `Product with ID ${productId} not found` });
        }
  
        totalAmount += product.price * item.quantity;
  
        detailedProducts.push({
          product: product._id,
          quantity: item.quantity,
        });
      }
  
      // 2. Create Stripe PaymentIntent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount * 100, // Stripe uses cents
        currency: 'usd',
        payment_method_types: ['card'],
      });
  
      // 3. Create Payment record
      const payment = await Payment.create({
        user: userId,
        products: detailedProducts,
        totalAmount,
        stripePaymentIntentId: paymentIntent.id,
        paymentStatus: 'pending',
      });
  
      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
        paymentId: payment._id,
      });
  
    } catch (error) {
      console.error('Stripe Payment Error:', error);
      res.status(500).json({ message: 'Payment failed', error: error.message });
    }
  };


// 2- Confirm Payment after success
exports.confirmPayment = async (req, res) => {
  try {
    const { paymentId } = req.body;

    // Find payment and populate product details
    const payment = await Payment.findById(paymentId).populate('products.product');
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // Update stock for each product
    for (const item of payment.products) {
      const quantityPurchased = item.quantity;
      const product = item.product;

      if (product.stock < quantityPurchased) {
        return res.status(400).json({ message: `Insufficient stock for product: ${product.name}` });
      }

      product.stock -= quantityPurchased;
      await product.save();
    }

    // Update payment status
    payment.paymentStatus = 'paid';

    // Generate QR code
    const qrCodeDataURL = await QRCode.toDataURL(payment._id.toString());
    payment.receiptQRCode = qrCodeDataURL;

    // Save payment
    await payment.save();

    res.status(200).json({
      message: 'Payment confirmed and QR receipt ready',
      receiptQRCode: qrCodeDataURL,
    });

  } catch (error) {
    console.error('Confirm Payment Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// 3- Get Receipt by Scanning QR
exports.getReceipt = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findById(paymentId).populate('products.product');
    if (!payment) {
      return res.status(404).json({ message: 'Receipt not found' });
    }

    res.status(200).json({
      message: 'Receipt fetched successfully',
      receipt: {
        products: payment.products.map(item => ({
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        })),
        totalAmount: payment.totalAmount,
        paidAt: payment.updatedAt,
      },
    });
  } catch (error) {
    console.error('Get Receipt Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
