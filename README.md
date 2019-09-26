# mongoose-and-node-practice

## LAB-08

The server in this project will be built across 2 code files:
- `lib/app.js` contains all of the logic for setting up the server application. It contains: routes, middleware, error handling, etc. It is built with express and as such exports an http handler function
- `server.js` contains all of the code for configuring and starting the server. It is the entry point for running the server. It handles loading the .env, connecting to the db, creating an http server (using app.js) and it starts listening.

Tests built using supertest and test-driven development was used for the following responses:
- app.get('/hello', ...) route
- A generic 404 handler
- A 404 handler specifically for bad paths in /api
- POST a resource (extract to function when it works!)
- GET a resource (use POST function, then get it)
- GET list of resources (use POST function, then get list and check length)
- UPDATE a resource (use POST function, then update object and save it, test updated object)
- DELETE a resource (use POST function, then delete. Check that a GET returns 404)
