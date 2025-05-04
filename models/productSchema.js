const mongoose = require('mongoose');
const QRCode = require('qrcode'); 

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    image:{
        type: String 

        },
    stock: {
        type: Number,
        required: true,
        min: 0
    },

    qrCode: {
        type: String
    },
    sizes: [
        {
            size:{
                type: String,
                required:true
            },
            price :{
                type: Number,
                required:true
            },
            stock: {
                type: Number,
                required:true,
                min: 0
            },

        }
    ]
}, { timestamps: true });

productSchema.pre('save', async function (next) {
    if (!this.qrCode) {
        const qrCodeData = `Product: ${this.name}, Description: ${this.description}, Price: ${this.price}, Category: ${this.category}, Stock: ${this.stock}`;
        this.qrCode = await QRCode.toDataURL(qrCodeData); 
    }
    next();
});

productSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();

    if (update && (!update.qrCode || update.qrCode === '')) { 
        const product = await this.model.findOne(this.getQuery()); // Get existing product

        if (product) {
            const name = update.name || product.name; 
            const description = update.description || product.description;
            const price = update.price !== undefined ? update.price : product.price;
            const category = update.category || product.category;
            const stock = update.stock !== undefined ? update.stock : product.stock;

            
            const qrCodeData = `Product: ${name}, Description: ${description}, Price: ${price}, Category: ${category}, Stock: ${stock}`;
            update.qrCode = await QRCode.toDataURL(qrCodeData);
        }
    }

    next();
});


const Product = mongoose.model("Product", productSchema);
module.exports = Product;
