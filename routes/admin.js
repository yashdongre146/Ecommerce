const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.post("/addProduct", adminController.addProducts)

module.exports = router;