const express = require('express');
const adminController = require('../controllers/admin-controller');
const imageUploadMiddleware = require('../middlewares/image-upload');

const router = express.Router();


router.get('/', function (req, res) {
    res.redirect('products');
})


router.get('/products', adminController.getProducts);

router.get('/products/new', adminController.addNewProduct);

router.post('/products/new', imageUploadMiddleware, adminController.postNewProduct);

router.get('/orders', adminController.getOrders);

router.patch('/orders/:id', adminController.updateOrder);


module.exports = router;