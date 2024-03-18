const Product = require('../model/product');

exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.find({}, 'name description').populate('owner', 'name');
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
  
  exports.createProduct = async (req, res) => {
    const { name, description } = req.body;
    const userId = req.user.userId; 
    try {
      const product = await Product.create({ name, description, owner: userId });
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const userId = req.user.userId; 
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      if (req.user.role === 'admin' || product.owner.toString() === userId) {
        product.name = name;
        product.description = description;
        await product.save();
        res.json(product);
      } else {
        return res.status(403).json({ message: 'You are not authorized to update this product' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId; 
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      if (req.user.role === 'admin' || product.owner.toString() === userId) {
        await Product.findByIdAndDelete(id);
        res.status(204).end();
      } else {
        return res.status(403).json({ message: 'You are not authorized to delete this product' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  