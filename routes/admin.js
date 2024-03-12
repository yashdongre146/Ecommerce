const express = require('express');
const adminController = require('../controllers/admin');
const authentication = require('../middlewares/auth');

const router = express.Router();

router.post('/signup', adminController.signup)
router.post('/login', adminController.login)
router.get("/getProducts",authentication.auth, adminController.getProducts)
router.get("/getOrders",authentication.auth, adminController.getOrders)
router.get("/orderNow",authentication.auth, adminController.orderNow)
router.post("/addProduct",authentication.auth, adminController.addProduct)
router.get("/showDetails/:productId",authentication.auth, adminController.showDetails)
router.get("/getCart",authentication.auth, adminController.getCart)
router.get("/addToCart/:productId",authentication.auth, adminController.addToCart)
router.post("/updateProduct/:productId",authentication.auth, adminController.updateProduct)
router.delete("/deleteProduct/:productId",authentication.auth, adminController.deleteProduct)
router.delete("/removeItemFromCart/:productId",authentication.auth, adminController.removeItemFromCart)

module.exports = router;