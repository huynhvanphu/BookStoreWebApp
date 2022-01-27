const express = require('express');
const router = express.Router();
const userController = require('../controllers/users')

router.get('/', function (req, res) {
    res.locals.checkout = 'active';
    res.locals.billing = '';
    res.locals.payment = '';
    var {cart} = req.session;
    res.locals.items = cart.generateArray();
    res.locals.isNullCart = (res.locals.items.length > 0) ? false : true;
    res.locals.totalPrice = cart.totalPrice();
    res.render('cart');
})
const productController = require('../controllers/products');
router.post('/', function (req, res){
    const {ProductId} = req.body;
    productController.getById(ProductId, (product) => {
        req.session.cart.add(product);
        res.sendStatus(204);
        res.end();
    })
})

router.get('/billing', userController.isLoggedIn, function (req, res){
    res.locals.checkout = '';
    res.locals.billing = 'active';
    res.locals.payment = '';
    res.locals.items = req.session.cart.generateArray();
    res.locals.totalPrice = req.session.cart.totalPrice();
    res.render('billing');
})

router.post('/payment', userController.isLoggedIn, function (req, res){
    res.locals.checkout = '';
    res.locals.billing = '';
    res.locals.payment = 'active';
    let contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        country: req.body.country,
        state: req.body.state,
        zip: req.body.zip
    }
    req.session.cart.contact = contact;
    res.locals.items = req.session.cart.generateArray();
    res.locals.totalPrice = req.session.cart.totalPrice();
    res.render('payment');
})

let orderController = require('../controllers/order');
router.post('/confirmation', userController.isLoggedIn, function (req, res){
    req.session.cart.paymentMethod = req.body.paymentMethod;
    // console.log(req.session.cart.paymentMethod)
    orderController.saveOrder(req.session.cart, req.session.user, function(cart){
        req.session.cart = cart;
        res.locals.itemsCount = cart.totalQuantity();
        res.locals.message = 'Thanks for your confirmation. Your shipment will be processed soon'
        res.render('confirmation');
    }) 
})

router.put('/', function (req, res){
    const {ProductId} = req.body;
    let quantity = parseInt(req.body.quantity);
    req.session.cart.update(ProductId, quantity);
    res.sendStatus(204);
    res.end();
})
router.delete('/', function(req, res) {
    const {ProductId} = req.body;
    req.session.cart.remove(ProductId);
    res.sendStatus(204);
    res.end();
})

module.exports = router; 