const express = require('express');
const router = express.Router();
const userController = require('../controllers/users')
const productController = require('../controllers/products')


router.get('/', (req, res) => {
    userController.getAllUsers(users => {
        res.locals.adUser = 'active'
        res.locals.users = users;
        res.render('admin')
    })
})
router.get('/product-management', (req, res) => {
    productController.getAll(products => {
        products.forEach(product => {
            product.price = parseFloat(product.price).toFixed(2);
            res.locals.adProduct ='active';
        })
        res.render('productManage', {products})
    })
})

module.exports = router;