
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
  MongoClient.connect('mongodb://localhost:27017/', function (err, database) {
    if (err) throw err
    const myAwesomeDB = database.db('EazeTradeDev')
    myAwesomeDB.collection('Customer').find().toArray(function (err, result) {
      if (err) throw err

      console.log(result)
    })
  })
});

module.exports = router;
