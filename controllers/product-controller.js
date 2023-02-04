const Product = require("../models/product-model");

async function getHome(req, res, next) {
    try {
        const products = await Product.findAll();
        res.render('customer/pages/home', { products: products })
    } catch (error) {
        next(error);
        return;
    }

}

async function getShop(req, res, next) {
    try {
        const products = await Product.findAll();
        res.render('customer/pages/shop', { products: products })
    } catch (error) {
        next(error);
        return;
    }
}

async function getProductDetails(req, res, next) {
    try {
        const product = await Product.findById(req.params.id);
        res.render('customer/pages/product-detail', { product: product })
    } catch (error) {
        next(error);
        return;
    }
}
module.exports = {
    getShop: getShop,
    getHome: getHome,
    getProductDetails: getProductDetails,
}