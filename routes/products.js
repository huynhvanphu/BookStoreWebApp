const express = require('express');
const { render } = require('express/lib/response');
const router = express.Router();
const controller = require('../controllers/products');

router.get('/', function (req, res){
    controller.getAll(products => {
        products.forEach(product => {
            product.price = parseFloat(product.price).toFixed(2);
        })
        let page = parseInt(req.query.page);
        page = isNaN(page) ? 1 : page;
        const pagination = {
            limit: 4,
            page: page,
            totalRows: products.length
        }
        const offset = (page-1)*pagination.limit;
        res.locals.products = products.slice(offset, offset + pagination.limit);
        res.locals.hasPagination = (pagination.totalRows/pagination.limit)
        res.render('index', {pagination});
    });
});

router.get('/:id', function (req, res){
    const id = req.params.id;
    controller.getById(id, product => {
        let page = parseInt(req.query.page);
        page = isNaN(page) ? 1 : page;
        const pagination = {
            limit: 3,
            page: page,
            totalRows: product.Comments.length
        };
        const offset = (page-1)*pagination.limit;
        product.Comments = product.Comments.slice(offset, offset + pagination.limit);
        res.locals.hasPagination = (pagination.totalRows/pagination.limit > 1);
        res.locals.product = product;
        res.render('details', {pagination});
    })
});

module.exports = router;