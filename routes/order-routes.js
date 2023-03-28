const express = require('express');

const orderController = require('../controllers/order-controller');

const router = express.Router();

router.get('/confirm-address', orderController.getAddress); // /cart/

router.get('/orders', orderController.getOrders);

router.post('/confirm-address', orderController.postAdress); // /cart/items

router.get('/order/success', orderController.getSuccess);



module.exports = router;  