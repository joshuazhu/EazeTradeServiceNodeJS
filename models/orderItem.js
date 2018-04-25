var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var jwt = require('jsonwebtoken');

var OrderItem = {
    name: String,
    quantity: String,
    unitPrice: String,
    unitPriceRMB: String
}

module.exports = OrderItem;