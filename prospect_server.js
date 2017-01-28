var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/prospects');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var prospectRoutes = require('./routes/prospect_route.js')(app);

var server = app.listen(3001, function () {
    console.log('Server running at http://127.0.0.1:3001/');
});