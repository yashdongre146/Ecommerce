const Product = require("../models/product");

exports.addProducts = (req, res) => {
    try {
      const {title, imageUrl, price, description} = req.body;
      
      const product = new Product(title, imageUrl, price, description);
      product.save().then((res)=>{
        console.log(res);
      })
      res.status(200).send("Product added successfully");
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).send("Internal Server Error");
    }
  };
  