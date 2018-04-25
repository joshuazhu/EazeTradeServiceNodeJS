var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var jwt = require('jsonwebtoken');
var orderItem = require('./orderItem.js');

var OrderSchema = new mongoose.Schema({
    name: String,
    customerName: String,
    about: String,
    createTime: String,
    orderItems: Array,
    orderPriceTotal: String,
    orderPriceTotalRMB: String,
}, { timestamps: true });

OrderSchema.plugin(uniqueValidator, { message: 'is already taken' });

OrderSchema.methods.toJSONFor = function () {
    return {
        id: this._id,
        name: this.name,
        customerName: this.customerName,
        about: this.about,
        createTime: this.createTime,
        orderItems: this.orderItems,
        orderPriceTotal: this.orderPriceTotal,
        orderPriceTotalRMB: this.orderPriceTotalRMB,
    };
};

mongoose.model('Order', OrderSchema);