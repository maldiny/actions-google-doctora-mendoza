const express = require('express');
const app = express();
const routes = express.Router();
const CONFIF = require('../config/constantes');

// Require Sintomas model in our routes module
let Sintomas = require('../models/sintomas');

// Defined store route
routes.route('/add').post(function (req, res) {
  let sintoma = new Sintomas(req.body);
  sintoma.save()
    .then(game => {
      res.status(200).json({'sintoma': 'Sintomas in added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

routes.route('/').get(function (req, res) {

  let nombre = req.param('nombre');

  console.log(nombre);
  const filter = {"nombre" : {$regex : ".*" + nombre + ".*"}};

  let perPage = parseInt(req.param('perPage') || CONFIF.PER_PAGE);
  let page = parseInt(req.param('page') || CONFIF.PAGE);

  Sintomas
    .find(filter,function (err, sintomas){
    if(err){
      console.log(err);
    }
    else {
      Sintomas.countDocuments(filter,function(err, total){
        var response = {
          sintomas: sintomas,
          count: total,
          perPage: perPage,
          page: page
        }
        res.json(response);
      })
    }
  })
  .skip((perPage * page) - perPage)
  .limit(perPage);

});

// Defined edit route
routes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Sintomas.findById(id, function (err, sintoma){
    res.json(sintoma);
  });
});

//  Defined update route
routes.route('/update/:id').post(function (req, res) {
  Sintomas.findById(req.params.id, function(err, sintoma) {
    if (!sintoma)
      return next(new Error('Could not load Document'));
    else {
      sintoma.nombre = req.body.nombre;

      sintoma.save().then(sintoma => {
        res.json('Update complete');
      })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
routes.route('/delete/:id').get(function (req, res) {
  Sintomas.findByIdAndRemove({_id: req.params.id}, function(err, sintoma){
    if(err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = routes;
