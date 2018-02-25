var express = require('express');
var router = express.Router();

router.post('/login', function(req, res){
    res.status(200).send({
        data: {
            message: "success",
            entity: {
                name: "admin",
                password: "admin"
            }
        }
    })
});

module.exports = router;