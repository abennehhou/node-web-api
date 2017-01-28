var _ = require('lodash');
var Customer = require('../models/customer.js');

module.exports = function (app) {

    /* Create */
    app.post('/customer', function (req, res) {
        var newCustomer = new Customer(req.body);
        newCustomer.save()
            .then(function (customer) {
                res.json({ info: 'Customer created successfully', 'customer': customer });
            })
            .catch(function (err) {
                res.json({ info: 'Error in create customer', error: err });
            });
    });

    /* Read */
    app.get('/customer', function (req, res) {
        Customer.find()
            .then(function (customers) {
                res.json({ info: 'Customers found successfully', data: customers });
            })
            .catch(function (err) {
                res.json({ info: 'Error in find customers', error: err });
            });
    });

    app.get('/customer/:id', function (req, res) {
        Customer.findById(req.params.id)
            .then(function (customer) {
                if (customer) {
                    res.json({ info: 'Customer found successfully', data: customer });
                } else {
                    res.json({ info: 'Customer not found', data: customer });
                }
            })
            .catch(function (err) {
                res.json({ info: 'Error in find customer by id', error: err });
            });
    });

    /* Update */
    app.put('/customer/:id', function (req, res) {
        Customer.findById(req.params.id)
            .then(function (customer) {
                if (customer) {
                    _.merge(customer, req.body);
                    customer.save()
                        .then(function (result) {
                            res.json({ info: 'Customer updated successfully', 'customer': result });
                        })
                        .catch(function (err) {
                            res.json({ info: 'Error in update customer', error: err });
                        })
                } else {
                    res.json({ info: 'Customer not found', data: customer });
                }
            })
            .catch(function (err) {
                res.json({ info: 'Error in find customer by id', error: err });
            });
    });

    /* Delete */
    app.delete('/customer/:id', function (req, res) {
        Customer.findByIdAndRemove(req.params.id)
            .then(function (customer) {
                if (customer) {
                    res.json({ info: 'Customer deleted successfully', data: customer });
                } else {
                    res.json({ info: 'Customer not found', data: customer });
                }
            })
            .catch(function (err) {
                res.json({ info: 'Error in delete customer by id', error: err });
            });
    });
};
