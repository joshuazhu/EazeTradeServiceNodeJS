var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('../config').secret;

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    salt: String,
    email: String,
    phoneNumber: String,
    isHistory: String
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: 'is already taken' });

UserSchema.methods.validPassword = function (password) {
    var hashedPassword = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.password === hashedPassword;
};

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
};

UserSchema.methods.toAuthJSON = function(){
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT()
  };
};

UserSchema.methods.toJSONFor = function (user) {
    return {
        username: this.username,
        password: this.password,
        email: this.email,
        phoneNumber: this.phoneNumber,
        isHistory: this.isHistory
    };
};

mongoose.model('User', UserSchema);