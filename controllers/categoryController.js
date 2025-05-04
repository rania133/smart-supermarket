const Category =require('../models/categorySchema');

exports.createCategory = async (req,res)=>{
    try{
        const {name , description } = req.body;
     const image = req.file ? req.file.filename : null;
     const newCategory = new Category ({
        name ,
        description,
        image

     });
     await newCategory.save();
     res.status(201).json({message:"Category created successfully."});


    }catch(err){
        res.status(500).json({message:err.message});
    }
     

};


exports.getCategory = async (req,res)=>{
    try{
        const categoryId =req.params.id;
        const categories = await Category.findById(categoryId);
        if (!categories){
            res.status(404).json({message:"Category not found"});
        }
        res.json(categories);
    }catch(err){
        res.status(500).json({message:err.message});
    }
};


exports.updateCategory = async (req, res) => {
    try {

        const {name ,description} =req.body;  
        const image =req.file ? req.file.filename :undefined;
        const updateData ={};
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (image) updateData.image = image;

      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      );
  
      if (!updatedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      res.status(200).json({ message: "Category updated successfully.", updatedCategory });
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

  exports.removeCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const deletedCategory= await Category.findByIdAndDelete(categoryId);
        if(!deletedCategory){
            return res.status(404).json({ message: "Category not found" });
        }
    
      res.status(200).json({ message: "Category deleted ." });
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  