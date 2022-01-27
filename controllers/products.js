const controller = {};

const models = require('../models');

const Product = models.Product;

controller.getAll = function(callback) {
    Product
    .findAll()
    .then(products => {
        callback(products);
    })
}
controller.getById = function(id, callback) {
    Product
    .findOne({
        where: {id: id},
        include: [models.Comment]
    })
    .then(product => {
        product.price = parseFloat(product.price).toFixed(2);
        product.Comments.sort((a,b) => b.createdAt - a.createdAt);
        callback(product);
    })
}
const { Op } = require("sequelize"); //FIXED ERROR invalid value...

controller.search = function(key, callback) {
    Product
    .findAll({
        where: {
            [Op.or]: [
                {
                    name: { [Op.like]: `%${key}%` }
                },
                {
                    summary: { [Op.like]: `%${key}%` }
                },
                {
                    description: { [Op.like]: `%${key}%` }
                },
            ]
        }
    }
    )
    .then(products => {
        products.forEach(product => {
            product.price = parseFloat(product.price).toFixed(2);
        })
        callback(products);
    })
}

module.exports = controller;