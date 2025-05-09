const Product =require('../models/productSchema');

exports.createProduct = async (req,res,next)=>{
    try{

        const { name , description , price , category , stock , qrCode, sizes }=req.body;
        const image = req.file ? req.file.filename : null;

        const existingProduct = await Product.findOne({ name: name.trim() });
        if (existingProduct) {
          return res.status(400).json({ message: "Product already exists." });
        };


        const newProduct =new Product({
            name:name.trim() ,
            description:description.trim() ,
            price :price,
            category :category.trim(),
            stock ,
            image,
            qrCode:qrCode,
            sizes, 
        });
       
        await newProduct.save();
        res.status(201).json({message:"Product created successfully.",
         newProduct
    });

    }catch(err){
        res.status(500).json({message:err.message});
    }
};
exports.getProduct = async (req,res,next)=>{
    try{ 
        const productId =req.params.id;
        const products = await Product.findById(productId);
        if(!products){
            res.status(404).json({message:" Product not found. "});
        }
        res.json(products);

        
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.removeProduct = async (req,res,next)=>{
    try{ 
        const productId =req.params.id;
        const deletedProduct =await Product.findByIdAndDelete(productId);
        if(!deletedProduct){
            res.status(404).json({message:" Product not found. "});
        }
        res.status(201).json({message: "Product deleted"});
        

        
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.updateProduct = async (req, res, next) => {
    try { 
        const { name , description , price , category , stock , sizes } =req.body;
        const updateData  ={};
        if(name) updateData.name= name;
        if(description) updateData.description= description;
        if(price) updateData.price= price;
        if(category) updateData.category= category;
        if(stock) updateData.stock= stock;
        if(sizes) updateData.sizes= sizes;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,   
            updateData,     
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.status(200).json({ message: "Product updated successfully.", updatedProduct });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
