# node-web-api
Node application using MongoDb for storage and Redis for cache.

Project based on this pluralsight course: [Play by Play: Building a Node Web API with Sam Artioli and John Papa](https://app.pluralsight.com/library/courses/play-by-play-node-web-api-john-papa-sam-artioli/).

### Steps to run

This project requires [Node.js](https://nodejs.org/), [MongoDB](https://www.mongodb.com/) and [Redis](https://redis.io/)  to run.

* Install Node, MongoDB and Redis
* Install the dependencies
* Install _forever_ and _nodemon_ globally (not mandatory, just for dev).
```
npm install
npm install -g nodemon
npm install -g forever
```
* Start the servers `prospect_server.js`, `customer_server.js` then `account_server.js`. You can use node or forever or nodemon.
```
forever start prospect_server.js
forever start customer_server.js
forever list
nodemon account_server.js
```
* Use the api
```
http://localhost:3000/customer
http://localhost:3001/prospect
http://localhost:3002/account
```
* You can post, put, get, delete customers and prospects.