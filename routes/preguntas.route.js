const express = require('express');
const app = express();
const routes = express.Router();
const CONFIF = require('../config/constantes');

// Require Preguntas model in our routes module
let Preguntas = require('../models/preguntas');
let Enfermedades = require('../models/enfermedades');

// Defined store route
routes.route('/add').post(function (req, res) {
  let pregunta = new Preguntas(req.body);
  pregunta.save()
    .then(item => {
      console.log(item);
      Enfermedades.find(function(err, enfermedades){
        if(err){
          console.log(err);
        }
        else {
          enfermedades.forEach(function(enfermedad) {
            const respuesta = {
              respuesta: '?',
              pregunta: item
            }
            enfermedad.respuestas.push(respuesta);
            let xxxx = new Enfermedades(enfermedad);
            xxxx.save();
          });
        }
      });




      res.status(200).json({'pregunta': 'Preguntas in added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

routes.route('/').get(function (req, res) {

  let descripcion = req.param('descripcion');

  console.log(descripcion);
  const filter = {"descripcion" : {$regex : ".*" + descripcion + ".*"}};

  let perPage = parseInt(req.param('perPage') || CONFIF.PER_PAGE);
  let page = parseInt(req.param('page') || CONFIF.PAGE);

  Preguntas
    .find(filter,function (err, preguntas){
    if(err){
      console.log(err);
    }
    else {
      Preguntas.countDocuments(filter,function(err, total){
        var response = {
          preguntas: preguntas,
          count: total,
          perPage: perPage,
          page: page,
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
  Preguntas.findById(id, function (err, pregunta){
    res.json(pregunta);
  });
});

//  Defined update route
routes.route('/update/:id').post(function (req, res) {
  Preguntas.findById(req.params.id, function(err, pregunta) {
    if (!pregunta)
      return next(new Error('Could not load Document'));
    else {
      pregunta.descripcion = req.body.descripcion;

      pregunta.save().then(pregunta => {
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
  Preguntas.findByIdAndRemove({_id: req.params.id}, function(err, pregunta){
    if(err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = routes;
