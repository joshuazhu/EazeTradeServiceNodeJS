var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var jwt = require('jsonwebtoken');

var CustomerSchema = new mongoose.Schema({
    name: String,
    address: String,
    phoneNumber: String,
    node: String,
    isHistory: String,
    loginUserName: String
}, { timestamps: true });

CustomerSchema.plugin(uniqueValidator, { message: 'is already taken' });

CustomerSchema.methods.toJSONFor = function () {
    return {
        id: this._id,
        name: this.name,
        address: this.address,
        note: this.note,
        phoneNumber: this.phoneNumber,
        isHistory: this.isHistory,
        loginUserName: this.loginUserName
    };
};


mongoose.model('Customer', CustomerSchema);