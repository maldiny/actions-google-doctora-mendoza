const express = require('express');
const app = express();
const routes = express.Router();
const CONFIF = require('../config/constantes');

// Require Enfermedades model in our routes module
let Enfermedades = require('../models/enfermedades');

// Defined store route
routes.route('/add').post(function (req, res) {
  let enfermedad = new Enfermedades(req.body);
  enfermedad.save()
    .then(game => {
      res.status(200).json({'enfermedad': 'Enfermedades in added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

routes.route('/conflictos').get(function (req, res) {

  Enfermedades.aggregate(
    [
      { $group :
          {
            _id : { "respuestas": "$respuestas", "sintomas": "$sintomas" },
            enfermedades: { $push: "$$ROOT" },
            count: { $sum: 1 }
          }
      },
      { $match: { count: { $gt: 1 }}}
    ], function(err, conflictos){
    if(err){
      console.log(err);
    }
    else {
      res.json(conflictos);
    }
  });
});

routes.route('/').get(function (req, res) {

  let nombre = req.param('nombre');
  let descripcion = req.param('descripcion');
  let tratamiento = req.param('tratamiento');
  let sintomas = req.param('sintomas');
  let status = req.param('status');

  let filter =
    { $and: [
        {"nombre" : {$regex : ".*" + nombre + ".*"}},
        {"descripcion" : {$regex : ".*" + descripcion + ".*"}},
        {"tratamiento" : {$regex : ".*" + tratamiento + ".*"}}]};

  if( status === 'KO' ){
    filter.$and.push({"respuestas": {$elemMatch: {respuesta:'?'}}});
  }
  if( status === 'OK' ){
    filter.$and.push({"respuestas": {$not: {$elemMatch: {respuesta:'?'}}}});
  }

  let perPage = parseInt(req.param('perPage') || CONFIF.PER_PAGE);
  let page = parseInt(req.param('page') || CONFIF.PAGE);

  Enfermedades
    .find(filter,function (err, enfermedades){
    if(err){
      console.log(err);
    }
    else {
      Enfermedades.countDocuments(filter,function(err, total){
        var response = {
          enfermedades: enfermedades,
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
  Enfermedades.findById(id, function (err, enfermedad){
    res.json(enfermedad);
  });
});

//  Defined update route
routes.route('/update/:id').post(function (req, res) {
  Enfermedades.findById(req.params.id, function(err, enfermedad) {
    if (!enfermedad)
      return next(new Error('Could not load Document'));
    else {
      enfermedad.nombre = req.body.nombre;
      enfermedad.descripcion = req.body.descripcion;
      enfermedad.tratamiento = req.body.tratamiento;
      enfermedad.sintomas = req.body.sintomas;
      enfermedad.respuestas = req.body.respuestas;

      enfermedad.save().then(enfermedad => {
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
  Enfermedades.findByIdAndRemove({_id: req.params.id}, function(err, enfermedad){
    if(err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = routes;
