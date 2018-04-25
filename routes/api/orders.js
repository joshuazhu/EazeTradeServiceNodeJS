var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var Order = mongoose.model('Order');
var auth = require('../auth');

// router.get('/', auth.required, function (req, res, next) {
//     Order.find({loginUserName: req.params.loginUserName}).then(function (result) {
//       var customers = result
//       return res.status(200).json({
//         data: customers.map(function (customer) {
//           return customer.toJSONFor()
//         })
//       });
//     }).catch(next);
//   });

router.get('/list', auth.required, function (req, res, next) {
    Order.find({}).then(function (result) {
        var orders = result
        return res.status(200).json({
            data: orders.map(function (orders) {
                return orders.toJSONFor()
            })
        });
    }).catch(next);
});

router.post('/', auth.required, function (req, res, next) {
    var order = new Order();
    order.name = req.body.name;
    order.customerName = req.body.customerName;
    order.about = req.body.about;
    order.createTime = req.body.createTime;
    order.orderItems = req.body.orderItems;
    order.orderPriceTotal = req.body.orderPriceTotal;
    order.orderPriceTotalRMB = req.body.orderPriceTotalRMB;

    order.save().then(function () {
        return res.status(200).json({
            message: "Order create successfully!"
        });
    });
});

module.exports = router;