const express = require('express');
const router = express.Router();
const controller = require('../controllers/comments');

router.post('/', function (req, res) {
    let comment = {
        comment: req.body.comment,
        ProductId: req.body.ProductId
    };
    controller.add(comment, function() {
        res.sendStatus(204);
        res.end();
    })
})

router.put('/:id', function(req, res){
    let comment = {
        id : req.params.id,
        comment : req.body.comment
    }
    controller.update(comment, function() {
        res.sendStatus(204);
        res.end();
    })
})

router.delete('/:id', function(req, res) {
    let id = req.params.id;
    controller.delete(id, function() {
        res.sendStatus(204);
        res.end();
    })
})
// router.put('/:id', function (req, res){

// })

// router.delete('/:id', function (req, res){
    
// })

module.exports = router;