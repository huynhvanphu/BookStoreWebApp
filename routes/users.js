const express = require('express')
const router = express.Router({ mergeParams: true }); //MergeParams for nested Route

// const app = express();
const userController = require('../controllers/users');
const orderController = require('../controllers/order');

router.get('/login', (req, res) => {
    req.session.returnURL = req.query.returnURL;
    res.render('login');
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/orders', userController.isLoggedIn, (req, res) => {
    let user = req.session.user;
    orderController.findOrdersByUser(user, (orders) => {
        if (orders.length == 0) {
            res.render('orderHistory', { errors : [{msg : 'Your order history is empty'}]});
        } else {
            res.render('orderHistory', {orders})
        }
    })
    
})

router.get('/logout', userController.isLoggedIn, (req, res) => {
    req.session.user = null;
    res.redirect('/users/login')
})

router.get('/orders/:id', userController.isLoggedIn, (req, res) => {
    let id = req.params.id;
    orderController.findOrderById(id, function(order) {
        res.locals.order = order;
        console.log(order)
        orderController.findOrderDetailsByOrderId(id, function(details){
            res.locals.orderDetails = details;
            res.render('orderDetails');
        })
    })
    
})

const { check, validationResult } = require('express-validator');
router.post('/register',
    check('name', 'Tên không được để trống').notEmpty(),
    check('email')
        .notEmpty()
        .withMessage('Email không được để trống')
        .isEmail()
        .withMessage('Email không đúng định dạng'),
    check('password')
        .isLength({ min: 5 })
        .withMessage('Mật khẩu chứa ít nhất 5 ký tự')
        .matches(/\d/)
        .withMessage('Mật khẩu phải có số')
        .custom((value, { req }) => {
            if (value != req.body.passwordConfirmation) {
                throw new Error('Mật khẩu không trùng khớp');
            } else {
                return true;
            }
        }),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            res.render('register', { errors: errors.array()})
        } else {
            userController.getUserByEmail(req.body.email, function(usr) {
                if (usr) {
                    res.render('register', { errors: [{msg: 'Email already registered'}]})
                } else {
                    let user = {
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        isAdmin: false
                    }
                    userController.createUser(user, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        res.render('login', { errors: err })
                    })
                }
            })
        }
})

router.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    userController.getUserByEmail(email, function(user) {
        if(!user) {
            res.render('login', { errors: [{msg : 'Invalid email'}]})
        } else {
            userController.comparePassword(password, user.password, function(isMatch){
                if (!isMatch){
                    res.render('login', { errors: [{ msg: 'Password is incorrect' }] })
                } else {
                    req.session.user = user;
                    if (req.session.returnURL){
                        res.redirect(req.session.returnURL)
                    } else {
                        if (user.isAdmin){
                            res.redirect('/users/admin')
                        } else {
                            res.redirect('/')
                        }
                    }
                }
            })
        }
    })
    
})

const admin = require('./admin'); 
router.use('/admin', userController.isAdmin, admin)

module.exports = router;