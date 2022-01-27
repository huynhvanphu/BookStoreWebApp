const controller = {};
const models = require('../models');
const Comment = models.Comment;

controller.add = (comment, callback) => {
    Comment
    .create(comment)
    .then(callback)
};
controller.update = (comment, callback) => {
    Comment
    .update({
        comment: comment.comment
    }, {
        where : {
            id: comment.id
        }
    }).then(callback)
}
controller.delete = (id, callback) => {
    Comment
    .destroy({
        where: {
            id: id
        }
    }).then(callback)
}

module.exports = controller;