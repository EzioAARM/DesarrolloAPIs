var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/jwt/:secreto', function(req, res, next) {
    var tokenData = {
        nombre: "Andres"
      }
      var token = jwt.sign(tokenData, req.params.secreto, {
         expiresIn: 60 * 60 * 24
      })
     
      res.send({
        token
      })
});


module.exports = router;
