const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for AdUnits
let Sintomas = new Schema({
  nombre: {
    type: String
  }
},{
  collection: 'sintomas'
});

module.exports = mongoose.model('Sintomas', Sintomas);
