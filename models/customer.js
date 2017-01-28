var mongoose = require('mongoose');

var customerSchema = mongoose.Schema({

    name: String,
    address: String

});

module.exports = mongoose.model('Customer', customerSchema);