var express = require('express');
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const assert = require('assert');
var router = express.Router();
var json;

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
    MongoClient.connect(url, function(err, client) {
      const collection = client.db("pizzas").collection("pizza");
      collection.findOne({_id:new ObjectID(id)}, function(err, documento){
        if (err)
          res.send(500);
        else {
          res.send({
            data: documento,
            status: 200
          });
        }
      });
      client.close();
   });
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

router.put('/pizza/:id', function(req, res) {
  var id = req.params.id;
  var json = {
    _id: req.params.id,
    tipo: req.body.tipo,
    size: req.body.size,
    porc: req.body.porc,
    queso: req.body.queso
  };
  MongoClient.connect(url, function(err, client) {
    const collection = client.db("pizzas").collection("pizza");
    collection.findOneAndReplace( {_id:new ObjectID(id)},
    json);
    client.close();
 });
});

router.delete('/pizza/:id', function(req, res) {
  var id = req.params.id;
  MongoClient.connect(url, function(err, client) {
    const collection = client.db("pizzas").collection("pizza");
    collection.findOneAndDelete( {_id:new ObjectID(id)},
    json, function(err, documento){
      if (err)
        res.send(500);
      else {
        res.send({
          data: documento,
          status: 200
        });
      }
    });
    client.close();
 });
});


module.exports = router;
