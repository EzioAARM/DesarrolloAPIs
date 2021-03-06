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

router.put('/pizza/:id', function(req, res) {
  var json = {
    tipoMasa: req.body.tipo,
    tamanio: req.body.size,
    porciones: req.body.porc,
    queso: req.body.queso
  };
  array.pizza[req.params.id] = json;
  pos++;
  res.send(200);
});

router.delete('/pizza/:id', function(req, res) {
array.pizza.splice(req.params.id, 1);
res.send(200);
});


module.exports = router;
