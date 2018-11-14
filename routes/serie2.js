var express = require('express');
var router = express.Router();

var array = {'pizza':[]};
let pos = 0;

router.get('/pizza', function(req, res) {
    res.send({
      status: 200,
      obj: array.pizza
    });
});

router.get('/pizza/:id', function(req, res) {
    res.send({
      status: 200,
      obj: array.pizza[req.params.id]
    });
});

router.post('/pizza', function(req, res) {  
  var json = {
      tipoMasa: req.body.tipo,
      tamanio: req.body.size,
      porciones: req.body.porc,
      queso: req.body.queso
    };
    array.pizza.push(json);
    pos++;
    res.send(200);
});

router.put('/pizza', function(req, res) {

});

router.delete('/pizza', function(req, res) {

});


module.exports = router;
