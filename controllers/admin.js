const Cart = require("../models/cart");
const Order = require("../models/order");
const Product = require("../models/product");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

function generateToken(_id, name) {
  return jwt.sign({ _id, name }, process.env.JWT_SECRET);
}

exports.signup = (req, res) => {
  try {
    const { name, email, password } = req.body;
    bcryptjs.hash(password, 10, async (err, hash) => {
      const user = await new User({name, email, password: hash});
      user.save();
      res.json(user);
    });
  } catch (err) {
    res.status(400).json();
  }
};
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if (user) {
      bcryptjs.compare(req.body.password, user.password, async (err, resp) => {
        const passwordMatch = await bcryptjs.compare(
          req.body.password,
          user.password
        );

        if (passwordMatch) {
          res.json({ token: generateToken(user._id, user.name) });
        } else {
          res.status(422).json({ message: "Password does not match." });
        }
      });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong." });
  }
};
exports.getProducts = async (req, res) => {
  try {
    // old school
    //   const products = await Product.fetchAll()
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({userId :req.user._id});
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.showDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.status(200).json(product);
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getCart = async (req, res) => {
  try {
    const productsInCart = await Cart.find({ userId: req.user._id });
    // old school
    // const productsInCart = await Cart.findProductsInCart(req.user._id);
    res.status(200).json(productsInCart);
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.orderNow = async (req, res) => {
  try {
    const productsInCart = await Cart.find({ userId: req.user._id });
    // old school
    // const productsInCart = await Cart.findProductsInCart(req.user._id);
    // Extracting productTitle and quantity into a new array
    const ordersArray = productsInCart.map((item) => ({
      productId: item.productId,
      productTitle: item.productTitle,
      quantity: item.quantity,
    }));
    // old school
    // const order = await new Order(ordersArray, req.user._id);
    // await order.save();
    const order = await new Order({products: ordersArray, userId: req.user._id});
    await order.save();

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.removeItemFromCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ productId: req.params.productId, userId: req.user._id });
    // old school
    // await Cart.removeItemFromCart(req.params.productId, req.user._id);
    res.status(200).json({ message: "Item successfuly deleted!" });
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.addToCart = async (req, res) => {
  try {
    const productInCart = await Cart.findOne({ productId: req.params.productId, userId: req.user._id });
    // old school
    // const productInCart = await Cart.findProductInCart(
    //   req.params.productId,
    //   req.user._id
    // );
    if (productInCart != null) {
      const quantity = productInCart.quantity + 1;
      // old school
      // await Cart.updateQuantity(req.params.productId, quantity, req.user._id);
      await Cart.updateOne({ productId: req.params.productId, userId: req.user._id }, { quantity: quantity });
    } else {
      // old school
      // const product = await Product.fetchOne(req.params.productId);
      const product = await Product.findById(req.params.productId);

      // old school
      // const productToCart = await new Cart(
      //   req.params.productId,
      //   product.title,
      //   1,
      //   req.user._id
      // );
      // await productToCart.save();
      const productToCart = new Cart({
        productId: req.params.productId,
        productTitle: product.title,
        quantity: 1,
        userId: req.user._id
      });
  
      await productToCart.save();
    }
    res.status(200).json({ message: "Added to cart!" });
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    // old school
    //   await Product.delete(req.params.productId)

    await Product.findByIdAndDelete(req.params.productId);
    res.status(200).json({ message: "success", success: true });
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // old school
    //  await Product.update(productId, req.body)

    // Find the product by ID and update it
    await Product.findByIdAndUpdate(productId, req.body);
    res.status(200).json({ message: "success", success: true });
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { title, imageUrl, price, description } = req.body;

    // old school
    //   const product = await new Product(title, imageUrl, price, description);
    const product = await new Product({ title, imageUrl, price, description });
    await product.save();
    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
