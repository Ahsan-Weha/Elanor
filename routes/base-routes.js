const express = require('express');
const productController = require('../controllers/product-controller');

const router = express.Router();

router.get('/', function (req, res) {
    res.redirect('/home');
});

router.get('/home', productController.getHome);


router.get('/about-us', function (req, res) {
    res.render('customer/pages/about-us')
});

router.get('/privacy-policy', function (req, res) {
    res.render('customer/pages/privacy-policy')
});
router.get('/terms-and-conditions', function (req, res) {
    res.render('customer/pages/terms&cond')
});
router.get('/faqs', function (req, res) {
    res.render('customer/pages/faqs')
});
router.get('/contact-us', function (req, res) {
    res.render('customer/pages/contact-us')
});
router.get('/401', function (req, res) {
    res.status(401).render('shared/401');
});

router.get('/403', function (req, res) {
    res.status(403).render('shared/403');
});

module.exports = router;