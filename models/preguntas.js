const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for AdUnits
let Preguntas = new Schema({
  descripcion: {
    type: String
  }
},{
  collection: 'preguntas'
});

module.exports = mongoose.model('Preguntas', Preguntas);
