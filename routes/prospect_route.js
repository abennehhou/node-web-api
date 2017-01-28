var _ = require('lodash');
var Prospect = require('../models/prospect.js');

module.exports = function (app) {

    /* Create */
    app.post('/prospect', function (req, res) {
        var newProspect = new Prospect(req.body);
        newProspect.save()
            .then(function (prospect) {
                res.json({ info: 'Prospect created successfully', 'prospect': prospect });
            })
            .catch(function (err) {
                res.json({ info: 'Error in create prospect', error: err });
            });
    });

    /* Read */
    app.get('/prospect', function (req, res) {
        Prospect.find()
            .then(function (prospects) {
                res.json({ info: 'Prospects found successfully', data: prospects });
            })
            .catch(function (err) {
                res.json({ info: 'Error in find prospects', error: err });
            });
    });

    app.get('/prospect/:id', function (req, res) {
        Prospect.findById(req.params.id)
            .then(function (prospect) {
                if (prospect) {
                    res.json({ info: 'Prospect found successfully', data: prospect });
                } else {
                    res.json({ info: 'Prospect not found', data: prospect });
                }
            })
            .catch(function (err) {
                res.json({ info: 'Error in find prospect by id', error: err });
            });
    });

    /* Update */
    app.put('/prospect/:id', function (req, res) {
        Prospect.findById(req.params.id)
            .then(function (prospect) {
                if (prospect) {
                    _.merge(prospect, req.body);
                    prospect.save()
                        .then(function (result) {
                            res.json({ info: 'Prospect updated successfully', 'prospect': result });
                        })
                        .catch(function (err) {
                            res.json({ info: 'Error in update prospect', error: err });
                        })
                } else {
                    res.json({ info: 'Prospect not found', data: prospect });
                }
            })
            .catch(function (err) {
                res.json({ info: 'Error in find prospect by id', error: err });
            });
    });

    /* Delete */
    app.delete('/prospect/:id', function (req, res) {
        Prospect.findByIdAndRemove(req.params.id)
            .then(function (prospect) {
                if (prospect) {
                    res.json({ info: 'Prospect deleted successfully', data: prospect });
                } else {
                    res.json({ info: 'Prospect not found', data: prospect });
                }
            })
            .catch(function (err) {
                res.json({ info: 'Error in delete prospect by id', error: err });
            });
    });
};
