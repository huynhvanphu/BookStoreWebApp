const express = require('express');
const app = express();
const path = require('path');

//Static files configuration
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + "/views/lib/css/bootstrap/dist/css"));
app.use('/js', express.static(__dirname + "/views/lib/css/bootstrap/dist/js"));
app.use('/jquery', express.static(__dirname + "/views/lib/js"));
app.use('/popper.js', express.static(__dirname + "/views/lib/js/popper.js"));

const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const paginateHelper = require('express-handlebars-paginate');

//View engine by Handlebars
function formatDate(date){
    return date.toLocaleDateString('en-US') + " " + date.toLocaleTimeString();
}
function formatRole(isAdmin){
    return isAdmin ? 'Admin' : 'User';
}
const exHandlebars = require('express-handlebars').create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    helpers: {
        paginate: paginateHelper.createPagination,
        formatDate: formatDate,
        formatRole: formatRole
    },
    handlebars: allowInsecurePrototypeAccess(require('handlebars')) //FIXED ERROR */
});
app.engine('hbs', exHandlebars.engine);
app.set('view engine', 'hbs');

//Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Session and Cookie
const cart = require('./routes/cart');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const session = require('express-session');
app.set('trust proxy', 1);
app.use(session({
    cookie: {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    },
    secret: 's3cret',
    resave: false,
    saveUninitialized: false
}))

const Cart = require('./controllers/cart');
app.use(function(req, res, next) {
    //Cap nhat gio hang
    let cart = req.session.cart ? req.session.cart : {};
    cart = new Cart(cart);
    req.session.cart = cart;
    res.locals.itemsCount = cart.totalQuantity();

    //Cap nhat User
    res.locals.user = req.session.user;
    res.locals.isLoggedIn = req.session.user ? true : false;

    // console.log(res.locals.isLoggedIn)

    next();
})


//Define routes
app.get('/', (req, res) => {
    res.redirect('/products');
})
//Config subRoute
const users = require('./routes/users');
app.use('/users', users);

app.use('/cart', cart);

const products = require('./routes/products');
app.use('/products', products);

const productController = require('./controllers/products');
app.get('/search', function (req, res) {
    var key = req.query.query;
    console.log(key);
    productController.search(key, function(products){
        res.locals.products = products;
        res.locals.count = products.length;
        res.locals.key = key;
        res.render('search');
    })
})

const comments = require('./routes/comments');
app.use('/comments', comments);

//ERROR: PAGE NOT FOUND
app.use(function(err, req, res, next) {
    console.log(err);
    res.locals.message = 'File not found';
    res.status(404).render('error');
})

//ERROR: INTERAL SERVER ERROR
app.use(function(err, req, res, next) {
    console.log(err);
    res.locals.message = 'Internal Server Error';
    res.status(500).render('error');
})

// Synchronize to DB
var models = require('./models');
app.get('/sync', function(req, res, next) {
    models.sequelize.sync().then(function(){
        res.send('completed');
    });
});

//PORT configuration
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function() {
    console.log('listening on port ' + app.get('port'));
});