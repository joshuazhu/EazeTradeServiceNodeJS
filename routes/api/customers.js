var mongoose = require('mongoose');
var router = require('express').Router();
var Customer = mongoose.model('Customer');
var auth = require('../auth');
var jwt = require('jsonwebtoken');
var secret = require('../../config').secret;

router.post('/', auth.required, function (req, res, next) {
  var customer = new Customer();
  customer.name = req.body.name;
  customer.address = req.body.address;
  customer.phoneNumber = req.body.phoneNumber;
  customer.note = req.body.note;
  customer.isHistory = false;
  customer.loginUserName = req.body.loginUserName;

  customer.save().then(function () {
    return res.status(200).json({
      message: "Customer create successfully!"
    });
  });
});

router.put('/', auth.required, function (req, res, next) {
  Customer.findById(req.body.id).then(function (customer) {
    if (!customer) {
      return res.sendStatus(404);
    }
    // only update fields that were actually passed...
    if (typeof req.body.name !== 'undefined') {
      customer.name = req.body.name;
    }
    if (typeof req.body.address !== 'undefined') {
      customer.address = req.body.address;
    }
    if (typeof req.body.phoneNumber !== 'undefined') {
      customer.phoneNumber = req.body.phoneNumber;
    }
    if (typeof req.body.note !== 'undefined') {
      customer.note = req.body.note;
    }
    if (typeof req.body.password !== 'undefined') {
      customer.setPassword(req.body.password);
    }
    return customer.save().then(function () {
      return res.json({ data: customer.toJSONFor() });
    });
  }).catch(next);
});

router.get('/', auth.required, function (req, res, next) {
  Customer.find({loginUserName: req.params.loginUserName}).then(function (result) {
    var customers = result
    return res.status(200).json({
      data: customers.map(function (customer) {
        return customer.toJSONFor()
      })
    });
  }).catch(next);
});

router.get('/getByName', auth.required, function (req, res, next) {
  Customer.find({}).then(function (result) {
    var customers = result
    return res.status(200).json({
      data: customers.map(function (customer) {
        return customer.toJSONFor()
      })
    });
  }).catch(next);
});

router.get('/getByName/:customerNames', auth.required, function (req, res, next) {
  Customer.findOne({ name: req.params.customerNames }).then(function (customer) {
    if (customer) {
      return res.status(200).json({
        data: customer.toJSONFor()
      });
    } else {
      return res.status(404).json({
        message: "customer not found"
      });
    }
  })
});

router.get('/getById/:customerId', auth.required, function (req, res, next) {
  Customer.findOne({ _id: req.params.customerId }).then(function (customer) {
    if (customer) {
      return res.status(200).json({
        data: customer.toJSONFor()
      });
    } else {
      return res.status(404).json({
        message: "customer not found"
      });
    }
  })
});

module.exports = router;
