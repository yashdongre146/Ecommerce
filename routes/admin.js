const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get("/getProducts", adminController.getProducts)
router.post("/addProduct", adminController.addProduct)
router.get("/showDetails/:productId", adminController.showDetails)
router.post("/updateProduct/:productId", adminController.updateProduct)
router.delete("/deleteProduct/:productId", adminController.deleteProduct)


module.exports = router;