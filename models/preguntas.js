const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for AdUnits
let Preguntas = new Schema({
  unit_name: {
    type: String
  },
  unit_price: {
    type: Number
  }
},{
  collection: 'preguntas'
});

module.exports = mongoose.model('Preguntas', Preguntas);
