var express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var router = express.Router();

const url = 'mongodb+srv://roma:1A2basdf@chatdb-53u3w.mongodb.net/test?retryWrites=true';
const dbName = "pizzas";

router.get('/pizza', function(req, res) {
  MongoClient.connect(url, function(err, client) {
    const collection = client.db("pizzas").collection("pizza");
    collection.find({}).toArray(function(err, result) {
      if (err)
        res.send(500);
      else {
        res.send({
          data: result,
          status: 200
        })
      }
    });
    client.close();
 });
});

router.get('/pizza/:id', function(req, res) {
    var id = req.params.id;
});

router.post('/pizza', function(req, res) {  
  var json = {
      tipoMasa: req.body.tipo,
      tamanio: req.body.size,
      porciones: req.body.porc,
      queso: req.body.queso
    };
    MongoClient.connect(url, function(err, client) {
      const collection = client.db("pizzas").collection("pizza");
      collection.insertOne(json, function(err, r) {
        assert.equal(null, err);
        
        res.send(200);
      });
      client.close();
   });
});

router.put('/pizza', function(req, res) {

});

router.delete('/pizza', function(req, res) {

});


module.exports = router;
