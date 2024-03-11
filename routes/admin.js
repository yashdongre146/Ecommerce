const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get("/getProducts", adminController.getProducts)
router.get("/getOrders", adminController.getOrders)
router.get("/orderNow", adminController.orderNow)
router.post("/addProduct", adminController.addProduct)
router.get("/showDetails/:productId", adminController.showDetails)
router.get("/getCart", adminController.getCart)
router.get("/addToCart/:productId", adminController.addToCart)
router.post("/updateProduct/:productId", adminController.updateProduct)
router.delete("/deleteProduct/:productId", adminController.deleteProduct)
router.delete("/removeItemFromCart/:productId", adminController.removeItemFromCart)

module.exports = router;