const controller = {};
const models = require('../models');
const bcrypt =  require('bcryptjs');
const User = models.User;

controller.createUser = (user, callback) => {
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            User
                .create(user)
                .then(function(){
                    callback(err)
                })
        })
    })
}

controller.getUserByEmail = (email, callback) => {
    User
        .findOne({ where : { email: email}})
        .then(function(user) {callback(user)})
        .catch(function(err) {
            if (err) throw err;
            callback(null);
        } )
}

controller.getUserById = (id, callback) => {
    User
        .findById(id)
        .then((user) => {callback});
}

controller.comparePassword = (password, hash, callback) => {
    bcrypt.compare(password, hash, function(err, isMatch){
        if (err) throw err;
        callback(isMatch);
    })
}

//Phan quyen
    //Phan quyen User
controller.isLoggedIn = (req, res, next) => {
    if(req.session.user){
        next();
    } else {
        // console.log('Trang goc la ', req.originalUrl);
        // console.log(req)
        //Quay ve trang dang nhap voi param la returnURL = originalURL
        res.redirect(`/users/login?returnURL=${req.originalUrl}`)
    }
}
    //Phan quyen Admin
controller.isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.isAdmin){
        next();
    } else {
        res.status(403).render('error', {errors: [{msg: 'You need admin authorization to access this page'}]}); //FORBIDDEN
    }
}

controller.getAllUsers = (callback) => {
    User
        .findAll()
        .then(users => callback(users))
} 
module.exports = controller;