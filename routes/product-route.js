const express = require('express');
const productController = require('../controllers/product-controller');

const router = express.Router();


router.get('/shop', productController.getShop);

router.get('/products/:id', productController.getProductDetails);




module.exports = router;