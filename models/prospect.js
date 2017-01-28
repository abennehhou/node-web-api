var mongoose = require('mongoose');

var prospectSchema = mongoose.Schema({

    name: String,
    segmentation: String

});

module.exports = mongoose.model('Prospect', prospectSchema);