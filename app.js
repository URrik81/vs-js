const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //or false???

const port = 3000;

app.use(express.static(__dirname + '/src'));

app.get('/', (req, res) => res.sendFile('index.html'));

const server = app.listen(port, () => console.log('App listening on port ' + server.address().port));

const routes = require('./routes/routes.js')(app, fs);