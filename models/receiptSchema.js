// const mongoose = require('mongoose');
// const QRCode = require('qrcode'); 

// const receiptSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   cartId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Cart',
//     required: true
//   },
//   qrCode: {
//     type: String,
//   },
//   verified: {
//     type: Boolean,
//     default: false
//   },
//   totalPrice: {
//     type: Number,
//     required: true
//   }
// }, { timestamps: true });

// // Pre-save hook to generate QR code if not provided

// receiptSchema.pre('save', async function (next) {
//   if (!this.qrCode) {
//     const qrData = `${this.userId}-${this.cartId}-${Date.now()}`;
//     this.qrCode = await QRCode.toDataURL(qrData);
//   }
//   next();
// });

// // Optional: Pre-update hook to generate QR code if not present in update
// receiptSchema.pre('findOneAndUpdate', async function (next) {
//   const update = this.getUpdate();

//   if (update && (!update.qrCode || update.qrCode === '')) {
//     const receipt = await this.model.findOne(this.getQuery());

//     if (receipt) {
//       const userId = update.userId || receipt.userId;
//       const cartId = update.cartId || receipt.cartId;

//       const qrData = `${userId}-${cartId}-${Date.now()}`;
//       update.qrCode = await QRCode.toDataURL(qrData);
//     }
//   }

//   next();
// });

// const Receipt = mongoose.model("Receipt", receiptSchema);
// module.exports = Receipt;
