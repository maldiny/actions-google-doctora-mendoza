const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./config/DB');
const preguntasRoutes = require('./routes/preguntas.route');
const sintomasRoutes = require('./routes/sintomas.route');
const enfermedadesRoutes = require('./routes/enfermedades.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 4000;

app.use('/preguntas', preguntasRoutes);
app.use('/sintomas', sintomasRoutes);
app.use('/enfermedades', enfermedadesRoutes);

const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});
