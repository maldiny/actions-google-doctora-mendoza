const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for AdUnits
let Enfermedades = new Schema({
  nombre: {
    type: String
  },
  descripcion: {
    type: String
  },
  tratamiento: {
    type: String
  },
  sintomas: {
    type: Array
  },
  preguntas: {
    type: Array
  }
},{
  collection: 'enfermedades'
});

module.exports = mongoose.model('Enfermedades', Enfermedades);
