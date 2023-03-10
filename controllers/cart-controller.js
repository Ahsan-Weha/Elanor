const Product = require('../models/product-model');


async function addCartItem(req, res, next) {
    let product
    try {
        product = await Product.findById(req.body.productId);
    } catch (error) {
        next(error);
        return;
    }

    const cart = res.locals.cart;

    cart.addItem(product);
    req.session.cart = cart;

    res.redirect('/customer/pages/shop');
}





module.exports = {
    addCartItem: addCartItem,
}