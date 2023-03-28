const Contact = require("../models/contact-model");
const Product = require("../models/product-model");
const Order = require('../models/order-model');


async function getProducts(req, res, next) {
    try {
        const products = await Product.findAll();
        res.render('admin/products/all-products', { products: products })
    } catch (error) {
        next(error);
        return;
    }
}

function addNewProduct(req, res) {
    res.render('admin/products/new-products');

}

async function postNewProduct(req, res, next) {

    const product = new Product({
        ...req.body,
        image: req.file.filename,
    });
    try {
        await product.save();
    } catch (error) {
        next(error);
        return;
    }
    res.redirect('/admin/products');

}
async function getOrders(req, res, next) {
    try {
        const orders = await Order.findAll();
        res.render('admin/orders/admin-orders', {
            orders: orders
        });
    } catch (error) {
        next(error);
    }
}

async function updateOrder(req, res, next) {
    const orderId = req.params.id;
    const newStatus = req.body.newStatus;

    try {
        const order = await Order.findById(orderId);

        order.status = newStatus;

        await order.save();

        res.json({ message: 'Order updated', newStatus: newStatus });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getProducts: getProducts,
    addNewProduct: addNewProduct,
    postNewProduct: postNewProduct,
    getOrders: getOrders,
    updateOrder: updateOrder,
  
}