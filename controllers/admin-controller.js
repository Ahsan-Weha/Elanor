const Contact = require("../models/contact-model");
const Product = require("../models/product-model");



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

module.exports = {
    getProducts: getProducts,
    addNewProduct: addNewProduct,
    postNewProduct: postNewProduct,
}