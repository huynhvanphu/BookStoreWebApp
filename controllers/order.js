let controller = {};
let models = require('../models');
let Contact = models.Contact;
let Order = models.Order;
let OrderDetails = models.OrderDetails;
let Product = models.Product
// let User = models.User;

controller.saveOrder = function(cart, user, callback) {
    Contact
        .create(cart.contact)
        .then((contact) => {
            const totalPrice = cart.totalPrice();
            const totalQuantity = cart.totalQuantity();
            const paymentMethod = cart.paymentMethod;
            let status = 'Processing';
            let ContactId = contact.id;
            let UserId = user.id;
            let order = {
                totalQuantity,
                totalPrice,
                paymentMethod,
                status,
                ContactId,
                UserId            
            }
            Order
                .create(order)
                .then((newOrder) => {
                    let items = cart.generateArray();
                    console.log(items);
                    items.forEach((item) => {
                        let details = {
                            quantity: item.quantity,
                            price: item.price,
                            ProductId: item.item.id,
                            OrderId: newOrder.id
                        }
                        OrderDetails
                            .create(details)
                    })
                    cart.empty();
                    callback(cart);
                })
        })
}
controller.findOrdersByUser = (user, callback) => {
    Order
        .findAll({
            where : {UserId : user.id}
        })
        .then(orders => {
            callback(orders);
        })
}

// controller.findOrderById = (id, callback) => {
//     OrderDetails
//         .findAll({
//             where: {OrderId: id},
//             include: [
//                 {
//                     model: Order,
//                     include: [Contact]
//                 },
//                 {
//                     model: Product
//                 }
//             ]
//         }).then(order => {callback(order)})
// }

controller.findOrderById = (id, callback) => {
    Order
        .findOne({
            where: {id: id},
            include: [Contact]
        })
        .then(order => callback(order))
}
controller.findOrderDetailsByOrderId = (id, callback) => {
    OrderDetails
        .findAll({
            where: {OrderId: id},
            include: [Product]
        }).then(details => {
            details.forEach(d => {
                d.Product.price = parseFloat(d.Product.price).toFixed(2);
            })
            callback(details)
        })    
}
module.exports = controller;