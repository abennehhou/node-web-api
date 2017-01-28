var request = require('request').defaults({
    json: true
});

var async = require('async');

var redis = require('redis');
var redisClient = redis.createClient(6379, '127.0.0.1');

const customerUri = "http://localhost:3000/customer";
const prospectUri = "http://localhost:3001/prospect";

module.exports = function (app) {

    /* Read */
    app.get('/accounts', function (req, res) {

        async.parallel({
            // get all customers
            customer: function (callback) {
                request({ uri: customerUri }, function (error, response, body) {
                    if (error) {
                        callback({ service: 'customer', error: error });
                        return;
                    };
                    if (!error && response.statusCode === 200) {
                        callback(null, body.data);
                    } else {
                        callback(response.statusCode);
                    }
                });
            },

            prospect: function (callback) {
                // get all prospects using redis cache
                redisClient.get(prospectUri, function (error, prospect) {
                    if (error) { throw error; };
                    if (prospect) {
                        callback(null, JSON.parse(prospect));
                    }
                    else {
                        request({ uri: prospectUri }, function (error, response, body) {
                            if (error) {
                                callback({ service: 'prospect', error: error });
                                return;
                            };
                            if (!error && response.statusCode === 200) {
                                callback(null, body.data);
                                redisClient.set(prospectUri, JSON.stringify(body.data), function (error) {
                                    if (error) { throw error; };
                                });
                                redisClient.expire(prospectUri, 10);
                            } else {
                                callback(response.statusCode);
                            }
                        });
                    }
                });
            }
        },
            function (error, results) {
                res.json({
                    error: error,
                    results: results
                });
            });
    });
};