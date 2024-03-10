const Product = require("../models/product");

exports.getProducts = async (req, res) => {
    try {
      const products = await Product.fetchAll()
      res.status(200).json(products);
    } catch (error) {
        console.error("Error getting product:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.showDetails = async (req, res) => {
    try {
      const product = await Product.fetchOne(req.params.productId)
      res.status(200).json(product);
    } catch (error) {
        console.error("Error getting product:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.deleteProduct = async (req, res) => {
    try {
      await Product.delete(req.params.productId)
      res.status(200).json({message: "success", success: true});
    } catch (error) {
        console.error("Error getting product:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.updateProduct = async (req, res) => {
    try {
      const {productId} = req.params;
      await Product.update(productId, req.body)
      res.status(200).json({message: "success", success: true});
    } catch (error) {
        console.error("Error getting product:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.addProduct = async (req, res) => {
    try {
      const {title, imageUrl, price, description} = req.body;
      
      const product = await new Product(title, imageUrl, price, description);
      await product.save()
      res.status(200).json({ message: "Product added successfully" });
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
};