const User = require("../models/auth-model");
const Order = require('../models/order-model');
const sessionFlash = require("../util/session-flash");
const validation = require("../util/validation");
const authUtil = require("../util/authentification");

async function getOrders(req, res) {
    try {
        const orders = await Order.findAllForUser(res.locals.uid);
        res.render('customer/orders/all-orders', {
            orders: orders,
        });
    } catch (error) {
        next(error);
    }
}
async function getAddress(req, res, next) {

    let userDocument;
    try {
        userDocument = await User.findById(res.locals.uid);
    } catch (error) {
        return next(error);
    }
    res.render('customer/orders/confirm-address', { userDocument: userDocument });
}


async function postAdress(req, res, next) {
    let cart = res.locals.cart;
    let userDocument = new User(
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.address,
        req.body.city,
        req.body.postal,
        req.body.number
    );
    try {
        if (res.locals.uid) {
            await userDocument.updateAddress(res.locals.uid);

        } else {
            await userDocument.addAddress();
        }
    } catch (error) {
        return next(error);
    }
    let userDoc;
    try {
        if (res.locals.uid) {
            userDoc = await User.findById(res.locals.uid);
        } else {
            userDoc = userDocument;
        }
    } catch (error) {
        return next(error);
    }
    const order = new Order(cart, userDoc);

    try {
        await order.save();
    } catch (error) {
        next(error);
        return;
    }

    req.session.cart = null;

    res.redirect('/order/success');
}

function getSuccess(req, res) {

    res.render('customer/orders/success');
}



module.exports = {
    getAddress: getAddress,
    postAdress: postAdress,
    getSuccess: getSuccess,
    getOrders: getOrders
}