const Cart = require("../models/cart");
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
exports.getCart = async (req, res) => {
    try {
      const productsInCart = await Cart.findProductsInCart();
      res.status(200).json(productsInCart);
    } catch (error) {
        console.error("Error getting product:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.removeItemFromCart = async (req, res) => {
    try {
      await Cart.removeItemFromCart(req.params.productId);
      res.status(200).json({message: "Item successfuly deleted!"});
    } catch (error) {
        console.error("Error getting product:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.addToCart = async (req, res) => {
    try {
      const productInCart = await Cart.findProductInCart(req.params.productId);
      if (productInCart != null) {
        const quantity = productInCart.quantity + 1;
        await Cart.updateQuantity(req.params.productId, quantity)
      }else{
        const product = await Product.fetchOne(req.params.productId);
        console.log(product);
        const productToCart = await new Cart(req.params.productId, product.title, 1);
        await productToCart.save();
      }
      res.status(200).json({message: "Added to cart!"});
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