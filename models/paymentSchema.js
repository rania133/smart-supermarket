const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  stripePaymentIntentId: { type: String }, // new
  paymentStatus: { type: String, default: 'pending' },
  receiptQRCode: { type: String }, 
}, { timestamps: true });


const Payment =mongoose.model("Payment",paymentSchema);
module.exports =Payment; 